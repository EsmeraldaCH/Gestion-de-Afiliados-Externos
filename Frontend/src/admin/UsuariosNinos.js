import React, { useEffect, useState } from 'react';
import './UsuariosNinos.css'

function UsuariosNinos() {
  const [usuarios, setUsuarios] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Llamada al backend para obtener la lista de niños
    fetch('http://localhost:5000/api/ninos')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then((data) => setUsuarios(data))  // `setUsuarios` debería actualizar el estado con los datos
      .catch((error) => console.error('Error:', error));
  }, []);

  // Función para manejar la búsqueda
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      alert(`Buscando: ${searchQuery}`);
    } else {
      alert("Por favor ingresa algo en la barra de búsqueda.");
    }
  };

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
            <li className="admin-nav-item"><a href="#"><u>Servicios</u></a></li>
            <li className="admin-nav-item"><a href="#"><u>Contacto</u></a></li>
          </ul>
        </nav>
      </header>

      {/* Barra de búsqueda */}
      <section className="welcome-section">
        <div className="user-info">
          <img className="admin-icon" src="/ADMING.png" alt="Icono de Admin" />
          <div className="search-bar">
            <input 
              type="text" 
              id="search-input" 
              className="search-input" 
              placeholder="Buscar..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
            <button 
              id="search-button" 
              className="search-button" 
              onClick={handleSearch}
            >
              <img src="/Buscar.png" alt="Buscar" height="20px" /> Buscar...
            </button>
          </div>
        </div>
      </section>

      {/* Usuarios - Niños */}
      <div className="container">
        <h2 className="section-title">Usuarios - Niños en Etapa Terminal</h2>

        {/* Datos Personales del Niño */}
        <div className="section">
          <h3 className="subsection-title">Datos Personales del Niño</h3>
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
                <th>Nivel de Estudios</th>
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
                  <td>{usuario.nivel_estudios}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Datos de Contacto y Dirección */}
        <div className="section">
          <h3 className="subsection-title">Datos de Contacto y Dirección</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Domicilio (Calle y Número)</th>
                <th>Colonia</th>
                <th>Municipio</th>
                <th>Estado</th>
                <th>Código Postal</th>
                <th>Referencia</th>
                <th>Teléfono Fijo</th>
                <th>Teléfono Fijo Extra</th>
                <th>Teléfono Móvil</th>
                <th>Teléfono Móvil Extra</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.map((usuario) => (
                <tr key={usuario.beneficiario_id}>
                  <td>{usuario.domicilio_calle_numero}</td>
                  <td>{usuario.colonia}</td>
                  <td>{usuario.municipio}</td>
                  <td>{usuario.estado}</td>
                  <td>{usuario.codigo_postal}</td>
                  <td>{usuario.referencia}</td>
                  <td>{usuario.telefono_fijo}</td>
                  <td>{usuario.telefono_fijo_extra}</td>
                  <td>{usuario.telefono_movil}</td>
                  <td>{usuario.telefono_movil_extra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Servicios de Vivienda y Servicios Comunitarios */}
        <div className="section">
          <h3 className="subsection-title">Servicios de Vivienda y Servicios Comunitarios</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Servicios de Vivienda</th>
                <th>Servicios Comunitarios</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.map((usuario) => (
                <tr key={usuario.beneficiario_id}>
                  <td>{usuario.servicios_vivienda}</td>
                  <td>{usuario.servicios_comunitarios}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Información Médica del Niño */}
        <div className="section">
          <h3 className="subsection-title">Información Médica del Niño</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Antecedentes Patológicos</th>
                <th>Servicios de Salud</th>
                <th>Informe Médico</th>
                <th>Historial Médico</th>
                <th>Certificados de Tratamientos Paliativos</th>
                <th>Descripción de Apoyo</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.map((usuario) => (
                <tr key={usuario.beneficiario_id}>
                  <td>{usuario.antecedentes_patologicos}</td>
                  <td>{usuario.servicios_salud}</td>
                  <td>
                    {usuario.informe_medico && (
                      <a href={getDocumentUrl(usuario.informe_medico)} target="_blank" rel="noopener noreferrer" className="link">
                        Ver Informe Médico
                      </a>
                    )}
                  </td>
                  <td>
                    {usuario.historial_medico && (
                      <a href={getDocumentUrl(usuario.historial_medico)} target="_blank" rel="noopener noreferrer" className="link">
                        Ver Historial Médico
                      </a>
                    )}
                  </td>
                  <td>
                    {usuario.certificados_tratamientos_paliativos && (
                      <a href={getDocumentUrl(usuario.certificados_tratamientos_paliativos)} target="_blank" rel="noopener noreferrer" className="link">
                        Ver Certificado de Tratamientos Paliativos
                      </a>
                    )}
                  </td>
                  <td>{usuario.descripcion_apoyo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Documentos del Niño y Tutor */}
        <div className="section">
          <h3 className="subsection-title">Documentos del Niño y Tutor</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Comprobante de Domicilio</th>
                <th>CURP Documento</th>
                <th>Documento de Identidad</th>
                <th>Declaración de Impuestos</th>
                <th>Comprobante de Ingresos</th>
                <th>Carta de Antecedentes No Penales</th>
                <th>Referencias Personales y Profesionales</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.map((usuario) => (
                <tr key={usuario.beneficiario_id}>
                  <td>
                    {usuario.comprobante_domicilio && (
                      <a href={getDocumentUrl(usuario.comprobante_domicilio)} target="_blank" rel="noopener noreferrer" className="link">
                        Ver Comprobante de Domicilio
                      </a>
                    )}
                  </td>
                  <td>
                    {usuario.curp_documento && (
                      <a href={getDocumentUrl(usuario.curp_documento)} target="_blank" rel="noopener noreferrer" className="link">
                        Ver Documento CURP
                      </a>
                    )}
                  </td>
                  <td>
                    {usuario.documento_identidad && (
                      <a href={getDocumentUrl(usuario.documento_identidad)} target="_blank" rel="noopener noreferrer" className="link">
                        Ver Documento de Identidad
                      </a>
                    )}
                  </td>
                  <td>
                    {usuario.declaracion_impuestos && (
                      <a href={getDocumentUrl(usuario.declaracion_impuestos)} target="_blank" rel="noopener noreferrer" className="link">
                        Ver Declaración de Impuestos
                      </a>
                    )}
                  </td>
                  <td>
                    {usuario.comprobante_ingresos && (
                      <a href={getDocumentUrl(usuario.comprobante_ingresos)} target="_blank" rel="noopener noreferrer" className="link">
                        Ver Comprobante de Ingresos
                      </a>
                    )}
                  </td>
                  <td>
                    {usuario.carta_antecedentes_no_penales && (
                      <a href={getDocumentUrl(usuario.carta_antecedentes_no_penales)} target="_blank" rel="noopener noreferrer" className="link">
                        Ver Carta de Antecedentes no Penales
                      </a>
                    )}
                  </td>
                  <td>
                    {usuario.referencias_personales_profesionales && (
                      <a href={getDocumentUrl(usuario.referencias_personales_profesionales)} target="_blank" rel="noopener noreferrer" className="link">
                        Ver Referencias
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
         {/* Botones de Editar y Eliminar */}
              <div className="action-buttons-container">
                <button 
                  className="action-button edit-button" 
                  onClick={() => handleEdit(usuario.beneficiario_id)}
                 >
                      Editar Usuario
               </button>
               <button 
                  className="action-button delete-button" 
                  onClick={() => handleDelete(usuario.beneficiario_id)}
               >
                      Eliminar Usuario
               </button>
              </div>        
              
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

export default UsuariosNinos;

