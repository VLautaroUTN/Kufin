import { createContext, useContext, useState } from "react";


export interface Usuario {
    nombre: string;
    email: string;
    foto: string;
    usuarioId: string;
}


interface AuthContextType {
    usuario: Usuario | null;
    login: (usuario: Usuario) => void; 
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);


export const useAuth = () => useContext(AuthContext);


export function AuthProvider({ children }: { children: React.ReactNode }) 
{
    const [usuario, setUsuario] = useState<Usuario | null> (null);
    function Login(user: Usuario) {
        setUsuario(user);
        localStorage.setItem("usuario", JSON.stringify(user));
    }

    function Logout() {
        setUsuario(null);
        localStorage.removeItem("usuario");
    }
    
    return (
        <AuthContext.Provider value={{ usuario, login: Login, logout: Logout }}>
            {children}
        </AuthContext.Provider>
    );
}