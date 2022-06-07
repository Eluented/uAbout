import httpClient from "../httpClient";

const CREATE_POST_ACTION = "[Post Action] Create Post";

async function searchFriends(formData) {
  try {
    const resp = await httpClient.post(
      "https://uabout.herokuapp.com/api/friends/search",
      formData
    );
    // console.log(resp)
    return resp;
  } catch (e) {
    console.log(e);
  }
}

async function createPost(postData) {
  try {
    const resp = await httpClient.post(
      "https://uabout.herokuapp.com/api/posts",
      postData
    );
    return resp;
  } catch (e) {
    console.log(e);
  }
}

async function logoutUser() {
  try {
    const resp = await httpClient.post(
      "https://uabout.herokuapp.com/api/logout"
    );
    console.log(resp);
    return resp;
  } catch (e) {
    console.log(e);
  }
}

function createPostAction(postData) {
  return (dispatch) => {
    createPost(postData);
  };
}

export { searchFriends, logoutUser, createPostAction, createPost };
