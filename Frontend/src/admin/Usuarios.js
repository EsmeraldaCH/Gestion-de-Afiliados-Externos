import React from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesUsuarios.css'; // Asegúrate de importar los estilos adecuados

function Usuarios() {
  const navigate = useNavigate();

  const handleNavigation = (category) => {
    navigate(`/admin/Usuarios/${category}`);
  };

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
        <div className="admin-icon">
          <img src="../ADMING.png" alt="Icono de Admin" />
        </div>
        <h2>Usuarios Registrados</h2>
        <div className="category-buttons">
          <button onClick={() => handleNavigation('Ninos')} className="button-category">
            <img src="../ninos.png"/> Niños
          </button>
          <button onClick={() => handleNavigation('Discapacidad')} className="button-category">
            <img src="../discapacidad.png" /> Discapacidad
          </button>
          <button onClick={() => handleNavigation('TerceraEdad')} className="button-category">
            <img src="../terceraEdad.png" /> Tercera Edad
          </button>
        </div>
      </section>

      <footer className="home-footer">
        <div className="social-icons">
          <a href="https://www.facebook.com/profile.php?id=100070034597140&mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
            <img className="icon" src="../facebook.png" alt="Facebook" />
          </a>
          <a href="https://www.youtube.com/@fundacionaikoi7305" target="_blank" rel="noopener noreferrer">
            <img className="icon" src="../youtube.png" alt="YouTube" />
          </a>
          <a href="https://www.instagram.com/fundacionaikoi/?hl=es-la" target="_blank" rel="noopener noreferrer">
            <img className="icon" src="../instagram.png" alt="Instagram" />
          </a>
          <a href="https://www.tiktok.com/@aikoiac" target="_blank" rel="noopener noreferrer">
            <img className="icon" src="../tik-tok.png" alt="TikTok" />
          </a>
          <a href="https://twitter.com/fundacionaikoi" target="_blank" rel="noopener noreferrer">
            <img className="icon" src="../twiter.png" alt="Twitter" />
          </a>
          <a href="mailto:fundacion.aikoi@gmail.com" target="_blank">
            <img className="icon" src="../gmail.png" alt="Gmail" />
          </a>
          <a href="https://wa.me/525610152625" target="_blank">
            <img className="icon" src="../whatsapp.png" alt="WhatsApp" />
          </a>
        </div>
        Fundación Ai Koi - <a href="../privacidad">Aviso de Privacidad</a> - <a href="../terminos">Términos y Condiciones</a>
      </footer>
    </div>
  );
}

export default Usuarios;
