import React from 'react';
import './stylesUsuarios.css';

function Usuarios() {
  const eliminarUsuario = (idUsuario) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      fetch(`/eliminarUsuario/${idUsuario}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            alert('Usuario eliminado exitosamente');
            window.location.reload();
          } else {
            alert('Error al eliminar el usuario');
          }
        })
        .catch((error) => console.error('Error:', error));
    }
  };

  const modificarUsuario = (idUsuario) => {
    window.location.href = `/modificarUsuario/${idUsuario}`;
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <a href="index.html">
                <u>Inicio</u>
              </a>
            </li>
            <li>
              <a href="#">
                <u>Sobre Nosotros</u>
              </a>
            </li>
            <li>
              <a href="#">
                <u>Servicios</u>
              </a>
            </li>
            <li>
              <a href="#">
                <u>Contacto</u>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <section className="welcome-section">
        <div className="user-info">
          <img className="admin-icon" src="../usAD.png" alt="Icono de Admin" />
          <div className="search-bar">
            <input type="text" placeholder="Buscar..." />
            <button>
              <img src="../Buscar.png" alt="Buscar" height="20px" />
            </button>
          </div>
        </div>
        <br />
        <div className="admin-welcome">
          <p>Bienvenido: xx-xx! (ADMIN)</p>
        </div>
      </section>

      <section className="usuarios-panel">
        <div className="usuario-header">
          <img src="../Aministr.png" alt="Icono Admin" className="icono-admin" />
          <h1>USUARIOS</h1>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Buscar..." id="search" />
          <button className="search-btn">Buscar Usuario</button>
        </div>

        <div className="tabla-usuarios">
          <h3>Usuario y Datos a Modificar</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>A. Paterno</th>
                <th>A. Materno</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="tabla-usuarios-body">
              <tr>
                <td>1</td>
                <td>Juan</td>
                <td>Pérez</td>
                <td>López</td>
                <td>
                  <button
                    className="modify-btn"
                    onClick={() => modificarUsuario(1)}
                  >
                    Modificar
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => eliminarUsuario(1)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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
          Fundación Ai Koi · <a href="#">Términos y Condiciones</a> ·{' '}
          <a href="#">Aviso de Privacidad</a>
        </p>
      </footer>
    </div>
  );
}

export default Usuarios;
