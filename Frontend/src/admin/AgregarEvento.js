import React from 'react';
import './stylesEvento.css';

function AgregarEvento() {
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

      <section className="event-section">
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

      <footer>
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
        <p>
          Fundación Ai Koi - <a href="#">Términos y Condiciones</a> - <a href="#">Aviso de Privacidad</a>
        </p>
      </footer>
    </div>
  );
}

export default AgregarEvento;
