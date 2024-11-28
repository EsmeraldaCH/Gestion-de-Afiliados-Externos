import React from 'react';
import './adminStyles.css';

function AdminDashboard({ isPrincipal, adminName }) {
  const handleSearch = () => {
    const searchQuery = document.getElementById('search-input').value;
    if (searchQuery.trim() !== "") {
      alert(`Buscando: ${searchQuery}`);
    } else {
      alert("Por favor ingresa algo en la barra de búsqueda.");
    }
  };

  return (
    <div className="body-container admin-container body-admin">
      <header className="admin-header">
        <nav className="admin-nav">
          <ul className="admin-nav-list">
            <div className="header">
              <img src="../logo.png" alt="Fundación" className="fundacion-logo" />
            </div>
            <li className="admin-nav-item"><a href="#"><u>Inicio</u></a></li>
            <li className="admin-nav-item"><a href="#"><u>Sobre Nosotros</u></a></li>
            <li className="admin-nav-item"><a href="#"><u>Servicios</u></a></li>
            <li className="admin-nav-item"><a href="#"><u>Contacto</u></a></li>
          </ul>
        </nav>
      </header>

      <section className="welcome-section">
        <div className="admin-welcome">
          <p className="admin-welcome-text">
            Bienvenido {isPrincipal ? "Administrador Principal:" : "Administrador"} {adminName}
          </p>
        </div>
      </section>

      <section className="admin-panel">
        <a href="http://localhost:3000/admin/Usuarios" className="panel-item">
          <img src="../usAD.png" alt="Usuarios" className="panel-item-image" />
          <p className="panel-item-text">Usuarios</p>
        </a>

        <a href="http://localhost:3000/admin/EstadisticasAfiliados" className="panel-item">
          <img src="../Estadisticas.png" alt="Estadísticas" className="panel-item-image" />
          <p className="panel-item-text">Estadísticas</p>
          </a>
        <a href="http://localhost:3000/admin/Configuracion" className="panel-item">
          <img src="../Configuracion.png" alt="Configuración" className="panel-item-image" />
          <p className="panel-item-text">Configuración</p>
        </a>
        
        {/* Solo mostrar el botón de Agregar Administrador si es admin principal */}
        {Boolean(isPrincipal) && (
          <a href="http://localhost:3000/admin/AddAdmin" className="panel-item">
            <img src="../agregaradmin.png" alt="AddAdmin" className="panel-item-image" />
            <p className="panel-item-text">Administradores</p>
          </a>
        )}
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

export default AdminDashboard;