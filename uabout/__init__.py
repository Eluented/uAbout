from dotenv import load_dotenv
from os import environ

from flask import Flask, jsonify, request
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin 
from flask_bcrypt import Bcrypt

from .database.db_config import db, Users, Friends, Posts, Comments, Reactions

# ----------------------------------- Load environment variables -----------------------------------

load_dotenv()

database_uri = environ.get('DATABASE_URL')
if 'postgres' in database_uri:
    database_uri = database_uri.replace('postgres:', 'postgresql:')


# ----------------------------- Set up the app (with React) and Database ---------------------------

app = Flask(__name__, static_folder='client/build', static_url_path='')
CORS(app)

app.config.update(
    SQLALCHEMY_DATABASE_URI=database_uri,
    SQLALCHEMY_TRACK_MODIFICATIONS=environ.get('SQL_ALCHEMY_TRACK_MODIFICATIONS')
)

db.app = app
db.init_app(app)

bcrypt = Bcrypt(app)
# --------------------------------------- React Served -------------------------------------------

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

# ---------------------------------------- API ROUTES --------------------------------------------
@app.route('/api', methods=['GET'])
@cross_origin()
def index():
    return """
    <h1>Welcome to the Uabout API!</h1>
    <p>If you came here by mistake pleaese go back!</p>
    <button onclick="location.href = 'https://uabout.herokuapp.com/';"> Go Back! </button>
    """

@app.route('/api/register', methods=['POST'])
@cross_origin()
def register_user():
    # fetching form details
    first_name = request.json["first_name"]
    username = request.json["username"]
    email = request.json["email"]
    password = request.json["password"]
    phone_number = request.json["phone_number"]

    # checks for user in db - returns true if user exists
    user_exists = Users.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({ "error": "User alreadyd exits"}), 409

    # encrypts password
    hashed_password = bcrypt.generate_password_hash(password)

    new_user = Users(first_name=first_name, 
                    username=username, 
                    email=email, 
                    password=hashed_password, 
                    phone_number=phone_number)

    # add to database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "id": new_user.id,
        "username": new_user.username
    })


if __name__ == '__main__':
    app.run(debug=True)