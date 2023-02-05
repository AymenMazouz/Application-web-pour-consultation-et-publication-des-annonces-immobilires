from main import app



userexemple ={'admin': True, 'family_name': 'CHALAL', 'given_name': 'Lyes', 'adresse': 'azazga', 'email': 'kl_chalal@esi.dz', 'numerpTlf': '0656691088', 'annonces': None, 'messagesEnvoyer': None, 'messagesRecu': None}
# pour chercher si l'utilisateur existe dans la base de donné sinon l'ajouter
def test_user_manager():
    response=app.test_client().post('/userManager',json=userexemple)
    assert response.status_code ==200
    assert response.data == {'existe': True} or {'existe': False}


# pour complter les info d'un utlisateur 
def test_user_info():
    response=app.test_client().post('/userinfo',json={'adresse': 'azazga', 'numerpTlf': '0656691088', 'EmailUser': 'kl_chalal@esi.dz'})
    assert response.status_code ==200
    print(response.json)
    assert response.json == {'done': True}
    

def test_admin_manager():
    response=app.test_client().post('/adminManager',json={'admin': True, 'family_name': 'CHALAL', 'given_name': 'Lyes', 'adresse': '', 'email': 'kl_chalal@esi.dz', 'numerpTlf': '', 'annonces': None, 'messagesEnvoyer': None, 'messagesRecu': None})
    assert response.status_code ==200
    print(response.json)
    assert response.json == {"type": True}


userexemple2 ={'admin': True, 'family_name': 'manil', 'given_name': 'diaf', 'adresse': 'adr', 'email': 'km_diaf@esi.dz', 'numerpTlf': '0756691078', 'annonces': None, 'messagesEnvoyer': None, 'messagesRecu': None}
# pour cree un autre user qui sera utliser pour test la messagerie
def test_user_manager():
    response=app.test_client().post('/userManager',json=userexemple2)
    assert response.status_code ==200
    assert response.data == {'existe': True} or {'existe': False}