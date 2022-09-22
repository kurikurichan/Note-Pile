from .db import db
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    photo = db.Column(db.String(215), nullable=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    scratch = db.Column(db.Text, default="", nullable=True)

    notebooks = relationship("Notebook", back_populates="user", cascade= "all, delete")
    pages = relationship("Page", back_populates="user", cascade= "all, delete")
    # scratch = relationship("Scratch", back_populates="user", cascade= "all, delete")

    # automatically create a scratch table
    # def __init__(self, **kwargs):
    #     super(User, self).__init__(**kwargs)
    #     self.scratch.append(Scratch(userId=self.id))


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'scratch': self.scratch
        }
