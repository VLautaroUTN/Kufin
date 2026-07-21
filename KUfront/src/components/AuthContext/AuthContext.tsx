// createContext: crea un contexto compartido.
// useContext: permite acceder a ese contexto.
// useState: almacena información que puede cambiar.

import { createContext, useContext, useState } from "react";

// Definimos cómo será un usuario.
// Una "interface" en TypeScript describe la forma de un objeto.
export interface Usuario {
    nombre: string;
    email: string;
    foto: string;
    usuarioId: string;
}


// Esta interface describe todo lo que contendrá nuestro contexto.
interface AuthContextType {
    // El usuario actualmente logueado.
    // Puede ser un Usuario o null si nadie inició sesión.
    usuario: Usuario | null;

    // Función que recibe un usuario y lo guarda como logueado.
    login: (usuario: Usuario) => void; 

    // Función para cerrar la sesión.
    logout: () => void;
}


// Creamos el contexto.
//
// createContext necesita un valor inicial.
// Como todavía no existe ningún usuario,
// hacemos un "cast" para decirle a TypeScript:
// "Confía en mí, este objeto tendrá la forma AuthContextType".
export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);


// Creamos un hook personalizado.
//
// En lugar de escribir:
// useContext(AuthContext)
//
// podremos escribir simplemente:
// useAuth()
//
// Es más corto y más cómodo.
export const useAuth = () => useContext(AuthContext);


// Este componente envolverá toda la aplicación.
//
// Recibe "children", que representa todos los componentes
// que estén dentro del AuthProvider.
//
// Ejemplo:
//
// <AuthProvider>
//      <App/>
// </AuthProvider>
//
// En este caso, children será <App/>.
export function AuthProvider({ children }: { children: React.ReactNode }) 
{
    // Creamos una variable de estado llamada "usuario".
    //
    // usuario -> contiene el usuario actual.
    // setUsuario -> función para modificarlo.
    //
    // Al principio no hay nadie logueado,
    // por eso comienza siendo null.
    const [usuario, setUsuario] = useState<Usuario | null> (null);

    // Función para iniciar sesión.
    function Login(user: Usuario) {
        // Guardamos el usuario en el estado de React.
        //
        // Todos los componentes que usen useAuth()
        // se actualizarán automáticamente.
        setUsuario(user);

        // También lo guardamos en localStorage.
        //
        // JSON.stringify convierte el objeto Usuario
        // en un texto para poder almacenarlo.
        localStorage.setItem("usuario", JSON.stringify(user));
    }


    // Función para cerrar sesión.
    function Logout() {
        //Eliminamos el usuario del estado de React.
        setUsuario(null);

        // También lo eliminamos de localStorage.
        localStorage.removeItem("usuario");
    }


    // Devolvemos el Provider del contexto.
    //
    // Todo componente que esté dentro del Provider
    // podrá acceder a estos datos usando useAuth().
    return (
        <AuthContext.Provider 
        // "value" contiene todo lo que compartiremos.
        value={{ usuario, login: Login, logout: Logout }}>

            
            {/* Renderizamos todos los componentes hijos */}
            {children}
        </AuthContext.Provider>
    );
}