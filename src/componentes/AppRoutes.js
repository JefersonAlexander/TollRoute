import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DrawerAppBar from './DrawerAppbar';
import Home from './Home'; 
import Login from './Login'; 
import MostrarPeajes from './MostrarPeajes'; 
import AgregarRuta from './AgreagarRuta';
import AgregarPeaje from './AgregarPeaje';
import RegisterUser from './Register';
import Footer from './Footer';
import MostrarDetallesPeajes from './MostrarDetallesPeajes';

function AppRoutes() {
  return (
      <Router>
      <DrawerAppBar />
      
      <Routes>
        
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/mostrarPeajes" element={<MostrarPeajes />} />
      <Route path="/mostrarDetallesPeajes" element={<MostrarDetallesPeajes />} />
      <Route path="/agregarRuta" element={<AgregarRuta />} />
      <Route path="/agregarPeaje" element={<AgregarPeaje />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterUser />} />
      </Routes>

      <Footer/>

      </Router>
  );
}

export default AppRoutes;