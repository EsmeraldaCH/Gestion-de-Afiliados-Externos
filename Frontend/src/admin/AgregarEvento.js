import React from 'react';
import './stylesEvento.css';

function AgregarEvento() {
  return (
    <div className="evento-container">
      <header className='header-evento'>
        <nav>
          <ul>
            <li><a href="#"><u>Inicio</u></a></li>
            <li><a href="#"><u>Sobre Nosotros</u></a></li>
            <li><a href="#"><u>Servicios</u></a></li>
            <li><a href="#"><u>Contacto</u></a></li>
          </ul>
        </nav>
      </header>

      <section className="event-section body-evento">
        <div className="left-side">
          <div className="user-icon">
            <img src="../ADMING.png" alt="Icono de Usuario" />
          </div>
          <h2>AGREGAR EVENTO</h2>
          <div className="search-bar">
            <input type="text" placeholder="Buscar" />
            <button>
              <img src="../Buscar.png" alt="Buscar" height="20px" />
            </button>
          </div>
          <div className="event-buttons">
            <button className="event-btn">VER EVENTOS</button>
            <button className="event-btn">TITULO DEL EVENTO</button>
            <button className="event-btn">DATOS DEL EVENTO</button>
            <button className="event-btn">DÍA DEL EVENTO</button>
            <button className="event-btn">LUGAR DEL EVENTO</button>
          </div>
        </div>

        <div className="right-side">
          <img src="../Eventosub.png" alt="Calendario" />
          <label htmlFor="file-upload">Subir foto o cartel</label>
          <input type="file" id="file-upload" />
          <button className="upload-btn">SUBIR EVENTO</button>
        </div>
      </section>

      <footer className="home-footer">
        <div className="social-icons">
        <a
            href="https://www.facebook.com/profile.php?id=100070034597140&mibextid=LQQJ4d"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="icon" src="../facebook.png" alt="Facebook" />
          </a>
          <a
            href="https://www.youtube.com/@fundacionaikoi7305"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="icon" src="../youtube.png" alt="YouTube" />
          </a>
          <a
            href="https://www.instagram.com/fundacionaikoi/?hl=es-la"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="icon" src="../instagram.png" alt="Instagram" />
          </a>
          <a
            href="https://www.tiktok.com/@aikoiac"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="icon" src="../tik-tok.png" alt="TikTok" />
          </a>
          <a
            href="https://twitter.com/fundacionaikoi"
            target="_blank"
            rel="noopener noreferrer"
          >
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

export default AgregarEvento;
