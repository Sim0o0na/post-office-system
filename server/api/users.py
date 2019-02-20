import hashlib
from flask import Response, render_template, request, jsonify
from flask_restplus import Namespace, Resource, reqparse
from flask_login import login_user, current_user, logout_user, login_required
from werkzeug.utils import redirect
from server.data.models import User

api = Namespace('users', description='Users related operations')

parser = reqparse.RequestParser()
parser.add_argument('username', help = 'This field cannot be blank', required = True)
parser.add_argument('password', help = 'This field cannot be blank', required = True)

@api.route('/login')
class Login(Resource):
    def get(self):
        if current_user.is_authenticated:
            return redirect('/home')
        return Response(render_template('login.html'), mimetype="text/html")

    def post(self):
        data = parser.parse_args()
        user = User.find_by_username(username=data['username'])
        if user:
            hashed_input_pass = hash_pass(data['password'])
            if hashed_input_pass == user.hashed_password:
                login_user(user)
                return jsonify({'message': 'User logged in successfully!'})
        return jsonify({'message': 'User does not exist!'}, 500)


@api.route('/register')
class Register(Resource):
    def get(self):
        return Response(render_template('register.html'), mimetype="text/html")

    @staticmethod
    def post():
        data = parser.parse_args()
        username = data['username']
        password = data['password']
        user = User.find_by_username(username)
        if user:
            return jsonify({'message': f'User with username = {username} already exists!'}, 500)

        if username and password:
            user = User()
            user.username = username
            user.hashed_password = hash_pass(password)
            user.save()
            return jsonify({'message': f'User with username = {username} registered!'}, 200)
        else:
            return jsonify({'message': 'Please provide all information!'}, 500)


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