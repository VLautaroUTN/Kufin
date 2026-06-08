import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Grid, Typography, Paper } from '@mui/material';

const LoginKufin = () => {

  const respuestaExitosa = (respuestaGoogle) => {
    // Acá Google nos devuelve un "credential" (un JWT gigante)
    console.log("¡Éxito! Este es el token de Google:", respuestaGoogle.credential);
    // En el próximo paso, enviaremos este token a NestJS
  };

  const respuestaError = () => {
    console.error("Hubo un error al intentar iniciar sesión con Google.");
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: '#eef2f6' }}>
      <Paper elevation={3} style={{ padding: '40px', textAlign: 'center', borderRadius: '12px' }}>
        <Typography variant="h3" color="primary" gutterBottom>
          Bienvenido a Kufin
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '30px' }}>
          Iniciá sesión para gestionar tus finanzas
        </Typography>
        
        {/* Este es el botón oficial de Google */}
        <GoogleLogin
          onSuccess={respuestaExitosa}
          onError={respuestaError}
          useOneTap // Esto muestra la ventanita linda arriba a la derecha si ya estás logueado en Chrome
        />
      </Paper>
    </Grid>
  );
};

export default LoginKufin;