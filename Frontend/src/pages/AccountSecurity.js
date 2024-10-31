import React, { useState } from 'react';
import './AccountSecurity.css'; // Asegúrate de que este archivo contenga los estilos

const AccountSecurity = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChangePassword = async (e) => {
        e.preventDefault();
        // Lógica para cambiar la contraseña
    };

    return (
        <div className="security-container">
            <header className="header-usuarios">
                <nav>
                    <ul className="usuarios-nav">
                        <li><a href="index.html"><u>Inicio</u></a></li>
                        <li><a href="#"><u>Sobre Nosotros</u></a></li>
                        <li><a href="#"><u>Servicios</u></a></li>
                        <li><a href="#"><u>Contacto</u></a></li>
                    </ul>
                </nav>
            </header>

            <h2 className="h2">Seguridad de la Cuenta</h2>
            <form className="change-password-form" onSubmit={handleChangePassword}>
                <input
                    type="password"
                    placeholder="Contraseña actual"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="password-input"
                />
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="password-input"
                />
                <button type="submit" className="submit-button">Actualizar Contraseña</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <footer className="usuarios-footer">
                <div className="social-media">
                    <a href="https://www.facebook.com/Ai.Koi.oficial/" target="_blank" rel="noreferrer">
                        <img src="../facebook.png" alt="Facebook" className="social-icon" height="30px" />
                    </a>
                    <a href="https://www.tiktok.com/@aikoiac" target="_blank" rel="noreferrer">
                        <img src="../tik-tok.png" alt="Tik-Tok" className="social-icon" height="30px" />
                    </a>
                    <a href="https://twitter.com/FundacionAiKoi/status/1552848047675154432" target="_blank" rel="noreferrer">
                        <img src="../twiter.png" alt="Twitter" className="social-icon" height="30px" />
                    </a>
                    <a href="https://www.instagram.com/fundacionaikoi/" target="_blank" rel="noreferrer">
                        <img src="../instagram.png" alt="Instagram" className="social-icon" height="30px" />
                    </a>
                    <a href="https://wa.me/525610152625" target="_blank">
                        <img className="icon" src="../whatsapp.png" alt="WhatsApp" height="30px" />
                    </a>
                    <a href="mailto:fundacion.aikoi@gmail.com"><img src="../Gmail.png" alt="Gmail" className="social-icon" height="30px" /></a>
                    <a href="https://www.youtube.com/channel/UCDAO6QlG-OtKvWcZgra1rtQ" target="_blank" rel="noreferrer">
                        <img src="../youtube.png" alt="YouTube" className="social-icon" height="30px" />
                    </a>
                    <a href="#" className="social-icon"><img src="../Linkedin.png" alt="Linkedin" height="30px" /></a>
                </div>
                <p className="footer-text">Fundación Ai Koi · <a href="#">Términos y Condiciones</a> · <a href="#">Aviso de Privacidad</a></p>
            </footer>
        </div>
    );
};

export default AccountSecurity;
