from flask import Blueprint, jsonify, request
from ..models.db import db
from flask_login import current_user, login_required
from app.models.db import Scratch

scratch_routes = Blueprint('scratches', __name__)

# * GET /api/:userId/scratches - Get the scratch pad
@scratch_routes.route('/<int:userId>/')
@login_required
def scratch(userId):

    if userId != current_user.id:
        print("WHOOPSIE")
        return {'errors': ["user: You are unauthorized."]}, 405

    scratch = Scratch.query.filter(Scratch.userId == userId).one();
    print("----- get scratch -----", scratch.id, scratch.content, scratch.to_dict())


    # return {'scratch': [scratch.to_dict()]}
    return scratch.to_dict()

# * PUT /api/:userId/:scratchId - update scratch pad contents@pages_routes.route('/<int:notebookId>')
@scratch_routes.route('/<int:userId>/', methods=["PUT"])
@login_required
def new_page(userId):

    if userId != current_user.id:
        print("WHOOPSIE")
        return {'errors': ["user: You are unauthorized."]}, 405

    scratch = Scratch.query.filter(Scratch.userId == userId).one()

    if userId == scratch.userId:
        scratch.content = request.json['content']
        print("----- edit scratch -----", scratch.id, scratch.content, scratch.to_dict())

        db.session.commit()
        return scratch.to_dict()
    else:
        return jsonify({"error"})
