import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  WelcomePage,
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
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/calendar" element={loggedInCheck ? < CalendarPage/> : <Navigate to="/" replace={true}  />} />
      <Route path="/home" element={ loggedInCheck ? < HomePage/> : <Navigate to="/" replace={true}  />} />
      <Route path="/profile" element={loggedInCheck ? < ProfileSettingsPage/> : <Navigate to="/" replace={true}  />} />
      <Route path="/allfriends" element={loggedInCheck ? <FriendsPage/> : <Navigate to="/" replace={true}  />}  />
      <Route path="/calendar" element={loggedInCheck ? <CalendarPage /> : <Navigate to="/" replace={true}  />} />
      <Route path="/search">
        <Route path="/search" element={loggedInCheck ? < SearchFriendsPage/> : <Navigate to="/" replace={true}  />} />
        <Route path=":username" element={loggedInCheck ? < SearchResultsPage/> : <Navigate to="/" replace={true}  />} />
      </Route>
    </Routes>
  );
}

export default App;
