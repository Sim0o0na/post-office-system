from flask import render_template, request, Response
from flask_restplus import Resource, Namespace

api = Namespace('home', description='Home related operations')


@api.route('/')
class Home(Resource):
    @api.produces('text/html')
    def get(self):
        return Response(render_template('home.html'), mimetype='text/html')

    def post(self):
        print(request.form["name"])
        print(request.form["pass"])

