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
from model import annonce, users, Emails


annoncepage = Blueprint("annoncepage", __name__,
                        static_folder="instance", template_folder="BACKEND_NEW")

cors = CORS(annoncepage, resources={r"/*": {"origins": "*"}})


# ajouter une annoce a la base de donnee
@annoncepage.post('/annonce')
def ajouter_annonce():
    AIINFO = request.json
    print(AIINFO)
    AiInofoDb = annonce(title=AIINFO['title'], description=AIINFO['description'], type=AIINFO['type'], categorie=AIINFO['categorie'],
                        wilaya=AIINFO['wilaya'], commune=AIINFO['commune'], adresse=AIINFO['adresse'], prix=AIINFO['prix'],
                        surface=AIINFO['surface'], longitude=AIINFO['longitude'], latitude=AIINFO[
                            'latitude'], images=AIINFO['images'], date=date.today(),
                        email=AIINFO['EmailUser']
                        )
    print(AiInofoDb)
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
        print("user inexistant (annomalie car l'utilisateur doit s'authentifier avant d'ajouter une annonce)")
    db.session.commit()

    return ({"annonceAjouter": True})

# avoir tout les annoce (old version ) cette fontion n'est pas utliser
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

# recevoir les champs de recherche envoyer par l'utilisateur
@annoncepage.post('/recherche')
def champ_recherche():
    global champRecherche
    champRecherche = request.json
    print(champRecherche)
    return champRecherche

# envoyer les annonces recherche a l'utilisateur (c'est a dire au front)
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

# envoyer les info d'une annonces avec son id 
@annoncepage.get('/infoAI/<int:announce_id>')
def get_info_annonce(announce_id):
    annoces = annonce.query.get(announce_id)
    user_reciver = users.query.filter(users.email == annoces.email).first()

    return jsonify({'announces': [annoces.long()], 'nom': user_reciver.nom, 'prenom': user_reciver.prenom, 'adresse': user_reciver.adresse})

# cette fonction retourne les annonces d'un utlisateur


@annoncepage.post('/getmyannonce')
def get_my_annonce():
    userinfo = request.json
    userEx = users.query.filter(users.email == userinfo['EmailUser']).first()
    myannonce = userEx.annonces  # list des annonce de l'utilisateur
    annoces = db.session.query(annonce).filter(annonce.id.in_(myannonce)).all()
    return jsonify({'announces': [ann.long() for ann in annoces]})


# supprimer les annonces
@annoncepage.post('/delete/<int:announce_id>')
def delete_annonce(announce_id):
    try:
        annoncedel = annonce.query.get(announce_id)
        userinfo = users.query.filter(users.email == annoncedel.email).first()
        annoncelist = userinfo.annonces
        userinfo.annonces = []
        db.session.delete(annoncedel)
        db.session.commit()
        annoncelist.remove(announce_id)
        userinfo.annonces = annoncelist
        db.session.commit()
    except:
        print("erreur")
    return jsonify({'delete': 'true'})

