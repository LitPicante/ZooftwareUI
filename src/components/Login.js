// src/components/Login.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
    const { login, error } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = login(username, password);
        if (success) {
            setUsername('');
            setPassword('');
            navigate('/');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="text-center">Iniciar Sesión</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="auth-input"
                        placeholder="Nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="auth-input"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="continue-btn">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
