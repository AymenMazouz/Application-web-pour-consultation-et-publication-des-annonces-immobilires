import json
from flask import Flask,render_template,request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import date
from datetime import datetime

app =Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///BaseDedonnee.db'
db=SQLAlchemy(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

class annonce(db.Model):
    id=db.Column(db.Integer(),primary_key=True)
    title= db.Column(db.String(length=30),nullable=False)
    description = db.Column(db.String(length=1024), nullable=False)
    type=db.Column(db.String(length=50), nullable=False)
    categorie=db.Column(db.String(length=50), nullable=False)
    wilaya=db.Column(db.String(length=50), nullable=False)
    commune=db.Column(db.String(length=50), nullable=False)
    adresse=db.Column(db.String(length=50), nullable=False)
    prix=db.Column(db.String(length=50), nullable=False)
    surface=db.Column(db.String(length=50), nullable=False)
    longitude=db.Column(db.Integer(), nullable=False)
    latitude=db.Column(db.Integer(), nullable=False)
    images=db.Column(db.JSON)
    date=db.Column(db.DateTime())
    email=db.Column(db.String(length=100), nullable=False)
    def long(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'type': self.type,
            'categorie': self.categorie,
            'wilaya': self.wilaya,
            'commune': self.commune,
            'adresse': self.adresse,
            'prix': self.prix,
            'surface': self.surface,
            'longitude':  self.longitude,
            'latitude': self.latitude,
            'images': self.images,
            'date': self.date,
            'email': self.email,
        }

    


@app.post('/annonce')
def home_page():
    AIINFO =request.json
    AiInofoDb= annonce(title=AIINFO['title'],description=AIINFO['description'],type=AIINFO['type'],categorie=AIINFO['categorie'],
    wilaya=AIINFO['wilaya'],commune=AIINFO['commune'],adresse=AIINFO['adresse'],prix=AIINFO['prix'],
    surface=AIINFO['surface'],longitude=AIINFO['longitude'],latitude=AIINFO['latitude'],images=AIINFO['images'],date=date.today(),
    email=AIINFO['EmailUser']
    )
    
    db.session.add(AiInofoDb)
    db.session.commit()
    
    print(AiInofoDb.id)
    userannonce=users.query.filter(users.email== AIINFO['EmailUser']).first()
    if (userannonce.annonces== None):
        userannonce.annonces=[AiInofoDb.id] 
    else:
        userannonce.annonces=userannonce.annonces+[AiInofoDb.id]   
    db.session.commit()
    
    return ({"hello":"message"})

@app.get('/annonceget')
def lyes():
   annoces = annonce.query.order_by(annonce.id.desc()).all()
#    annoces = annonce.query.all()
   return jsonify({'announces':[ann.long() for ann in annoces]})


# get annonce new 
@app.route('/annoncegetnew/<int:page>',methods=['GET'])
def view(page):
    per_page = 10
    posts = annonce.query.paginate(page=page, per_page=per_page,error_out=False)
    print(posts.page)
    return jsonify({'announces':[ann.long() for ann in posts],'postspre':posts.has_prev,'postssuiv':posts.has_next,'postspage':posts.page}) 
    # return render_template('view.html',posts=posts)
    # return ({"hello":"message"})



champRecherche ={'search': '', 'type': '', 'wilaya': '', 'commune': '', 'datedebut': '', 'datefin': ''}
@app.post('/recherche')
def champ_recherche():
    global champRecherche
    champRecherche=request.json
    print(champRecherche)
    print(type(champRecherche))
    return champRecherche 
@app.get('/rechercheget')
def send_recherche():
    annoces = annonce.query.filter(annonce.description.like("%"+champRecherche.get("search")+'%')).all()
    if(champRecherche.get("type") != ''):
        annoces = [d for d in annoces if d.type in champRecherche.get("type")]
    if(champRecherche.get("wilaya") != ''):
        annoces = [d for d in annoces if d.wilaya in champRecherche.get("wilaya")]
    if(champRecherche.get("commune") != ''):
        annoces = [d for d in annoces if d.commune in champRecherche.get("commune")] 
    print(annoces[0].date > datetime.strptime(champRecherche.get("datedebut"), '%Y-%m-%d') )     
    if(champRecherche.get("datedebut") != ''):
        annoces = [d for d in annoces if d.date >= datetime.strptime(champRecherche.get("datedebut"), '%Y-%m-%d')]
    if(champRecherche.get("datefin") != ''):
        annoces = [d for d in annoces if d.date <= datetime.strptime(champRecherche.get("datefin"), '%Y-%m-%d')]          
    return jsonify({'announces':[ann.long() for ann in annoces]})    
@app.get('/infoAI/<int:announce_id>')
def getinfo(announce_id):
    
    annoces=annonce.query.filter(annonce.id==announce_id).all()
    print(annoces)
    return jsonify({'announces':[ann.long() for ann in annoces]})

@app.post('/getmyannonce')
def get_my_annonce():
   userinfo =request.json
   userEx=users.query.filter(users.email== userinfo['EmailUser']).first()
   myannonce= userEx.annonces #list des annonce de l'utilisateur
#    annoces = [d for d in annoces if d.commune in champRecherche.get("commune")] 
   annoces=db.session.query(annonce).filter(annonce.id.in_(myannonce)).all()
#    annoces = annonce.query.all()
   return jsonify({'announces':[ann.long() for ann in annoces]})
@app.post('/delete/<int:announce_id>')
def delete_annonce(announce_id):
    annoncedel = annonce.query.get(announce_id)
    userinfo=users.query.filter(users.email== annoncedel.email).first()
    annoncelist=userinfo.annonces
    userinfo.annonces=[]
    db.session.delete(annoncedel)
    db.session.commit()
    annoncelist.remove(announce_id)
    userinfo.annonces=annoncelist
    db.session.commit()
    # print(annoces)
    return jsonify({'delete':'true'})
    # db.session.add(annonce(title="lyesch1",type='dhgergerger',categorie='54544444444545',description='sk44444444gfsesefse')) 
    # db.session.commit()
    # users = annonce.query.all()
    # print(users)


###################################################################################################################################aymen
# 
# 

class users(db.Model):
    id=db.Column(db.Integer(),primary_key=True)
    admin=db.Column(db.Boolean(),default=False, nullable=False)
    nom=db.Column(db.String(length=50), nullable=False)
    prenom=db.Column(db.String(length=50), nullable=False)
    adresse=db.Column(db.String(length=150), nullable=False)
    email=db.Column(db.String(length=50), nullable=False)
    numerpTlf=db.Column(db.String(length=50), nullable=False)
    annonces=db.Column(db.JSON)
    messages=db.Column(db.JSON)

    
    def long(self):
        return {
            'id': self.id,
            'admin': self.admin,
            'nom': self.nom,
            'prenom': self.prenom,
            'adresse': self.adresse,
            'email': self.email,
            'numerpTlf': self.numerpTlf,
            'annonces': self.annonces , # liste des id
            'messages': self.messages , # liste des msg   
        }
@app.post('/userManager')
def user_manager():
    user =request.json
    userinfo= users(admin=user['admin'],nom=user['family_name'],prenom=user['given_name'],adresse=user['adresse'],email=user['email'],numerpTlf=user['numerpTlf'],annonces=user['annonces'],messages=user['messages'])
    userEx=users.query.filter(users.email== userinfo.email).all()
    if( userEx == []):
        db.session.add(userinfo)
        db.session.commit()
    return ({"login":True})     
@app.post('/adminManager')
def admin_manager():
    user =request.json
    userinfo= users(admin=user['admin'],nom=user['family_name'],prenom=user['given_name'],adresse=user['adresse'],email=user['email'],numerpTlf=user['numerpTlf'],annonces=user['annonces'],messages=user['messages'])
    userEx=users.query.filter(users.email== userinfo.email).all()
    admin=False
    
    
    if( userEx != []):
        if(userEx[0].admin==True):
            admin=True
     
    
    
    return ({"type":admin})            

with app.app_context():
    db.create_all()