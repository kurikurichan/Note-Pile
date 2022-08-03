from flask import Blueprint, jsonify, request
from ..models.db import db
from flask_login import login_required
from app.models.db import Notebook

notebook_routes = Blueprint('notebooks', __name__)

# note - am gonna need the stuff in trash later but can prob just load that from the front end or w/e
# or can do it here, doesn't matter

# GET /api/notebooks/ - read all notebooks
@notebook_routes.route('/')
@login_required
def notebooks():
    notebooks = Notebook.query.all()
    return {'notebooks': [notebook.to_dict() for notebook in notebooks]}

# POST /api/notebooks - make a new notebook
@notebook_routes.route('/', methods=["POST"])
@login_required
def new_notebook():

    new_notebook = Notebook(
        userId=request.json["userId"],
        title=request.json["title"]
    )

    db.session.add(new_notebook)
    db.session.commit()
    return new_notebook.to_dict()

# PUT /api/notebooks/:notebookId - update a notebook title
@notebook_routes.route('/<int:notebookId>', methods=["PUT"])
@login_required
def update_notebook(notebookId):

    notebook = Notebook.query.get(notebookId)

    # userId of person who submitted request
    userId = request.json["userId"]

    if userId == notebook.userId and notebook:
        notebook.title = request.json["title"]
        db.session.commit()
        return notebook.to_dict()
    else:
        return jsonify({"error"})

# DELETE /api/notebooks/:userId/:notebookId - delete single notebook
@notebook_routes.route('/<int:userId>/<int:notebookId>', methods=["DELETE"])
@login_required
def delete_notebook(userId, notebookId):

    notebook = Notebook.query.get(notebookId)

    if userId == notebook.userId and notebook:
        db.session.delete(notebook)
        db.session.commit()
        return jsonify(notebookId)
    else:
        return jsonify({"error"})
