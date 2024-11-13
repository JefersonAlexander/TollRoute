import React, { useState } from 'react';
import { Grid,Grid2, Button, MenuItem, Select, InputLabel, FormControl, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function BusquedaTollRoute() {
  const [formData, setFormData] = useState({
    ciudadOrigen: '',
    ciudadDestino: '',
    ruta: '',
    tipoEje: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
  };

  const navigate = useNavigate();
  
  const handleClick = () => {
      // Redirigir a otra página
      navigate('/mostrarPeajes'); };

  return (
    
    <Grid2 container columnSpacing={0} xs={12} height="100vh" display="flex" justifyContent="center" alignItems="center" marginLeft={10} marginRight={10}>
        <Box 
          component="form" 
          sx={{
            '& .MuiTextField-root': { m: 1, width: '40ch' },
            border: '1px solid #2196f3',  // Añade un borde
            borderRadius: '8px',        // Añade bordes redondeados
            padding: '20px',            // Añade padding dentro del formulario
            boxShadow: 3,               // Sombra sutil para un mejor efecto visual
          }} 
          noValidate 
          autoComplete="off" 
          onSubmit={handleSubmit}
        >
            
      <Typography variant="h6" gutterBottom>
        Por favor diligencie todos los campos *
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="left">
          {/* Ciudad Origen */}
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel >Ciudad Origen</InputLabel>
              <Select
                name="ciudadOrigen"
                value={formData.ciudadOrigen}
                onChange={handleChange}
                required
              >
                <MenuItem value="Medellín">Medellín</MenuItem>
                <MenuItem value="Bogotá">Bogotá</MenuItem>
                {/* Otras ciudades */}
              </Select>
            </FormControl>
          </Grid>

          {/* Ciudad Destino */}
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Ciudad Destino</InputLabel>
              <Select
                name="ciudadDestino"
                value={formData.ciudadDestino}
                onChange={handleChange}
                required
              >
                <MenuItem value="Bogotá">Bogotá</MenuItem>
                <MenuItem value="Medellín">Medellín</MenuItem>
                {/* Otras ciudades */}
              </Select>
            </FormControl>
          </Grid>

          {/* Botón Buscar */}
          <Grid item xs={1}>
            <Button fullWidth type="submit" variant="contained">
              Buscar
            </Button>
          </Grid>

          {/* Ruta */}
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Seleccionar la ruta</InputLabel>
              <Select
                name="ruta"
                value={formData.ruta}
                onChange={handleChange}
                required
              >
                <MenuItem value="Ruta del Valle de Aburrá">Ruta del Valle de Aburrá</MenuItem>
                <MenuItem value="Ruta del Oriente">Ruta del Oriente</MenuItem>
                {/* Otras rutas */}
              </Select>
            </FormControl>
          </Grid>

          {/* Tipo de Eje (Ahora con imágenes) */}
          <Grid item xs={12}>
            <Typography variant="h6">Seleccione los tipos de ejes de su vehículo</Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button variant="outlined">
                  <img src="https://via.placeholder.com/80x80.png?text=2+Ejes+sencillos" alt="2 Ejes sencillos" width="80" height="80" />
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined">
                  <img src="https://via.placeholder.com/80x80.png?text=2+Ejes+llanta+pequeña" alt="3 Ejes" width="80" height="80" />
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined">
                  <img src="https://via.placeholder.com/80x80.png?text=2+Ejes+llanta+grande" alt="2 Ejes llanta grande" width="80" height="80" />
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined">
                  <img src="https://via.placeholder.com/80x80.png?text=3+Ejes+llanta+grande" alt="3 Ejes llanta grande" width="80" height="80" />
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined">
                  <img src="https://via.placeholder.com/80x80.png?text=4+Ejes+llanta+grande" alt="4 Ejes llanta grande" width="80" height="80" />
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined">
                  <img src="https://via.placeholder.com/80x80.png?text=5+Ejes+llanta+grande" alt="5 Ejes llanta grande" width="80" height="80" />
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined">
                  <img src="https://via.placeholder.com/80x80.png?text=6+Ejes+llanta+grande" alt="6 Ejes llanta grande" width="80" height="80" />
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* Botón Atrás */}
          <Grid item xs={3} sx={{ marginTop: 2 }}>
          <Button fullWidth type="submit" variant="contained" onClick={handleClick} >
            Buscar Peajes en Rutas
            </Button>
          </Grid>
        </Grid>
      </form>
     </Box>
    </Grid2>

        
  );
}
