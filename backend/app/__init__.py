from flask import Flask, jsonify
from flask_cors import CORS


def create_app():
    app = Flask(__name__)

    # Enable CORS so React can communicate with Flask
    CORS(app)

    @app.route("/")
    def home():
        return jsonify({
            "message": "Welcome to FinTrack AI 🚀",
            "status": "Backend is running"
        })

    return app 