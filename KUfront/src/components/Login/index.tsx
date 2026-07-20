// Importa el Hook useState de React.
// Los Hooks permiten agregar funcionalidades a los componentes.
// En este caso usaremos useState para guardar si la aplicación está cargando.
import { useState } from 'react';

// Importa el componente visual Login.
// Este componente solamente se encarga de mostrar el modal.
import Login from './login';

// Importa Axios, una librería para realizar peticiones HTTP al backend.
import axios from 'axios';


// ===================================================
// Interfaz que define las propiedades del componente
// ===================================================
export interface LoginModalProps {

  // Indica si el modal debe estar abierto.
  open: boolean;

  // Función que se ejecutará cuando el modal se cierre.
  onClose: () => void;
}


// ===================================================
// Componente LoginModal
// ===================================================
// Recibe dos propiedades:
//  - open
//  - onClose
//
// Se desestructuran directamente en los parámetros.
export function LoginModal({ open, onClose }: LoginModalProps) {

  // useState crea una variable de estado.
  //
  // loading -> valor actual del estado.
  // setLoading -> función para modificar ese valor.
  //
  // Inicialmente loading vale false.
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

      // Obtiene la URL del backend desde las variables
      // de entorno de Vite.
      //
      // Si la variable no existe utiliza localhost.
      const API_URL =
        import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';


      // Envía una petición POST al backend.
      //
      // axios.post() devuelve una Promise, por eso usamos
      // await para esperar la respuesta.
      const response = await axios.post(

        // URL del endpoint
        `${API_URL}/auth/google`,

        // Datos enviados al backend
        {
          // Google devuelve un JWT llamado "credential".
          // Ese token será enviado al backend para validar
          // la identidad del usuario.
          token: respuestaGoogle.credential
        }

      );


      // Guarda el ID del usuario en el navegador.
      // Permanecerá incluso si se recarga la página.
      localStorage.setItem(
        'kufin_usuario_id',
        response.data.usuarioId
      );


      // Guarda el email del usuario.
      localStorage.setItem(
        'kufin_usuario_email',
        response.data.email
      );

    }

    // Si ocurre cualquier error dentro del try,
    // entra aquí.
    catch (error) {

      // Muestra el error en la consola del navegador.
      console.error("Error al autenticar:", error);

    }

    // finally siempre se ejecuta.
    // Da igual si hubo éxito o error.
    finally {

      // Desactiva el estado de carga.
      setLoading(false);

      // Cierra el modal.
      onClose();
    }
  };


  // ===================================================
  // Render del componente
  // ===================================================
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
