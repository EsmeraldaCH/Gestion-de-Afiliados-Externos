import React, { useState } from 'react';

const Registro = () => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo, contraseña }),
            });

            const data = await response.text();
            if (response.ok) {
                alert('Registro exitoso');
            } else {
                alert(`Error: ${data}`);
            }
        } catch (error) {
            console.error('Error al registrar:', error);
            alert('Error al registrar');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                placeholder="Correo" 
                value={correo} 
                onChange={(e) => setCorreo(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Contraseña" 
                value={contraseña} 
                onChange={(e) => setContraseña(e.target.value)} 
            />
            <button type="submit">Registrar</button>
        </form>
    );
};

export default Registro;
