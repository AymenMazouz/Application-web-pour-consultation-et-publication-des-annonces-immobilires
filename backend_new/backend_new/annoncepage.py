from flask import Blueprint, render_template
import json
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import date
from datetime import datetime
import requests
from bs4 import BeautifulSoup
import re
import json
from extentions import db
from model import annonce,users,Emails


annoncepage = Blueprint("annoncepage", __name__,
                        static_folder="instance", template_folder="BACKEND_NEW")


# annoncepage.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///BaseDedonnee.db'
# db = SQLAlchemy(annoncepage)
cors = CORS(annoncepage, resources={r"/*": {"origins": "*"}})


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


@annoncepage.post('/annonce')
def ajouter_annonce():
    AIINFO = request.json
    AiInofoDb = annonce(title=AIINFO['title'], description=AIINFO['description'], type=AIINFO['type'], categorie=AIINFO['categorie'],
                        wilaya=AIINFO['wilaya'], commune=AIINFO['commune'], adresse=AIINFO['adresse'], prix=AIINFO['prix'],
                        surface=AIINFO['surface'], longitude=AIINFO['longitude'], latitude=AIINFO[
                            'latitude'], images=AIINFO['images'], date=date.today(),
                        email=AIINFO['EmailUser']
                        )

    db.session.add(AiInofoDb)
    db.session.commit()
    userannonce = users.query.filter(
        users.email == AIINFO['EmailUser']).first()
    try:
        if (userannonce.annonces == None):
            userannonce.annonces = [AiInofoDb.id]
        else:
            userannonce.annonces = userannonce.annonces+[AiInofoDb.id]
    except:
        print("user inexistant (annomalie car l'ulustateur doit s'authentifier avant d'ajouter une annonce)")        
    db.session.commit()

    return ({"annonceAjouter": True})


@annoncepage.get('/annonceget')
def get_annonce_old():
    annoces = annonce.query.order_by(annonce.id.desc()).all()
    return jsonify({'announces': [ann.long() for ann in annoces]})


# get annonce new version(avec pagination)
@annoncepage.route('/annoncegetnew/<int:page>', methods=['GET'])
def view(page):
    per_page = 10
    posts = annonce.query.order_by(annonce.id.desc()).paginate(
        page=page, per_page=per_page, error_out=False)
    return jsonify({'announces': [ann.long() for ann in posts], 'postspre': posts.has_prev, 'postssuiv': posts.has_next, 'postspage': posts.page})


champRecherche = {'search': '', 'type': '', 'wilaya': '',
                  'commune': '', 'datedebut': '', 'datefin': ''}


@annoncepage.post('/recherche')
def champ_recherche():
    global champRecherche
    champRecherche = request.json
    print(champRecherche)
    return champRecherche


@annoncepage.get('/rechercheget')
def send_recherche():
    annoces = annonce.query.filter(annonce.description.like(
        "%"+champRecherche.get("search")+'%')).all()
    if (champRecherche.get("type") != ''):
        annoces = [d for d in annoces if d.type in champRecherche.get("type")]
    if (champRecherche.get("wilaya") != ''):
        annoces = [
            d for d in annoces if d.wilaya in champRecherche.get("wilaya")]
    if (champRecherche.get("commune") != ''):
        annoces = [
            d for d in annoces if d.commune in champRecherche.get("commune")]
    if (champRecherche.get("datedebut") != ''):
        annoces = [d for d in annoces if d.date >= datetime.strptime(
            champRecherche.get("datedebut"), '%Y-%m-%d')]
    if (champRecherche.get("datefin") != ''):
        annoces = [d for d in annoces if d.date <= datetime.strptime(
            champRecherche.get("datefin"), '%Y-%m-%d')]
    return jsonify({'announces': [ann.long() for ann in annoces]})


@annoncepage.get('/infoAI/<int:announce_id>')
def getinfo(announce_id):
    annoces = annonce.query.get(announce_id)
    user_reciver = users.query.filter(users.email == annoces.email).first()

    return jsonify({'announces': [annoces.long()], 'nom': user_reciver.nom, 'prenom': user_reciver.prenom, 'adresse': user_reciver.adresse})


@annoncepage.post('/getmyannonce')
def get_my_annonce():
    userinfo = request.json
    userEx = users.query.filter(users.email == userinfo['EmailUser']).first()
    myannonce = userEx.annonces  # list des annonce de l'utilisateur
    annoces = db.session.query(annonce).filter(annonce.id.in_(myannonce)).all()
    return jsonify({'announces': [ann.long() for ann in annoces]})


@annoncepage.post('/delete/<int:announce_id>')
def delete_annonce(announce_id):
    annoncedel = annonce.query.get(announce_id)
    userinfo = users.query.filter(users.email == annoncedel.email).first()
    annoncelist = userinfo.annonces
    userinfo.annonces = []
    db.session.delete(annoncedel)
    db.session.commit()
    annoncelist.remove(announce_id)
    userinfo.annonces = annoncelist
    db.session.commit()
    return jsonify({'delete': 'true'})


