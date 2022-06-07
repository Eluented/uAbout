import httpClient from '../httpClient'

async function postEvent(event) {
  try {
      const resp = await httpClient.post("https://uabout.herokuapp.com/api/posts", event)
      console.log(resp)
    return resp
  } catch (e) {
    console.log(e);
  }
};

async function searchFriends(formData) {
    try {
        const resp = await httpClient.post("https://uabout.herokuapp.com/api/friends/search", formData)
        // console.log(resp)
      return resp
    } catch (e) {
      console.log(e);
    }
};

async function logoutUser() {
    try {
        const resp = await httpClient.post("https://uabout.herokuapp.com/api/logout")
        console.log(resp)
      return resp
    } catch (e) {
      console.log(e);
    }
};



export { searchFriends, logoutUser, postEvent};