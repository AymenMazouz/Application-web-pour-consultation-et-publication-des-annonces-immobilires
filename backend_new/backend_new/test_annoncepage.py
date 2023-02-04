from main import app
from datetime import date


# on peut pas vraiment test cette methode car il se peut que la base de donné soit vide donc elle retoune rien 
exemple_annonce={"title":"title1","description":"description1","type":"Maison","categorie":"Location","wilaya":"Tizi Ouzou","commune":"Azazga","adresse":"adresse1"
                 ,"prix":10,"latitude":0,"longitude":0,"surface":15,"images":["https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80"],"EmailUser":"kl_chalal@esi.dz"
                 }
def test_ajouter_annonce():
    response=app.test_client().post("/annonce",json=exemple_annonce)
    assert response.status_code ==200
    assert {'annonceAjouter': True} == response.json
    print(response.json)


# si cette fonction n'a pas fonction veut pas dire que elle ne marche pas car il se peut que sera tester avant d'ajouter l'annonces donc il faut la rexecuter pour confimer 
# car dans notre cas on ajout une annoces et on test si elle est lister par cette fonction
def test_get_annonce():
    response= app.test_client().get('/annoncegetnew/1')
    assert response.status_code ==200
    assert b'title1' in response.data
    print(response.json)

# on test quand l'ulisateur envoie une requete recherche  pour chaque champs demander si on recoit le champs envoyer du front

recherche1={'search': 'description1', 'type': '', 'wilaya': '', 'commune': '', 'datedebut': '', 'datefin': ''}
def test_champ_recherche_champ1():
    response =app.test_client().post('/recherche',json=recherche1)
    assert response.status_code ==200
    assert recherche1 == response.json

# on test le resultat envoiyer au front si il contient description 1 demader par l'user dans la fonction precedente
def test_send_recherche_champ1():
    response =app.test_client().get('/rechercheget')
    assert response.status_code ==200
    assert b'description1' in response.data

recherche2={'search': '', 'type': 'Maison', 'wilaya': '', 'commune': '', 'datedebut': '', 'datefin': ''}
recherche3={'search': '', 'type': '', 'wilaya': 'Tizi Ouzou', 'commune': '', 'datedebut': '', 'datefin': ''}
recherche4={'search': '', 'type': '', 'wilaya': 'Tizi Ouzou', 'commune': 'Azazga', 'datedebut': '', 'datefin': ''}
recherche5={'search': '', 'type': '', 'wilaya': '', 'commune': '', 'datedebut': '2010-05-01', 'datefin': ''}
recherche6={'search': '', 'type': '', 'wilaya': '', 'commune': '', 'datedebut': '', 'datefin': '2024-01-01'}    


# on a fait le meme travail que avant juste on a change les champs a chaque fois 
def test_champ_recherche_champ2():
    response =app.test_client().post('/recherche',json=recherche2)
    assert response.status_code ==200
    assert recherche2 == response.json
def test_send_recherche_champ2():
    response =app.test_client().get('/rechercheget')
    assert response.status_code ==200
    assert b'Maison' in response.data  




def test_champ_recherche_champ3():
    response =app.test_client().post('/recherche',json=recherche3)
    assert response.status_code ==200
    assert recherche3 == response.json

def test_send_recherche_champ3():
    response =app.test_client().get('/rechercheget')
    assert response.status_code ==200
    assert b'Tizi Ouzou' in response.data




def test_champ_recherche_champ4():
    response =app.test_client().post('/recherche',json=recherche4)
    assert response.status_code ==200
    assert recherche4 == response.json

def test_send_recherche_champ4():
    response =app.test_client().get('/rechercheget')
    assert response.status_code ==200
    assert b'Azazga' in response.data

def test_champ_recherche_champ5():
    response =app.test_client().post('/recherche',json=recherche5)
    assert response.status_code ==200
    assert recherche5 == response.json

def test_send_recherche_champ5():
    response =app.test_client().get('/rechercheget')
    assert response.status_code ==200
    assert b'title1' in response.data


def test_champ_recherche_champ6():
    response =app.test_client().post('/recherche',json=recherche6)
    assert response.status_code ==200
    assert recherche6 == response.json   

def test_send_recherche_champ6():
    response =app.test_client().get('/rechercheget')
    assert response.status_code ==200
    assert b'title1' in response.data                 
  
#on peut pas tester vraiment cette fonction car la base de donnee change donc on peux pas sibler un id pour voir si cette methode mous donne le resulat voulu 
# pour ce test fait pourle id =1 
def test_getinfo():
    response =app.test_client().get('/infoAI/1')
    assert response.status_code ==200
    print(response.json)
    # assert response.json.announces.id == 1
    # assert b''id': 1''

# test_getinfo()