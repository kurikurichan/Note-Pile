from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import ValidationError, Length

#TODO: would be cool to check if you are the user (for security fun)

# def title_input(form, field):
#     # Checking if username is already in use
#     title = field.data.strip()
#     print("title from validator")
#     if len(title) < 1:
#         raise ValidationError('Title cannot be empty nor whitespaces only')

class NotebookForm(FlaskForm):
    title = StringField('title', validators=[Length(0, 30, "Title must be between 0 and 30 characters")])
