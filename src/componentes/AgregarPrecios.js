import React, { useState, useEffect } from 'react';
import { Grid, Button, MenuItem, Select, InputLabel, FormControl, Typography, Box, TextField, Alert } from '@mui/material';
import { addRate, listPeajes } from '../services/tollrouteService';

const AgregarPrecios = () => {
  const [formData, setFormData] = useState({
    peaje: '', // ID del peaje
    precios: Array(7).fill(''), // Precios para cada categoría (hasta 7 categorías)
  });

  const [peajes, setPeajes] = useState([]); // Lista de peajes
  const [numberCategories, setNumberCategories] = useState(5); // Número de categorías del peaje seleccionado

  // Estado para los mensajes de éxito o error
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Obtener la lista de peajes desde la API
  const obtenerPeajes = async () => {
    const data = await listPeajes();
    if (data) {
      setPeajes(data);
    } else {
      setErrorMessage('No se pudieron obtener los peajes.');
    }
  };

  // Usar useEffect para cargar los peajes al montar el componente
  useEffect(() => {
    obtenerPeajes();
  }, []);

  // Manejar el cambio de peaje seleccionado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Actualizar el número de categorías según el peaje seleccionado
    if (name === 'peaje') {
      const selectedPeaje = peajes.find((peaje) => peaje.id === parseInt(value));
      if (selectedPeaje) {
        setNumberCategories(selectedPeaje.numberCategories);
        setFormData((prevData) => ({
          ...prevData,
          precios: Array(selectedPeaje.numberCategories).fill(''),
        }));
      }
    }
  };

  // Manejar cambios en los precios
  const handlePriceChange = (index, value) => {
    const updatedPrecios = [...formData.precios];
    updatedPrecios[index] = value;
    setFormData({ ...formData, precios: updatedPrecios });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generar el arreglo de datos para enviar
    const rateData = formData.precios.map((price, index) => ({
      tollId: formData.peaje,
      vehicleCategory: (index + 1).toString(),
      price: price || '0',
    }));

    // Llamar al servicio addRate con los datos generados
    const response = await addRate(rateData);

    if (response) {
      setSuccessMessage('Precios de peaje agregados exitosamente');
      setErrorMessage(''); // Limpiar el mensaje de error si la operación es exitosa
      setFormData({
        peaje: '',
        precios: Array(7).fill(''),
      });
    } else {
      setErrorMessage('Error al agregar los precios del peaje.');
      setSuccessMessage(''); // Limpiar el mensaje de éxito si hay un error
    }
  };

  return (
    <div>
      <Box sx={{ padding: 3, border: '2px solid #2196f3', borderRadius: 2, marginTop: 2, marginLeft: 10, marginRight: 10 }}>
        <Typography variant="h5" sx={{ color: '#2196f3', marginBottom: 3 }}>
          Agregar Precios Peaje
        </Typography>

        {/* Mostrar los mensajes de éxito y error */}
        {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
        {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Selección del peaje */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Peaje*</InputLabel>
                <Select
                  name="peaje"
                  value={formData.peaje}
                  onChange={handleChange}
                  required
                >
                  {peajes.map((peaje) => (
                    <MenuItem key={peaje.id} value={peaje.id}>
                      {peaje.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Ingresar precios para cada categoría */}
            <Grid item xs={12}>
              <Typography variant="h7" sx={{ color: '#2196f3', marginTop: 2 }}>
                Ingrese los precios para cada categoría de vehículo
              </Typography>
            </Grid>

            {[...Array(numberCategories).keys()].map((index) => (
              <Grid item xs={12} sm={3} key={index}>
                <TextField
                  fullWidth
                  label={`Precio para Categoría ${index + 1}`}
                  value={formData.precios[index] || ''}
                  onChange={(e) => handlePriceChange(index, e.target.value)}
                  required
                />
              </Grid>
            ))}

            {/* Botón de enviar */}
            <Grid container justifyContent="center" marginTop={2}>
              <Grid item xs={6} sm={4}>
                <Button fullWidth variant="contained" type="submit">
                  Agregar Precios
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* Mostrar peajes ya creados */}
      <Box sx={{ padding: 3, marginTop: 4, marginLeft: 10, marginRight: 10 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#2196f3' }}>
          Peajes creados
        </Typography>
        <Grid container spacing={3}>
          {peajes.map((peaje, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Box
                sx={{
                  backgroundColor: '#fff',
                  padding: 2,
                  border: '1px solid #2196f3',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <img
                  src={peaje.urlImage}
                  alt={peaje.name}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <Typography variant="h6" sx={{ color: '#2196f3' }}>
                  {peaje.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default AgregarPrecios;
