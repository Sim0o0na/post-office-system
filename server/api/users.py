import hashlib
from flask import Response, render_template, request
from flask_restplus import Namespace, Resource
from flask_login import login_user, current_user, logout_user, login_required
from werkzeug.utils import redirect
from server.data.models import User

api = Namespace('users', description='Users related operations')


@api.route('/login')
class Login(Resource):
    def get(self):
        if current_user.is_authenticated:
            return redirect('/home')
        return Response(render_template('login.html'), mimetype="text/html")

    def post(self):
        username = get_request_param_value(request.form, 'username')
        password = get_request_param_value(request.form, 'password')
        user = User.query.filter(User.username == username).first()
        if user:
            hashed_input_pass = hash_pass(password)
            if hashed_input_pass == user.hashed_password:
                login_user(user)
                return Response(render_template('home.html'), mimetype="text/html")
        return Response(render_template('register.html'), mimetype="text/html")


@api.route('/register')
class Register(Resource):
    def get(self):
        return Response(render_template('register.html'), mimetype="text/html")

    @staticmethod
    def post():
        username = get_request_param_value(request.form, 'username').strip()
        password = get_request_param_value(request.form, 'password').strip()
        user = User.query.filter(User.username == username).first()
        if user:
            return redirect('/users/register')

        if username and password:
            user = User()
            user.username = username
            user.hashed_password = hash_pass(password)
            user.save()
            return redirect('/users/login')
        return Response(render_template('register.html'), mimetype="text/html")

@api.route("/logout")
class Logout(Resource):
    def post(self):
        logout_user()
        return redirect('home')


@api.route('/profile')
class Profile(Resource):
    @login_required
    def get(self):
        return Response(render_template('profile.html'), mimetype='text/html')




def get_request_param_value(request_data, param_name):
    return request_data[param_name]


def hash_pass(password):
    if password is None:
        raise ValueError
    return hashlib.sha512(password.encode('utf8')).hexdigest()