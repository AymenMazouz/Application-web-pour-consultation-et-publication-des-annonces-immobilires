from flask import Blueprint, render_template
import json
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import date
from datetime import datetime
# from main import db
from extentions import db
from model import annonce,users,Emails

userpage = Blueprint("userpage", __name__,
                     static_folder="instance", template_folder="BACKEND_NEW")


# userpage.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///BaseDedonnee.db'
# db = SQLAlchemy(userpage)
cors = CORS(userpage, resources={r"/*": {"origins": "*"}})


# class annonce(db.Model):
#     id = db.Column(db.Integer(), primary_key=True)
#     title = db.Column(db.String(length=200), nullable=False)
#     description = db.Column(db.String(length=5024), nullable=False)
#     type = db.Column(db.String(length=80), nullable=False)
#     categorie = db.Column(db.String(length=80), nullable=False)
#     wilaya = db.Column(db.String(length=80), nullable=False)
#     commune = db.Column(db.String(length=70), nullable=False)
#     adresse = db.Column(db.String(length=150), nullable=False)
#     prix = db.Column(db.String(length=150), nullable=False)
#     surface = db.Column(db.String(length=50), nullable=False)
#     longitude = db.Column(db.Integer(), nullable=False)
#     latitude = db.Column(db.Integer(), nullable=False)
#     images = db.Column(db.JSON)
#     date = db.Column(db.DateTime())
#     email = db.Column(db.String(length=100), nullable=False)

#     def long(self):
#         return {
#             'id': self.id,
#             'title': self.title,
#             'description': self.description,
#             'type': self.type,
#             'categorie': self.categorie,
#             'wilaya': self.wilaya,
#             'commune': self.commune,
#             'adresse': self.adresse,
#             'prix': self.prix,
#             'surface': self.surface,
#             'longitude':  self.longitude,
#             'latitude': self.latitude,
#             'images': self.images,
#             'date': self.date,
#             'email': self.email,
#         }


# class users(db.Model):
#     id = db.Column(db.Integer(), primary_key=True)
#     admin = db.Column(db.Boolean(), default=False, nullable=False)
#     nom = db.Column(db.String(length=50), nullable=False)
#     prenom = db.Column(db.String(length=50), nullable=False)
#     adresse = db.Column(db.String(length=150), nullable=False)
#     email = db.Column(db.String(length=50), nullable=False)
#     numerpTlf = db.Column(db.String(length=50), nullable=False)
#     annonces = db.Column(db.JSON)
#     messagesEnvoyer = db.Column(db.JSON)
#     messagesRecu = db.Column(db.JSON)

#     def long(self):
#         return {
#             'id': self.id,
#             'admin': self.admin,
#             'nom': self.nom,
#             'prenom': self.prenom,
#             'adresse': self.adresse,
#             'email': self.email,
#             'numerpTlf': self.numerpTlf,
#             'annonces': self.annonces,  # liste des id
#             'messagesEnvoyer': self.messagesEnvoyer,  # liste des msg
#             'messagesRecu': self.messagesRecu,  # liste des msg
#         }


# class Emails(db.Model):
#     __tablename__ = 'Emails'
#     id = db.Column(db.Integer, primary_key=True)
#     content = db.Column(db.String(800), nullable=False)
#     subject = db.Column(db.String(200), nullable=False)
#     Utilisateur_id = db.Column(db.Integer, nullable=False)
#     DeposeurAn_id = db.Column(db.Integer, nullable=False)
#     annonce_id = db.Column(db.Integer, nullable=False)
#     date = db.Column(db.DateTime())

#     @property
#     def serialize(self):
#         """Return object data in easily serializable format"""
#         return {
#             'id': self.id,
#             'subject': self.subject,
#             'content': self.content,
#             'Userid': self.Utilisateur_id,
#             'deposid': self.DeposeurAn_id,
#             'annonceid': self.annonce_id,
#             'date': self.date,

#         }


@userpage.post('/userManager')
def user_manager():
    user = request.json

    userinfo = users(admin=user['admin'], nom=user['family_name'], prenom=user['given_name'], adresse=user['adresse'], email=user['email'],
                     numerpTlf=user['numerpTlf'], annonces=user['annonces'], messagesRecu=user['messagesRecu'], messagesEnvoyer=user['messagesEnvoyer'])

    userEx = users.query.filter(users.email == userinfo.email).all()
    existe = True
    print(userEx)
    if (userEx == []):
        db.session.add(userinfo)
        db.session.commit()
        existe = False
    print(existe)
    return ({"existe": existe})


@userpage.post('/userinfo')
def user_info():
    user = request.json
    userEx = users.query.filter(users.email == user['EmailUser']).first()
    userEx.adresse = user['adresse']
    userEx.numerpTlf = user['numerpTlf']
    print(userEx)
    db.session.commit()
    return ({"done": True})


@userpage.post('/adminManager')
def admin_manager():
    user = request.json
    userinfo = users(admin=user['admin'], nom=user['family_name'], prenom=user['given_name'], adresse=user['adresse'], email=user['email'],
                     numerpTlf=user['numerpTlf'], annonces=user['annonces'], messagesRecu=user['messagesRecu'], messagesEnvoyer=user['messagesEnvoyer'])
    userEx = users.query.filter(users.email == userinfo.email).all()
    admin = False

    if (userEx != []):
        if (userEx[0].admin == True):
            admin = True

    print(admin)
    return ({"type": admin})


@userpage.route('/liseruser/<int:page>', methods=['GET'])
def liseruser(page):
    per_page = 10
    # posts = annonce.query.order_by(annonce.id.desc()).paginate(page=page, per_page=per_page,error_out=False)
    try:
        user_list = users.query.paginate(
            page=page, per_page=per_page, error_out=False)
    except:
        print("erreur")
    return jsonify({'users': [ann.long() for ann in user_list], 'postspre': user_list.has_prev, 'postssuiv': user_list.has_next, 'postspage': user_list.page})
############################################################################################################################
