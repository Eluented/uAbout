from flask import Blueprint, request, render_template
from ..database.db import db
from ..models.schema import Listing

main_routes = Blueprint("example", __name__)

@main_routes.route("/", methods=["GET", "POST"])
def index():

    if request.method == "GET":
        users = User.query.all()
        return render_template("index.html", listings=users)
    else:

        return render_template("index.html")