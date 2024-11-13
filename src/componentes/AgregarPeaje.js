import React, { useState,  useEffect } from 'react';
import { Grid, Button, MenuItem, Select, InputLabel, FormControl, Typography, Box, TextField } from '@mui/material';
import { addToll, listRoutes } from '../services/tollrouteService';


const AgregarPeaje = () => {
  const [formData, setFormData] = useState({
    ruta: '',
    nombrePeaje: '',
    categorias: 0,
    precios: ['', '', '', '', '', '', ''], // Para las categorías de precios
    urlimagen: '',
  });

  const [rutas, setRutas] = useState([]); // Estado para almacenar las rutas obtenidas

  // Obtener la lista de rutas desde la API
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

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePriceChange = (index, value) => {
    const updatedPrecios = [...formData.precios];
    updatedPrecios[index] = value;
    setFormData({ ...formData, precios: updatedPrecios });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Preparar los datos para enviar al backend
    const tollData = {
      route: formData.ruta,
      toll_name: formData.nombrePeaje,
      category: formData.categorias,
      price_category_1: formData.precios[0] || '0',
      price_category_2: formData.precios[1] || '0',
      price_category_3: formData.precios[2] || '0',
      price_category_4: formData.precios[3] || '0',
      price_category_5: formData.precios[4] || '0',
      price_category_6: formData.precios[5] || '0',
      price_category_7: formData.precios[6] || '0',
      image_url: formData.urlimagen,
    };

    // Llamar al servicio addToll
    const response = await addToll(tollData);

    if (response) {
      alert('Peaje agregado exitosamente');
      setFormData({
        ruta: '',
        nombrePeaje: '',
        categorias:'' ,
        precios: ['', '', '', '', '', '', ''],
        urlimagen: '',
      });
    } else {
      alert('Error al agregar el peaje.');
    }
  };


  return (
    <Box sx={{ padding: 3, border: '2px solid #2196f3', borderRadius: 2, marginTop:2, marginLeft:10, marginRight:10}}>
      <Typography variant="h5" sx={{ color: '#2196f3', marginBottom: 3 }}>
        Agregar Peaje
      </Typography>
      <form onSubmit={handleSubmit}>
      <Grid container spacing={2} justifyContent="center">
          {/* Fila con Ruta, Nombre Peaje, y Categoría */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Ruta</InputLabel>
              <Select
                name="ruta"
                value={formData.ruta}
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

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Categorías</InputLabel>
              <Select
                name="categorias"
                value={formData.categorias}
                onChange={handleChange}
                required
              >
                {[...Array(7).keys()].map((n) => (
                  <MenuItem key={n} value={n + 1}>
                    {n + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          

          {/* Fila con los precios */}
          <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
            {[...Array(7).keys()].map((index) => (
              <Grid item xs={12} sm={1.7} key={index}>
                <TextField
                  fullWidth
                  label={`$ ${index + 1}`}
                  value={formData.precios[index]}
                  onChange={(e) => handlePriceChange(index, e.target.value)}
                  required
                />
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12} sm={6}>
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
          {/* Botones */}
          <Grid item xs={6} sm={3}>
            <Button fullWidth variant="contained" type="submit">
              Registrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AgregarPeaje;
