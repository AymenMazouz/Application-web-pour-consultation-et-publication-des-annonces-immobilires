import json
import re
import time

import requests
from bs4 import BeautifulSoup


lesPages = []
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
Date=''
# Send an HTTP request to the website and retrieve the HTML code
# =================================== La Fonction LinkAnnonce donne les liens de chaque page  ==========================
def LinkPage():
    global lesPages
    for page in range(1, 572):
        url = f"https://www.beytic.com/annonces-immobilieres/?_page={page}"
        lesPages.append(url)
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
    if "https://www.beytic.com/annonces-immobilieres/" in link['href']:
      x = x+1
      liens.append(link['href'])
 liens = list(set(liens))
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
    global Date
    html_code = requests.get(url).text

    # Parse the HTML code
    soup = BeautifulSoup(html_code, "html.parser")

    # Extract the data you want to scrape
    # =============================================================================
    prix = soup.find(class_="property__price-value").text
    lignes = prix.split('\n')
    prix = lignes[1]
    prix = str(prix).lstrip()
    # ==============================================================================
    TypeDuBien = soup.find(class_="property__info-item").text
    lignes = TypeDuBien.split('\n')
    TypeDuBien = lignes[2]
    TypeDuBien = str(TypeDuBien).lstrip()
    # ============================================================================
    surface = soup.find(text=re.compile("M².*"))
    lignes = surface.split('\n')
    a=len(lignes)
    if a > 2 :
     surface = lignes[a-3]
    elif lignes[a-1] != "":
     surface = lignes[a-1]
    elif lignes[a - 2] != "":
     surface = lignes[a - 2]
    else: surface = lignes[a]
    surface = str(surface).lstrip()
    if surface == "":
        surface = 'non mentioned'
    # =============================================================================
    Adresse = soup.find_all(class_="property__params-list")
    Adresse = Adresse[0].text
    lignes = Adresse.split('\n')
    Adresse = lignes[3]
    Adresse = str(Adresse).lstrip()
    # =============================================================================
    # ==============================================================================
    categorie = soup.find_all('a', class_="breadcrumbs__link")
    categorie = categorie[1].text
    lignes = categorie.split('\n')
    categorie = lignes[1]
    categorie = str(categorie).lstrip()
    if categorie == "VENTE":
        categorie = "vente"
    elif categorie == "LOCATION":
        categorie = "Location"
    elif categorie == "LOCATION SAISONNIÈRE":
        categorie = "Location pour vacances"
    # Local,Hangar,Usine,Immeuble,Terrain
    if TypeDuBien == "Bungalow":
        TypeDuBien = TypeDuBien
    elif TypeDuBien == "Villa":
        TypeDuBien = "Maison"
    elif TypeDuBien == "Niveau de villa":
        TypeDuBien = "Maison"
    elif TypeDuBien == "Carcasse":
        TypeDuBien = "Maison"
    elif TypeDuBien == "Appartement":
        TypeDuBien = "Appartement"
    elif TypeDuBien == "Local":
        TypeDuBien = "Commercial"
    elif TypeDuBien == "Hangar":
        TypeDuBien = "Commercial"
    elif TypeDuBien == "Usine":
        TypeDuBien = "Commercial"
    elif TypeDuBien == "Immeuble":
        TypeDuBien = "Commercial"

    TypeTerrain = soup.find_all(class_="property__params-list")
    TypeTerrain = TypeTerrain[0].text
    lignes = TypeTerrain.split('\n')
    TypeTerrain = lignes[8]
    TypeTerrain = str(TypeTerrain).lstrip()
    if "Terrain" in TypeTerrain:
        TypeDuBien = TypeTerrain
        Date = lignes[13]
        Date = str(Date).lstrip()
    # ===============================================================================
    if "Terrain" not in TypeTerrain:
        Date = soup.find_all(class_="property__params-list")
        Date = Date[0].text
        lignes = Date.split('\n')
        Date = lignes[8]
        Date = str(Date).lstrip()
    # =============================================================================
    Wilaya = soup.find(class_="mr-2").text
    lignes = Wilaya.split('\n')
    Wilaya = lignes[1]
    Wilaya = str(Wilaya).lstrip()
    Wilaya = re.sub(",", "", Wilaya)
    # ==============================================================================
    Commune = soup.find(class_="mr-4").text
    lignes = Commune.split('\n')
    Commune = lignes[1]
    Commune = str(Commune).lstrip()

    numbers = re.findall(r'\b\d+\b', url)
    ref = "".join([str(number) for number in numbers])
    # ===============================================================================
    Description = soup.find_all('p', style="white-space: pre-line")
    Description = Description[0].text
    # ===============================================================================
    pictrs = []
    images = soup.find_all('a', href=re.compile("/_uploads/.*"))
    if len(images) == 0:
        msgphoto = ' non ,IL ya pas de photo'
    else:

        for image in images:
            image = "https://www.beytic.com" + image["href"]
            pictrs.append(image)
        if len(pictrs) == 0:
            msgphoto = ' non ,IL ya pas de photo'
        else:
            msgphoto = 'oui, IL ya des photo'
    # ===============================================================================
    num = soup.find_all('div', id="phoneDiv", class_="tel")
    num = num[0].text
    lignes = num.split('\n')
    num = lignes[2]
    num = str(num).lstrip()
    # ===========================================================================================================
    Pays = 'Algereie'
    return 0
#===========================================================================================================
Traitement("https://www.beytic.com/annonces-immobilieres/46754-vente-appartement-bab-ezzouar-alger/")

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
    print(Description)
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
    print('la date :', Date)
    print('Les images : ')
    print(msgphoto,pictrs)
    print('Le lien est :', liens[cpa])
    print('=============================================================================================================')
    return




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
         'les Photos': pictrs,},
     'La Description ': Description,


 },
 # Open a file for writing
 with open('scrap.json', 'a') as f:
     # Write the data to the file in JSON format
     json.dump(Annonce, f, indent=4)
     return 0
#=======================================================================================================================
start_time = time.perf_counter()
LinkPage()
cpt = 0
for b in lesPages:
 LinkAnnonce(b)
 for i, element in enumerate(liens):
    print(i)
    if i == 5:
      break
      cpt = cpt + 1
      Traitement(element)
      Write(cpt)
#print('Vous avez scrapper ',cpt,'Annonces')
#end_time = time.perf_counter()
#duration = end_time - start_time
#print(f'Duration: {duration:.4f} seconds')
#6852

