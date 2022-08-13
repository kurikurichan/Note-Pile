from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class NotebookForm(FlaskForm):
    title = StringField('title', validators=[DataRequired("Please provide a name for your notebook"), Length(0, 60, "Title must be between 0 and 60 characters")])
