// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Lista de usuarios predefinidos
    const predefinedUsers = [
        { username: 'admin', password: 'admin123' },
        { username: 'user', password: 'user123' },
    ];

    const [user, setUser] = useState(null); // Usuario autenticado
    const [error, setError] = useState(null);

    const login = (username, password) => {
        const validUser = predefinedUsers.find(
            (u) => u.username === username && u.password === password
        );
        if (validUser) {
            setUser(validUser);
            setError(null);
            return true;
        } else {
            setError('Nombre de usuario o contraseña incorrectos');
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        setError(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};
