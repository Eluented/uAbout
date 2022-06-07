import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchFriends, logoutUser, postEvent, getPosts, checkLoggedIn } from "../actions";

////////////////////////////////////////// SEND POST ////////////////////////////////////////////////
export const eventPost = createAsyncThunk(
  "reducers/eventPost",
  async (event) => {
    const res = await postEvent(event);

    return res;
  }
);
////////////////////////////////////////// GET POSTS ////////////////////////////////////////////////
export const renderPosts = createAsyncThunk(
  "reducers/renderPosts",
  async () => {
    const res = await getPosts();

    return res
  }
);

////////////////////////////////////////// SEARCH FRIENDS ////////////////////////////////////////////////
export const fetchUsers = createAsyncThunk(
  "reducers/fetchUsers",
  async (formData) => {
    const res = await searchFriends(formData);

    return res
  }
);

//////////////////////////////////////// CHECK IF LOGGED IN //////////////////////////////////////////////
export const checkLogin = createAsyncThunk(
  "reducers/checkLogin",
  async () => {
    const res = await checkLoggedIn();

    return res
  }
);

////////////////////////////////////////// LOGOUT USER ////////////////////////////////////////////////
export const logout = createAsyncThunk(
  "reducers/logoutUser",
  async () => {
    const res = await logoutUser();

    return res;
  }
);

export const mainSlice = createSlice({
  name: "main",
  initialState: {
    users: null,
    current_user: null,
    posts: null,
    status: "idle",
    // Errors
    searchError: null,
    loginError: null,
    logoutError: null,
    renderPostsError: null,
    checkLogin: null
  },
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.users =  action.payload;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = "failed";
      state.searchError = action.error.message;
    },
    [checkLogin.pending]: (state, action) => {
      state.status = "loading";
    },
    [checkLogin.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.current_user =  action.payload
    },
    [checkLogin.rejected]: (state, action) => {
      state.status = "failed";
      state.checkLogin = action.error.message;
    },
    [logout.pending]: (state, action) => {
      state.status = "loading";
    },
    [logout.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [logout.rejected]: (state, action) => {
      state.status = "failed";
      state.logoutError = action.error.message;
    },
    [renderPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [renderPosts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.posts =  action.payload
    },
    [renderPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.renderPostsError = action.error.message;
    }
  }
});

export const userSearchResult = state => state.main.users;

export const postsResult = state => state.main.posts;

export default mainSlice.reducer;