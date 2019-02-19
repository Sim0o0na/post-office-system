# Flask settings
FLASK_SERVER_NAME = 'localhost:8888'
FLASK_DEBUG = True  # Do not use debug mode in production
FLASK_APP_SECRET = 'A1A2A3A4'

# Flask-Restplus settings
RESTPLUS_SWAGGER_UI_DOC_EXPANSION = 'list'
RESTPLUS_VALIDATE = True
RESTPLUS_MASK_SWAGGER = False
RESTPLUS_ERROR_404_HELP = False

# MongoAlchemy settings
MONGOALCHEMY_DATABASE_URI = 'mongodb://localhost:27017/'
MONGOALCHEMY_DATABASE = 'post_office_system'
MONGOALCHEMY_SERVER_AUTH = False

# JWT settings
JWT_SECRET = 'very-secret-str'