import pytest


# ---------------------------------------- API ROUTES --------------------------------------------
def test_index(api):
    res = api.get('/api')

    assert len(res.text) > 0
    assert res.status_code == 200
    assert res.status == '200 OK'


# --------------------------------------- AUTH ROUTES --------------------------------------------
def test_register_user(api):
    res = api.post('/api/register')

    assert len(res.text) > 0
    assert res.status_code == 400
    assert res.status == '400 BAD REQUEST'


def test_login_user(api):
    res = api.post('/api/login')

    assert len(res.text) > 0
    assert res.status_code == 400
    assert res.status == '400 BAD REQUEST'


def test_logout_user(api):
    res = api.post('/api/logout')

    assert len(res.text) > 0
    assert res.status_code == 500
    assert res.status == '500 INTERNAL SERVER ERROR'


def test_get_current_user(api):
    res = api.get('/api/@me')

    assert len(res.text) > 0
    assert res.status_code == 401
    assert res.status == '401 UNAUTHORIZED'


def test_search_friends(api):
    res = api.post('/api/friends')

    assert len(res.text) > 0
    assert res.status_code == 400
    assert res.status == '400 BAD REQUEST'


# --------------------------------------- db_config ----------------------------------------------
