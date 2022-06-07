from dataclasses import fields
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from uuid import uuid4

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_searchable import make_searchable
from sqlalchemy_utils.types import TSVectorType

db = SQLAlchemy()

Base = declarative_base()

make_searchable(db.metadata)

def get_uuid():
    return uuid4().hex


########################################## Models ###################################################

class Users(db.Model):
    """ Users of 4About """
    __tablename__ = 'users'

    user_id = db.Column(db.String(32), 
                  primary_key=True, 
                  unique=True, 
                  default=get_uuid)

    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(345), nullable=False, unique=True)
    password = db.Column(db.Text, nullable=False)
    phone_number = db.Column(db.String(200), nullable=False)

    image_url = db.Column(db.String(200), nullable=True)

    # Put name inside TSVectorType definition for it to be fulltext-indexed (searchable)
    search_vector = db.Column(TSVectorType('first_name', 'last_name', 'username'))

    posts = db.relationship('Posts', backref='poster')



class Connection(db.Model):
    """Connection between two users to establish a friendship and can see each other's info."""

    __tablename__ = "connections"

    connection_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_a_id = db.Column(db.String(32), db.ForeignKey('users.user_id'), nullable=False)
    user_b_id = db.Column(db.String(32), db.ForeignKey('users.user_id'), nullable=False)
    status = db.Column(db.String(100), nullable=False)

    # When both columns have a relationship with the same table, need to specify how
    # to handle multiple join paths in the square brackets of foreign_keys per below
    user_a = db.relationship("Users", foreign_keys=[user_a_id], backref="sent_connections")
    user_b = db.relationship("Users", foreign_keys=[user_b_id], backref="received_connections")

    def __repr__(self):
        """Provide helpful representation when printed."""

        return "<Connection connection_id=%s user_a_id=%s user_b_id=%s status=%s>" % (self.connection_id,
                                                                                      self.user_a_id,
                                                                                      self.user_b_id,
                                                                                      self.status)

class Posts(db.Model):
    __tablename__ = 'posts'
    post_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.String(32), 
                       db.ForeignKey('users.user_id', ondelete='CASCADE', onupdate='CASCADE'), 
                       nullable=False)
                       
    post_title = db.Column(db.String(255), nullable=False)
    post_body = db.Column(db.String(500), nullable=False)

    event_start = db.Column(db.String(355), 
                          nullable=False)

    event_end = db.Column(db.String(355), 
                          nullable=False)

    # back-reference Comments class 
    # can use comments.comment, comments.comment for each post
    comments = db.relationship('Comments', backref='comments')

    # back-reference Reactions class 
    # can use reactions.user.first_name, comments.comment for each post
    reactions = db.relationship('Reactions', backref='reactions')

class Invites(db.Model):
    __tablename__ = 'invites'
    invite_id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    event_a_id = db.Column(db.String(32), db.ForeignKey('posts.post_id'), nullable=False)
    user_a_id = db.Column(db.String(32), db.ForeignKey('users.user_id'), nullable=False)

    attending = db.Column(db.Boolean, default=False, nullable=False)

class Comments(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    user_id = db.Column(db.String(32), 
                       db.ForeignKey('users.user_id', ondelete='CASCADE', onupdate='CASCADE'), 
                       nullable=False)
    post_id = db.Column(db.Integer, 
                       db.ForeignKey('posts.post_id', ondelete='CASCADE', onupdate='CASCADE'), 
                       nullable=False)

    comment = db.Column(db.String(100), nullable=False)

    created_on = db.Column(db.DateTime, 
                          default=datetime.utcnow, 
                          nullable=False)

    # back-reference Users class
    # can use user.first_name idk - bidirectional - many to one
    user = db.relationship('Users', backref='comment_poster')
    
class Reactions(db.Model):
    __tablename__ = 'reactions'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    count = db.Column(db.Integer, default=0)

    user_id = db.Column(db.String(32), 
                       db.ForeignKey('users.user_id', ondelete='CASCADE', onupdate='CASCADE'), 
                       nullable=False)
    post_id = db.Column(db.Integer, 
                       db.ForeignKey('posts.post_id', ondelete='CASCADE', onupdate='CASCADE'), 
                       nullable=False)

    # back-reference Users class
    # can use user.first_name idk - bidirectional - many to one
    user = db.relationship('Users', backref='reaction_user')
