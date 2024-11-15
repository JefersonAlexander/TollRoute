import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert,Select, MenuItem,FormControl,InputLabel, Grid } from '@mui/material';
import { registerUser } from '../services/authenticationService';  // Asumiendo que tu función registerUser está en un archivo api.js
import Box from '@mui/material/Box';
const RegisterUser = () => {
  // State para almacenar los datos del formulario y el mensaje de error o éxito
  const [userData, setUserData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    type_document: '',
    number_document: '',
    phone: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Manejar el cambio de valores en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await registerUser(userData);

    if (response) {
      setSuccessMessage('Usuario registrado exitosamente');
      setErrorMessage('');
    } else {
      setSuccessMessage('');
      setErrorMessage('Error al registrar usuario');
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',  // Esto asegura que el contenedor ocupe toda la altura de la pantalla
      }}
    >
    <Box 
          component="form" 
          sx={{
            border: '1px solid #2196f3',  
            borderRadius: '8px',       
            padding: '20px',            
            boxShadow: 3,            
          }} 
          
          noValidate 
          autoComplete="off" 
          onSubmit={handleSubmit}
        >

      <Typography variant="h4" gutterBottom align="center">Registro de Usuario</Typography>

      <Grid item xs={12}>
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Grid>
      
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Primer Nombre"
              name="first_name"
              value={userData.first_name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Apellido"
              name="last_name"
              value={userData.last_name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              name="email"
              value={userData.email}
              onChange={handleChange}
              type="email"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              value={userData.password}
              onChange={handleChange}
              type="password"
              required
            />
          </Grid>

          
          <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tipo de documento</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userData.type_document}
                label="Tipo de documento"
                onChange={handleChange}
                name="type_document"
                required
                >
           <MenuItem value="CC">Cédula</MenuItem>
           <MenuItem value="pt">Pasaporte</MenuItem>
            </Select>
            </FormControl>
          </Grid>


          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Número de Documento"
              name="number_document"
              value={userData.number_document}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Teléfono"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Registrar Usuario
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default RegisterUser;