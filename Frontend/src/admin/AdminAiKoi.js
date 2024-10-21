import React, { useState } from 'react';
import './adminStyles.css';

function AdminAiKoi() {
  const handleSearch = () => {
    const searchQuery = document.getElementById('search-input').value;
    if (searchQuery.trim() !== "") {
      alert(`Buscando: ${searchQuery}`);
    } else {
      alert("Por favor ingresa algo en la barra de búsqueda.");
    }
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="#"><u>Inicio</u></a></li>
            <li><a href="#"><u>Sobre Nosotros</u></a></li>
            <li><a href="#"><u>Servicios</u></a></li>
            <li><a href="#"><u>Contacto</u></a></li>
          </ul>
        </nav>
      </header>

      <section className="welcome-section">
        <div className="user-info">
          <img className="admin-icon" src="../ADMING.png" alt="Icono de Admin" />
          <div className="search-bar">
            <input type="text" id="search-input" placeholder="Buscar..." />
            <button id="search-button" onClick={handleSearch}>
              <img src="../Buscar.png" alt="Buscar" height="10px" /> Buscar...
            </button>
          </div>
        </div>
        <br />
        <div className="admin-welcome">
          <p>Bienvenido: xx-xx! (ADMIN)</p>
        </div>
      </section>

      <section className="admin-panel">
        <a href="http://localhost:3000/admin/Usuarios" className="panel-item">
          <img src="../usAD.png" alt="Usuarios" />
          <p>Usuarios</p>
        </a>
        <a href="http://localhost:3000/admin/AgregarEvento" className="panel-item">
          <img src="../Evnto.png" alt="Agregar Evento" />
          <p>Agregar Evento</p>
        </a>
        <a href="estadisticas.html" className="panel-item">
          <img src="../Estadisticas.png" alt="Estadísticas" />
          <p>Estadísticas</p>
        </a>
        <a href="http://localhost:3000/admin/Configuracion" className="panel-item">
          <img src="../Configuracion.png" alt="Configuración" />
          <p>Configuración</p>
        </a>
      </section>

      <footer className="home-footer">
      <div className="social-media">
          <a href="https://www.facebook.com/Ai.Koi.oficial/" target="_blank" rel="noreferrer">
            <img src="../facebook.png" alt="Facebook" height="30px" />
          </a>
          <a href="https://www.tiktok.com/@aikoiac" target="_blank" rel="noreferrer">
            <img src="../tik-tok.png" alt="Tik-Tok" height="30px" />
          </a>
          <a href="https://twitter.com/FundacionAiKoi/status/1552848047675154432" target="_blank" rel="noreferrer">
            <img src="../twiter.png" alt="Twitter" height="30px" />
          </a>
          <a href="https://www.instagram.com/fundacionaikoi/" target="_blank" rel="noreferrer">
            <img src="../instagram.png" alt="Instagram" height="30px" />
          </a>
          <a href="https://wa.me/525610152625" target="_blank">
            <img className="icon" src="../whatsapp.png" alt="WhatsApp" height="30px" />
          </a>
          <a href="mailto:fundacion.aikoi@gmail.com"><img src="../Gmail.png" alt="Gmail" height="30px" /></a>
          <a href="https://www.youtube.com/channel/UCDAO6QlG-OtKvWcZgra1rtQ" target="_blank" rel="noreferrer">
            <img src="../youtube.png" alt="YouTube" height="30px" />
          </a>
          <a href="#"><img src="../Linkedin.png" alt="Linkedin" height="30px" /></a>
        </div>
        <p>Fundación Ai Koi · <a href="https://">Términos y Condiciones</a> · <a href="#">Aviso de Privacidad</a></p>
      </footer>
    </div>
  );
}

export default AdminAiKoi;
