import pytest
from .__init__ import app
from uabout.config.db_config import get_uuid

# ----------------------------------- uuid -------------------------------------------------------


def test_uuid():
    rand = get_uuid()
    assert len(rand) > 0


# ----------------------------------- React Served on all 404 Routes -----------------------------


def test_serve(api):
    res = api.get('/err')

    assert len(res.text[0]) > 0
    assert len(res.text[1]) > 0
    assert len(res.text[2]) > 0
    assert len(res.text[3]) > 0
    assert len(res.text[4]) > 0
    assert len(res.text[5]) > 0
    assert res.status_code == 200
    assert res.status == '200 OK'


# ---------------------------------------- API ROUTES --------------------------------------------
def test_index(api):
    res = api.get('/api')

    assert len(res.text[0]) > 0
    assert len(res.text[1]) > 0
    assert len(res.text[2]) > 0
    assert len(res.text[3]) > 0
    assert len(res.text[4]) > 0
    assert len(res.text[5]) > 0
    assert res.status_code == 200
    assert res.status == '200 OK'
    assert b'Welcome to the Uabout API!' in res.data
    assert b'If you came here by mistake pleaese go back!' in res.data
    assert b'Go Back!' in res.data


# --------------------------------------- AUTH ROUTES --------------------------------------------
def test_register_user(api):
    res = api.post('/api/register')

    assert len(res.text[0]) > 0
    assert len(res.text[1]) > 0
    assert len(res.text[2]) > 0
    assert len(res.text[3]) > 0
    assert len(res.text[4]) > 0
    assert len(res.text[5]) > 0
    assert res.status_code == 400
    assert res.status == '400 BAD REQUEST'


def test_login_user(api):
    res = api.post('/api/login')

    assert len(res.text[0]) > 0
    assert len(res.text[1]) > 0
    assert len(res.text[2]) > 0
    assert len(res.text[3]) > 0
    assert len(res.text[4]) > 0
    assert len(res.text[5]) > 0
    assert res.status_code == 400
    assert res.status == '400 BAD REQUEST'


def test_logout_user(api):
    res = api.post('/api/logout')

    assert len(res.text[0]) > 0
    assert len(res.text[1]) > 0
    assert len(res.text[2]) > 0
    assert len(res.text[3]) > 0
    assert len(res.text[4]) > 0
    assert len(res.text[5]) > 0
    assert res.status_code == 500
    assert res.status == '500 INTERNAL SERVER ERROR'


# ------------------------------------- USERS ROUTES ------------------------------------------


def test_get_current_user(api):
    res = api.get('/api/@me')

    assert len(res.text[0]) > 0
    assert len(res.text[1]) > 0
    assert len(res.text[2]) > 0
    assert len(res.text[3]) > 0
    assert len(res.text[4]) > 0
    assert len(res.text[5]) > 0
    assert res.status_code == 401
    assert res.status == '401 UNAUTHORIZED'


# ------------------------------------- FRIENDS ROUTES ----------------------------------------


def test_show_friends_and_requests(api):
    res = api.get('/api/friends')

    assert len(res.text[0]) > 0
    assert len(res.text[1]) > 0
    assert len(res.text[2]) > 0
    assert len(res.text[3]) > 0
    assert len(res.text[4]) > 0
    assert len(res.text[5]) > 0
    assert res.status_code == 500
    assert res.status == '500 INTERNAL SERVER ERROR'


def test_search_friends(api):
    res = api.post('/api/friends/search')

    assert len(res.text[0]) > 0
    assert len(res.text[1]) > 0
    assert len(res.text[2]) > 0
    assert len(res.text[3]) > 0
    assert len(res.text[4]) > 0
    assert len(res.text[5]) > 0
    assert res.status_code == 400
    assert res.status == '400 BAD REQUEST'


def test_add_friend(api):
    res = api.post('/api/add-friend')

    assert len(res.text[0]) > 0
    assert len(res.text[1]) > 0
    assert len(res.text[2]) > 0
    assert len(res.text[3]) > 0
    assert len(res.text[4]) > 0
    assert len(res.text[5]) > 0
    assert res.status_code == 500
    assert res.status == '500 INTERNAL SERVER ERROR'


# ------------------------------------- POSTS ROUTES ---------------------------------------- #


def test_show_user_events(api):
    res = api.get('/api/events/:id')

    assert len(res.text[0]) > 0
    assert len(res.text[1]) > 0
    assert len(res.text[2]) > 0
    assert len(res.text[3]) > 0
    assert len(res.text[4]) > 0
    assert len(res.text[5]) > 0
    assert res.status_code == 500
    assert res.status == '500 INTERNAL SERVER ERROR'


def test_rsvp(api):
    res = api.post('/api/events/:id/rsvp')

    assert len(res.text[0]) > 0
    assert len(res.text[1]) > 0
    assert len(res.text[2]) > 0
    assert len(res.text[3]) > 0
    assert len(res.text[4]) > 0
    assert len(res.text[5]) > 0
    assert res.status_code == 500
    assert res.status == '500 INTERNAL SERVER ERROR'
