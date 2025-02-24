from flask import Flask
from app.database import db
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv
from flask_mail import Mail
import os

load_dotenv()
mail = Mail()

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["MAIL_SERVER"] = os.getenv("MAIL_SERVER")
    app.config["MAIL_PORT"] = os.getenv("MAIL_PORT")
    app.config["MAIL_USE_TLS"] = False
    app.config["MAIL_USE_SSL"] = True
    app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME")
    app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")
    app.config["MAIL_DEFAULT_SENDER"] = os.getenv("MAIL_DEFAULT_SENDER")

    CORS(app)
    db.init_app(app)

    mail.init_app(app)
    migrate = Migrate(app, db)

    from .routes import main
    app.register_blueprint(main)

    return app
