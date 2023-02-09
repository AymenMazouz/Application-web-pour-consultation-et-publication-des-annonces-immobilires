from flask import Blueprint, render_template
import json
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import date
from datetime import datetime
# from main import db
from extentions import db
from model import annonce, users, Emails
from apiflask import APIBlueprint

userpage = APIBlueprint("userpage", __name__,
                     static_folder="instance", template_folder="BACKEND_NEW")
cors = CORS(userpage, resources={r"/*": {"origins": "*"}})


# pour chercher si l'utilisateur existe dans la base de donné sinon l'ajouter
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


# pour que le nouveau utlisateur remplis ses info adresse et numero de telephone
@userpage.post('/userinfo')
def user_info():
    user = request.json
    print(user)
    userEx = users.query.filter(users.email == user['EmailUser']).first()
    userEx.adresse = user['adresse']
    userEx.numerpTlf = user['numerpTlf']
    print(userEx)
    db.session.commit()
    return ({"done": True})


# pour test si un utlisateur est un admin
@userpage.post('/adminManager')
def admin_manager():
    user = request.json
    print(user)
    userinfo = users(admin=user['admin'], nom=user['family_name'], prenom=user['given_name'], adresse=user['adresse'], email=user['email'],
                     numerpTlf=user['numerpTlf'], annonces=user['annonces'], messagesRecu=user['messagesRecu'], messagesEnvoyer=user['messagesEnvoyer'])
    userEx = users.query.filter(users.email == userinfo.email).all()
    admin = False

    if (userEx != []):
        if (userEx[0].admin == True):
            admin = True
    return ({"type": admin})

# donne la liste des utilisateur au admine par page
@userpage.route('/liseruser/<int:page>', methods=['GET'])
def liseruser(page):
    per_page = 10
    # nobre de user par page
    try:
        user_list = users.query.paginate(
            page=page, per_page=per_page, error_out=False)
    except:
        print("erreur")
    return jsonify({'users': [ann.long() for ann in user_list], 'postspre': user_list.has_prev, 'postssuiv': user_list.has_next, 'postspage': user_list.page})
############################################################################################################################

@userpage.post('/getuserbyid/<int:id>')
def get_user_by_id(id):
    user=users.query.get(id)
    return jsonify({'email':user.email})


@userpage.post('/getuserby_emeail')
def get_user_by_id_new():
    user = request.json
    userEx = users.query.filter(users.email == user['EmailUser']).first()
    return jsonify({'id':userEx.id})
