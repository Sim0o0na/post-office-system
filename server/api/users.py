import hashlib

from flask import Response, render_template, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token
from flask_jwt_extended import (jwt_required, get_raw_jwt)
from flask_login import login_user, logout_user
from flask_restplus import Namespace, Resource

from server.data.models import User, RevokedTokenModel
from server.data.schemas import validate_user

api = Namespace('users', description='Users related operations')


@api.route('/login')
class Login(Resource):
    def post(self):
        data = request.form
        username = data['username']
        password = data['password']
        user = User.query.filter(User.username == username).first()
        if user:
            hashed_input_pass = hash_pass(password)
            if hashed_input_pass == user.hashed_password:
                login_user(user)
                access_token = create_access_token(identity=data['username'])
                refresh_token = create_refresh_token(identity=data['username'])
                return jsonify(status=200, access_token=access_token, refresh_token=refresh_token)
        else:
            return jsonify(message="User with this username doesn't exist!", status=400)


@api.route('/register')
class Register(Resource):
    def get(self):
        return Response(render_template('register.html'), mimetype="text/html")

    @staticmethod
    def post():
        data = request.form
        username = data['username'].strip()
        password = data['password'].strip()
        print(f'{username} => {password}')

        if password != data['confirmPassword']:
            response = jsonify(message="Passwords do not match!", status=400)
            response.status_code = 400
            return response

        user = User.query.filter(User.username == username).first()

        if user:
            response = jsonify(message="User with this username/email already exists!", status=400)
            return response

        if username and password:
            user = User()
            user.username = username
            user.hashed_password = hash_pass(password)
            user.email = data['email']
            user.first_name = data['firstName']
            user.last_name = data['lastName']
            user.save()

        response = jsonify(message="User successfully registered!", status=200)
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
    @jwt_required
    def post(self):
        jti = get_raw_jwt()['jti']
        logout_user()
        try:
            revoked_token = RevokedTokenModel(jti=jti)
            revoked_token.add()
            return jsonify(message='Access token has been revoked', status=200)
        except:
            return jsonify(message='Something went wrong', status=500)


@api.route('/profile')
class Profile(Resource):
    @jwt_required
    def get(self):
        return {
            'answer': 42
        }

def hash_pass(password):
    if password is None:
        raise ValueError
    return hashlib.sha512(password.encode('utf8')).hexdigest()