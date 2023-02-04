from main import app

def test_get_annonce_old():
    response= app.get_annonce_old().get('/annonceget')
    print()
test_get_annonce_old()    