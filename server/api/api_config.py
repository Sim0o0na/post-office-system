from flask_restplus import Api
from server.api.home import api as home_namespace
from server.api.users import api as users_namespace

api = Api(
    title='Post Office System',
    version='1.0',
    description='A description',
    # All API metadatas
)

api.add_namespace(home_namespace)
api.add_namespace(users_namespace)