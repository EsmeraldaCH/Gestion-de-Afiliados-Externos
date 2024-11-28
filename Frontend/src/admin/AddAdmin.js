import React, { useState, useEffect } from 'react';
import './AddAdmin.css';

function AddAdmin() {
  // Estados para los detalles del nuevo administrador
  const [adminDetails, setAdminDetails] = useState({
    nombre: '',
    correo: '',
    curp: '',
    contraseña: ''
  });

  // Estado para la lista de administradores
  const [adminList, setAdminList] = useState({ activos: [], inactivos: [] });

  // Estado para la alerta
  const [showAlert, setShowAlert] = useState(false);  // Agregar estado para la alerta
  const [password, setPassword] = useState("");        // Agregar estado para la contraseña
  const [selectedAdmin, setSelectedAdmin] = useState(null); // Para saber qué administrador se está desactivando
  const [alertMessage, setAlertMessage] = useState(null);  // Mensaje de alerta

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/list');
        const data = await response.json();
        setAdminList(data);
      } catch (error) {
        console.error('Error al obtener la lista de administradores:', error);
      }
    };
    fetchAdmins();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails({ ...adminDetails, [name]: value });
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if (!adminDetails.nombre || !adminDetails.correo || !adminDetails.curp || !adminDetails.contraseña) {
      setAlertMessage('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/admin/add-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminDetails)
      });

      const data = await response.json();
      if (response.ok) {
        setAlertMessage('Administrador agregado correctamente');
        setAdminDetails({ nombre: '', correo: '', curp: '', contraseña: '' });
  
        // Recargar la página después de mostrar la alerta
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Esperar 2 segundos antes de recargar
      } else {
        setAlertMessage(data.error || 'Hubo un error al agregar el administrador.');
      }
    } catch (error) {
      console.error('Error al agregar el administrador:', error);
      setAlertMessage('Error al agregar el administrador.');
    }
  };

  const handleDeactivateClick = (adminId) => {
    setSelectedAdmin(adminId);
    setShowAlert(true);  // Mostrar alerta personalizada
  };

  const handleDeactivateConfirm = async () => {
    if (!password) {
      setAlertMessage("Por favor, ingrese su contraseña."); // Mensaje de error personalizado
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/admin/deactivate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId: selectedAdmin, principalPassword: password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Mostrar mensaje de éxito
        setAlertMessage("Se dio de baja correctamente.");
        setShowAlert(false); // Cerrar la ventana de confirmación
        setTimeout(() => {
          window.location.reload(); // Recarga la página después de mostrar el mensaje
        }, 2000); // Esperar 2 segundos antes de recargar
      } else {
        // Mostrar error devuelto por el backend
        setAlertMessage(data.message || "Ocurrió un error al desactivar al administrador.");
      }
    } catch (error) {
      console.error("Error al desactivar al administrador:", error);
      setAlertMessage("Ocurrió un error inesperado.");
    } finally {
      setPassword(""); // Limpiar el campo de contraseña
    }
  };
  
  

  // Función para cerrar la alerta
  const closeAlert = () => {
    setShowAlert(false);  // Cerrar alerta
  };

  return (
    <div className="body-container admin-container">
      <header className="admin-header">
        <nav className="admin-nav">
          <ul className="admin-nav-list">
            <li className="admin-nav-item"><a href="#">Inicio</a></li>
            <li className="admin-nav-item"><a href="#">Sobre Nosotros</a></li>
            <li className="admin-nav-item"><a href="#">Servicios</a></li>
            <li className="admin-nav-item"><a href="#">Contacto</a></li>
          </ul>
        </nav>
      </header>

      <div className="admin-container-administrador">
      <section className="admin-section active-admins">
        <h2>Administradores Activos</h2>
        <ul className="admin-list">
          {adminList.activos.map((admin, index) => (
            <li key={admin.id} className="admin-item">
               {/* Mostrar el botón solo si no es el primer administrador */}
              <p><strong>Nombre: </strong> {admin.nombre}</p>
              <p><strong>Correo: </strong> {admin.correo}</p>
              <p><strong>CURP: </strong> {admin.curp}</p>
              <p><strong>Estado: </strong> {admin.estado}</p>
              {index === 0 && (
             <p><strong>Administrador: </strong>Principal </p>
              )}
              {/* Mostrar el botón solo si no es el primer administrador */}
              {index !== 0 && (
                <button 
                  onClick={() => handleDeactivateClick(admin.id)}
                  className="btn-deactivate-admin"
                >
                  Desactivar
                </button>
              )}
            </li>
          ))}
        </ul>
        </section>
        <section className="admin-section inactive-admins">
        <h2>Administradores Inactivos</h2>
        <ul className="admin-list inactive">
          {adminList.inactivos.map((admin) => (
            <li key={admin.id} className="admin-item">
              <p><strong>Nombre: </strong> {admin.nombre}</p>
              <p><strong>Correo:</strong> {admin.correo}</p>
              <p><strong>CURP:</strong> {admin.curp}</p>
              <p><strong>Estado:</strong> {admin.estado}</p>
            </li>
          ))}
        </ul>
        </section>


      <section className="admin-section add-admin">
        <form onSubmit={handleAddAdmin} className="usuarios-panel-admin">
          <h2>Agregar Administrador</h2>

          <input
            type="text"
            name="nombre"
            placeholder="Nombre del Administrador"
            value={adminDetails.nombre}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={adminDetails.correo}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="curp"
            placeholder="CURP"
            value={adminDetails.curp}
            onChange={handleInputChange}
            maxLength="18"
            required
          />
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            value={adminDetails.contraseña}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="button-usuario-admin">Agregar Administrador</button>
        </form>
      </section>

      </div>


{/* Alerta personalizada de confirmación */}
{showAlert && (
  <div className="custom-alert">
    <div className="alert-content">
      <h2>Confirmar Desactivación</h2>
      <p>Ingrese su contraseña para confirmar la desactivación del administrador.</p>
      <input
        type="password"
        placeholder="Ingrese su contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="alert-input"
      />
      <div className="alert-buttons">
        <button onClick={handleDeactivateConfirm} className="btn-confirm">
          Aceptar
        </button>
        <button onClick={closeAlert} className="btn-cancel">
          Cancelar
        </button>
      </div>
    </div>
  </div>
)}

{/* Alerta personalizada para mostrar mensajes */}
{alertMessage && (
  <div className="custom-alert-message">
    <p>{alertMessage}</p>
  </div>
)}


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
