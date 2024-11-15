import React from 'react';
import { Grid, Box, Typography, Card, CardContent } from '@mui/material';

function TravelPreparation() {
  return (
    <Box sx={{ padding: 3, marginLeft: 10, marginRight: 10 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: '#2196f3' }}>
        Funciones de la aplicación
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* Card 1: Encontrar diferentes rutas */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            border: '2px solid #2196f3',  // Borde azul
            height: '100%',  // Asegura que todas las tarjetas tengan el mismo tamaño
            padding: 2,  // Añade espaciado interno
            borderRadius: '8px'  // Bordes redondeados
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Encontrar diferentes rutas y conocer la cantidad de peajes que tiene cada ruta
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2: Conocer los precios segun el tipo de vehiculo */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            border: '2px solid #2196f3',  // Borde azul
            height: '100%',  // Asegura que todas las tarjetas tengan el mismo tamaño
            padding: 2,  // Añade espaciado interno
            borderRadius: '8px'  // Bordes redondeados
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Conocer los precios en los diferentes peajes según el tipo de vehículo.
              </Typography>
              
            </CardContent>
          </Card>
        </Grid>

        {/* Card 3: Calcular el costo en peajes */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            border: '2px solid #2196f3',  // Borde azul
            height: '100%',  // Asegura que todas las tarjetas tengan el mismo tamaño
            padding: 2,  // Añade espaciado interno
            borderRadius: '8px'  // Bordes redondeados
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Calcular el costo en peajes en relación a una ruta seleccionada.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TravelPreparation;