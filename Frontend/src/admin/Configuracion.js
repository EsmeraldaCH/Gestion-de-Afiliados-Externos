import React, { useState } from 'react';
import './stylesConfiguracion.css';

const UserConfig = () => {
  // Estado para los detalles del usuario
  const [userDetails, setUserDetails] = useState({
    nombre: 'Moisés', // Nombre por defecto
    correo: 'hola@gmail.com', // Correo por defecto
    contrasenaActual: '',
    nuevaContrasena: '',
    confirmarContrasena: ''
  });

  // Manejo de los cambios en los campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  // Función de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (userDetails.nuevaContrasena !== userDetails.confirmarContrasena) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Si no se cambia la contraseña, no la enviamos
    const dataToSubmit = {
      nombre: userDetails.nombre,
      correo: userDetails.correo,
      ...(userDetails.contrasenaActual && {
        contrasenaActual: userDetails.contrasenaActual,
        nuevaContrasena: userDetails.nuevaContrasena
      })
    };

    try {
      const response = await fetch('/updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSubmit)
      });

      const result = await response.json();
      
      if (response.ok) {
        alert('Cambios guardados correctamente');
      } else {
        alert(result.error || 'Error al guardar los cambios');
      }
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      alert('Hubo un problema al guardar los cambios');
    }
  };

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
        <form id="userConfigForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nombre de usuario</label>
            <input
              type="text"
              id="username"
              name="nombre"
              value={userDetails.nombre}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="correo"
              value={userDetails.correo}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña Actual</label>
            <input
              type="password"
              id="password"
              name="contrasenaActual"
              placeholder="Ingrese contraseña actual"
              value={userDetails.contrasenaActual}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">Nueva Contraseña</label>
            <input
              type="password"
              id="newPassword"
              name="nuevaContrasena"
              placeholder="Ingrese nueva contraseña"
              value={userDetails.nuevaContrasena}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmarContrasena"
              placeholder="Confirme la nueva contraseña"
              value={userDetails.confirmarContrasena}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="save-btn">Guardar Cambios</button>
        </form>
      </section>
    </div>
  );
};

export default UserConfig;
