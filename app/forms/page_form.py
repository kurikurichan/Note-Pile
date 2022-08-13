from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Length

class PageForm(FlaskForm):
    title = StringField('title', validators=[Length(0, 60, "Title must be between 0 and 60 characters")]);
    content = StringField('content', validators=[Length(0, 2500, "Title cannot be more than 2500 characters long")])
