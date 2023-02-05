from extentions import db


# model de base de donnee 
class annonce(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(length=200), nullable=False)
    description = db.Column(db.String(length=5024), nullable=False)
    type = db.Column(db.String(length=80), nullable=False)
    categorie = db.Column(db.String(length=80), nullable=False)
    wilaya = db.Column(db.String(length=80), nullable=False)
    commune = db.Column(db.String(length=70), nullable=False)
    adresse = db.Column(db.String(length=250), nullable=False)
    prix = db.Column(db.String(length=150), nullable=False)
    surface = db.Column(db.String(length=50), nullable=False)
    longitude = db.Column(db.Integer(), nullable=False)
    latitude = db.Column(db.Integer(), nullable=False)
    images = db.Column(db.JSON)
    date = db.Column(db.DateTime())
    email = db.Column(db.String(length=100), nullable=False)

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

# modezl de la base de donne des utlisateur 
class users(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    admin = db.Column(db.Boolean(), default=False, nullable=False)
    nom = db.Column(db.String(length=50), nullable=False)
    prenom = db.Column(db.String(length=50), nullable=False)
    adresse = db.Column(db.String(length=150), nullable=False)
    email = db.Column(db.String(length=50), nullable=False)
    numerpTlf = db.Column(db.String(length=50), nullable=False)
    annonces = db.Column(db.JSON)
    messagesEnvoyer = db.Column(db.JSON)
    messagesRecu = db.Column(db.JSON)

    def long(self):
        return {
            'id': self.id,
            'admin': self.admin,
            'nom': self.nom,
            'prenom': self.prenom,
            'adresse': self.adresse,
            'email': self.email,
            'numerpTlf': self.numerpTlf,
            'annonces': self.annonces,  # liste des id
            'messagesEnvoyer': self.messagesEnvoyer,  # liste des msg
            'messagesRecu': self.messagesRecu,  # liste des msg
        }

# base de donne de la messagerie
class Emails(db.Model):
    __tablename__ = 'Emails'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(800), nullable=False)
    subject = db.Column(db.String(200), nullable=False)
    Utilisateur_id = db.Column(db.Integer, nullable=False)
    DeposeurAn_id = db.Column(db.Integer, nullable=False)
    annonce_id = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime())

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            'id': self.id,
            'subject': self.subject,
            'content': self.content,
            'Userid': self.Utilisateur_id,
            'deposid': self.DeposeurAn_id,
            'annonceid': self.annonce_id,
            'date': self.date,

        }