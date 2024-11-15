import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DrawerAppBar from './DrawerAppbar';
import Home from './Home'; // Importa el componente de la página Home 
import Login from './Login'; // Importa el componente de la página Login
import MostrarPeajes from './MostrarPeajes'; // Importa el componente de la página Login
import AgregarRuta from './AgreagarRuta';
import AgregarPeaje from './AgregarPeaje';
import RegisterUser from './Register';
import Footer from './Footer';

function AppRoutes() {
  return (
      <Router>
      <DrawerAppBar />
      
      <Routes>
        
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/mostrarPeajes" element={<MostrarPeajes />} />
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