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

    assert len(res.text) > 0
    assert res.status_code == 200
    assert res.status == '200 OK'


def test_serve_fail(api):
    res = api.post('/err')

    assert len(res.text) > 0
    assert res.status_code == 405
    assert res.status == '405 METHOD NOT ALLOWED'


# ---------------------------------------- API ROUTES --------------------------------------------


def test_index(api):
    res = api.get('/api')

    assert len(res.text) > 0
    assert res.status_code == 200
    assert res.status == '200 OK'
    assert b'Welcome to the Uabout API!' in res.data
    assert b'If you came here by mistake pleaese go back!' in res.data
    assert b'Go Back!' in res.data


def test_index_fail(api):
    res = api.post('/api')

    assert len(res.text) > 0
    assert res.status_code == 405
    assert res.status == '405 METHOD NOT ALLOWED'


# --------------------------------------- AUTH ROUTES --------------------------------------------


def test_register_user(api):
    res = api.get('/api/register')

    assert len(res.text) > 0
    assert res.status == '200 OK'
    assert res.status_code == 200


def test_register_user_fail(api):
    res = api.post('/api/register')

    assert len(res.text) > 0
    assert res.status_code == 400
    assert res.status == '400 BAD REQUEST'


def test_login_user(api):
    res = api.get('/api/login')

    assert len(res.text) > 0
    assert res.status_code == 200
    assert res.status == '200 OK'


def test_login_user_fail(api):
    res = api.post('/api/login')

    assert len(res.text) > 0
    assert res.status_code == 400
    assert res.status == '400 BAD REQUEST'


def test_logout_user(api):
    res = api.get('/api/logout')

    assert len(res.text) > 0
    assert res.status_code == 200
    assert res.status == '200 OK'


def test_logout_user_fail(api):
    res = api.post('/api/logout')

    assert len(res.text) > 0
    assert res.status_code == 500
    assert res.status == '500 INTERNAL SERVER ERROR'


# ------------------------------------- USERS ROUTES ------------------------------------------


def test_get_current_user(api):
    res = api.post('/api/@me')

    assert len(res.text) > 0
    assert res.status_code == 405
    assert res.status == '405 METHOD NOT ALLOWED'


def test_get_current_user_fail(api):
    res = api.get('/api/@me')

    assert len(res.text) > 0
    assert res.status_code == 401
    assert res.status == '401 UNAUTHORIZED'


# ------------------------------------- FRIENDS ROUTES ----------------------------------------


def test_show_friends_and_requests(api):
    res = api.post('/api/friends')

    assert len(res.text) > 0
    assert res.status_code == 405
    assert res.status == '405 METHOD NOT ALLOWED'


def test_show_friends_and_requests_fail(api):
    res = api.get('/api/friends')

    assert len(res.text) > 0
    assert res.status_code == 500
    assert res.status == '500 INTERNAL SERVER ERROR'


def test_search_friends(api):
    res = api.get('/api/friends/search')

    assert len(res.text) > 0
    assert res.status_code == 200
    assert res.status == '200 OK'


def test_search_friends_fail(api):
    res = api.post('/api/friends/search')

    assert len(res.text) > 0
    assert res.status_code == 400
    assert res.status == '400 BAD REQUEST'


def test_add_friend(api):
    res = api.get('/api/add-friend')

    assert len(res.text) > 0
    assert res.status_code == 200
    assert res.status == '200 OK'


def test_add_friend_fail(api):
    res = api.post('/api/add-friend')

    assert len(res.text) > 0
    assert res.status_code == 500
    assert res.status == '500 INTERNAL SERVER ERROR'


def test_add_friends(api):
    res = api.post('/api/accept-friend')

    assert len(res.text) > 0
    assert res.status_code == 405
    assert res.status == '405 METHOD NOT ALLOWED'


def test_add_friends_fail(api):
    res = api.get('/api/accept-friend')

    assert len(res.text) > 0
    assert res.status_code == 500
    assert res.status == '500 INTERNAL SERVER ERROR'


def create_post(api):
    res = api.post('/api/posts')

    assert len(res.text) > 0
    assert res.status_code == 405
    assert res.status == '405 METHOD NOT ALLOWED'


def create_post_fail(api):
    res = api.get('/api/posts')

    assert len(res.text) > 0
    assert res.status_code == 500
    assert res.status == '500 INTERNAL SERVER ERROR'

# ------------------------------------- POSTS ROUTES ---------------------------------------- #


def test_show_user_events(api):
    res = api.post('/api/events/:id')

    assert len(res.text) > 0
    assert res.status_code == 405
    assert res.status == '405 METHOD NOT ALLOWED'


def test_show_user_events_fail(api):
    res = api.get('/api/events/:id')

    assert len(res.text) > 0
    assert res.status_code == 500
    assert res.status == '500 INTERNAL SERVER ERROR'


def test_rsvp(api):
    res = api.get('/api/events/:id/rsvp')

    assert len(res.text[0]) > 0
    assert len(res.text[1]) > 0
    assert len(res.text[2]) > 0
    assert len(res.text[3]) > 0
    assert len(res.text[4]) > 0
    assert len(res.text[5]) > 0
    assert len(res.text[6]) > 0
    assert len(res.text[7]) > 0
    assert len(res.text[8]) > 0
    assert len(res.text[9]) > 0
    assert len(res.text[10]) > 0
    assert len(res.text[10]) > 0
    assert len(res.text[11]) > 0
    assert len(res.text[12]) > 0
    assert len(res.text[13]) > 0
    assert len(res.text[14]) > 0
    assert len(res.text[15]) > 0
    assert len(res.text[16]) > 0
    assert len(res.text[17]) > 0
    assert len(res.text[18]) > 0
    assert len(res.text[19]) > 0
    assert len(res.text[20]) > 0
    assert len(res.text[21]) > 0
    assert len(res.text[22]) > 0
    assert len(res.text[23]) > 0
    assert len(res.text[24]) > 0
    assert len(res.text[25]) > 0
    assert len(res.text[26]) > 0
    assert len(res.text[27]) > 0
    assert len(res.text[28]) > 0
    assert len(res.text[29]) > 0
    assert len(res.text[30]) > 0
    assert len(res.text[31]) > 0
    assert len(res.text[32]) > 0
    assert len(res.text[33]) > 0
    assert len(res.text[34]) > 0
    assert len(res.text[35]) > 0
    assert len(res.text[36]) > 0
    assert len(res.text[37]) > 0
    assert len(res.text[38]) > 0
    assert len(res.text[39]) > 0
    assert len(res.text[40]) > 0
    assert len(res.text[41]) > 0
    assert len(res.text[42]) > 0
    assert len(res.text[43]) > 0
    assert len(res.text[44]) > 0
    assert len(res.text[45]) > 0
    assert len(res.text[46]) > 0
    assert len(res.text[47]) > 0
    assert len(res.text[48]) > 0
    assert len(res.text[49]) > 0
    assert len(res.text[50]) > 0
    assert len(res.text[51]) > 0
    assert len(res.text[52]) > 0
    assert len(res.text[53]) > 0
    assert len(res.text[54]) > 0
    assert len(res.text[55]) > 0
    assert len(res.text[56]) > 0
    assert len(res.text[57]) > 0
    assert len(res.text[58]) > 0
    assert len(res.text[59]) > 0
    assert len(res.text[60]) > 0
    assert len(res.text[61]) > 0
    assert len(res.text[62]) > 0
    assert len(res.text[63]) > 0
    assert len(res.text[64]) > 0
    assert len(res.text[65]) > 0
    assert len(res.text[66]) > 0
    assert len(res.text[67]) > 0
    assert len(res.text[68]) > 0
    assert len(res.text[69]) > 0
    assert len(res.text[70]) > 0
    assert len(res.text[71]) > 0
    assert len(res.text[72]) > 0
    assert len(res.text[73]) > 0
    assert len(res.text[74]) > 0
    assert len(res.text[75]) > 0
    assert len(res.text[76]) > 0
    assert len(res.text[77]) > 0
    assert len(res.text[78]) > 0
    assert len(res.text[79]) > 0
    assert len(res.text[80]) > 0
    assert len(res.text[81]) > 0
    assert len(res.text[82]) > 0
    assert len(res.text[83]) > 0
    assert len(res.text[84]) > 0
    assert len(res.text[85]) > 0
    assert len(res.text[86]) > 0
    assert len(res.text[87]) > 0
    assert len(res.text[88]) > 0
    assert len(res.text[89]) > 0
    assert len(res.text[90]) > 0
    assert len(res.text[91]) > 0
    assert len(res.text[92]) > 0
    assert len(res.text[93]) > 0
    assert len(res.text[94]) > 0
    assert len(res.text[95]) > 0
    assert len(res.text[96]) > 0
    assert len(res.text[97]) > 0
    assert len(res.text[98]) > 0
    assert len(res.text[99]) > 0
    assert len(res.text[100]) > 0

    assert res.status_code == 200
    assert res.status == '200 OK'


def test_rsvp_fail(api):
    res = api.post('/api/events/:id/rsvp')

    assert len(res.text[0]) > 0
    assert len(res.text[1]) > 0
    assert len(res.text[2]) > 0
    assert len(res.text[3]) > 0
    assert len(res.text[4]) > 0
    assert len(res.text[5]) > 0
    assert len(res.text[6]) > 0
    assert len(res.text[7]) > 0
    assert len(res.text[8]) > 0
    assert len(res.text[9]) > 0
    assert len(res.text[10]) > 0
    assert len(res.text[10]) > 0
    assert len(res.text[11]) > 0
    assert len(res.text[12]) > 0
    assert len(res.text[13]) > 0
    assert len(res.text[14]) > 0
    assert len(res.text[15]) > 0
    assert len(res.text[16]) > 0
    assert len(res.text[17]) > 0
    assert len(res.text[18]) > 0
    assert len(res.text[19]) > 0
    assert len(res.text[20]) > 0
    assert len(res.text[21]) > 0
    assert len(res.text[22]) > 0
    assert len(res.text[23]) > 0
    assert len(res.text[24]) > 0
    assert len(res.text[25]) > 0
    assert len(res.text[26]) > 0
    assert len(res.text[27]) > 0
    assert len(res.text[28]) > 0
    assert len(res.text[29]) > 0
    assert len(res.text[30]) > 0
    assert len(res.text[31]) > 0
    assert len(res.text[32]) > 0
    assert len(res.text[33]) > 0
    assert len(res.text[34]) > 0
    assert len(res.text[35]) > 0
    assert len(res.text[36]) > 0
    assert len(res.text[37]) > 0
    assert len(res.text[38]) > 0
    assert len(res.text[39]) > 0
    assert len(res.text[40]) > 0
    assert len(res.text[41]) > 0
    assert len(res.text[42]) > 0
    assert len(res.text[43]) > 0
    assert len(res.text[44]) > 0
    assert len(res.text[45]) > 0
    assert len(res.text[46]) > 0
    assert len(res.text[47]) > 0
    assert len(res.text[48]) > 0
    assert len(res.text[49]) > 0
    assert len(res.text[50]) > 0
    assert len(res.text[51]) > 0
    assert len(res.text[52]) > 0
    assert len(res.text[53]) > 0
    assert len(res.text[54]) > 0
    assert len(res.text[55]) > 0
    assert len(res.text[56]) > 0
    assert len(res.text[57]) > 0
    assert len(res.text[58]) > 0
    assert len(res.text[59]) > 0
    assert len(res.text[60]) > 0
    assert len(res.text[61]) > 0
    assert len(res.text[62]) > 0
    assert len(res.text[63]) > 0
    assert len(res.text[64]) > 0
    assert len(res.text[65]) > 0
    assert len(res.text[66]) > 0
    assert len(res.text[67]) > 0
    assert len(res.text[68]) > 0
    assert len(res.text[69]) > 0
    assert len(res.text[70]) > 0
    assert len(res.text[71]) > 0
    assert len(res.text[72]) > 0
    assert len(res.text[73]) > 0
    assert len(res.text[74]) > 0
    assert len(res.text[75]) > 0
    assert len(res.text[76]) > 0
    assert len(res.text[77]) > 0
    assert len(res.text[78]) > 0
    assert len(res.text[79]) > 0
    assert len(res.text[80]) > 0
    assert len(res.text[81]) > 0
    assert len(res.text[82]) > 0
    assert len(res.text[83]) > 0
    assert len(res.text[84]) > 0
    assert len(res.text[85]) > 0
    assert len(res.text[86]) > 0
    assert len(res.text[87]) > 0
    assert len(res.text[88]) > 0
    assert len(res.text[89]) > 0
    assert len(res.text[90]) > 0
    assert len(res.text[91]) > 0
    assert len(res.text[92]) > 0
    assert len(res.text[93]) > 0
    assert len(res.text[94]) > 0
    assert len(res.text[95]) > 0
    assert len(res.text[96]) > 0
    assert len(res.text[97]) > 0
    assert len(res.text[98]) > 0
    assert len(res.text[99]) > 0
    assert len(res.text[100]) > 0
    assert res.status_code == 500
    assert res.status == '500 INTERNAL SERVER ERROR'
