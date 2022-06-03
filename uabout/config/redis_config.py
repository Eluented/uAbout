from dotenv import load_dotenv
import os
import redis

load_dotenv()

class RedisConfig:
    SECRET_KEY = os.environ["SECRET_KEY"]
    SQLALCHEMY_ECHO = True

    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True # uses a secret key
    SESSION_REDIS = redis.from_url(os.environ["REDIS_URL"])
    SESSION_COOKIE_SECURE = True
    