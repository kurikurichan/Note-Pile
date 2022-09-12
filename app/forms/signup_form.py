from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def password_len(form, field):
    # Checking if password length is at least 4
    password = field.data
    if len(password) < 5:
        raise ValidationError('Password should be at least 5 characters long.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired("Username is required"), username_exists])
    email = StringField('email', validators=[DataRequired("Email address is required"), user_exists, Email("Invalid email address")])
    password = StringField('password', validators=[DataRequired("Password is required"), password_len])
