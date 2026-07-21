import { useState } from 'react';
import Login from './login';
import axios from 'axios';
import { useAuth } from '../AuthContext/AuthContext';

export interface LoginModalProps {
  // Indica si el modal debe estar abierto.
  open: boolean;
  // Función que se ejecutará cuando el modal se cierre.
  onClose: () => void;
}


export function LoginModal({ open, onClose }: LoginModalProps) {

  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  // ===================================================
  // Función que se ejecuta cuando Google autentica
  // correctamente al usuario.
  // ===================================================
  const handleGoogleSuccess = async (respuestaGoogle: any) => {

    // Activa el estado de carga.
    // Esto normalmente sirve para deshabilitar botones
    // o mostrar un spinner.
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
      const response = await axios.post( `${API_URL}/auth/google`,
        {
          // Google devuelve un JWT llamado "credential".
          // Ese token será enviado al backend para validar
          // la identidad del usuario.
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

    // finally siempre se ejecuta.
    // Da igual si hubo éxito o error.
    finally {

      // Desactiva el estado de carga.
      setLoading(false);

      // Cierra el modal.
      onClose();
    }
  };

  return (

    // Renderiza el componente Login
    <Login

      // Indica si debe estar abierto.
      open={open}

      // Función para cerrar el modal.
      onClose={onClose}

      // Función que se ejecutará cuando Google
      // devuelva un login exitoso.
      onGoogleSuccess={handleGoogleSuccess}

      // Si Google devuelve un error simplemente
      // lo mostramos por consola.
      onGoogleError={() => console.error("Error en Google")}

      // Indica al componente Login si actualmente
      // se está realizando una petición al backend.
      loading={loading}

    />
  );
}
