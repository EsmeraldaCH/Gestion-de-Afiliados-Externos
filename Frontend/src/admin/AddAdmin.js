import React, { useState } from 'react';
import './AddAdmin.css'; // Ensure you're importing the correct styles

function AddAdmin() {
  const [adminDetails, setAdminDetails] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails({ ...adminDetails, [name]: value });
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();
    if (adminDetails.email && adminDetails.password) {
      alert(`Nuevo administrador agregado: ${adminDetails.email}`);
      // Here you would typically send the data to your server
      setAdminDetails({ email: '', password: '' }); // Reset the form
    } else {
      alert("Por favor completa todos los campos.");
    }
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
        <form onSubmit={handleAddAdmin} className="usuarios-panel">
          <h2>Agregar Administrador</h2>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={adminDetails.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={adminDetails.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="button-usuario">Agregar Administrador</button>
        </form>
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

export default AddAdmin;
