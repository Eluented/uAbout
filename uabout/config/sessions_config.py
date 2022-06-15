from dotenv import load_dotenv
from os import environ
from datetime import timedelta
from .db_config import db

load_dotenv()

class SQLAlchemySessionsConfig:
    SECRET_KEY = environ["SECRET_KEY"]
    SESSION_USE_SIGNER = True # uses a secret key
    SESSION_SQLALCHEMY_TABLE = 'sessions' # makes table called sessions
    
    SESSION_SQLALCHEMY = db

    SESSION_COOKIE_HTTPONLY = False
    SESSION_TYPE = "sqlalchemy"
    SESSION_PERMANENT = False
    SESSION_COOKIE_SECURE = False

    PERMANENT_SESSION_LIFETIME = timedelta(hours=1)