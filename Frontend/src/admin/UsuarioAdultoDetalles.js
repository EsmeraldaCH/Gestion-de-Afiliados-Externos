import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UsuarioDetalles.css'; // Asegúrate de tener el archivo de estilos correcto

function UsuarioAdultoDetalles() {
    const { id } = useParams(); // Obtener el ID del niño desde la URL
    const [adulto, setAdulto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook para redireccionar
    const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal
    const [showAlert, setShowAlert] = useState(false); // Nuevo estado para la alerta


    useEffect(() => {
        // Llamada al backend para obtener los detalles del niño
        fetch(`http://localhost:5000/api/adulto/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del usuario');
                }
                return response.json();
            })
            .then((data) => {
                setAdulto(data);
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
        navigate('/admin/Usuarios/TerceraEdad'); // Regresa a la lista de usuarios
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
            navigate('/admin/Usuarios/TerceraEdad');
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
                <h1 className="title">Expediente de Usuario - Tercera Edad</h1>
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
                                    {adulto.foto_perfil && (
                                        <img 
                                            src={getImageUrl(adulto.foto_perfil)} 
                                            alt={`Perfil de ${adulto.nombre}`} 
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
                                <p><strong>Nombre: </strong> {adulto.nombre || 'No disponible'}</p>
                                <p><strong>Apellido Paterno: </strong> {adulto.apellido_paterno || 'No disponible'}</p>
                                <p><strong>Apellido Materno: </strong> {adulto.apellido_materno || 'No disponible'}</p>
                                <p><strong>Edad: </strong> {adulto.edad || 'No disponible'}</p>
                                <p><strong>Sexo: </strong> {adulto.sexo || 'No disponible'}</p>
                                <p><strong>Estado Civil: </strong> {adulto.estado_civil || 'No disponible'}</p>
                                <p><strong>Hijos: </strong> {adulto.hijos || 'No disponible'}</p>
                                <p><strong>Ocupación: </strong> {adulto.ocupacion || 'No disponible'}</p>
                                <p><strong>Fecha de Nacimiento: </strong> {adulto.fecha_nacimiento ? new Date(adulto.fecha_nacimiento).toISOString().split('T')[0] : ''}</p>
                                <p><strong>CURP: </strong> {adulto.curp || 'No disponible'}</p>
                                <p><strong>Nivel de Estudios: </strong> {adulto.nivel_estudios || 'No disponible'}</p>
                                <p><strong>Número Identificacion Fiscal: </strong> {adulto.numero_identificacion_fiscal || 'No disponible'}</p>

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
                                <p><strong>Domicilio (Calle y Número): </strong> {adulto.domicilio_calle_numero || 'No disponible'}</p>
                                <p><strong>Colonia: </strong> {adulto.colonia || 'No disponible'}</p>
                                <p><strong>Municipio: </strong> {adulto.municipio || 'No disponible'}</p>
                                <p><strong>Estado: </strong> {adulto.estado || 'No disponible'}</p>
                                <p><strong>Código Postal: </strong> {adulto.codigo_postal || 'No disponible'}</p>
                                <p><strong>Referencia: </strong> {adulto.referencia || 'No disponible'}</p>
                                <p><strong>Teléfono Fijo: </strong> {adulto.telefono_fijo || 'No disponible'}</p>
                                <p><strong>Teléfono Fijo Extra: </strong> {adulto.telefono_fijo_extra || 'No disponible'}</p>
                                <p><strong>Teléfono Móvil: </strong> {adulto.telefono_movil || 'No disponible'}</p>
                                <p><strong>Teléfono Móvil Extra: </strong> {adulto.telefono_movil_extra || 'No disponible'}</p>
                            </div>

                            {/* Servicios de Vivienda y Servicios Comunitarios */}
                            <div className="section">
                                <h3 className="subsection-title">Servicios de Vivienda y Servicios Comunitarios</h3>
                                <p><strong>Servicios de Vivienda: </strong> {adulto.servicios_vivienda || 'No disponible'}</p>
                                <p><strong>Servicios Comunitarios: </strong> {adulto.servicios_comunitarios || 'No disponible'}</p>
                            </div>

                        {/* Servicios de Vivienda y Servicios Comunitarios */}
                        <div className="section">
                                <h3 className="subsection-title">Descripción del Apoyo</h3>
                                <p><strong></strong>{adulto.descripcion_apoyo || 'No disponible'}</p>
                            </div>
                        </div>

                        {/* Columna de la derecha */}
                        <div className="right-column">
                            {/* Información Médica */}
                            <div className="section">
                                <h3 className="subsection-title">Información Médica</h3>
                                <p><strong>Antecedentes Patológicos: </strong> {adulto.antecedentes_patologicos || 'No disponible'}</p>
                                <p><strong>Servicios de Salud: </strong> {adulto.servicios_salud || 'No disponible'}</p>
                                
                            </div>

                            {/* Documentos del Niño y Tutor */}
                            <div className="section">
                                <h3 className="subsection-title">Documentos del adulto</h3>
                                <p><strong>Comprobante de Domicilio: </strong> 
                                    {adulto.comprobante_domicilio && (
                                        <a href={getDocumentUrl(adulto.comprobante_domicilio)} target="_blank" rel="noopener noreferrer">Ver Comprobante de Domicilio</a>
                                    )}
                                </p>
                                <p><strong>CURP Documento: </strong> 
                                    {adulto.curp_documento && (
                                        <a href={getDocumentUrl(adulto.curp_documento)} target="_blank" rel="noopener noreferrer">Ver Documento CURP</a>
                                    )}
                                </p>
                                <p><strong>Documento de Identidad: </strong> 
                                    {adulto.documento_identidad && (
                                        <a href={getDocumentUrl(adulto.documento_identidad)} target="_blank" rel="noopener noreferrer">Ver Documento de Identidad</a>
                                    )}
                                </p>
                                <p><strong>Declaración de Impuestos: </strong> 
                                    {adulto.declaracion_impuestos && (
                                        <a href={getDocumentUrl(adulto.declaracion_impuestos)} target="_blank" rel="noopener noreferrer">Ver Declaración de Impuestos</a>
                                    )}
                                </p>
                                <p><strong>Comprobante de Ingresos: </strong> 
                                    {adulto.comprobante_ingresos && (
                                        <a href={getDocumentUrl(adulto.comprobante_ingresos)} target="_blank" rel="noopener noreferrer">Ver Comprobante de Ingresos</a>
                                    )}
                                </p>
                                <p><strong>Carta de Antecedentes No Penales: </strong> 
                                    {adulto.carta_antecedentes_no_penales && (
                                        <a href={getDocumentUrl(adulto.carta_antecedentes_no_penales)} target="_blank" rel="noopener noreferrer">Ver Carta</a>
                                    )}
                                </p>
                                <p><strong>Referencias Personales y Profesionales: </strong> 
                                    {adulto.referencias_personales_profesionales && (
                                        <a href={getDocumentUrl(adulto.referencias_personales_profesionales)} target="_blank" rel="noopener noreferrer">Ver Referencias</a>
                                    )}
                                </p>
                                <p><strong>Certificados Académicos: </strong> 
                                    {adulto.certificados_academicos && (
                                        <a href={getDocumentUrl(adulto.certificados_academicos)} target="_blank" rel="noopener noreferrer">Ver Certificados</a>
                                    )}
                                </p>
                                <p><strong>Diplomas y Títulos: </strong> 
                                    {adulto.diplomas_titulos && (
                                        <a href={getDocumentUrl(adulto.diplomas_titulos)} target="_blank" rel="noopener noreferrer">Ver Diplomas y Títulos</a>
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
        </div>
    );
}

export default UsuarioAdultoDetalles;
