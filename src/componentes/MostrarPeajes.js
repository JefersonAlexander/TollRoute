import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { listPeajes, listRate, listRoutes } from '../services/tollrouteService';

const MostrarPeajes = () => {
  const { state } = useLocation();
  const { routeId, tipoVehiculo } = state;
  const [rutaNombre, setRutaNombre] = useState(''); // Estado para el nombre de la ruta

  const [peajes, setPeajes] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchPeajesAndPrecios = async () => {
      try {
        const peajesData = await listPeajes();
        const preciosData = await listRate();
        const routesData = await listRoutes(); 

        if (!peajesData || !preciosData) {
          console.error('No se pudieron obtener los datos de peajes o precios');
          return;
        }

        // Filtrar peajes por routeId
        const filteredPeajes = peajesData.filter((peaje) => peaje.routeId === routeId);

        // Obtener el nombre de la ruta usando el routeId
        const route = routesData.find(route => route.id === routeId);
        setRutaNombre(route ? route.name : 'Ruta no encontrada');

        // Función para ajustar el tipo de vehículo si el número de categorías es 5
        const ajustarTipoVehiculo = (tipo, numeroCategorias) => {
          if (numeroCategorias === 5) {
            if (['4', '5'].includes(tipo)) return '3';
            if (tipo === '6') return '4';
            if (tipo === '7') return '5';
          }
          return tipo;
        };

        // Filtrar y mapear los precios para cada peaje
        const filteredPrecios = filteredPeajes.map((peaje) => {
          // Ajustar tipo de vehículo para este peaje específico
          const tipoVehiculoAjustado = ajustarTipoVehiculo(String(tipoVehiculo), peaje.numberCategories);

          // Buscar el precio correspondiente
          const precio = preciosData.find(
            (p) => p.tollId === peaje.id && String(p.vehicleCategory) === tipoVehiculoAjustado
          );

          return {
            nombre: peaje.name,
            imagen: peaje.urlImage || '', // URL de imagen, o cadena vacía si no existe
            precio: precio ? precio.price : 0,
          };
        });

        // Actualizar el estado de peajes y calcular el total
        setPeajes(filteredPrecios);

        const totalPrecio = filteredPrecios.reduce((sum, peaje) => sum + peaje.precio, 0);
        setTotal(totalPrecio);
      } catch (error) {
        console.error('Error al obtener los peajes y precios:', error);
      }
    };

    fetchPeajesAndPrecios();
  }, [routeId, tipoVehiculo]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>

      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', color: '#2196f3', margin: 3 }}>
        Total a pagar en peajes en la ruta {rutaNombre}
      </Typography>

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
                <Typography variant="h6" component="div">
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
        Total: ${total.toLocaleString()} COP
      </Typography>
    </div>
  );
};

export default MostrarPeajes;

