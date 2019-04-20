from flask_jwt_extended import jwt_refresh_token_required, get_jwt_identity, create_access_token
from flask_restplus import Resource


class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity=current_user)
        return {'access_token': access_token}