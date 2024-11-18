import React, { useState, useEffect } from 'react';
import { Grid, Button, MenuItem, Select, InputLabel, FormControl, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { filterRoutesByCities, listCity } from '../services/tollrouteService'; 
import tollRouteImage from '../tollRouteImage/TiposEjes.png'; // Ajusta la ruta de la imagen
import tollRouteImage1 from '../tollRouteImage/CategoriaVehiculos.png'; // Ajusta la ruta de la imagen

export default function BusquedaTollRoute() {
  const [formData, setFormData] = useState({
    ciudadOrigen: '',
    ciudadDestino: '',
    ruta: '',
    tipoVehiculo: '', 
  });

  const [rutas, setRutas] = useState([]); // Estado para almacenar las rutas filtradas
  const [ciudades, setCiudades] = useState([]); // Estado para almacenar las ciudades
  const navigate = useNavigate();

  
  const filterRoutes = async (ciudadOrigen, ciudadDestino) => {
    const routes = await filterRoutesByCities(ciudadOrigen, ciudadDestino); 
    if (routes) {
      setRutas(routes); 
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    
    if (name === 'ciudadOrigen' || name === 'ciudadDestino') {
      const { ciudadOrigen, ciudadDestino } = {
        ...formData,
        [name]: value,
      };

      
      if (ciudadOrigen && ciudadDestino) {
        filterRoutes(ciudadOrigen, ciudadDestino);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    const selectedRoute = rutas.find(route => route.name === formData.ruta);
    if (selectedRoute) {
      
      navigate('/mostrarPeajes', {
        state: {
          routeId: selectedRoute.id,
          tipoVehiculo: formData.tipoVehiculo, 
        },
      });
    }
  };

  
  const obtenerCiudades = async () => {
    const ciudadesData = await listCity(); 
    if (ciudadesData) {
      setCiudades(ciudadesData); 
    } else {
      alert('No se pudieron obtener las ciudades.');
    }
  };

  
  const handleShowPeajes = async (e) => {
    e.preventDefault();

    
    const selectedRoute = rutas.find(route => route.name === formData.ruta);
    if (selectedRoute) {
      
      navigate('/mostrarDetallesPeajes', {
        state: {
          routeId: selectedRoute.id,
        },
      });
    }
  };


  useEffect(() => {
    obtenerCiudades(); 
  }, []);

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '40ch' },
        border: '1px solid #2196f3',  
        borderRadius: '8px',        
        padding: '20px',            
        boxShadow: 3,              
        marginTop: 2, 
        marginLeft: 10, 
        marginRight: 10, 
        marginBottom:5,
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >

<Grid container spacing={2} justifyContent="left">

    <Grid item xs={12}>
        <Typography variant="h5" gutterBottom align="center" sx={{ color: '#2196f3' }}>
        Información de la Categoría segun el tipo de vehiculo
        </Typography>
      </Grid>

      {/* Columna para la imagen */}
      <Grid item xs={12} sm={6}>
        <img src={tollRouteImage} alt="Toll Route" style={{ width: '100%', height: '312px', borderRadius: '8px' }} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <img src={tollRouteImage1} alt="Toll Route" style={{ width: '100%', height: '312px', borderRadius: '8px' }} />
      </Grid>

  </Grid>

      {/* Título centrado */}
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom align="center" sx={{ color: '#2196f3' }}>
          Calcular Precio de Peajes en Rutas
        </Typography>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Por favor diligencie todos los campos *
      </Typography>

      <Grid container spacing={2} justifyContent="flex-start">
        {/* Ciudad Origen */}
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Ciudad Origen *</InputLabel>
            <Select
              name="ciudadOrigen"
              label="Ciudad Origen"
              value={formData.ciudadOrigen}
              onChange={handleChange}
              required
            >
              {ciudades.map((ciudad) => (
                <MenuItem key={ciudad.id} value={ciudad.name}>
                  {ciudad.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Ciudad Destino */}
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Ciudad Destino *</InputLabel>
            <Select
              name="ciudadDestino"
              label="Ciudad Destino"
              value={formData.ciudadDestino}
              onChange={handleChange}
              required
            >
              {ciudades.map((ciudad) => (
                <MenuItem key={ciudad.id} value={ciudad.name}>
                  {ciudad.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Ruta */}
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Seleccionar la ruta *</InputLabel>
            <Select
              name="ruta"
              label="Seleccionar la ruta"
              value={formData.ruta}
              onChange={handleChange}
              required
            >
              {rutas.length > 0 ? (
                rutas.map((ruta) => (
                  <MenuItem key={ruta.id} value={ruta.name}>
                    {ruta.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">No hay rutas disponibles</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        {/* Tipo de Vehículo */}
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Tipo de Vehículo *</InputLabel>
            <Select
              name="tipoVehiculo"
              label="Tipo de Vehículo"
              value={formData.tipoVehiculo}
              onChange={handleChange}
              required
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid container spacing={2} justifyContent="center">
          {/* Calcular precio peajes */}
          <Grid item xs={12} sm={3} sx={{ marginTop: 2 }}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
            >
              Buscar peajes
            </Button>
          </Grid>

          {/* Botón para mostrar detalles de peajes */}
          <Grid item xs={12} sm={3} sx={{ marginTop: 2 }}>
            <Button
              fullWidth
              
              onClick={handleShowPeajes}
            >
              Mostrar Detalles de Peajes
            </Button>
          </Grid>

        </Grid>

      </Grid>
    </Box>
  );
}
