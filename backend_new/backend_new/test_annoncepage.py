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


# ce test fonctionne si seulement la fonction test_ajouter_annonce est executer avant test_get_annonce car on test si l'element est bien ajouter en l'affichant
# il se peut que ne fonction pas si on ajoute une autre annonce avant de test cette fonction car dans cette fonction one test si le premier element et == exemple_annonce
# donc pour que ce test fonction parfaitement veilllez executer test_ajouter_annonce() ensuite test_get_annonce() sans ajouter une autre annoce a la base de donnee entre l'execution de ses deux fonction 
def test_get_annonce():
    response= app.test_client().get('/annoncegetnew/1')
    assert response.status_code ==200
    assert b'title1' in response.data
    json_annonce=response.json['announces']
    json_annonce_first=json_annonce[0]
    assert "adresse1" == json_annonce_first['adresse']
    assert "title1" == json_annonce_first['title']
    assert "description1" == json_annonce_first['description']





# on test quand l'ulisateur envoie une requete recherche  pour chaque champs demander si on recoit le champs envoyer du front

recherche1={'search': 'description1', 'type': '', 'wilaya': '', 'commune': '', 'datedebut': '', 'datefin': ''}
def test_champ_recherche_champ1():
    response =app.test_client().post('/recherche',json=recherche1)
    assert response.status_code ==200
    assert recherche1 == response.json

# on test le resultat envoyer au front si il contient description1 demander par l'user dans la fonction precedente
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
  
#tester si on peut obtenier l'annoce du id ==1 ce test fonction seulment si l'annoce du id=1 existe dans la base de donne
# si ce test ne passe pas veuillez confirmer que la base de donné contient le id = 1
def test_getinfo():
    response =app.test_client().get('/infoAI/1')
    assert response.status_code ==200
    json_var=response.json['announces']
    json_var_oneAI=json_var[0]
    assert 1 == json_var_oneAI['id']


# on test si on peut avoir les annoce de kl_chalal@esi.dz
def test_get_my_annonce():
    response =app.test_client().post('/getmyannonce',json={'EmailUser': 'kl_chalal@esi.dz'})
    assert response.status_code ==200
    assert b'title1' in response.data
    assert b'description1' in response.data
    assert b'kl_chalal@esi.dz' in response.data
    


# ce test est fait pour annonce id =2 si ce test ne fonction pas veuillez verfie si le id existe dans la base de donne
# la base de donne ce trouve dans le fichier instance dans le dossier courant 
# def test_delete_annonce():
#     response = app.test_client().post("/delete/2")
#     assert response.status_code ==200    
#     assert response.json['delete']=='true'    
