from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import ValidationError

#TODO: would be cool to check if you are the user (for security fun)

def title_input(form, field):
    # Checking if username is already in use
    title = field.data.strip()
    if title:
        if len(title) < 1:
            raise ValidationError('Title cannot be empty nor whitespaces only')
        if len(title) > 30:
            raise ValidationError('Title cannot be more than 30 chars long')

def content_length(form, field):
    # Checking if username is already in use
    content = field.data
    if len(content) > 2500:
        # NOTE: CHECK THIS LATER!!!!
        raise ValidationError('Page content cannot be over 2500 chars! Go to next page')

class PageForm(FlaskForm):
    title = StringField('title', validators=[title_input])
    # NOTE: not sure what type this content field should be- might be text??
    content = StringField('content', validators=[content_length])
