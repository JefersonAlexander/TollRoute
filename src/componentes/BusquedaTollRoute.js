import React, { useState } from 'react';
import { Grid,Grid2, Button, MenuItem, Select, InputLabel, FormControl, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { filterTolls, getRoutesByCities } from '../services/tollrouteService';
import Dosejes from '../tollRouteImage/Dosejes.png'; // Ajusta la ruta de la imagen
import Dosejespeque from '../tollRouteImage/Dosejespeque.png'; // Ajusta la ruta de la imagen
import Dosejesgrande from '../tollRouteImage/Dosejesgrande.png'; // Ajusta la ruta de la imagen
import Tresejesgrande from '../tollRouteImage/Tresejesgrande.png'; // Ajusta la ruta de la imagen
import Cuatroejesgrande from '../tollRouteImage/Cuatroejesgrande.png'; // Ajusta la ruta de la imagen
import Cincoejesgrande from '../tollRouteImage/Cincoejesgrande.png'; // Ajusta la ruta de la imagen
import Seisejesgrande from '../tollRouteImage/Seisejesgrande.png'; // Ajusta la ruta de la imagen


export default function BusquedaTollRoute() {
  const [formData, setFormData] = useState({
    ciudadOrigen: '',
    ciudadDestino: '',
    ruta: '',
  });

  const [rutas, setRutas] = useState([]); // Estado para almacenar las rutas filtradas
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Si se seleccionan ambas ciudades, obtener las rutas
    if (name === 'ciudadOrigen' || name === 'ciudadDestino') {
      const { ciudadOrigen, ciudadDestino } = {
        ...formData,
        [name]: value,
      };

      // Solo obtener las rutas si ambas ciudades están seleccionadas
      if (ciudadOrigen && ciudadDestino) {
        const data = await getRoutesByCities(ciudadOrigen, ciudadDestino);
        setRutas(data);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filtrar peajes basados en la ciudad de origen, destino y ruta seleccionada
    const data = await filterTolls({
      originCity: formData.ciudadOrigen,
      destinationCity: formData.ciudadDestino,
      routeName: formData.ruta,
    });

    if (data) {
      alert('Búsqueda exitosa');
      console.log('Peajes encontrados:', data);
    } else {
      alert('No se encontraron peajes con los filtros proporcionados.');
    }
  };

  const handleClick = () => {
    navigate('/mostrarPeajes');};

  return (
    
    
    <Grid2 container columnSpacing={0} xs={12}  display="flex" justifyContent="center" alignItems="center"
     marginLeft={10} marginRight={10} marginTop={5} marginBottom={5}>
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

      {/* Título centrado */}
      <Grid item xs={12}>
            <Typography variant="h5" gutterBottom align="center" sx={{ color: '#2196f3' }}>
              Buscar Rutas
            </Typography>
          </Grid>
            
      <Typography variant="h6" gutterBottom>
        Por favor diligencie todos los campos *
      </Typography>
      
    
        <Grid container spacing={2} justifyContent="left">
          {/* Ciudad Origen */}
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel >Ciudad Origen *</InputLabel>
              <Select
                name="ciudadOrigen"
                label="Ciudad Origen"
                value={formData.ciudadOrigen}
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
                {/* Otras ciudades */}
              </Select>
            </FormControl>
          </Grid>

          {/* Ciudad Destino */}
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Ciudad Destino *</InputLabel>
              <Select
                name="ciudadDestino"
                label="Ciudad Destino"
                value={formData.ciudadDestino}
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




          {/* Tipo de Eje (Ahora con imágenes) */}
          <Grid item xs={12}>
            <Typography variant="h6">Seleccione los tipos de ejes de su vehículo</Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button variant="outlined">
                  <img src={Dosejes} alt="2 Ejes sencillos" width="80" height="80" />
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined">
                  <img src={Dosejespeque} alt="3 Ejes" width="80" height="80" />
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined">
                  <img src={Dosejesgrande} alt="2 Ejes llanta grande" width="80" height="80" />
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined">
                  <img src={Tresejesgrande} alt="3 Ejes llanta grande" width="80" height="80" />
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined">
                  <img src={Cuatroejesgrande} alt="4 Ejes llanta grande" width="80" height="80" />
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined">
                  <img src={Cincoejesgrande} alt="5 Ejes llanta grande" width="80" height="80" />
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined">
                  <img src={Seisejesgrande} alt="6 Ejes llanta grande" width="80" height="80" />
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={2} justifyContent="center">
  {/* Botón Atrás */}
  <Grid item xs={12} sm={3} sx={{ marginTop: 2 }}>
    <Button
      fullWidth
      type="submit"
      variant="contained"
      onClick={handleClick}
    >
      Buscar Peajes en Rutas
    </Button>
  </Grid>
</Grid>


        </Grid>
      
     </Box>
    </Grid2>

        
  );
}
