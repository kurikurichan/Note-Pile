from app.models import db, User
from app.models.db import Page

sample_content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

# Adds a demo user, you can add other users here if you want
def seed_pages():
    first = Page(
        userId= 1, notebookId= 1, title="Page 1", content= sample_content, trashed=False)
    second = Page(
        userId= 1, notebookId= 1, title="Page 2", content=sample_content, trashed=False)
    third = Page(
        userId= 1, notebookId= 1, title="Page 3", content=sample_content, trashed=False)
    trash1 = Page(
        userId= 1, notebookId= 1, title="whoops", content=sample_content, trashed=True)
    trash2 = Page(
        userId= 1, notebookId= 1, title="uh oh", content=sample_content, trashed=True)

    db.session.add(first)
    db.session.add(second)
    db.session.add(third)
    db.session.add(trash1)
    db.session.add(trash2)

    db.session.commit()




# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_pages():
    db.session.execute('TRUNCATE pages RESTART IDENTITY CASCADE;')
    db.session.commit()
