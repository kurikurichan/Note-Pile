from app.models import db, User
from app.models.db import Notebook

# Adds a demo user, you can add other users here if you want
def seed_notebooks():
    first = Notebook(
        userId= 1, title="First Notebook")
    second = Notebook(
        userId= 1, title="Second Notebook")
    third = Notebook(
        userId= 1, title="Third Notebook")

    db.session.add(first)
    db.session.add(second)
    db.session.add(third)

    db.session.commit()




# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_notebooks():
    db.session.execute('TRUNCATE notebooks RESTART IDENTITY CASCADE;')
    db.session.commit()
