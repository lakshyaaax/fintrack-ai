from flask import Flask
from flask_cors import CORS

from app.config import Config
from app.extensions import db, jwt
from app.models import User
from app.routes.auth import auth_bp