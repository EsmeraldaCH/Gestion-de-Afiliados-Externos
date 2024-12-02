import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UsuarioDetalles.css'; // Asegúrate de tener el archivo de estilos correcto

function UsuarioDiscapacidadDetalles() {
    const { id } = useParams(); // Obtener el ID del niño desde la URL
    const [discapacidad, setDiscapacidad] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook para redireccionar
    const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal
    const [showAlert, setShowAlert] = useState(false); // Nuevo estado para la alerta


    useEffect(() => {
        // Llamada al backend para obtener los detalles del niño
        fetch(`http://localhost:5000/api/discapacidad/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del usuario');
                }
                return response.json();
            })
            .then((data) => {
                setDiscapacidad(data);
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
        navigate('/admin/Usuarios/Discapacidad'); // Regresa a la lista de usuarios
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
                <h1 className="title">Expediente de Usuario - Discapacidad</h1>
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
                                    {discapacidad.foto_perfil && (
                                        <img 
                                            src={getImageUrl(discapacidad.foto_perfil)} 
                                            alt={`Perfil de ${discapacidad.nombre}`} 
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
                                <p><strong>Nombre: </strong> {discapacidad.nombre || 'No disponible'}</p>
                                <p><strong>Apellido Paterno: </strong> {discapacidad.apellido_paterno || 'No disponible'}</p>
                                <p><strong>Apellido Materno: </strong> {discapacidad.apellido_materno || 'No disponible'}</p>
                                <p><strong>Número Identificacion Fiscal: </strong> {discapacidad.numero_identificacion_fiscal || 'No disponible'}</p>
                                <p><strong>Edad: </strong> {discapacidad.edad || 'No disponible'}</p>
                                <p><strong>Estado Civil: </strong> {discapacidad.estadoCivil || 'No disponible'}</p>
                                <p><strong>Hijos: </strong> {discapacidad.hijos || 'No disponible'}</p>
                                <p><strong>Sexo: </strong> {discapacidad.sexo || 'No disponible'}</p>
                                <p><strong>Ocupación: </strong> {discapacidad.ocupacion || 'No disponible'}</p>
                                <p><strong>Fecha de Nacimiento: </strong> {discapacidad.fecha_nacimiento ? new Date(discapacidad.fecha_nacimiento).toISOString().split('T')[0] : ''}</p>
                                <p><strong>CURP: </strong> {discapacidad.curp || 'No disponible'}</p>
                                <p><strong>Nivel de Estudios: </strong> {discapacidad.nivel_estudios || 'No disponible'}</p>
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
                                <p><strong>Domicilio (Calle y Número): </strong> {discapacidad.domicilio_calle_numero || 'No disponible'}</p>
                                <p><strong>Colonia: </strong> {discapacidad.colonia || 'No disponible'}</p>
                                <p><strong>Municipio: </strong> {discapacidad.municipio || 'No disponible'}</p>
                                <p><strong>Estado: </strong> {discapacidad.estado || 'No disponible'}</p>
                                <p><strong>Código Postal: </strong> {discapacidad.codigo_postal || 'No disponible'}</p>
                                <p><strong>Referencia: </strong> {discapacidad.referencia || 'No disponible'}</p>
                                <p><strong>Teléfono Fijo: </strong> {discapacidad.telefono_fijo || 'No disponible'}</p>
                                <p><strong>Teléfono Fijo Extra: </strong> {discapacidad.telefono_fijo_extra || 'No disponible'}</p>
                                <p><strong>Teléfono Móvil: </strong> {discapacidad.telefono_movil || 'No disponible'}</p>
                                <p><strong>Teléfono Móvil Extra: </strong> {discapacidad.telefono_movil_extra || 'No disponible'}</p>
                            </div>

                            {/* Servicios de Vivienda y Servicios Comunitarios */}
                            <div className="section">
                                <h3 className="subsection-title">Servicios de Vivienda y Servicios Comunitarios</h3>
                                <p><strong>Servicios de Vivienda: </strong> {discapacidad.servicios_vivienda || 'No disponible'}</p>
                                <p><strong>Servicios Comunitarios: </strong> {discapacidad.servicios_comunitarios || 'No disponible'}</p>
                            </div>

                        {/* Servicios de Vivienda y Servicios Comunitarios */}
                        <div className="section">
                                <h3 className="subsection-title">Descripción del Apoyo</h3>
                                <p><strong></strong>{discapacidad.descripcion_apoyo || 'No disponible'}</p>
                            </div>
                        </div>

                        {/* Columna de la derecha */}
                        <div className="right-column">
                            {/* Información Médica */}
                            <div className="section">
                                <h3 className="subsection-title">Información Médica</h3>
                                <p><strong>Antecedentes Patológicos: </strong> {discapacidad.antecedentes_patologicos || 'No disponible'}</p>
                                <p><strong>Servicios de Salud: </strong> {discapacidad.servicios_salud || 'No disponible'}</p>
                                <p><strong>Certificado de Discapacidad: </strong> 
                                    {discapacidad.certificadosDiscapacidadRuta && (
                                    <a href={getDocumentUrl(discapacidad.certificadosDiscapacidadRuta)} target="_blank">Ver Certificado de Discapacidad</a>
                                )}
                                
                                </p>
        
                            </div>

                            {/* Documentos del Niño y Tutor */}
                            <div className="section">
                                <h3 className="subsection-title">Documentos de la Persona</h3>
                                <p><strong>Comprobante de Domicilio: </strong> 
                                    {discapacidad.comprobante_domicilio && (
                                        <a href={getDocumentUrl(discapacidad.comprobante_domicilio)} target="_blank" rel="noopener noreferrer">Ver Comprobante de Domicilio</a>
                                    )}
                                </p>
                                <p><strong>CURP Documento: </strong> 
                                    {discapacidad.curp_documento && (
                                        <a href={getDocumentUrl(discapacidad.curp_documento)} target="_blank" rel="noopener noreferrer">Ver Documento CURP</a>
                                    )}
                                </p>
                                <p><strong>Documento de Identidad: </strong> 
                                    {discapacidad.documento_identidad && (
                                        <a href={getDocumentUrl(discapacidad.documento_identidad)} target="_blank" rel="noopener noreferrer">Ver Documento de Identidad</a>
                                    )}
                                </p>
                                <p><strong>Declaración de Impuestos: </strong> 
                                    {discapacidad.declaracion_impuestos && (
                                        <a href={getDocumentUrl(discapacidad.declaracion_impuestos)} target="_blank" rel="noopener noreferrer">Ver Declaración de Impuestos</a>
                                    )}
                                </p>
                                <p><strong>Comprobante de Ingresos: </strong> 
                                    {discapacidad.comprobante_ingresos && (
                                        <a href={getDocumentUrl(discapacidad.comprobante_ingresos)} target="_blank" rel="noopener noreferrer">Ver Comprobante de Ingresos</a>
                                    )}
                                </p>
                                <p><strong>Carta de Antecedentes No Penales: </strong> 
                                    {discapacidad.carta_antecedentes_no_penales && (
                                        <a href={getDocumentUrl(discapacidad.carta_antecedentes_no_penales)} target="_blank" rel="noopener noreferrer">Ver Carta</a>
                                    )}
                                </p>
                                <p><strong>Referencias Personales y Profesionales: </strong> 
                                    {discapacidad.referencias_personales_profesionales && (
                                        <a href={getDocumentUrl(discapacidad.referencias_personales_profesionales)} target="_blank" rel="noopener noreferrer">Ver Referencias</a>
                                    )}
                                </p>
                                <p><strong>Certificados Académicos: </strong>
                                {discapacidad.certificadosAcademicosRuta && (
                                     <a href={getDocumentUrl(discapacidad.certificadosAcademicosRuta)} target="_blank">Ver Certificados Académicos:</a>
                                )}
                                </p>
                                
                                <p><strong>Certificados Académicos: </strong>
                                {discapacidad.diplomasTitulosRuta && (
                                     <a href={getDocumentUrl(discapacidad.diplomasTitulosRuta)} target="_blank">Ver Certificados Académicos:</a>
                                )}
                                </p>
                            </div>
                        </div>                
                    </div>
         {/* Nueva sección para la Descripción del Apoyo */}
         <div className="two-column-layout"> {/* Aquí aplicamos el layout de dos columnas */}
                        <div className="section full-width">
                            <p><strong> Descripción del Apoyo: </strong>{discapacidad.descripcion_apoyo || 'No disponible'}</p>
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

export default UsuarioDiscapacidadDetalles;
