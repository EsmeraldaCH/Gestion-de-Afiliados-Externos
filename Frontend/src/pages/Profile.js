import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Profile';

function UsuarioPerfil() {
  const [usuario, setUsuario] = useState(null);
  const {usuarioId } = useParams(); // Obtener el ID del usuario desde la URL
  const navigate = useNavigate();

  useEffect(() => {
    // Llamada al backend para obtener los datos de un solo usuario
    fetch(`http://localhost:5000/api/ninos/${usuarioId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then((data) => setUsuario(data)) // Establecer el estado con los datos del usuario
      .catch((error) => console.error('Error:', error));
  }, [usuarioId]);

  // Función para manejar el clic en el botón "Ver más" (en este caso solo mostrará el perfil)
  const handleEdit = (id) => {
    navigate(`/editar/${id}`); // Redirigir a una página para editar el usuario
  };

  const handleDelete = (id) => {
    // Lógica para eliminar un usuario
    console.log("Eliminar usuario con ID:", id);
  };

  // Función para construir la URL de la imagen
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    return `http://localhost:5000/archivos/${imagePath.split('\\').pop()}`;
  };

  // Función para mostrar los documentos
  const getDocumentUrl = (docPath) => {
    if (!docPath) return null;
    return `http://localhost:5000/archivos/${docPath.split('\\').pop()}`;
  };

  if (!usuario) return <div>Cargando...</div>;

  return (
    <div className="body-container admin-container body-admin">
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

      {/* Información del usuario (perfil) */}
      <div className="container">
        <h2 className="section-title">Bienvenido a su Perfil</h2>

        {/* Datos Personales del Niño */}
        <div className="section">
          <h3 className="subsection-title">Datos Personales Niño (a)</h3>
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
              <tr>
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
                <th>Teléfono Móvil</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{usuario.domicilio_calle_numero}</td>
                <td>{usuario.colonia}</td>
                <td>{usuario.municipio}</td>
                <td>{usuario.estado}</td>
                <td>{usuario.codigo_postal}</td>
                <td>{usuario.referencia}</td>
                <td>{usuario.telefono_fijo}</td>
                <td>{usuario.telefono_movil}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Información Médica del Niño */}
        <div className="section">
          <h3 className="subsection-title">Información Médica</h3>
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
              <tr>
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
            </tbody>
          </table>
        </div>

        {/* Documentos del Niño y Tutor */}
        <div className="section">
          <h3 className="subsection-title">Documentos</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Comprobante de Domicilio</th>
                <th>CURP Documento</th>
                <th>Documento de Identidad</th>
                <th>Declaración de Impuestos</th>
                <th>Comprobante de Ingresos</th>
                <th>Carta de Antecedentes No Penales</th>
                <th>Referencias Personales</th>
              </tr>
            </thead>
            <tbody>
              <tr>
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
            </tbody>
          </table>
        </div>

        {/* Botones de Editar y Eliminar */}
        <div className="action-buttons-container">
          <button className="action-button edit-button" onClick={() => handleEdit(usuario.beneficiario_id)}>
            Editar Perfil
          </button>
          <button className="action-button delete-button" onClick={() => handleDelete(usuario.beneficiario_id)}>
            Eliminar Perfil
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

export default UsuarioPerfil;
