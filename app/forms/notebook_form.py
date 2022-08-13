from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Length

class NotebookForm(FlaskForm):
    title = StringField('title', validators=[Length(0, 60, "Title must be between 0 and 60 characters")])
