from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# Classes (tables) will be in UPPERCASE here...
# But in the database the tables will be LOWERCASE

class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(300), nullable=False)
    phone = db.Column(db.String(200), nullable=False)

    # back-reference Posts class 
    # can use poster.name, poster.email for each post
    posts = db.relationship('Posts', backref='poster')

    # back-reference Friends class - one to many
    # can use friends.something idk?
    friends = db.relationship('Friends', backref='friends')

class Friends(db.Model):
    __tablename__ = 'friends'
    id = db.Column(db.Integer, primary_key=True)
    friend_request = db.Column(db.Integer, 
                              db.ForeignKey('users.id', ondelete='CASCADE', onupdate='CASCADE'), 
                              nullable=False)

    friend_accept = db.Column(db.Integer, 
                             db.ForeignKey('users.id', ondelete='CASCADE', onupdate='CASCADE'), 
                             nullable=False)

    # back-reference Users class
    # can use user.first_name idk - bidirectional - many to one
    user = db.relationship('Users', backref='user')

class Posts(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, 
                       db.ForeignKey('users.id', ondelete='CASCADE', onupdate='CASCADE'), 
                       nullable=False)
                       
    post_title = db.Column(db.String(255), nullable=False)
    post_body = db.Column(db.String(500), nullable=False)

    created_on = db.Column(db.DateTime, 
                          default=datetime.utcnow, 
                          nullable=False)

    updated_on = db.Column(db.DateTime, 
                          default=datetime.utcnow, 
                          onupdate=datetime.utcnow, 
                          nullable=False)

    # back-reference Comments class 
    # can use comments.comment, comments.comment for each post
    comments = db.relationship('Comments', backref='comments')

    # back-reference Reactions class 
    # can use reactions.user.first_name, comments.comment for each post
    reactions = db.relationship('Reactions', backref='reactions')

class Comments(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, 
                       db.ForeignKey('users.id', ondelete='CASCADE', onupdate='CASCADE'), 
                       nullable=False)
    post_id = db.Column(db.Integer, 
                       db.ForeignKey('posts.id', ondelete='CASCADE', onupdate='CASCADE'), 
                       nullable=False)

    comment = db.Column(db.String(100), nullable=False)

    created_on = db.Column(db.DateTime, 
                          default=datetime.utcnow, 
                          nullable=False)

    # back-reference Users class
    # can use user.first_name idk - bidirectional - many to one
    user = db.relationship('Users', backref='user')
    
class Reactions(db.Model):
    __tablename__ = 'reactions'
    id = db.Column(db.Integer, primary_key=True)
    count = db.Column(db.Integer, default=0)

    user_id = db.Column(db.Integer, 
                       db.ForeignKey('users.id', ondelete='CASCADE', onupdate='CASCADE'), 
                       nullable=False)
    post_id = db.Column(db.Integer, 
                       db.ForeignKey('posts.id', ondelete='CASCADE', onupdate='CASCADE'), 
                       nullable=False)

    # back-reference Users class
    # can use user.first_name idk - bidirectional - many to one
    user = db.relationship('Users', backref='user')
