import { useState } from 'react';
import Login from './login';
import axios from 'axios';
import { useAuth } from '../AuthContext/AuthContext';


export interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}


export function LoginModal({ open, onClose }: LoginModalProps) {

  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const inicoExitoso = async (respuestaGoogle: any) => {
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
      const response = await axios.post( `${API_URL}/auth/google`,
        {
          token: respuestaGoogle.credential
        }
      );
      
      login({
        nombre: response.data.nombre,
        email: response.data.email,
        foto: response.data.foto,
        usuarioId: response.data.usuarioId
      })
    }

    catch (error) {console.error("Error al autenticar:", error);}

    finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Login
      open={open}
      onClose={onClose}
      onGoogleSuccess={inicoExitoso}
      onGoogleError={() => console.error("Error en Google")}
      loading={loading}
    />
  );
}
