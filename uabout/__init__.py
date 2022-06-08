# Env Imports
from dotenv import load_dotenv
from os import environ

# Database Imports
from .config.db_config import db, Users, Posts, Comments, Reactions, Connection, Invites
from .config.friends_config import is_friends_or_pending, get_friend_requests, get_friends
from .config.redis_config import RedisConfig

# Flask Imports
from flask import Flask, jsonify, flash, request, session
from flask.helpers import send_from_directory
from sqlalchemy_searchable import search
from flask_cors import CORS
from flask_session import Session
from flask_bcrypt import Bcrypt
from flask_marshmallow import Marshmallow
from uuid import uuid4

from werkzeug import exceptions

# ----------------------------------- Load environment variables -----------------------------------

load_dotenv()

database_uri = environ.get('DATABASE_URL')
if 'postgres' in database_uri:
    database_uri = database_uri.replace('postgres:', 'postgresql:')


# ----------------------------- Set up the app (with React) and Database ---------------------------

app = Flask(__name__, static_folder='client/build', static_url_path='')
CORS(app, supports_credentials=True)

app.config.update(
    SQLALCHEMY_DATABASE_URI=database_uri,
    FLASK_ENV='development',
    FLASK_APP='uabout',
    SQLALCHEMY_ECHO = True,
    SQLALCHEMY_TRACK_MODIFICATIONS = False
)

app.config.from_object(RedisConfig)

db.app = app
db.init_app(app)

bcrypt = Bcrypt(app)

server_session = Session(app)

# ----------------------------------- Setting up Marshmallow -----------------------------
ma = Marshmallow(app)

# utilising marshmallow to parse unreadable python objects into json data
class UsersSchema(ma.Schema):
    class Meta:
        fields = ("user_id",
                "first_name", 
                "last_name", 
                "username", 
                "email", 
                "phone_number") 

user_schema = UsersSchema()
users_schema = UsersSchema(many=True)

# Post Ma Schema
class PostsSchema(ma.Schema):
    class Meta:
        fields = ("post_id", 
                "post_title",
                "post_body",
                "event_start", 
                "event_end") 

post_schema = PostsSchema()
posts_schema = PostsSchema(many=True)
# ----------------------------------- React Served on all 404 Routes -----------------------------

@app.errorhandler(exceptions.NotFound)
def serve(err):
    return send_from_directory(app.static_folder, 'index.html')

# ---------------------------------------- API ROUTES --------------------------------------------
@app.route('/api', methods=['GET'])
def index():
    return """
    <h1>Welcome to the Uabout API!</h1>
    <p>If you came here by mistake pleaese go back!</p>
    <button onclick="location.href = 'https://uabout.herokuapp.com/';"> Go Back! </button>
    """

# --------------------------------------- AUTH ROUTES --------------------------------------------
@app.route('/api/register', methods=['POST'])
def register_user():
    # fetching form details
    first_name = request.json["first_name"]
    last_name = request.json["last_name"]
    username = request.json["username"]
    email = request.json["email"]
    password = request.json["password"]
    phone_number = request.json["phone_number"]



    # checks for user in db - returns false if user does not exist (not empty)
    user_exists = Users.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({ "error": "User already exits"})
    

    # encrypts password - decodes utf-8 stuff (if it comes as unicode it messes up)
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = Users(first_name=first_name, 
                    last_name=last_name,
                    username=username, 
                    email=email, 
                    password=hashed_password, 
                    phone_number=phone_number)
    # add to database
    db.session.add(new_user)
    db.session.commit()

    # Add same info to session for new user as per /login route
    session["current_user"] = {
        "first_name": new_user.first_name,
        "user_id": new_user.user_id,
        "num_received_requests": 0,
        "num_sent_requests": 0,
        "num_total_requests": 0
    }

    flash("You have succesfully signed up for an account, and you are now logged in.", "success")

    return jsonify({
        "id": new_user.user_id,
        "username": new_user.username
    })

@app.route('/api/login', methods=['POST'])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    current_user = Users.query.filter_by(email=email).first()

    # if user doesn't exist
    if current_user is None:
        return jsonify({ "error": "Couldn't find your uAbout Account"}), 401
    
    # if the entered password doesn't match password in database...
    if not bcrypt.check_password_hash(current_user.password, password):
        return jsonify({ "error": "Incorrect Password"}), 401

    # Get current user's friend requests and number of requests to display in badges
    received_friend_requests, sent_friend_requests = get_friend_requests(current_user.user_id)
    num_received_requests = len(received_friend_requests)
    num_sent_requests = len(sent_friend_requests)
    num_total_requests = num_received_requests + num_sent_requests

    # Use a nested dictionary for session["current_user"] to store more than just user_id
    session["current_user"] = {
        "first_name": current_user.first_name,
        "user_id": current_user.user_id,
        "num_received_requests": num_received_requests,
        "num_sent_requests": num_sent_requests,
        "num_total_requests": num_total_requests
    }

    return jsonify({
        "user_id": current_user.user_id,
        "username": current_user.username
    })

@app.route('/api/logout', methods=['POST'])
def logout_user():

    # Gets rid of session
    del session["current_user"]

    flash("You have successfully logged out.")

    return 200

# if you're logged in it will return info - current logged in user
@app.route('/api/@me')
def get_current_user():

    # if there is no session this will return None
    user_key = session.get("current_user")

    print(user_key)

    if not user_key:
        return jsonify({ "error": "Unauthorized"}), 401

    user = Users.query.filter_by(user_id=user_key["user_id"]).first()

    return jsonify({
        "id": user.user_id,
        "username": user.username,
        "first_name": user.first_name,
        "last_name": user.last_name
    }), 200
# ------------------------------------- USERS ROUTES ----------------------------------------

@app.route('/api/users', methods=['GET'])
def all_users():
    """ Shows all users from the DB """
    users = Users.query.all()
    
    result = users_schema.dump(users)

    # if no results...
    if result == []:
        return jsonify({ "error": "No Users Found"}), 204

    return jsonify({ "results": result })

# @app.route("/api/users/profile")
# def user_profile():
#     """ Show a specific user profile """
 

#     user_a_id = session["current_user"]["user_id"]

#     user_b_id = request.json["user_b"]
#     # Check connection status between user_a and user_b
#     friends, pending_request = is_friends_or_pending(user_a_id, user_b_id)

#     total_friends = len(get_friends(user_id).all())


# ------------------------------------- FRIENDS ROUTES ----------------------------------------

@app.route("/api/friends")
def show_friends_and_requests():
    """ Show friend requests and list of all friends """

    # This returns User objects for current user's friend requests
    received_friend_requests, sent_friend_requests = get_friend_requests(session["current_user"]["user_id"])

    # This returns a query for current user's friends (not User objects), but adding .all() to the end gets list of User objects
    friends = get_friends(session["current_user"]["user_id"]).all()

    # Parsing Data into ma
    received = users_schema.dump(received_friend_requests)

    sent = users_schema.dump(sent_friend_requests)

    all_friends = users_schema.dump(friends)

    return jsonify({ "received_friend_requests" : received,
                    "sent_friend_requests" : sent,
                    "friends" : all_friends })


@app.route('/api/friends/search', methods=['POST'])
def search_friends():
    """ Search for friends by username, first_name and last_name """

    username = request.json["username"]

    search_results = search(db.session.query(Users), username).all()

    # if user doesn't exist
    if search_results == []:
        return jsonify({ "error": "Couldn't find a user with that username"}), 204
    print(search_results)

    # parse unreadable python object into a json equilavent 
    result = users_schema.dump(search_results)

    print(result)

    return jsonify({ "results": result }), 200


@app.route("/api/add-friend", methods=["POST"])
def add_friend():
    """Send a friend request to another user."""

    # gets the user_id of the person sending friend request
    user_a_id = session["current_user"]["user_id"]

    # retrieves the other user_id of the other person within post request
    user_b_id = request.json["user_b_id"]

    # Check connection status between user_a and user_b
    is_friends, is_pending = is_friends_or_pending(user_a_id, user_b_id)

    if user_a_id == user_b_id:
        return "You cannot add yourself as a friend."
    elif is_friends:
        return "You are already friends."
    elif is_pending:
        return "Your friend request is pending."
    else:
        requested_connection = Connection(user_a_id=user_a_id,
                                          user_b_id=user_b_id,
                                          status="Requested")
        db.session.add(requested_connection)
        db.session.commit()

        return jsonify({ "results": f"{user_a_id} has sent a friend request to {user_b_id}" })

@app.route("/api/accept-friend")
def add_friends():
    """ Show friend requests and list of all friends """

    user_a_id = session["current_user"]["user_id"]

    # retrieves the other user_id of the other person within post request
    user_b_id = request.json["user_b_id"]

    friend_requests = is_friends_or_pending(user_a_id, user_b_id)

    print(is_friends_or_pending)

    friend_requests.status = "Accepted"

    db.session.commit()

    return "Added User as a Friend"
# ------------------------------------- POSTS ROUTES ---------------------------------------- #

@app.route('/api/posts', methods = ["POST", "GET"])
def create_post():
    if request.method == "POST":

        post_title = request.json['title']
        post_body = request.json['body']
        post_start_date = request.json['start_date']
        post_end_date = request.json['end_date']

        print(post_start_date, post_end_date)
        user_id = session["current_user"]["user_id"]

        def get_uuid():
            return uuid4().hex

        post_id = get_uuid()
        new_post = Posts(post_id = post_id,
                        post_title=post_title, 
                        post_body=post_body,
                        user_id = user_id,
                        event_start= post_start_date,
                        event_end = post_end_date)

        db.session.add(new_post)
        db.session.commit()

        invitees = request.json['invitees'] # not sure how this will come through as a list??

        for i in invitees:
            new_invite = Invites(event_a_id = post_id,
                                user_a_id = i)
            db.session.add(new_invite)
            db.session.commit()


        return jsonify({ "title": post_title, 
                        "body": post_body, 
                        "start_date": post_start_date,
                        "end_date": post_end_date,
                        "user_id": user_id })
    
    elif request.method == "GET":

        user_id = session["current_user"]["user_id"]

        # get shit from databse send it back
        post_by_user_id = Posts.query.filter_by(user_id=user_id).all()
        
        print(post_by_user_id)

        result = posts_schema.dump(post_by_user_id)

        if result == []:
            return jsonify({ "error": "Couldn't find a user with that username"}), 204

        print(result)

        return jsonify({"results": result})


@app.route('/api/events/:id')
def show_user_events():

    user_session = session.get("current_user")
    current_user_id = user_session["user_id"]

    my_events = db.session.query(Invites).with_entities(Invites.event_a_id).filter(Invites.user_a_id == current_user_id).all()

    return jsonify(my_events)

@app.route('/api/events/:id/rsvp', methods=["POST"])
def rsvp():

    user_session = session.get("current_user")
    current_user_id = user_session["user_id"]

    if request.json['going']:

        stmt = db.session.update(Invites).where(Invites.user_id == current_user_id).values(attending=True)

    #page reload here?
    return jsonify ({"success": True})

 


if __name__ == '__main__':
    
    PORT = int(environ.get("PORT", 5000))

    app.run(host="0.0.0.0", port=PORT, debug=True)