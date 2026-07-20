import { useState } from 'react';
import Login from './login';
import axios from 'axios';

export interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export function LoginModal({ open, onClose }: LoginModalProps) {
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (respuestaGoogle: any) => {
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
      const response = await axios.post(`${API_URL}/auth/google`, {
        token: respuestaGoogle.credential
      });

      localStorage.setItem('kufin_usuario_id', response.data.usuarioId);
      localStorage.setItem('kufin_usuario_email', response.data.email);
    } catch (error) {
      console.error("Error al autenticar:", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Login
      open={open}
      onClose={onClose}
      onGoogleSuccess={handleGoogleSuccess}
      onGoogleError={() => console.error("Error en Google")}
      loading={loading}
    />
  );
}
