import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './combonents/Home';
import Login from './combonents/Login';
import SignUp from './combonents/SignUp';
import PrivateRoute from './combonents/PrivateRoute';
import Video from './combonents/Video';   

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

     
      <Route 
        path="/home" 
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/video/:id"   
        element={
          <PrivateRoute>
            <Video />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
}

export default App;
