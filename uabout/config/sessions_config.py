from dotenv import load_dotenv
from os import environ
from datetime import timedelta
from .db_config import db
import redis

load_dotenv()

class SQLAlchemySessionsConfig:
    SECRET_KEY = environ["SECRET_KEY"]
    SESSION_USE_SIGNER = True # uses a secret key
    SESSION_REDIS = redis.from_url(environ["REDIS_URL"] or "redis://127.0.0.1:6379")

    SESSION_PERMANENT = False
    SESSION_COOKIE_HTTPONLY = False
    SESSION_TYPE = "redis"
    SESSION_COOKIE_SECURE = False
    PERMANENT_SESSION_LIFETIME = timedelta(days=14)
