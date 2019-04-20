from flask_login import UserMixin
from mongoalchemy.document import Index
from .db_config import db


class User(UserMixin, db.Document):
    username = db.StringField(required=True)
    username_index = Index().ascending('username').unique()
    hashed_password = db.StringField(required=True)
    email = db.StringField()
    email_index = Index().ascending('email').unique()
    first_name = db.StringField()
    last_name = db.StringField()

    def get_id(self):
        return str(self.mongo_id)


class RevokedTokenModel(db.Document):
    jti = db.StringField()

    def add(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def is_jti_blacklisted(cls, jti):
        query = cls.query.filter(jti=jti).first()
        return bool(query)
