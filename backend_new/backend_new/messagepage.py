from flask import Blueprint,render_template
import json
from flask import Flask,render_template,request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import date
from datetime import datetime
from extentions import db
from model import annonce,users,Emails
from apiflask import APIBlueprint

messagepage=APIBlueprint("messagepage",__name__,static_folder="instance",template_folder="BACKEND_NEW")


# messagepage.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///BaseDedonnee.db'
# db=SQLAlchemy(messagepage)
cors = CORS(messagepage, resources={r"/*": {"origins": "*"}})



@messagepage.route("/")
def hello_world():
    return jsonify({"message": "Hello World!"})


# retourn tout les email d'un utlisateur
@messagepage.route('/emails/<int:id>', methods=['GET'])
def get_emails_test(id):
    print(id)
    emails = Emails.query.filter((Emails.Utilisateur_id == id) | (Emails.DeposeurAn_id == id) )
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


# pour envoyer un meesage a vendeur  son annonce
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

@messagepage.route('/envoyer_messg', methods=['POST'])
def submit_email():

    email = request.form['contemail']

    new_email = Emails(email=email)

    db.session.add(new_email)

    db.session.commit()

    return {"message": "true"}   

    
