import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function UserProfile() {
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
                    <h1>¡Bienvenido, {user.displayName}!</h1>
                    <p><strong>Email:</strong> {user.email}</p>
                    <img src={user.photo} alt="Foto de perfil" className="profile-photo" />

                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        capture="environment" 
                        className="file-input" 
                    />
                    <button onClick={handleUpload} className="upload-button">Actualizar foto de perfil</button>
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
                    <a href="https://www.facebook.com/Ai.Koi.oficial/" target="_blank" rel="noreferrer">
                        <img src="../facebook.png" alt="Facebook" className="social-icon" />
                    </a>
                    <a href="https://www.tiktok.com/@aikoiac" target="_blank" rel="noreferrer">
                        <img src="../tik-tok.png" alt="Tik-Tok" className="social-icon" />
                    </a>
                    <a href="https://twitter.com/FundacionAiKoi/status/1552848047675154432" target="_blank" rel="noreferrer">
                        <img src="../twiter.png" alt="Twitter" className="social-icon" />
                    </a>
                    <a href="https://www.instagram.com/fundacionaikoi/" target="_blank" rel="noreferrer">
                        <img src="../instagram.png" alt="Instagram" className="social-icon" />
                    </a>
                    <a href="https://wa.me/525610152625" target="_blank">
                        <img className="icon" src="../whatsapp.png" alt="WhatsApp" />
                    </a>
                    <a href="mailto:fundacion.aikoi@gmail.com"><img src="../Gmail.png" alt="Gmail" className="social-icon" /></a>
                    <a href="https://www.youtube.com/channel/UCDAO6QlG-OtKvWcZgra1rtQ" target="_blank" rel="noreferrer">
                        <img src="../youtube.png" alt="YouTube" className="social-icon" />
                    </a>
                    <a href="#" className="social-icon"><img src="../Linkedin.png" alt="Linkedin" /></a>
                </div>
                <p className="footer-text">Fundación Ai Koi · <a href="#">Términos y Condiciones</a> · <a href="#">Aviso de Privacidad</a></p>
            </footer>
        </div>
    );
}

export default UserProfile;
