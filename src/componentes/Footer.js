import React from 'react';
import { Box, Typography, Grid} from '@mui/material';
function Footer() {
  return (
    <Box sx={{
      backgroundColor: '#2196f3', // Color de fondo
      padding: '20px 0', // Espaciado superior e inferior
      marginTop: 'auto', // Para asegurarse de que el pie de página se quede al final
      color: 'white',
    }}>
      <Grid container spacing={2} justifyContent="center">
        {/* Columna 1: Derechos reservados */}
        <Grid item xs={12} sm={4} textAlign="center">
          <Typography variant="body2" color="inherit">
            &copy; {new Date().getFullYear()} Toll Route. Todos los derechos reservados.
          </Typography>
        </Grid>


      </Grid>
    </Box>
  );
}

export default Footer;
