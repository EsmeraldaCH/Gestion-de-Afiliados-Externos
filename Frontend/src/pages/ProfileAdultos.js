import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Profile.css';

function PerfilAdulto() {
  const [usuario, setUsuario] = useState(null);
  const { usuarioId } = useParams(); // Obtener el ID del usuario desde la URL
  const navigate = useNavigate();

  useEffect(() => {
    // Llamada al backend para obtener los datos de un solo usuario
    fetch(`http://localhost:5000/api/adulto/${usuarioId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then((data) => setUsuario(data)) // Establecer el estado con los datos del usuario
      .catch((error) => console.error('Error:', error));
  }, [usuarioId]);

  const handleEdit = (id) => {
    navigate(`/editarAdulto/${id}`); // Redirigir a una página para editar el usuario
  };

 // Ruta para eliminar un usuario por ID
 const handleDelete = (id) => {
  if (window.confirm('¿Estás seguro de que deseas eliminar tu cuenta?')) {
      fetch(`http://localhost:5000/api/beneficiarios/${id}`, {
          method: 'DELETE',
      })
          .then((response) => {
              if (!response.ok) {
                  throw new Error('Error al eliminar la cuenta');
              }
              return response.json();
          })
          .then((data) => {
              alert(data.message);
              // Redirigir a la página principal después de 3 segundos
              setTimeout(() => {
                  navigate('/');
              }, 1500);
          })
          .catch((error) => {
              console.error('Error:', error);
              alert('Hubo un problema al eliminar la cuenta');
          });
  }
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
        <h2 className="section-title">Bienvenido a su Perfil: {usuario.nombre}</h2>
        <h2 className="section-subtitle">Tercera Edad</h2>
        {/* Datos Personales del Usuario */}
        <div className="section">
        <h3 className="subsection-title">Datos Personales</h3>
  <table className="data-table">
    <thead>
      <tr>
        <th>Foto de Perfil</th>
        <th>Nombre</th>
        <th>Apellido Paterno</th>
        <th>Apellido Materno</th>
        <th>CURP</th>
        <th>Sexo</th>
        <th>Fecha de Nacimiento</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          {usuario.foto_perfil && (
            <img src={getImageUrl(usuario.foto_perfil)} className="profile-photo" />
          )}
        </td>
        <td>{usuario.nombre}</td>
        <td>{usuario.apellido_paterno}</td>
        <td>{usuario.apellido_materno}</td>
        <td>{usuario.curp}</td>
        <td>{usuario.sexo}</td>
        <td>{usuario.fecha_nacimiento ? new Date(usuario.fecha_nacimiento).toISOString().split('T')[0] : ''}</td>
      </tr>
    </tbody>
  </table>

  {/* Nueva fila con los siguientes 6 datos */}
  <table className="data-table">
    <thead>
      <tr>
        <th>Edad</th>
        <th>Nivel de Estudios</th>
        <th>Estado Civil</th>
        <th>Hijos</th>
        <th>Ocupación</th>
        <th>Número de Identificación</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{usuario.edad}</td>
        <td>{usuario.nivel_estudios}</td>
        <td>{usuario.estado_civil}</td>
        <td>{usuario.hijos}</td>
        <td>{usuario.ocupacion}</td>
        <td>{usuario.numero_identificacion_fiscal}</td>
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
                <th>Teléfono Fijo Extra</th>
                <th>Teléfono Móvil Extra</th>
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
                <td>{usuario.telefono_fijo_extra}</td>
                <td>{usuario.telefono_movil_extra}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Información Médica */}
        <div className="section">
          <h3 className="subsection-title">Información Adicional</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Antecedentes Patológicos</th>
                <th>Servicios de Salud</th>
                <th>Descripción de Apoyo</th>
                <th>Servicios de Vivienda</th>
                <th>Servicios Comunitarios</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{usuario.antecedentes_patologicos}</td>
                <td>{usuario.servicios_salud}</td>
                <td>{usuario.descripcion_apoyo}</td>
                <td>{usuario.servicios_vivienda}</td>
                <td>{usuario.servicios_comunitarios}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Documentos */}
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
                <th>Certificados Académicos</th>
                <th>Diplomas y Títulos</th>
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
                      Ver Carta de Antecedentes No Penales
                    </a>
                  )}
                </td>
                <td>
                  {usuario.referencias_personales_profesionales && (
                    <a href={getDocumentUrl(usuario.referencias_personales_profesionales)} target="_blank" rel="noopener noreferrer" className="link">
                      Ver Referencias Personales
                    </a>
                  )}
                </td>
                <td>
                  {usuario.certificados_academicos && (
                    <a href={getDocumentUrl(usuario.certificados_academicos)} target="_blank" rel="noopener noreferrer" className="link">
                      Ver Certificados Académicos
                    </a>
                  )}
                </td>
                <td>
                  {usuario.diplomas_titulos && (
                    <a href={getDocumentUrl(usuario.diplomas_titulos)} target="_blank" rel="noopener noreferrer" className="link">
                      Ver Diplomas y Títulos
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
          Editar Información 🔄
          </button>
          <button className="action-button delete-button" onClick={() => handleDelete(usuario.beneficiario_id)}>
          Eliminar Cuenta 🗑️ 
          </button>
        </div>
      </div>
    </div>
  );
}

export default PerfilAdulto;
