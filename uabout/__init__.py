# Env Imports
from dotenv import load_dotenv
from os import environ

# Database Imports
from .config.db_config import db, Users, Posts, Comments, Reactions
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
    FLASK_ENV=environ.get('FLASK_ENV'),
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
        fields = ("first_name", 
                "last_name", 
                "username", 
                "email", 
                "phone_number") 

user_schema = UsersSchema()
users_schema = UsersSchema(many=True)

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
        return jsonify({ "error": "User already exits"}), 409
    

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
        "username": user.username
    }), 200

# shows all users from db
@app.route('/api/users', methods=['GET'])
def all_users():

    # gets all users from db
    users = Users.query.all()
    
    result = users_schema.dump(users)

    # if no results...
    if result == []:
        return jsonify({ "error": "No Users Found"}), 204

    return jsonify({ "results": result })

# ------------------------------------- FRIENDS ROUTES ----------------------------------------
@app.route('/api/friends', methods=['POST'])
def search_friends():
    username = request.json["username"]

    # find_user_by_username = Users.query.filter_by(username=username).all()

    # if user doesn't exist

    search_results = search(db.session.query(Users), username).all()
    
    print(search_results)
    # parse unreadable python object into a json equilavent 

    result = users_schema.dump(search_results)

    print(result)

    if result == []:
        return jsonify({ "error": "Couldn't find a user with that username"}), 204

    print(result)

    return jsonify({ "results": result }), 200

    

if __name__ == '__main__':
    
        PORT = int(environ.get("PORT", 5000))

        app.run(host="0.0.0.0", port=PORT, debug=True)