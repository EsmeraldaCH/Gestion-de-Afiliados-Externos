import React, { useEffect, useState } from 'react';

function UsuariosNinos() {
  const [usuarios, setUsuarios] = useState([]);

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
 // Función para construir la URL de la imagen
 const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    // Reemplaza la ruta del sistema de archivos con la URL del servidor
    return `http://localhost:5000/archivos/${imagePath.split('\\').pop()}`;
  };
  const getDocumentUrl = (docPath) => {
    if (!docPath) return null;
    return `http://localhost:5000/archivos/${docPath.split('\\').pop()}`;
  };
 
  return (
    <div>
      <h2>Usuarios - Niños en Etapa Terminal</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Edad</th>
            <th>Sexo</th>
            <th>Fecha de Nacimiento</th>
            <th>CURP</th>
            <th>Nivel de Estudios</th>
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
            <th>Servicios de Vivienda</th>
            <th>Servicios Comunitarios</th>
            <th>Antecedentes Patológicos</th>
            <th>Servicios de Salud</th>
            <th>Informe Médico</th>
            <th>Historial Médico</th>
            <th>Certificados de Tratamientos Paliativos</th>
            <th>Descripción de Apoyo</th>
            <th>Comprobante de Domicilio</th>
            <th>CURP Documento</th>
            <th>Documento de Identidad</th>
            <th>Declaración de Impuestos</th>
            <th>Comprobante de Ingresos</th>
            <th>Carta de Antecedentes No Penales</th>
            <th>Referencias Personales y Profesionales</th>
            <th>Foto de Perfil</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.beneficiario_id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido_paterno}</td>
                <td>{usuario.apellido_materno}</td>
                <td>{usuario.edad}</td>
                <td>{usuario.sexo}</td>         
                <td> {usuario.fecha_nacimiento
                ? new Date(usuario.fecha_nacimiento).toISOString().split('T')[0]
                : ''}
                </td>
                <td>{usuario.curp}</td>
                <td>{usuario.nivel_estudios}</td>
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
                <td>{usuario.servicios_vivienda}</td>
                <td>{usuario.servicios_comunitarios}</td>
                <td>{usuario.antecedentes_patologicos}</td>
                <td>{usuario.servicios_salud}</td>
                <td>
                {usuario.informe_medico && (
                <a href={getDocumentUrl(usuario.informe_medico)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                >
                Ver Informe Médico
                </a>
                )}
                </td>

              <td>{usuario.historial_medico && (
                <a href={getDocumentUrl(usuario.historial_medico)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                >
                Ver Historial Médico
                </a>
                )}</td>

              <td>{usuario.certificados_tratamientos_paliativos && (
                <a href={getDocumentUrl(usuario.certificados_tratamientos_paliativos)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                >
                Ver Certificado de Tratamientos Paliativos
                </a>
                )}</td>

              <td>{usuario.descripcion_apoyo}</td>


              <td>{usuario.comprobante_domicilio && (
                <a href={getDocumentUrl(usuario.comprobante_domicilio)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                >
                Ver Comprobante de Domicilio
                </a>
                )}</td>


              <td>{usuario.curp_documento && (
                <a href={getDocumentUrl(usuario.curp_documento)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                >
                Ver Documento CURP
                </a>
                )}</td>

              <td>{usuario.documento_identidad && (
                <a href={getDocumentUrl(usuario.documento_identidad)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                >
                Ver Documento de Identidad
                </a>
                )}</td>

              <td>{usuario.declaracion_impuestos && (
                <a href={getDocumentUrl(usuario.declaracion_impuestos)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                >
                Ver Declaración de Impuestos
                </a>
                )}</td>

              <td>{usuario.comprobante_ingresos && (
                <a href={getDocumentUrl(usuario.comprobante_ingresos)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                >
                Ver Comprobante de Ingresos
                </a>
                )}</td>

              <td>{usuario.carta_antecedentes_no_penales && (
                <a href={getDocumentUrl(usuario.carta_antecedentes_no_penales)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                >
                Ver Carta de Antecedentes no Penales
                </a>
                )}</td>

              <td>{usuario.referencias_personales_profesionales && (
                <a href={getDocumentUrl(usuario.referencias_personales_profesionales)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                >
                Ver Referencias
                </a>
                )}</td>


              <td>
                {usuario.foto_perfil && (
                  <img 
                    src={getImageUrl(usuario.foto_perfil)}
                    alt={`Perfil de ${usuario.nombre}`}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '10%'
                    }}
                  />
                )}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  


}

export default UsuariosNinos;
