from flask import Blueprint,render_template
import json
from flask import Flask,render_template,request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import date
from datetime import datetime
import requests
from bs4 import BeautifulSoup
import re
import json
# from main import db
from extentions import db
from model import annonce,users,Emails
from apiflask import APIBlueprint

scrapingpage=APIBlueprint("scrapingpage",__name__,static_folder="instance",template_folder="BACKEND_NEW")



cors = CORS(scrapingpage, resources={r"/*": {"origins": "*"}})



#################################################################################################################################

# =================================== Les Variables   ==================================================================
result = ['http://www.annonce-algerie.com/AnnoncesImmobilier.asp?rech_order_by=31']
lesPages = ['http://www.annonce-algerie.com/AnnoncesImmobilier.asp?rech_order_by=31']
pag = ''
msgphoto = ''
liens = []
pictrs = []
images = []
image = ''
i = 1
Adresse = ''
Pays = ''
Wilaya = ''
Commune = ''
prix = ''
surface = ''
num=''
categorie = ''
TypeDuBien = ''
ref = ''
Description=''
#=======================================================================================================================

# =================================== La Fonction LinkAnnonce donne les liens de chaque page  ==========================
def LinkPage():
    global result
    page = requests.get("http://www.annonce-algerie.com/AnnoncesImmobilier.asp")
    soupi = BeautifulSoup(page.content, 'html.parser')
    links = soupi.find_all('a', href=True)
    for link in links:
        if "rech_typ_cli=&rech_order_by=31&rech_page_num=" in link['href']:
            Pag = "http://www.annonce-algerie.com/" + link['href']
            lesPages.append(Pag)
    result = list(set(lesPages)) #supprimer les doubles
    return 0
#=======================================================================================================================

# =================================== La Fonction LinkAnnonce donne les liens de chaque annonce dans la page UR ========
def LinkAnnonce(UR):
 global liens
 x = 0
 page = requests.get(UR)
 soupi = BeautifulSoup(page.content, 'html.parser')
 links = soupi.find_all('a', href=True)
 for link in links:
  if "DetailsAnnonceImmobilier" in link['href']:
   x = x+1
   link = "http://www.annonce-algerie.com/" + link['href']
   liens.append(link)
 return 0
#=======================================================================================================================
# =================================== La Fonction Traitement de l'annonce ==============================================
def Traitement(url):
    global Adresse
    global Pays
    global Wilaya
    global Commune
    global prix
    global surface
    global num
    global categorie
    global TypeDuBien
    global ref
    global images
    global image
    global pictrs
    global msgphoto
    global Description

    response = requests.get(url)
    # Parse the HTML content find_next_sibling
    soup = BeautifulSoup(response.text, 'html.parser')
    # ================    la liste des entetes                          ========================
    entetes = soup.find_all(class_="da_entete")
    # ================    la liste des entetes                          ========================

    # ================    la premiere entete                            ========================
    ent1 = entetes[0]
    # ================    la premiere entete                            ========================

    # ================    l’identifiant de l’annonce                    ========================
    ref = soup.find(text=re.compile("].*"))
    match = re.search(r"\[Réf:(\d+)\]", ref)
    if match:
        ref = match.group(1)
    # ================    l’identifiant de l’annonce                    ========================

    # ================    La catégorie de l’annonce et type du bien     ========================
    TypeDuBien = ""
    Adr = soup.find_all('td', class_='da_field_text', colspan='3')[0]
    a_tags = Adr.find_all('a')
    categorie = a_tags[1].text
    if categorie == "Vente":
        categorie = categorie
    elif categorie == "Echange":
        categorie = categorie
    elif categorie == "Location":
        categorie = categorie
    elif categorie == "Location pour vacances":
        categorie = categorie
    elif categorie == "Terrain":
        categorie = "Vente"
    elif categorie == "Bureaux & Commerces":
        categorie = "Location"
    elif categorie == "Partage":
        categorie = "Location"
    else: TypeDuBien = categorie
    if len(TypeDuBien) == 0:
        TypeDuBien = a_tags[2].text
    if TypeDuBien == "Terrain":
        TypeDuBien = TypeDuBien
    elif TypeDuBien == "Terrain Agricole":
        TypeDuBien = TypeDuBien
    elif TypeDuBien == "Terrain nu":
        TypeDuBien = TypeDuBien
    elif TypeDuBien == "Maisons":
        TypeDuBien = "Maison"
    elif TypeDuBien == "Surfaces":
        TypeDuBien = "Terrain"
    elif "Appart" in TypeDuBien:  # contient appart
        TypeDuBien = "Appartement"
    elif TypeDuBien == "Duplex":
        TypeDuBien = "Maison"
    else: TypeDuBien = TypeDuBien
    # ================    La catégorie de l’annonce et type du bien     ========================

    # ========================================     la Localisation    ==========================
    Adresse = ent1.next_sibling
    i = 1
    while i < 12:
        Adresse = Adresse.next_sibling
        i += 1
    Adresse = Adresse.find(class_="da_field_text")
    Adresse = Adresse.text
    Adr = soup.find_all('td', class_='da_field_text', colspan='3')[1]
    a_tags = Adr.find_all('a')
    Pays = a_tags[0].text
    Wilaya = a_tags[1].text
    Commune = a_tags[3].text
    # ========================================     la Localisation    ==========================

    # ========================================     Le PRIX            ==========================
    prix = soup.find(text=re.compile("Dinar Algèrien.*"))
    if prix == '':
        prix = 'non mentionne'
    else:
      lignes = prix.split('\n')
      prix = lignes[0]
      prix = str(prix)
    # ========================================     Le PRIX            ==========================

    # ========================================     La surface         ==========================
    surface = soup.find(text=re.compile("m².*"))
    if surface == '':
        surface = 'non mentionne'
    # ========================================     La surface         ==========================

    # ========================================     Les contacts       ==========================
    Contact = soup.find_all('span', class_='da_contact_value')
    num = list(Contact)
    long = len(num)
    if long == 0:
        num = 'non mentionne'
    else:
        num = list(Contact)[long - 1]
        num =num.text
        num = num.strip()
        num = num.replace(' ', '')
    # ========================================     Les contacts       ==========================

    # ========================================     La description     ==========================
    dernier = soup.find_all(text=re.compile("\r.*"))
    print(dernier)
    print(len(dernier))
    Description = soup.find_all('td', class_="da_field_text", colspan="3")
    tol = len(Description)
    Description = Description[tol - 1]
    dernier = soup.find_all(text=re.compile(".*[.,...].*"))
    if Description.find_all() == []:
        print(dernier[13])
        print('lvide')
    elif "Immobilier - Offres" in dernier[13]:
        print(dernier[14])
    else:
        print(dernier[12])
        print(dernier[13])
        print(dernier[14])
    print('L’identifiant de l’annonce : ', ref)
    print('==============================================================================================')

    #    Description = soup.find_all('td', class_="da_field_text", colspan="3")
 #   tol = len(Description)
  #  Description = Description[tol - 1].text
    # ========================================     La description     ==========================

    # ========================================     Les images         ==========================
    images = soup.find_all(src=re.compile("/upload2/.*"),id=re.compile("PhotoMin.*"))
    for image in images:
         image = "http://www.annonce-algerie.com" + image["src"]
         pictrs.append(image)
    if len(pictrs) == 0:
        msgphoto =' non ,IL ya pas de photo'
    else: msgphoto = 'oui, IL ya des photo'
    # ========================================     Les images         ==========================

    # ========================================     verification       ==========================
    if Adresse == surface:
        Adresse = 'nest pas mentionne veuillez consulter la description'
    # ========================================     verification       ==========================
    return 0
#=======================================================================================================================

# ======================================== La Fonction AFFICHAGE =======================================================
def affichage(cpa):
    print('========================================     AFFICHAGE ',cpa,'        ============================================================================================================ ')
    print('================L’identifiant de l’annonce========================')
    print('L’identifiant de l’annonce : ', ref)
    print('================La catégorie de l’annonce et type du bien========================')
    print('la catégorie : ', categorie)
    print('le type du bien : ', TypeDuBien)
    print('========================================')
    print('la surface est :', surface)
    print('=============== la description est : =========================')
    print( Description)
    print('========================================')
    print('========================================')
    print('le prix est :', prix)
    print('================Contact========================')
    print('le téléphone de l’annonceur :',num)
    print('le nom est :', '/')
    print('le prenom est :', '/')
    print('l''email est :', '/')
    print('l’adresse est :', Adresse)
    print('========================================')
    print('la localisation : ')
    print('l’Adresse : ', Adresse)
    print('le Pays : ', Pays)
    print('la Wilaya : ', Wilaya)
    print('la Commune : ', Commune)
    print('Les images : ')
    print(msgphoto,pictrs)
    print('========================================')
    return
#=======================================================================================================================

# =================================== La Fonction Write en JSON ========================================================
def Write (i):
 Annonce = {
     'L annonce numero':i,
    'ID': ref,
    'Categorie': categorie,
    'Type Du Bien': TypeDuBien,
    'La Surface': surface,
    'Le Prix': prix,
    'Les informations de contact': {
        'le nom': '/',
        'le prenom': '/',
        'l Adresse': Adresse,
        'l email': '/',
        'le telephone de lannonceur': num},
    ' La localisation': {
        'l Adresse': Adresse,
        'le Pays': Pays,
        'la Wilaya ': Wilaya,
        'la Commune': Commune},
     ' Les images': {
         'disponible': msgphoto,
         'les Photos':pictrs,},

 },
 # Open a file for writing
 with open('Data.json', 'a') as f:
     # Write the data to the file in JSON format
     json.dump(Annonce, f, indent=4)
     return 0
#=======================================================================================================================

# =================================== Le Programme Principal    ========================================================
def scarp():
    LinkPage()
    cpt = 0
    for element in result:
        LinkAnnonce(element)
    print(liens)
    print(len(liens))
    while cpt < 6:
        element = liens[cpt]
        Traitement(element)
        cpt = cpt + 1
    #for element in liens:
    #     cpt=cpt+1
    #     Traitement(element)
    #     affichage()
    print(cpt)
#========================================================================================================================

# pour lancer le scrapping
@scrapingpage.post('/scrap')
def admin_scrap():
    adminsend =request.json
    print(adminsend)
    nb=adminsend["nbscrap"]
    LinkPage()
    cpt = 0
    for element in result:
        LinkAnnonce(element)
    # print(liens)
    # print(len(liens))
    nbb=0
    try:
        nbb=int(nb)
    except:
        nbb=0    
    while cpt < nbb:
        element = liens[cpt]
        Traitement(element)
        try:
            newdescription = str(Description)
            AiInofoDb= annonce(title="ajouter avec du scrape",description=newdescription,type=TypeDuBien,categorie=categorie,
            wilaya=Wilaya,commune=Commune,adresse=Adresse,prix=prix,
            surface=surface,longitude=0,latitude=0,images=pictrs,date=date.today(),
            email="kl_chalal@esi.dz"
            )
            db.session.add(AiInofoDb)
            db.session.commit()
        except:
            print("erreur")
        cpt = cpt + 1
    print(cpt)
    return {"scrap":True}
    