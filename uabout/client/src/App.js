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

import { checkLogin } from './reducers/mainSlice';

function App() {
  const dispatch = useDispatch()

  const username = useSelector(state => state.current_user);

  useEffect(() => {
    dispatch(checkLogin())
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
      <Route path="/home" element={ username ? < HomePage/> : <Navigate to="/login" replace={true}  />} />
      <Route path="/profile" element={<ProfileSettingsPage />} />

      <Route path="/search">
        <Route path="/search" element={<SearchFriendsPage />} />
        <Route path=":username" element={<SearchResultsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
