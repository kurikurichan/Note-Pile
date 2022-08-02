from flask import Blueprint, jsonify
from flask_login import login_required
from app.models.db import Notebook

notebook_routes = Blueprint('notebooks', __name__)


@notebook_routes.route('/')
@login_required
def notebooks():
    notebooks = Notebook.query.all()
    return {'users': [user.to_dict() for user in users]}
