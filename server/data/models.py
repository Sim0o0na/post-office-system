from flask_login import UserMixin
from mongoalchemy.document import Index

from .db_config import db


class User(UserMixin, db.Document):
    username = db.StringField(required=True)
    username_index = Index().ascending('username').unique()
    hashed_password = db.StringField(required=True)

    def get_id(self):
        return str(self.mongo_id)

    @staticmethod
    def find_by_username(username):
        return User.query.filter(User.username == username).first()

