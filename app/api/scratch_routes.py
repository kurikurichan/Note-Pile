from flask import Blueprint, jsonify, request
from ..models.db import db
from flask_login import login_required
from app.models.db import Scratch

scratch_routes = Blueprint('scratches', __name__)

# note - am gonna need the stuff in trash later but can prob just load that from the front end or w/e
# or can do it here, doesn't matter

# * GET /api/:userId/scratches - Get the scratch pad
@scratch_routes.route('/<int:userId>')
@login_required
def scratch(userId):
    scratch = Scratch.query.filter(Scratch.userId == userId)
    return scratch.to_dict()

# * PUT /api/:userId/:scratchId - update scratch pad contents@pages_routes.route('/<int:notebookId>')
@scratch_routes.route('/<int:scratchId>/<int:userId>', methods=["PUT"])
@login_required
def new_page(scratchId, userId):

    scratch = Scratch.query.get(scratchId)

    if userId == scratch.userId:
        scratch.content = request.json['content']

        db.session.commit()
        return scratch.to_dict()
    else:
        return jsonify({"error"})
