from server.data.db_config import db
from server.config import settings

from flask_cors import CORS
from flask import Flask
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from server.data.models import User

app = Flask(__name__, template_folder='templates')
CORS(app)
login_manager = LoginManager()
login_manager.login_view = '/users/login'
jwt = JWTManager(app)


from server.api.api_config import api

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

def configure_app(flask_app):
    flask_app.config['SERVER_NAME'] = settings.FLASK_SERVER_NAME
    flask_app.config['MONGOALCHEMY_CONNECTION_STRING'] = settings.MONGOALCHEMY_DATABASE_URI + settings.MONGOALCHEMY_DATABASE
    flask_app.config['MONGOALCHEMY_DATABASE'] = settings.MONGOALCHEMY_DATABASE
    flask_app.config['SWAGGER_UI_DOC_EXPANSION'] = settings.RESTPLUS_SWAGGER_UI_DOC_EXPANSION
    flask_app.config['RESTPLUS_VALIDATE'] = settings.RESTPLUS_VALIDATE
    flask_app.config['RESTPLUS_MASK_SWAGGER'] = settings.RESTPLUS_MASK_SWAGGER
    flask_app.config['ERROR_404_HELP'] = settings.RESTPLUS_ERROR_404_HELP
    flask_app.config['JWT_SECRET_KEY'] = settings.JWT_SECRET
    flask_app.config['JWT_ACCESS_TOKEN_EXPIRES'] = settings.JWT_ACCESS_TOKEN_EXPIRES
    flask_app.secret_key = settings.FLASK_APP_SECRET


def initialize_app(flask_app):
    configure_app(flask_app)
    api.init_app(flask_app)
    db.init_app(flask_app)
    login_manager.init_app(flask_app)


def main():
    initialize_app(app)
    print('>>>>> Starting development server at http://{}/api/ <<<<<'.format(app.config['SERVER_NAME']))
    app.run(debug=settings.FLASK_DEBUG)


if __name__ == "__main__":
    main()
