import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  WelcomePage,
  LandingPage,
  LoginPage,
  SearchFriendsPage,
  RegisterPage,
  NotFoundPage,
  FriendsPage,
  SearchResultsPage,
  CalendarPage,
  HomePage,
  ProfileSettingsPage,
} from "./pages";

import { allFriends, checkLogin, renderPosts } from "./reducers/mainSlice";
function App() {
  const dispatch = useDispatch()

  // gets results from the checkLogin function
  const loggedInCheck = useSelector(state => state.main.current_user);

  // checks if user is logged in
  useEffect(() => {
    dispatch(checkLogin());
    dispatch(renderPosts());
    dispatch(allFriends());
  }, []);


  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/allfriends" element={<FriendsPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/home" element={ loggedInCheck ? < HomePage/> : <Navigate to="/register" replace={true}  />} />
      <Route path="/profile" element={<ProfileSettingsPage />} />

      <Route path="/search">
        <Route path="/search" element={<SearchFriendsPage />} />
        <Route path=":username" element={<SearchResultsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
