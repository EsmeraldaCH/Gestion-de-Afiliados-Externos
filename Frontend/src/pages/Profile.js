import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const navigate = useNavigate();

    // URL for the foundation's image
    const foundationImage = 'path/to/foundation/image.jpg'; // Update this path

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
                    navigate('/');
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
                navigate('/');
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
        <div className="body-container admin-container body-admin">
            <header className="admin-header">
                <nav className="admin-nav">
                    <ul className="admin-nav-list">
                        <li className="admin-nav-item"><a href="#"><u>Inicio</u></a></li>
                        <li className="admin-nav-item"><a href="#"><u>Sobre Nosotros</u></a></li>
                        <li className="admin-nav-item"><a href="#"><u>Servicios</u></a></li>
                        <li className="admin-nav-item"><a href="#"><u>Contacto</u></a></li>
                    </ul>
                </nav>
            </header>

            <section className="welcome-section">
                <div className="user-info">
                    <img src="./logofundacion.png" alt="Imagen de la Fundación" className="profile-photo" />  
                    <h1>¡Bienvenido, {user.displayName}!</h1>
                    <p><strong>Email:</strong> {user.email}</p>
                 
                </div>
            </section>

            <section className="admin-panel">
                <h2 className="admin-panel-title">Panel de Administración</h2>
                <div className="panel-items">
                    <a href="#" className="panel-item">
                        <p className="panel-item-text">Formulario General</p>
                    </a>
                    <a href="./AccountSecurity" className="panel-item">
                        <p className="panel-item-text">Seguridad de la Cuenta</p>
                    </a>
                </div>
            </section>

            <footer className="home-footer">
                <div className="social-media">
                    {/* Add social media icons here */}
                </div>
                <p className="footer-text">Fundación Ai Koi · <a href="#">Términos y Condiciones</a> · <a href="#">Aviso de Privacidad</a></p>
            </footer>
        </div>
    );
}

export default UserProfile;
