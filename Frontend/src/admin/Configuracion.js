import React from 'react';
import './stylesConfiguracion.css'; 

const UserConfig = () => {
  return (
    <div className="user-config-container">
      <header className="user-config-header">
        <nav>
          <ul className="user-config-nav">
            <li><a href="index.html"><u>Inicio</u></a></li>
            <li><a href="sobre-nosotros.html"><u>Sobre Nosotros</u></a></li>
            <li><a href="servicios.html"><u>Servicios</u></a></li>
            <li><a href="contacto.html"><u>Contacto</u></a></li>
          </ul>
        </nav>
      </header>

      <section className="config-section body-configuracion">
        <h1>Configuración de Usuario</h1>
        <form id="userConfigForm" action="/updateUser" method="POST">
          <div className="form-group">
            <label htmlFor="username">Nombre de usuario</label>
            <input type="text" id="username" name="username" defaultValue="admin" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input type="email" id="email" name="email" defaultValue="admin@domain.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Nueva Contraseña</label>
            <input type="password" id="password" name="password" placeholder="Ingrese nueva contraseña" />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirme la nueva contraseña" />
          </div>
          <button type="submit" className="save-btn">Guardar Cambios</button>
        </form>
      </section>
    </div>
  );
};

export default UserConfig;
