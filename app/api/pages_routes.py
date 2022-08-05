from flask import Blueprint, jsonify, request
from ..models.db import db
from flask_login import login_required, current_user
from app.models.db import Page
from app.forms import PageForm


pages_routes = Blueprint('pages', __name__)

# note - am gonna need the stuff in trash later but can prob just load that from the front end or w/e
# or can do it here, doesn't matter

# GET /api/pages/:userId/:notebookId - read all pages of a notebook (not trash ones)
@pages_routes.route('/<int:userId>/<int:notebookId>/')
@login_required
def pages(userId, notebookId):

    print("------------entered pages")

    if userId != current_user.id:
        print("WHOOPSIE")
        return {'errors': ["user: You are unauthorized."]}, 405

    pages = Page.query.filter(Page.trashed == False, Page.notebookId == notebookId).all()
    print("----------------------pages", pages)
    return {'pages': [page.to_dict() for page in pages]}

# GET/api/pages/trash - get all pages in trash
@pages_routes.route('/trash')
@login_required
def trash():
    trashed_pages = Page.query.filter(Page.trashed == True).all()
    return {'trash': [page.to_dict() for page in trashed_pages]}

# POST /api/pages/:notebookId - create a new page
@pages_routes.route('/<int:notebookId>/', methods=["POST"])
@login_required
def new_page(notebookId):

    new_page = Page(
        userId=request.json["userId"],
        notebookId=notebookId,
        title=request.json["title"],
        content=request.json["content"]
    )

    db.session.add(new_page)
    db.session.commit()
    return new_page.to_dict()

# PUT /api/pages/:pageId - update page contents
@pages_routes.route('/<int:pageId>/', methods=["PUT"])
@login_required
def update_page(pageId):

    page = Page.query.get(pageId)
    userId = request.json["userId"]


    if userId == page.userId:
        page.title = request.json["title"]
        page.content = request.json["content"]

        db.session.commit()
        return page.to_dict()
    else:
        return jsonify({"error"})

# PUT /api/pages/trash/:pageId - put page in trash
@pages_routes.route('/trash/<int:pageId>/', methods=["PUT"])
@login_required
def trash_page(pageId):

    page = Page.query.get(pageId)
    userId = request.json["userId"]


    if userId == page.userId:
        page.trashed = True

        db.session.commit()
        return page.to_dict()
    else:
        return jsonify({"error"})


# DELETE /api/pages/:userId/:pageId - delete page
@pages_routes.route('/<int:userId>/<int:pageId>/', methods=["DELETE"])
@login_required
def delete_page(userId, pageId):

    page = Page.query.get(pageId)

    if userId == page.userId and page:
        db.session.delete(page)
        db.session.commit()
        return jsonify(pageId)
    else:
        return jsonify({"error"})
