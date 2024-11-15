import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SeleccionBeneficiario.css';

const SeleccionBeneficiario = () => {
  const navigate = useNavigate();

  const handleBeneficiarySelection = (type) => {
    if (type === 'tercera-edad') {
      navigate('/registro-tercera-edad');
    } else if (type === 'discapacidad') {
      navigate('/registro-discapacidad');
    } else if (type === 'ninos-etapa-terminal') {
      navigate('/registro-nino');
    }
  };

  return (
    <div className="body-beneficiary">
      {/* Header */}
      <header className="beneficiary-header">
        <div className="header-content">
          <img src="../logo.png" alt="Fundación" className="fundacion-logo" />
          
          {/* Contenedor para los enlaces de navegación */}
          <nav className="beneficiary-nav">
            <ul className="beneficiary-nav-list">
              <li className="beneficiary-nav-item"><a href="/"><u>Inicio</u></a></li>
              <li className="beneficiary-nav-item"><a href="#"><u>Sobre Nosotros</u></a></li>
              <li className="beneficiary-nav-item"><a href="#"><u>Servicios</u></a></li>
              <li className="beneficiary-nav-item"><a href="#"><u>Contacto</u></a></li>
            </ul>
          </nav>

          <img src="../dar.png" alt="Fundación Dar" className="header-logo-right" />
        </div>
      </header>

      {/* Contenedor de selección de beneficiarios */}
      <div className="fullscreen-container">
        <div className="beneficiary-selection">
          <h1>Selecciona el Tipo de Beneficio</h1>
          <button 
            className="beneficiary-button" 
            onClick={() => handleBeneficiarySelection('tercera-edad')}
          >
            <span>Tercera Edad</span>
            <img src="../terceraEdad.png" alt="Tercera Edad" className="button-logo" />
          </button>
          <button 
            className="beneficiary-button" 
            onClick={() => handleBeneficiarySelection('discapacidad')}
          >
            <span>Discapacidad</span>
            <img src="../discapacidad.png" alt="Discapacidad" className="button-logo" />
          </button>
          <button 
            className="beneficiary-button" 
            onClick={() => handleBeneficiarySelection('ninos-etapa-terminal')}
          >
            <span>Niños en Etapa Terminal</span>
            <img src="../ninos.png" alt="Niños en Etapa Terminal" className="button-logo" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="beneficiary-footer">
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
        Fundación Ai Koi -<a href="../privacidad">Aviso de Privacidad</a>-<a href="../terminos">Términos y Condiciones</a>
      </footer>
    </div>
  );
};

export default SeleccionBeneficiario;