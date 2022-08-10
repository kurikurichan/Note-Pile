from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import ValidationError, Optional

def title_input(form, field):
    # Checking if username is already in use
    title = field.data.strip()
    if title is not None:
        if len(title) < 1:
            raise ValidationError('Title cannot be empty nor whitespaces only')
        if len(title) > 30:
            raise ValidationError('Title cannot be more than 30 chars long')
    else:
        return True

def content_length(form, field):
    # Checking if username is already in use
    content = field.data
    if content is not None:
        if len(content) > 2500:
            raise ValidationError('Page content cannot be over 2500 chars! Go to next page')
    else:
        return True

class PageForm(FlaskForm):
    title = StringField('title', validators=[Optional(), title_input])
    # NOTE: not sure what type this content field should be- might be text??
    content = StringField('content', validators=[Optional(), content_length])
