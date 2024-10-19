import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginModal.css';

function Profile () {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:5000/auth/protected', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    navigate('/'); // Redirige a la página principal si no se puede obtener el usuario
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
                navigate('/'); // Redirige en caso de error
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setNewProfilePicture(file);
        }
    };

    const handleUpload = async () => {
        if (!newProfilePicture) return;

        const formData = new FormData();
        formData.append('profilePicture', newProfilePicture);

        try {
            const response = await fetch('http://localhost:5000/auth/updateProfilePicture', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser((prevUser) => ({ ...prevUser, photo: updatedUser.photo }));
            } else {
                console.error('Error al subir la imagen');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    if (loading) {
        return <p>Cargando información del usuario...</p>;
    }

    if (!user) {
        return <p>No se encontró información del usuario.</p>;
    }

    return (
        <div className="profile-container">
            <div className="profile-info">
                <h1>¡Bienvenido, {user.displayName}!</h1>
                <p><strong>Email:</strong> {user.email}</p>
                <img src={user.photo} alt="Foto de perfil" className="profile-photo" />
                <p><strong>Google ID:</strong> {user.googleId}</p>

                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    capture="environment" // Abre la cámara en dispositivos móviles
                />
                <button onClick={handleUpload}>Actualizar foto de perfil</button>
            </div>
        </div>
    );
};

export default Profile;
