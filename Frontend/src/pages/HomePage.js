import React, { useState } from 'react';
import './HomePage.css';
import './loginModal.css'; // Importamos los estilos del modal

const HomePage = () => {
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar modal
  const [view, setView] = useState('login'); // Estado para alternar entre login y registro
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

  // Función para abrir el modal y elegir la vista (login o register)
  const openModal = (viewType) => {
    setView(viewType);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Función para redirigir a la autenticación de Google
  const handleGoogleLogin = () => {
    // Redirige a la ruta del backend que inicia la autenticación con Google
    window.location.href = 'http://localhost:3000/auth/google'; // Ajusta la URL si es necesario
  };

  return (
    <div className="home-container">
      {/* Logo y título */}
      <section className="home-header">
        <img
          src="./logofundacion.png"
          alt="Fundación Ai Koi"
          className="home-logo"
        />
        <header className="home-header">
          <h1>Dar & Recibir</h1>
        </header>
      </section>

      {/* Descripción inicial */}
      <section className="home-title">
        <p>Apoyo y cuidado en cada etapa</p>
      </section>

      {/* Descripción */}
      <section className="home-description">
        <p>
          En la Fundación Ai Koi, ofrecemos asistencia y recursos adaptados a tus
          necesidades, para acompañarte y apoyarte en cada momento. Estamos aquí para ti.
        </p>
      </section>

      {/* Botones para iniciar sesión y crear cuenta */}
      <div className="home-buttons">
        <button className="btn-login" onClick={() => openModal('login')}>
          Iniciar Sesión
        </button>
        <button className="btn-register" onClick={() => openModal('register')}>
          Crear Cuenta
        </button>
      </div>

      {/* Modal de inicio de sesión y registro */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-left">
              <img
                src="./logofundacion.png"
                alt="Fundación Ai Koi"
                className="modal-logo"
              />
            </div>
            <div className="modal-right">
              {view === 'login' ? (
                <div>
                  <h2>Iniciar Sesión</h2>
                  <input
                    type="email"
                    placeholder="Ingresa tu correo electrónico"
                    className="input-field"
                  />
                  <div className="password-container">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Ingresa tu contraseña"
                      className="input-field"
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? 'Ocultar' : 'Mostrar'}
                    </button>
                  </div>
                  {/* Botón para autenticarse con Google */}
                  <button
                    className="btn-google"
                    onClick={handleGoogleLogin} // Función reutilizada para Google Login
                  >
                    <img
                      src="./google.png"
                      alt="Google Icon"
                      className="google-icon"
                    />
                    Iniciar sesión con Google
                  </button>

                  <p className="login-link">
                    ¿No tienes una cuenta?{' '}
                    <a href="#" onClick={() => setView('register')}>
                      Regístrate aquí
                    </a>
                  </p>
                </div>
              ) : (
                <div>
                  <h2>Crear Cuenta</h2>
                  <input
                    type="text"
                    placeholder="Ingresa tu Nombre"
                    className="input-field"
                  />
                  <input
                    type="email"
                    placeholder="Ingresa tu correo electrónico"
                    className="input-field"
                  />
                  {/* Botón para registrarse con Google */}
                  <button 
                    className="btn-google"
                    onClick={handleGoogleLogin} // Mismo flujo de autenticación para el registro
                  >
                    <img
                      src="./google.png" 
                      alt="Google Icon"
                      className="google-icon"
                    />
                    Registrarse con Google
                  </button>

                  <button className="register-btn">Siguiente</button>
                  <p className="register-link">
                    ¿Ya tienes una cuenta?{' '}
                    <a href="#" onClick={() => setView('login')}>
                      Inicia sesión aquí
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Ubicación y tutorial */}
      <section className="home-media">
        <div className="home-location">
          <p>Nuestra Ubicación</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3757.721890064961!2d-99.16936172628735!3d19.639184134054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f50dca49c49d%3A0x875fd45ba2858bac!2sFundaci%C3%B3n%20Ai%20Koi%20A.C.!5e0!3m2!1ses-419!2smx!4v1727810727485!5m2!1ses-419!2smx"
            width="100%"
            height="200px"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="home-map"
            title="Ubicación"
          ></iframe>
        </div>
        <div className="home-tutorial">
          <p>¿Cómo crear una cuenta?</p>
          <iframe
            src="url-del-video"
            className="home-video"
            title="Video tutorial"
          ></iframe>
        </div>
      </section>

      {/* Redes sociales */}
      <footer className="home-footer">
        <div className="social-icons">
        <a
            href="https://www.facebook.com/profile.php?id=100070034597140&mibextid=LQQJ4d"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="icon" src="./facebook.png" alt="Facebook" />
          </a>
          <a
            href="https://www.youtube.com/@fundacionaikoi7305"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="icon" src="./youtube.png" alt="YouTube" />
          </a>
          <a
            href="https://www.instagram.com/fundacionaikoi/?hl=es-la"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="icon" src="./instagram.png" alt="Instagram" />
          </a>
          <a
            href="https://www.tiktok.com/@fundacion-ai-koi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="icon" src="./tik-tok (1).png" alt="TikTok" />
          </a>
          <a
            href="https://twitter.com/fundacionaikoi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="icon" src="./twiter.png" alt="Twitter" />
          </a>
          <a href="mailto:fundacion.aikoi@gmail.com" target="_blank">
            <img className="icon" src="./gmail.png" alt="Gmail" />
          </a>
          <a href="https://wa.me/525610152625" target="_blank">
            <img className="icon" src="./whatsapp.png" alt="WhatsApp" />
          </a>
        </div>
        <p>Fundación Ai Koi - Términos y Condiciones - Aviso de Privacidad</p>
      </footer>
    </div>
  );
};

export default HomePage;
