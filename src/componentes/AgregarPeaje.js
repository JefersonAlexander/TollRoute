import React, { useState, useEffect } from 'react';
import { Grid, Button, MenuItem, Select, InputLabel, FormControl, Typography, Box, TextField, Alert } from '@mui/material';
import { addToll, listRoutes } from '../services/tollrouteService';
import AgregarPrecios from './AgregarPrecios';

const AgregarPeaje = () => {
  const [formData, setFormData] = useState({
    ruta: '',
    nombrePeaje: '',
    categorias: 0, // Número de categorías (5 o 7)
    urlimagen: '',
    urlconsesion: '',
  });

  const [rutas, setRutas] = useState([]); // Estado para almacenar las rutas obtenidas

  // Estado para los mensajes de éxito o error
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Obtener la lista de rutas desde la API
  const obtenerRutas = async () => {
    const data = await listRoutes();
    if (data) {
      setRutas(data);
    } else {
      setErrorMessage('No se pudieron obtener las rutas.');
    }
  };

  // Usar useEffect para cargar las rutas al montar el componente
  useEffect(() => {
    obtenerRutas();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Preparar los datos para enviar al backend en el formato correcto
    const tollData = {
      routeId: formData.ruta,
      name: formData.nombrePeaje,
      numberCategories: formData.categorias,
      urlImage: formData.urlimagen,
      urlConcession: formData.urlconsesion,
    };

    // Llamar al servicio addToll
    const response = await addToll(tollData);

    if (response) {
      setSuccessMessage('Peaje agregado exitosamente');
      setErrorMessage(''); // Limpiar el mensaje de error si la operación es exitosa
      setFormData({
        ruta: '',
        nombrePeaje: '',
        categorias: 0,
        urlimagen: '',
        urlconsesion: '',
      });
    } else {
      setErrorMessage('Error al agregar el peaje.');
      setSuccessMessage(''); // Limpiar el mensaje de éxito si hay un error
    }
  };

  return (
    <div>
      <Box sx={{ padding: 3, border: '2px solid #2196f3', borderRadius: 2, marginTop: 2, marginLeft: 10, marginRight: 10 }}>
        <Typography variant="h5" sx={{ color: '#2196f3', marginBottom: 3, textAlign: 'left' }}>
          Agregar Peaje
        </Typography>

        {/* Mostrar los mensajes de éxito y error */}
        {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
        {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="flex-start">
            {/* Selección de la ruta */}
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Ruta*</InputLabel>
                <Select
                  name="ruta"
                  value={formData.ruta}
                  label="Ruta"
                  onChange={handleChange}
                  required
                >
                  {rutas.map((ruta) => (
                    <MenuItem key={ruta.id} value={ruta.id}>
                      {ruta.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Nombre del peaje */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Nombre Peaje"
                name="nombrePeaje"
                value={formData.nombrePeaje}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Selección del número de categorías */}
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Categorías*</InputLabel>
                <Select
                  name="categorias"
                  label="Categorías"
                  value={formData.categorias}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* URL de la imagen */}
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="URL Imagen"
                name="urlimagen"
                value={formData.urlimagen}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
              />
            </Grid>

            {/* URL de la concesión */}
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="URL Concesión"
                name="urlconsesion"
                value={formData.urlconsesion}
                onChange={handleChange}
                placeholder="https://example.com"
                required
              />
            </Grid>

            {/* Botón de enviar */}
            <Grid container justifyContent="center" marginTop={2}>
              <Grid item xs={6} sm={4}>
                <Button fullWidth variant="contained" type="submit">
                  Agregar Peaje
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* Componente para agregar precios de peajes */}
      <AgregarPrecios />
    </div>
  );
};

export default AgregarPeaje;

