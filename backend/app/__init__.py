from flask import Flask
from flask_cors import CORS

from app.config import Config
from app.extensions import db, jwt
from app.models import User
from app.routes.auth import auth_bp

from app.routes.transactions import transactions_bp


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(
    transactions_bp,
    url_prefix="/api/transactions"
    )
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    with app.app_context():
        db.create_all()

    @app.route("/")
    def home():
        return {
            "message": "FinTrack AI Backend Running 🚀"
        }

    return app