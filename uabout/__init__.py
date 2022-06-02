from dotenv import load_dotenv
from os import environ

from flask import Flask
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin 

from .database.db_config import db

# -------------------------- Load environment variables -------------------------------

load_dotenv()

database_uri = environ.get('DATABASE_URL')
if 'postgres' in database_uri:
    database_uri = database_uri.replace('postgres:', 'postgresql:')


# ----------------------------- Set up the app and Database ----------------------------------------

app = Flask(__name__, static_folder='client/build', static_url_path='')
CORS(app)

app.config.update(
    SQLALCHEMY_DATABASE_URI=database_uri,
    SQLALCHEMY_TRACK_MODIFICATIONS=environ.get('SQL_ALCHEMY_TRACK_MODIFICATIONS')
)

db.app = app
db.init_app(app)

# ----------------------------------------- main routes -------------------------------------------

@app.route('/api', methods=['GET'])
@cross_origin()
def index():
    return {
        "tutorial": "Flask React Heroku"
    }

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run()