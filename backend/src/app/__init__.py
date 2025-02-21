from flask import Flask
from app.database import db
from flask_migrate import Migrate
from flask_cors import CORS
from app.routes import main
from dotenv import load_dotenv
import os

load_dotenv()

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    CORS(app)
    db.init_app(app)
    migrate = Migrate(app, db)

    app.register_blueprint(main)

    return app
