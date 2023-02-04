import json
from flask import Flask,render_template,request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import date
from datetime import datetime
from annoncepage import annoncepage
from messagepage import messagepage
from scrapingpage import scrapingpage
from userpage import userpage
from extentions import db


##########################################
import requests
from bs4 import BeautifulSoup
import re
import json

from model import annonce,users,Emails

######################################

app =Flask(__name__)
app.register_blueprint(annoncepage,url_prefix="")
app.register_blueprint(messagepage,url_prefix="")
app.register_blueprint(scrapingpage,url_prefix="")
app.register_blueprint(userpage,url_prefix="")

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///BaseDedonnee.db'
# db=SQLAlchemy(app)
db.init_app(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})






with app.app_context():
    db.create_all()

