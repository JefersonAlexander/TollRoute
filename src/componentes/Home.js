import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import BusquedaTollRoute from './BusquedaTollRoute';
import TravelPreparation from './TravelPreparation';
// Importa la imagen
import tollRouteImage from '../tollRouteImage/PeajesdeINVIAS.jpg'; // Ajusta la ruta de la imagen
import tollRouteImage1 from '../tollRouteImage/Peaje2.jpeg'; // Ajusta la ruta de la imagen
import tollRouteImage2 from '../tollRouteImage/Peaje3.jpg'; // Ajusta la ruta de la imagen


function Home() {
  console.log('Componente Home cargado');
  
  return (
    <div>
      {/* Sección explicativa de Toll Route */}
      <Box sx={{ padding: 1, marginLeft:9, marginRight:9 }}>
        
        <Grid container spacing={2} justifyContent="left">
          {/* Columna para la imagen */}
          <Grid item xs={12} sm={6}>
            <img src={tollRouteImage} alt="Toll Route" style={{ width: '100%', height: '312px', borderRadius: '8px' }} />
          </Grid>

          <Grid container spacing={1} item xs={12} sm={6} justifyContent="center" sx={{ display: 'flex', flexWrap: 'wrap' }}>
  
              {/* Imagen 1 */}
              <Grid item xs={12} sm={5.8} sx={{ display: 'flex', justifyContent: 'center' }}>
                <img src={tollRouteImage1} alt="Toll Route" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
              </Grid>

              {/* Imagen 2 */}
              <Grid item xs={12} sm={5.8} sx={{ display: 'flex', justifyContent: 'center' }}>
                <img src={tollRouteImage2} alt="Toll Route" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
              </Grid>

              {/* Imagen 3 */}
              <Grid item xs={12} sm={5.8} sx={{ display: 'flex', justifyContent: 'center' }}>
                <img src={tollRouteImage} alt="Toll Route" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
              </Grid>

              {/* Imagen 4 */}
              <Grid item xs={12} sm={5.8} sx={{ display: 'flex', justifyContent: 'center' }}>
                <img src={tollRouteImage} alt="Toll Route" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
              </Grid>
          </Grid>
        </Grid>


        <Grid container spacing={2} justifyContent="center" sx={{ display: 'flex', flexWrap: 'wrap', marginTop:5,marginBottom:5 }}>
          {/* Título centrado */}
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom align="center" sx={{ color: '#2196f3' }}>
              ¿Qué es Toll Route?
            </Typography>
          </Grid>

          {/* Primer párrafo alineado a la izquierda */}
          <Grid item xs={12} sm={5.5}>

          <Box sx={{
              border: '2px solid #2196f3', // Borde azul
              padding: '16px', // Espaciado dentro del borde
              borderRadius: '0px', // Bordes redondeados
            }}>
            <Typography variant="h6" color="textSecondary" align="center">
              Toll Route es una aplicación innovadora diseñada para ayudar a los conductores a gestionar y calcular los peajes de las rutas en las que viajan. 
              Esta plataforma proporciona información detallada sobre los peajes en las carreteras, permitiendo a los usuarios obtener datos actualizados sobre las tarifas 
              según el tipo de vehículo y las rutas disponibles.
            </Typography>
            </Box>
          </Grid>

          {/* Segundo párrafo alineado a la derecha */}
          <Grid item xs={12} sm={5.5}>
          <Box sx={{
              border: '2px solid #2196f3', // Borde azul
              padding: '16px', // Espaciado dentro del borde
              borderRadius: '0px', // Bordes redondeados
            }}>
            <Typography  variant="h6"  color="textSecondary" align="center">
              La aplicación está orientada a facilitar la planificación de los viajes por carretera, ofreciendo a los conductores las mejores opciones para calcular 
              el costo de los peajes en tiempo real. Con Toll Route, los usuarios pueden visualizar la cantidad exacta que deberán pagar en peajes a lo largo de su trayecto, 
              ayudando a optimizar los viajes.
            </Typography>
            </Box>
          </Grid>
        </Grid>

      </Box>
      
      <TravelPreparation/>


      <BusquedaTollRoute />

      
    </div>
  );
}

export default Home;