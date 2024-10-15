import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // Importa useNavigate

    const handleLogin = () => {
        setIsLoading(true);
        
        // Redirige a la ruta de autenticación de Google
        window.open('http://localhost:5000/auth/google', '_self'); // Redirige a Google
    };

    return (
        <div>
            <button onClick={handleLogin} disabled={isLoading}>
                {isLoading ? 'Cargando...' : 'Continuar'}
            </button>
        </div>
    );
};

export default Login;

