from flask import Blueprint, request, render_template

main_routes = Blueprint("example", __name__)

@main_routes.route("/", methods=["GET", "POST"])
def index():

    if request.method == "GET":
        return render_template("index.html")
    else:
        return render_template("index.html")