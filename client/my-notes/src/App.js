import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Login/Home';
import AddNote from './Login/AddNote';
import Login from './Login/Login';

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated'); 

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/add" element={isAuthenticated ? <AddNote /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;