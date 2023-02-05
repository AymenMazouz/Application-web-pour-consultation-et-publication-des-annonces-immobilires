from main import app


def test_admin_scrap():
    response=app.test_client().post('/scrap',json={'nbscrap': '2'})
    assert response.json == {"scrap":True}