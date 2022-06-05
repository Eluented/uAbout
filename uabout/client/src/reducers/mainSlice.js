import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchFriends, logoutUser } from "../actions";

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
    users: [],
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
      state.users = state.users.concat(action.payload);
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
    }
  }
});

export const users = state => state.main.users;

export default mainSlice;