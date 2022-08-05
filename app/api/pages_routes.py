from flask import Blueprint, jsonify, redirect, request
from ..models.db import db
from flask_login import login_required, current_user
from app.models.db import Page
from app.forms import PageForm
from .auth_routes import validation_errors_to_error_messages


pages_routes = Blueprint('pages', __name__)

# note - am gonna need the stuff in trash later but can prob just load that from the front end or w/e
# or can do it here, doesn't matter

# GET /api/pages/:userId/:notebookId - read all pages of a notebook (not trash ones)
@pages_routes.route('/<int:userId>/<int:notebookId>/')
@login_required
def pages(userId, notebookId):

    if userId != current_user.id:
        print("WHOOPSIE")
        return {'errors': ["user: You are unauthorized."]}, 405

    pages = Page.query.filter(Page.trashed == False, Page.notebookId == notebookId).all()
    return {'pages': [page.to_dict() for page in pages]}

# GET/api/pages/:userId/trash - get all pages in trash
@pages_routes.route('/<int:userId>/trash/')
@login_required
def trash(userId):

    if userId != current_user.id:
        print("----------------- ERROR in get trash")
        print("WHOOPSIE")
        return {'errors': ["user: You are unauthorized."]}, 405

    trashed_pages = Page.query.filter(Page.trashed == True).all()
    return {'trash': [page.to_dict() for page in trashed_pages]}

# POST /api/pages/:notebookId - create a new page
@pages_routes.route('/<int:notebookId>/', methods=["POST"])
@login_required
def new_page(notebookId):

    new_page = Page(
        userId=request.json["userId"],
        notebookId=notebookId
    )

    db.session.add(new_page)
    db.session.commit()
    return new_page.to_dict()

# PUT /api/pages/:pageId - update page contents
@pages_routes.route('/<int:pageId>/', methods=["PUT"])
@login_required
def update_page(pageId):

    form = PageForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    page = Page.query.get(pageId)

    # try to redirect an unauthorized user
    if page.userId != current_user.id:
        return redirect("https://note-pile.herokuapp.com/")

    # for a normal user
    if form.validate_on_submit():

        page.title = request.json["title"]
        page.content = request.json["content"]

        db.session.commit()
        return page.to_dict()
    else:
        errz = validation_errors_to_error_messages(form.errors)
        return {'errors': errz}, 400

# PUT /api/pages/trash/:pageId - CHANGE trashed status
@pages_routes.route('/trash/<int:pageId>/', methods=["PUT"])
@login_required
def trash_page(pageId):

    page = Page.query.get(pageId)

    if current_user.id == page.userId:
        page.trashed = request.json["trashed"]

        db.session.commit()
        return page.to_dict()
    else:
        return jsonify({"error"})


# DELETE /api/pages/:userId/:pageId - delete page
@pages_routes.route('/<int:userId>/<int:pageId>/', methods=["DELETE"])
@login_required
def delete_page(userId, pageId):

    page = Page.query.get(pageId)

    if userId == page.userId:
        db.session.delete(page)
        db.session.commit()
        return jsonify(pageId)
    else:
        return jsonify({"error"})
