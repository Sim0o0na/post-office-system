import hashlib
from flask import Response, render_template, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token
from flask_restplus import Namespace, Resource
from flask_login import login_user, current_user, logout_user, login_required
from werkzeug.utils import redirect
from server.data.models import User
from server.data.schemas import validate_user

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
        print(f'{username} => {password}')
        user = User.query.filter(User.username == username).first()

        if user:
            response = jsonify(message="User with this username/email already exists!")
            response.status_code = 400
            return response

        if username and password:
            user = User()
            user.username = username
            user.hashed_password = hash_pass(password)
            user.save()

        response = jsonify(message="User successfully registered!")
        response.status_code = 200
        return response

@api.route('/auth')
class Auth(Resource):
    def post(self):
        data = validate_user(request.get_json())
        if data['ok']:
            data = data['data']
            user = User.query.filter(User.username == data.username).first()

            hashed_input_pass = hash_pass(data['password'])
            if user and hashed_input_pass == user.hashed_password:
                access_token = create_access_token(identity=data)
                refresh_token = create_refresh_token(identity=data)
                user['token'] = access_token
                user['refresh'] = refresh_token
                return jsonify({'ok': True, 'data': user}), 200
            else:
                return jsonify({'ok': False, 'message': 'invalid username or password'}), 401
        else:
            return jsonify({'ok': False, 'message': 'Bad request parameters: {}'.format(data['message'])}), 400


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