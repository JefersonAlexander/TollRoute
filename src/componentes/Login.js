import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Grid2, Typography } from '@mui/material';
import { loginUser} from '../services/authenticationService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate


export default function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const { login } = useAuth(); 
  const navigate = useNavigate(); // Inicializar useNavigate

  // Manejar cambios en los campos de entrada
  const handleLoginData = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

// Manejar el envío del formulario
const handleSubmit = async (e) => {
  e.preventDefault();

  // Llamar al servicio de login
  const userData = await loginUser(loginData);

  if (userData) {
    login(userData); // Actualizar el estado global de autenticación
    navigate('/home'); // Redireccionar usando useNavigate
  } else {
    alert('Credenciales incorrectas. Inténtalo de nuevo.');
  }

  // Limpiar los datos del formulario
  setLoginData({
    email: "",
    password: "",
  });
};


  return (
    <Grid2 container columnSpacing={0} xs={12} height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Grid2 xs={12}>
        <Box 
          component="form" 
          sx={{
            '& .MuiTextField-root': { m: 1, width: '40ch' },
            border: '1px solid #2196f3',  
            borderRadius: '8px',       
            padding: '20px',            
            boxShadow: 3,              
          }} 
          
          noValidate 
          autoComplete="off" 
          onSubmit={handleSubmit}
        >
          <Typography variant="h4" gutterBottom>
            Iniciar Sesión
          </Typography>
          
          <div>
            <TextField
              fullWidth
              name="email"
              required
              id="outlined-email"
              label="Email"
              value={loginData.email} // Usar value para reflejar el estado
              type="email"
              onChange={handleLoginData}
            />
          </div>

          <div>
            <TextField
              fullWidth
              name="password"
              required
              id="outlined-password"
              label="Password"
              value={loginData.password} // Usar value para reflejar el estado
              type="password"
              onChange={handleLoginData}
            />
          </div>

          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
            Iniciar sesión
          </Button>
        </Box>
      </Grid2>
    </Grid2>
  );
}
