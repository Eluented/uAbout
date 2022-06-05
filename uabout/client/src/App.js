import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { 
  LandingPage, 
  LoginPage,
  SearchFriendsPage, 
  RegisterPage,
  NotFoundPage,
  FriendsPage,
  SearchResultsPage
  } from './pages'

function App() {
  return (
    <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/allfriends' element={<FriendsPage />} />

        <Route path="/search" >
                <Route path="/search" element={<SearchFriendsPage />} />
                <Route path=":username" element={<SearchResultsPage />} />
        </Route>
    </Routes>
  );
}

export default App;