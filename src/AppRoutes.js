import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DrawerAppBar from './DrawerAppbar';
import Home from './Home'; // Importa el componente de la página Home 
import Login from './Login'; // Importa el componente de la página Login


function AppRoutes() {
  return (
    <Router>
      <DrawerAppBar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;