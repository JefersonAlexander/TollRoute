// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserData } from '../services/authenticationService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Verificar la autenticación del usuario
    const checkAuth = async () => {
        const userData = await getUserData();
        setUser(userData);
    };

    // Ejecutar `checkAuth` al cargar el componente
    useEffect(() => {
        const fetchData = async () => {
            await checkAuth();
        };
        fetchData();
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
