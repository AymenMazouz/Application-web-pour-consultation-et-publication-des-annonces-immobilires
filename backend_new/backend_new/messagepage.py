from flask import Blueprint,render_template
import json
from flask import Flask,render_template,request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import date
from datetime import datetime
from extentions import db
from model import annonce,users,Emails

messagepage=Blueprint("messagepage",__name__,static_folder="instance",template_folder="BACKEND_NEW")


# messagepage.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///BaseDedonnee.db'
# db=SQLAlchemy(messagepage)
cors = CORS(messagepage, resources={r"/*": {"origins": "*"}})


# class annonce(db.Model):
#     id=db.Column(db.Integer(),primary_key=True)
#     title= db.Column(db.String(length=200),nullable=False)
#     description = db.Column(db.String(length=5024), nullable=False)
#     type=db.Column(db.String(length=80), nullable=False)
#     categorie=db.Column(db.String(length=80), nullable=False)
#     wilaya=db.Column(db.String(length=80), nullable=False)
#     commune=db.Column(db.String(length=70), nullable=False)
#     adresse=db.Column(db.String(length=150), nullable=False)
#     prix=db.Column(db.String(length=150), nullable=False)
#     surface=db.Column(db.String(length=50), nullable=False)
#     longitude=db.Column(db.Integer(), nullable=False)
#     latitude=db.Column(db.Integer(), nullable=False)
#     images=db.Column(db.JSON)
#     date=db.Column(db.DateTime())
#     email=db.Column(db.String(length=100), nullable=False)
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
#     id=db.Column(db.Integer(),primary_key=True)
#     admin=db.Column(db.Boolean(),default=False, nullable=False)
#     nom=db.Column(db.String(length=50), nullable=False)
#     prenom=db.Column(db.String(length=50), nullable=False)
#     adresse=db.Column(db.String(length=150), nullable=False)
#     email=db.Column(db.String(length=50), nullable=False)
#     numerpTlf=db.Column(db.String(length=50), nullable=False)
#     annonces=db.Column(db.JSON)
#     messagesEnvoyer=db.Column(db.JSON)
#     messagesRecu=db.Column(db.JSON)

    
#     def long(self):
#         return {
#             'id': self.id,
#             'admin': self.admin,
#             'nom': self.nom,
#             'prenom': self.prenom,
#             'adresse': self.adresse,
#             'email': self.email,
#             'numerpTlf': self.numerpTlf,
#             'annonces': self.annonces , # liste des id
#             'messagesEnvoyer': self.messagesEnvoyer , # liste des msg   
#             'messagesRecu': self.messagesRecu , # liste des msg   
#         }
    
# class Emails(db.Model):
#     __tablename__ = 'Emails'
#     id=db.Column(db.Integer, primary_key=True)
#     content=db.Column(db.String(800),nullable=False)
#     subject=db.Column(db.String(200), nullable=False)
#     Utilisateur_id= db.Column(db.Integer, nullable=False)
#     DeposeurAn_id= db.Column(db.Integer, nullable=False)
#     annonce_id= db.Column(db.Integer, nullable=False)
#     date=db.Column(db.DateTime())
#     @property
#     def serialize(self):
#        """Return object data in easily serializable format"""
#        return {
#            'id'         : self.id,
#            'subject'     : self.subject,
#            'content'     : self.content,
#            'Userid'        : self.Utilisateur_id,
#            'deposid'      : self.DeposeurAn_id,
#            'annonceid':self.annonce_id,
#            'date':self.date,
           
#        }
@messagepage.route("/")
def hello_world():
    return jsonify({"message": "Hello World!"})



@messagepage.route('/emails', methods=['GET'])
def get_emails():
    emails = Emails.query.all()
    return jsonify(emails=[i.serialize for i in emails])
@messagepage.post('/getemails')
def get__emails():
    useremail =request.json
    
    user=users.query.filter(users.email== useremail['emailsender']).first()
    listmessage=user.messagesEnvoyer
    if((listmessage!=None)):
        if((user.messagesRecu !=None)):
            listmessage=listmessage+user.messagesRecu
    else:
        listmessage=user.messagesRecu
    print (listmessage,user.messagesEnvoyer,user.messagesRecu)   
    if((listmessage==None)):
        listmessage=[]


    emails = Emails.query.filter(Emails.id.in_(listmessage)).order_by(Emails.id.desc())
    return jsonify(emails=[i.serialize for i in emails])       
@messagepage.post('/message/<int:announce_id>')
def get_message(announce_id):
    sender =request.json
    user_sender=users.query.filter(users.email== sender['emailsender']).first()
    annonce_send=annonce.query.get(announce_id)
    user_reciver=users.query.filter(users.email== annonce_send.email).first()
    message=Emails(content=sender['content'],Utilisateur_id=user_sender.id,DeposeurAn_id=user_reciver.id,subject=sender['subject'],annonce_id=announce_id,date=date.today())
    db.session.add(message)
    db.session.commit()
    if(user_sender.messagesEnvoyer==None):
        user_sender.messagesEnvoyer=[message.id]
    else:
        user_sender.messagesEnvoyer=user_sender.messagesEnvoyer+[message.id ]
    if(user_reciver.messagesRecu==None):
        user_reciver.messagesRecu=[message.id]
    else:
        user_reciver.messagesRecu=user_reciver.messagesRecu+[message.id ] 
    db.session.commit()      
    
    emails = Emails.query.all()
    return jsonify(emails=[i.serialize for i in emails])      

    

    
