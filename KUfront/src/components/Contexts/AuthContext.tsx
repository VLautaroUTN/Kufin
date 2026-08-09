import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';


export interface Usuario {
    nombre: string;
    email: string;
    foto: string;
    usuarioId: string;
}

interface AuthContextType {
    usuario: Usuario | null;
    login: (respuestaGoogle: any) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

export const useAuth = () => useContext(AuthContext);



export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    // Restaurar sesión al recargar la página
    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuario");
        if (usuarioGuardado) {
            try {
                setUsuario(JSON.parse(usuarioGuardado));
            } catch {
                localStorage.removeItem("usuario");
            }
        }
    }, []);

    async function login(respuestaGoogle: any): Promise<void> {
        try {
            const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
            const response = await axios.post(`${API_URL}/auth/google`,
                {
                    token: respuestaGoogle.credential
                }
            );
            const usuarioLogueado: Usuario = {
                nombre: response.data.nombre,
                email: response.data.email,
                foto: response.data.foto,
                usuarioId: response.data.usuarioId
            }
            setUsuario(usuarioLogueado);
            localStorage.setItem("usuario", JSON.stringify(usuarioLogueado));
        }
        catch (error) { console.error("Error al autenticar:", error); }
    }

    function logout() {
        setUsuario(null);
        localStorage.removeItem("usuario");
    }


    return (
        <AuthContext.Provider value={{ usuario, login: login, logout: logout }}>
            {children}
        </AuthContext.Provider>
    );
}
