import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const [usuarios, setUsuarios] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/api/ninos')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then((data) => setUsuarios(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  // Función para filtrar usuarios por búsqueda
  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    usuario.apellido_paterno.toLowerCase().includes(searchQuery.toLowerCase()) ||
    usuario.apellido_materno.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función para construir la URL de la imagen
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    return `http://localhost:5000/archivos/${imagePath.split('\\').pop()}`;
  };

  const getDocumentUrl = (docPath) => {
    if (!docPath) return null;
    return `http://localhost:5000/archivos/${docPath.split('\\').pop()}`;
  };

  return (
    <div className="body-container admin-container body-admin">
      {/* Header */}
      <header className="admin-header">
        <nav className="admin-nav">
          <ul className="admin-nav-list">
            <div className="header">
              <img src="/logo.png" alt="Fundación" className="fundacion-logo" />
            </div>
            <li className="admin-nav-item"><a href="#"><u>Inicio</u></a></li>
            <li className="admin-nav-item"><a href="#"><u>Sobre Nosotros</u></a></li>
            <li className="admin-nav-item"><a href="#"><u>Contacto</u></a></li>
            <li className="admin-nav-item"><a href="#"><u>Cerrar Sesión</u></a></li>
          </ul>
        </nav>
      </header>


      {/* Usuarios - Niños */}
      <div className="container">
        <h2 className="section-title">Bienvenido</h2>

        {/* Datos Personales del Niño */}
        <div className="section">
          <h3 className="subsection-title">Datos Personales</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Foto de Perfil</th>
                <th>Nombre</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Edad</th>
                <th>Sexo</th>
                <th>Fecha de Nacimiento</th>
                <th>CURP</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.map((usuario) => (
                <tr key={usuario.beneficiario_id}>
                  <td>
                    {usuario.foto_perfil && (
                      <img src={getImageUrl(usuario.foto_perfil)} alt={`Perfil de ${usuario.nombre}`} className="profile-photo" />
                    )}
                  </td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido_paterno}</td>
                  <td>{usuario.apellido_materno}</td>
                  <td>{usuario.edad}</td>
                  <td>{usuario.sexo}</td>
                  <td>{usuario.fecha_nacimiento ? new Date(usuario.fecha_nacimiento).toISOString().split('T')[0] : ''}</td>
                  <td>{usuario.curp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botones de Editar y Eliminar */}
        <div className="action-buttons-container">
          <button
            className="action-button edit-button"
            onClick={() => handleEdit(usuario.beneficiario_id)}
          >
            Actualizar Información
          </button>
          <button
            className="action-button delete-button"
            onClick={() => handleDelete(usuario.beneficiario_id)}
          >
            Eliminar Cuenta
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="home-footer">
        <div className="social-icons">
          <a href="https://www.facebook.com/profile.php?id=100070034597140&mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
            <img className="icon" src="/facebook.png" alt="Facebook" />
          </a>
          <a href="https://www.youtube.com/@fundacionaikoi7305" target="_blank" rel="noopener noreferrer">
            <img className="icon" src="/youtube.png" alt="YouTube" />
          </a>
          <a href="https://www.instagram.com/fundacionaikoi/?hl=es-la" target="_blank" rel="noopener noreferrer">
            <img className="icon" src="/instagram.png" alt="Instagram" />
          </a>
          <a href="https://www.tiktok.com/@aikoiac" target="_blank" rel="noopener noreferrer">
            <img className="icon" src="/tik-tok.png" alt="TikTok" />
          </a>
          <a href="https://twitter.com/fundacionaikoi" target="_blank" rel="noopener noreferrer">
            <img className="icon" src="/twiter.png" alt="Twitter" />
          </a>
          <a href="mailto:fundacion.aikoi@gmail.com" target="_blank">
            <img className="icon" src="/gmail.png" alt="Gmail" />
          </a>
          <a href="https://wa.me/525610152625" target="_blank">
            <img className="icon" src="/whatsapp.png" alt="WhatsApp" />
          </a>
        </div>
        Fundación Ai Koi-<a href="/privacidad">Aviso de Privacidad</a>-<a href="/terminos">Términos y Condiciones</a>
      </footer>
    </div>
  );
}

export default Profile;
