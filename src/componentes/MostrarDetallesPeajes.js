import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Link, Box } from '@mui/material'; // Agregar Link de MUI
import { useLocation } from 'react-router-dom';
import { listPeajes, listRate, listRoutes } from '../services/tollrouteService'; // Asegúrate de importar las rutas del servicio correctamente

const MostrarPeajes = () => {
  // Obtener el state con los datos enviados desde el componente anterior
  const { state } = useLocation();
  const { routeId, tipoVehiculo } = state;

  const [peajes, setPeajes] = useState([]);
  const [rutaNombre, setRutaNombre] = useState(''); // Estado para el nombre de la ruta

  useEffect(() => {
    const fetchPeajesAndPrecios = async () => {
      try {
        // Obtener todos los peajes y precios
        const peajesData = await listPeajes();
        const preciosData = await listRate();
        const routesData = await listRoutes(); // Obtener todas las rutas

        if (!peajesData || !preciosData || !routesData) {
          console.error('No se pudieron obtener los peajes, precios o rutas');
          return;
        }

        console.log("Datos de peajes:", peajesData); // Verificar que los peajes se reciben correctamente
        console.log("Datos de precios:", preciosData); // Verificar que los precios se reciben correctamente

        // Filtrar peajes por routeId
        const filteredPeajes = peajesData.filter((peaje) => peaje.routeId === routeId);

        // Obtener el nombre de la ruta usando el routeId
        const route = routesData.find(route => route.id === routeId);
        setRutaNombre(route ? route.name : 'Ruta no encontrada');

        // Para cada peaje, obtener todos los precios (sin filtrar por tipo de vehículo)
        const filteredPrecios = filteredPeajes.map((peaje) => {
          // Obtener todos los precios del peaje (sin filtrar por tipo de vehículo)
          const preciosPorPeaje = preciosData.filter((precio) => precio.tollId === peaje.id);

          const imageUrl = peaje.urlImage || ''; // Si no tiene URL, dejamos un string vacío

          return {
            nombre: peaje.name,
            imagen: imageUrl,
            urlConcession: peaje.urlConcession, // Añadir la URL de concesión
            precios: preciosPorPeaje.map((precio) => ({
              categoria: precio.vehicleCategory,
              precio: precio.price,
            })),
          };
        });

        // Actualizar los estados de peajes y precios
        setPeajes(filteredPrecios);
      } catch (error) {
        console.error('Error al obtener los peajes:', error);
      }
    };

    fetchPeajesAndPrecios();
  }, [routeId, tipoVehiculo]);

  return (
    <Box sx={{ padding: 3, marginTop: 2, marginLeft: 20, marginRight: 10, marginBottom: 3 }}>
      {/* Título con el nombre de la ruta */}
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', color: '#2196f3', margin: 3 }}>
        Peajes de la Ruta {rutaNombre}
      </Typography>

      <Grid container spacing={3} >
        {peajes.map((peaje, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}> {/* Se ajusta para diferentes tamaños de pantalla */}
            <Card sx={{ 
              maxWidth: 345, 
              display: 'flex', 
              flexDirection: 'column', 
              
              height: '100%' // Para asegurarse de que todas las tarjetas tengan la misma altura
            }}>
              <CardMedia
                component="img"
                height="140"
                image={peaje.imagen}  // Aquí se usa la URL proporcionada directamente
                alt={peaje.nombre}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {peaje.nombre}
                </Typography>

                {/* Mostrar los precios por categoría */}
                {peaje.precios.map((precio, idx) => (
                  <Typography key={idx} variant="body2" color="text.secondary">
                    <strong>Precio Categoría {precio.categoria}:</strong> ${precio.precio.toLocaleString()}
                  </Typography>
                ))}

                {/* Mostrar la URL de la concesión */}
                {peaje.urlConcession && (
                  <Typography variant="body2" color="text.secondary" mt={2}>
                    <strong>URL de la concesión:</strong>{' '}
                    <Link href={peaje.urlConcession} target="_blank" rel="noopener noreferrer">
                      {peaje.urlConcession}
                    </Link>
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MostrarPeajes;
