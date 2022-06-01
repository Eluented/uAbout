from ..database.db import db

class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(500))
    email = db.Column(db.String(500))
    password = db.Column(db.String(300))
    phone = db.Column(db.String(300))

class Friendship(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))

