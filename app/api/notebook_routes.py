from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required

from app.forms import NotebookForm
from app.models.db import Notebook, Page

from ..models.db import db
from .auth_routes import validation_errors_to_error_messages

notebook_routes = Blueprint('notebooks', __name__)

# note - am gonna need the stuff in trash later but can prob just load that from the front end or w/e
# or can do it here, doesn't matter

# GET /api/notebooks/ - read all notebooks


@notebook_routes.route('/')
@login_required
def notebooks():
    notebooks = Notebook.query.filter(Notebook.userId == current_user.id).all()
    return {'notebooks': [notebook.to_dict() for notebook in notebooks]}

# POST /api/notebooks - make a new notebook


@notebook_routes.route('/', methods=["POST"])
@login_required
def new_notebook():

    form = NotebookForm()
    userId = request.json["userId"]

    form['csrf_token'].data = request.cookies['csrf_token']

    if userId != current_user.id:
        return {'errors': ["user: You don't own this account!"]}, 405

    if form.validate_on_submit():

        new_notebook = Notebook(
            userId=userId,
            title=request.json["title"]
        )

        db.session.add(new_notebook)
        db.session.commit()
        db.session.refresh(new_notebook)

        new_page = Page(
            userId=userId,
            notebookId=new_notebook.id
        )

        db.session.add(new_page)
        db.session.commit()
        return new_notebook.to_dict()

    errz = validation_errors_to_error_messages(form.errors)
    return {'errors': errz}, 400


# PUT /api/notebooks/:notebookId - update a notebook title
@notebook_routes.route('/<int:notebookId>/', methods=["PUT"])
@login_required
def update_notebook(notebookId):

    form = NotebookForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    print("--------received put data: ", request.json)

    notebook = Notebook.query.get(notebookId)

    if notebook.userId != current_user.id:
        return {'errors': ["user: You don't own this notebook!"]}, 400

    if form.validate_on_submit():

        print("Form was validated")

        notebook.title = request.json["title"]
        db.session.commit()
        return notebook.to_dict()
    else:
        errz = validation_errors_to_error_messages(form.errors)
        return {'errors': errz}, 400

# DELETE /api/notebooks/:notebookId - delete single notebook


@notebook_routes.route('/<int:notebookId>/', methods=["DELETE"])
@login_required
def delete_notebook(notebookId):

    notebook = Notebook.query.get(notebookId)

    if notebook.userId == current_user.id:
        db.session.delete(notebook)
        db.session.commit()
        return jsonify(notebookId)
    else:
        return {'errors': ["user: You are unauthorized"]}, 405
