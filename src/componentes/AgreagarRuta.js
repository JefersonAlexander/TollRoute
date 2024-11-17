import React, { useState, useEffect } from 'react';
import { Grid, Button, MenuItem, Select, InputLabel, FormControl, Typography, Box, TextField } from '@mui/material';
import { addRoute, listRoutes } from '../services/tollrouteService';

const AgregarRuta = () => {
  // Estado para manejar la lista de rutas
  const [rutas, setRutas] = useState([]);

  // Estado para el formulario de agregar ruta
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    originCity: '',
    destinationCity: '',
    description: '',
  });

  // Función para manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Función para obtener la lista de rutas desde la API
  const obtenerRutas = async () => {
    const data = await listRoutes();
    if (data) {
      setRutas(data);
    } else {
      alert('No se pudieron obtener las rutas.');
    }
  };

  // Usar useEffect para cargar las rutas al montar el componente
  useEffect(() => {
    obtenerRutas();
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevaRuta = {
      code: formData.code,  // Asegúrate de que estos nombres coincidan con lo que espera la API
      name: formData.name,
      originCity: formData.originCity,
      destinationCity: formData.destinationCity,
      description: formData.description,
    };

    const response = await addRoute(nuevaRuta);
    if (response) {
      alert('Ruta agregada exitosamente');
      obtenerRutas(); // Actualizar la lista de rutas
      setFormData({
        code: '',
        name: '',
        originCity: '',
        destinationCity: '',
        description: '',
      });
    } else {
      alert('Error al agregar la ruta.');
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        {/* Rutas creadas - Columna izquierda */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ color: '#2196f3' }}>
            Rutas creadas
          </Typography>
          <Box sx={{ backgroundColor: '#f5f5f5', padding: 2, borderRadius: 2 }}>
            {rutas.map((ruta, index) => (
              <Box key={index} sx={{ backgroundColor: '#fff', marginBottom: 1, padding: 1, border: '1px solid #2196f3', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ color: '#2196f3' }} >{ruta.name}</Typography>
                <Grid container spacing={2}>
                  {/* Origen y Destino en una fila */}
                  <Grid item xs={6}>
                    <Typography sx={{ color: '#2196f3' }}>Origen:</Typography>
                    <Typography sx={{ color: '#000' }}>{ruta.originCity}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ color: '#2196f3' }}>Destino:</Typography>
                    <Typography sx={{ color: '#000', marginBottom: 1 }}>{ruta.destinationCity}</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography sx={{ color: '#2196f3' }}>Descripción:</Typography>
                    <Typography sx={{ color: '#000', marginBottom: 1 }}>{ruta.description}</Typography>
                  </Grid>
                </Grid>

              </Box>
            ))}
          </Box>
        </Grid>

        {/* Agregar Ruta - Columna derecha */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ color: '#2196f3' }}>
            Agregar Ruta
          </Typography>
          <Box
            sx={{
              padding: 3,
              border: '1px solid #2196f3',
              borderRadius: 2,
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Ciudad Origen */}
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Ciudad Origen</InputLabel>
                    <Select
                      name="originCity"  // Este nombre debe coincidir con el que espera la API
                      value={formData.originCity}
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="Bogota">Bogota</MenuItem> 
                      <MenuItem value="Medellin">Medellin</MenuItem>
                      <MenuItem value="Cartagena">Cartagena</MenuItem>
                      <MenuItem value="Cucuta">Cucuta</MenuItem>
                      <MenuItem value="Barranquilla">Barranquilla</MenuItem>
                      <MenuItem value="Cali">Cali</MenuItem>
                      <MenuItem value="Pereira">Pereira</MenuItem>
                      <MenuItem value="Armenia">Armenia</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Ciudad Destino */}
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Ciudad Destino</InputLabel>
                    <Select
                      name="destinationCity"  // Este nombre debe coincidir con el que espera la API
                      value={formData.destinationCity}
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="Bogota">Bogota</MenuItem> 
                      <MenuItem value="Medellin">Medellin</MenuItem>
                      <MenuItem value="Cartagena">Cartagena</MenuItem>
                      <MenuItem value="Cucuta">Cucuta</MenuItem>
                      <MenuItem value="Barranquilla">Barranquilla</MenuItem>
                      <MenuItem value="Cali">Cali</MenuItem>
                      <MenuItem value="Pereira">Pereira</MenuItem>
                      <MenuItem value="Armenia">Armenia</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Código */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Código"
                    name="code"  // Este nombre debe coincidir con el que espera la API
                    value={formData.code}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                {/* Nombre */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    name="name"  // Este nombre debe coincidir con el que espera la API
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                {/* Descripción */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Descripción"
                    name="description"  // Este nombre debe coincidir con el que espera la API
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    required
                  />
                </Grid>

                {/* Botones */}
                <Grid item xs={6}>
                  <Button fullWidth variant="outlined" type="button">
                    Atrás
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant="contained" type="submit">
                    Registrar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AgregarRuta;
