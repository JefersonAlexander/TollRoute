import React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

const peajes = [
  { nombre: 'Peaje Guarne', imagen: 'https://via.placeholder.com/150', precio: 11500 },
  { nombre: 'Peaje Santuario', imagen: 'https://via.placeholder.com/150', precio: 11500 },
  { nombre: 'Peaje Pto Triunfo', imagen: 'https://via.placeholder.com/150', precio: 11500 },
];

const MostrarPeajes = () => {
  // Calcular el total
  const total = peajes.reduce((sum, peaje) => sum + peaje.precio, 0);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Grid container spacing={3} justifyContent="center">
        {peajes.map((peaje, index) => (
          <Grid item key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={peaje.imagen}
                alt={peaje.nombre}
              />
              <CardContent>
                <Typography variant="h6" component="div" >
                  {peaje.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${peaje.precio.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" color="primary" sx={{ marginTop: '20px' }}>
        Total ${total.toLocaleString()}
      </Typography>
    </div>
  );
};

export default MostrarPeajes;
