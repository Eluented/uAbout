import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchFriends, logoutUser, postEvent, getPosts } from "../actions";

export const eventPost = createAsyncThunk(
  "reducers/eventPost",
  async (event) => {
    console.log(event)
    const res = await postEvent(event);
    return res;
  }
);

export const renderPosts = createAsyncThunk(
  "reducers/renderPosts",
  async () => {
    const res = await getPosts();
    return res;
  }
);

export const fetchUsers = createAsyncThunk(
  "reducers/fetchUsers",
  async (formData) => {
    const res = await searchFriends(formData);
    return res;
  }
);

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
    posts: null,
    status: "idle",
    searchError: null
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
    [logout.pending]: (state, action) => {
      state.status = "loading";
    },
    [logout.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [logout.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [renderPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [renderPosts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.posts = action.payload.results
    },
    [renderPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    }
  }
});

export const userSearchResult = state => state.main.users;

export const postsResult = state => state.main.posts;

export default mainSlice.reducer;