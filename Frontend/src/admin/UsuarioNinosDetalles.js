import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UsuarioDetalles.css'; // Asegúrate de tener el archivo de estilos correcto

function UsuarioNinosDetalles() {
    const { id } = useParams(); // Obtener el ID del niño desde la URL
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook para redireccionar
    const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal
    const [showAlert, setShowAlert] = useState(false); // Nuevo estado para la alerta


    useEffect(() => {
        // Llamada al backend para obtener los detalles del niño
        fetch(`http://localhost:5000/api/ninos/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del usuario');
                }
                return response.json();
            })
            .then((data) => {
                setUsuario(data);
                setError(null);
            })
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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

    // Función para manejar la redirección
    const handleBack = () => {
        navigate('/admin/Usuarios/Ninos'); // Regresa a la lista de usuarios
    };


    const handleDelete = () => {
        setShowModal(true); // Mostrar el modal de confirmación
    };

    const handleConfirmDelete = () => {
        fetch(`http://localhost:5000/api/beneficiarios/${id}`, {
          method: 'DELETE'
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al eliminar el usuario');
          }
          return response.json();
        })
        .then(() => {
          setShowModal(false); // Cerrar el modal de confirmación
          setShowAlert(true); // Mostrar la alerta personalizada
          
          // Esperar 2 segundos antes de redirigir
          setTimeout(() => {
            setShowAlert(false);
            navigate('/admin/Usuarios/Ninos');
          }, 2000);
        })
        .catch((error) => {
          alert('Hubo un problema al eliminar el usuario: ' + error.message);
        });
      };
    
      const handleCancelDelete = () => {
        setShowModal(false);
      };

    return (
        <div className="hola">
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
        
        <div className="document-container">

            <div className="usuario-detalles-container">
                <div className="usuario-detalles-header">

                <div className="delete-button-container">
        <button onClick={handleDelete} className="delete-button">
          Eliminar Usuario
        </button>
      </div>
                <h1 className="title">Expediente de Usuario - Niño</h1>
                
                <div className="header-right">
                    <button onClick={handleBack} className="back-button">Volver a la lista</button>
                </div>
            </div>

                <div className="usuario-detalles-container">
                    {/* Sección de Datos Personales y la Imagen de Perfil */}
                    <div className="personal-data-section">
                        <div className="left-column">
                            
                            {/* Contenedor de la Imagen de Perfil */}
                            <div className="section">    
                                <h3 className="subsection-title">Foto de Perfil</h3>
                                <div className="profile-image-container">
                                    {/* Mostrar la imagen de perfil si existe */}
                                    {usuario.foto_perfil && (
                                        <img 
                                            src={getImageUrl(usuario.foto_perfil)} 
                                            alt={`Perfil de ${usuario.nombre}`} 
                                            className="profile-photo" 
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="right-column">
                            {/* Datos Personales */}
                            <div className="section">
                                <h3 className="subsection-title">Datos Personales</h3>
                                <p><strong>Nombre: </strong> {usuario.nombre || 'No disponible'}</p>
                                <p><strong>Apellido Paterno: </strong> {usuario.apellido_paterno || 'No disponible'}</p>
                                <p><strong>Apellido Materno: </strong> {usuario.apellido_materno || 'No disponible'}</p>
                                <p><strong>Edad: </strong> {usuario.edad || 'No disponible'}</p>
                                <p><strong>Sexo: </strong> {usuario.sexo || 'No disponible'}</p>
                                <p><strong>Fecha de Nacimiento: </strong> {usuario.fecha_nacimiento ? new Date(usuario.fecha_nacimiento).toISOString().split('T')[0] : ''}</p>
                                <p><strong>CURP: </strong> {usuario.curp || 'No disponible'}</p>
                                <p><strong>Nivel de Estudios: </strong> {usuario.nivel_estudios || 'No disponible'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Contenedor de dos columnas para la Información Adicional */}
                    <div className="two-column-layout">
                        
                        {/* Columna de la izquierda */}
                        <div className="left-column">
                            {/* Datos de Contacto y Dirección */}
                            <div className="section">
                                <h3 className="subsection-title">Datos de Contacto y Dirección</h3>
                                <p><strong>Domicilio (Calle y Número): </strong> {usuario.domicilio_calle_numero || 'No disponible'}</p>
                                <p><strong>Colonia: </strong> {usuario.colonia || 'No disponible'}</p>
                                <p><strong>Municipio: </strong> {usuario.municipio || 'No disponible'}</p>
                                <p><strong>Estado: </strong> {usuario.estado || 'No disponible'}</p>
                                <p><strong>Código Postal: </strong> {usuario.codigo_postal || 'No disponible'}</p>
                                <p><strong>Referencia: </strong> {usuario.referencia || 'No disponible'}</p>
                                <p><strong>Teléfono Fijo: </strong> {usuario.telefono_fijo || 'No disponible'}</p>
                                <p><strong>Teléfono Fijo Extra: </strong> {usuario.telefono_fijo_extra || 'No disponible'}</p>
                                <p><strong>Teléfono Móvil: </strong> {usuario.telefono_movil || 'No disponible'}</p>
                                <p><strong>Teléfono Móvil Extra: </strong> {usuario.telefono_movil_extra || 'No disponible'}</p>
                            </div>

                            {/* Servicios de Vivienda y Servicios Comunitarios */}
                            <div className="section">
                                <h3 className="subsection-title">Servicios de Vivienda y Servicios Comunitarios</h3>
                                <p><strong>Servicios de Vivienda: </strong> {usuario.servicios_vivienda || 'No disponible'}</p>
                                <p><strong>Servicios Comunitarios: </strong> {usuario.servicios_comunitarios || 'No disponible'}</p>
                            </div>

                        {/* Servicios de Vivienda y Servicios Comunitarios */}
                        <div className="section">
                                <h3 className="subsection-title">Descripción del Apoyo</h3>
                                <p><strong></strong>{usuario.descripcion_apoyo || 'No disponible'}</p>
                            </div>
                        </div>

                        {/* Columna de la derecha */}
                        <div className="right-column">
                            {/* Información Médica */}
                            <div className="section">
                                <h3 className="subsection-title">Información Médica</h3>
                                <p><strong>Antecedentes Patológicos: </strong> {usuario.antecedentes_patologicos || 'No disponible'}</p>
                                <p><strong>Servicios de Salud: </strong> {usuario.servicios_salud || 'No disponible'}</p>
                                <p><strong>Informe Médico: </strong> 
                                    {usuario.informe_medico && (
                                        <a href={getDocumentUrl(usuario.informe_medico)} target="_blank" rel="noopener noreferrer">Ver Informe Médico</a>
                                    )}
                                </p>
                                <p><strong>Historial Médico: </strong> 
                                    {usuario.historial_medico && (
                                        <a href={getDocumentUrl(usuario.historial_medico)} target="_blank" rel="noopener noreferrer">Ver Historial Médico</a>
                                    )}
                                </p>
                                <p><strong>Certificados de Tratamientos Paliativos: </strong> 
                                    {usuario.certificados_tratamientos_paliativos && (
                                        <a href={getDocumentUrl(usuario.certificados_tratamientos_paliativos)} target="_blank" rel="noopener noreferrer">Ver Certificado</a>
                                    )}
                                </p>
                            </div>

                            {/* Documentos del Niño y Tutor */}
                            <div className="section">
                                <h3 className="subsection-title">Documentos del Niño y Tutor</h3>
                                <p><strong>Comprobante de Domicilio: </strong> 
                                    {usuario.comprobante_domicilio && (
                                        <a href={getDocumentUrl(usuario.comprobante_domicilio)} target="_blank" rel="noopener noreferrer">Ver Comprobante de Domicilio</a>
                                    )}
                                </p>
                                <p><strong>CURP Documento: </strong> 
                                    {usuario.curp_documento && (
                                        <a href={getDocumentUrl(usuario.curp_documento)} target="_blank" rel="noopener noreferrer">Ver Documento CURP</a>
                                    )}
                                </p>
                                <p><strong>Documento de Identidad: </strong> 
                                    {usuario.documento_identidad && (
                                        <a href={getDocumentUrl(usuario.documento_identidad)} target="_blank" rel="noopener noreferrer">Ver Documento de Identidad</a>
                                    )}
                                </p>
                                <p><strong>Declaración de Impuestos: </strong> 
                                    {usuario.declaracion_impuestos && (
                                        <a href={getDocumentUrl(usuario.declaracion_impuestos)} target="_blank" rel="noopener noreferrer">Ver Declaración de Impuestos</a>
                                    )}
                                </p>
                                <p><strong>Comprobante de Ingresos: </strong> 
                                    {usuario.comprobante_ingresos && (
                                        <a href={getDocumentUrl(usuario.comprobante_ingresos)} target="_blank" rel="noopener noreferrer">Ver Comprobante de Ingresos</a>
                                    )}
                                </p>
                                <p><strong>Carta de Antecedentes No Penales: </strong> 
                                    {usuario.carta_antecedentes_no_penales && (
                                        <a href={getDocumentUrl(usuario.carta_antecedentes_no_penales)} target="_blank" rel="noopener noreferrer">Ver Carta</a>
                                    )}
                                </p>
                                <p><strong>Referencias Personales y Profesionales: </strong> 
                                    {usuario.referencias_personales_profesionales && (
                                        <a href={getDocumentUrl(usuario.referencias_personales_profesionales)} target="_blank" rel="noopener noreferrer">Ver Referencias</a>
                                    )}
                                </p>
                            </div>



                            
                        </div>                
                    </div>
                    </div>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirmación de Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar este usuario?</p>
            <div className="modal-actions">
            <button onClick={handleCancelDelete} className="modal-cancel-button">
                Cancelar
              </button>
              <button onClick={handleConfirmDelete} className="modal-confirm-button">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alerta personalizada */}
      {showAlert && (
        <div className="alert-overlay">
          <div className="alert-modal">
            <div className="alert-content">
              <h3>¡Éxito!</h3>
              <p>El usuario ha sido eliminado exitosamente</p>
            </div>
          </div>
        </div>
      )}
            </div>
        </div> 
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
        </div> ); 
        
}

export default UsuarioNinosDetalles;
