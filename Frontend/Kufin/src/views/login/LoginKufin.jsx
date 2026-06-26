import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Grid, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginKufin = () => {
  const navigate = useNavigate();

  const respuestaExitosa = async (respuestaGoogle) => {
    try {
      // Enviamos el token de Google a NestJS
      const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
      const response = await axios.post(`${API_URL}/auth/google`, {
        token: respuestaGoogle.credential
      });

      // Guardamos la información del usuario en localStorage
      localStorage.setItem('kufin_usuario_id', response.data.usuarioId);
      localStorage.setItem('kufin_usuario_email', response.data.email);

      // Redireccionamos al panel principal
      navigate('/dashboard/default');
    } catch (error) {
      console.error("Error al autenticar con el servidor:", error);
      alert("Error al iniciar sesión con el servidor");
    }
  };

  const respuestaError = () => {
    console.error("Hubo un error al intentar iniciar sesión con Google.");
    alert("Hubo un error al intentar iniciar sesión con Google.");
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