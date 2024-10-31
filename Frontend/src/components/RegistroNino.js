import React, { useState } from 'react';
import './RegistroNino.css';

const RegistroNino = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([false, false, false, false, false]);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    edad: '',
    sexo: '',
    fechaNacimiento: '',
    curp: '',
    nivelEstudios: '',
    domicilio: '',
    colonia: '',
    municipio: '',
    estado: '',
    codigoPostal: '',
    referencia: '',
    telefonoFijo: '',
    telefonoFijoExtra: '',
    noAplicaFijoExtra: false,
    telefonoMovil: '',
    telefonoMovilExtra: '',
    noAplicaMovilExtra: false,
    serviciosVivienda: [],
    serviciosComunitarios: [],
    antecedentesPatologicos: [],
    serviciosSalud: [],
    informeMedico: null,
    historialMedico: null,
    certificadosTratamientos: null,
    apoyoRequerido: '',
    comprobanteDomicilio: null,
    curpNino: null,
    documentoIdentidadNino: null,
    fotoPerfil: null,
    declaracionImpuestos: null,
    comprobanteIngresos: null,
    cartaAntecedentes: null,
    referencias: null
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let formattedValue = value;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked,
        [name === 'noAplicaFijoExtra' ? 'telefonoFijoExtra' : 'telefonoMovilExtra']: checked ? 'no aplica' : '',
      });
      return;
    }

    if (['nombre', 'apellidoPaterno', 'apellidoMaterno'].includes(name)) {
      formattedValue = value
        .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '')
        .toLowerCase()
        .replace(/(^|\s)\S/g, (l) => l.toUpperCase());
    }
    if (name === 'edad') {
      formattedValue = Math.max(1, Math.min(18, Number(value) || ''));
    }
    if (name === 'curp') {
      formattedValue = value.toUpperCase().slice(0, 18);
    }

    if (['domicilio', 'municipio', 'colonia', 'referencia'].includes(name)) {
      formattedValue = value
        .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]/g, '')
        .toLowerCase()
        .replace(/(^|\s)\S/g, (l) => l.toUpperCase());
    }
    if (['municipio'].includes(name)) {
      formattedValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    }
    if (name === 'codigoPostal') {
      formattedValue = value.replace(/[^0-9]/g, '').slice(0, 5);
    }
    if (['telefonoFijo', 'telefonoFijoExtra', 'telefonoMovil', 'telefonoMovilExtra'].includes(name)) {
      formattedValue = value.replace(/[^0-9]/g, '').slice(0, 10);
    }
    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    const checked = e.target.checked;
  
    if (name === 'antecedentesPatologicos') {
      if (value === 'Sin antecedentes') {
        // Si se selecciona "Sin antecedentes", asegurarse de que solo esta opción esté seleccionada
        setFormData((prevData) => ({
          ...prevData,
          antecedentesPatologicos: ['Sin antecedentes'], // Solo esta opción estará seleccionada
        }));
      } else {
        // Manejo normal para otras opciones
        const newArray = checked
          ? [...formData[name], value]
          : formData[name].filter((item) => item !== value);
  
        // Si se selecciona alguna opción de antecedentes, desmarcar "Sin antecedentes"
        if (newArray.includes(value)) {
          setFormData((prevData) => ({
            ...prevData,
            antecedentesPatologicos: newArray.filter(item => item !== 'Sin antecedentes'),
          }));
        } else {
          setFormData({
            ...formData,
            [name]: newArray,
          });
        }
      }
    } else if (name === 'serviciosSalud') {
      if (value === 'Sin Servicios') {
        // Si se selecciona "Sin Servicios", asegurarse de que solo esta opción esté seleccionada
        setFormData((prevData) => ({
          ...prevData,
          serviciosSalud: ['Sin Servicios'], // Solo esta opción estará seleccionada
        }));
      } else {
        // Manejo normal para otras opciones
        const newArray = checked
          ? [...formData[name], value]
          : formData[name].filter((item) => item !== value);
  
        // Si se selecciona alguna opción de servicios de salud, desmarcar "Sin Servicios"
        if (newArray.includes(value)) {
          setFormData((prevData) => ({
            ...prevData,
            serviciosSalud: newArray.filter(item => item !== 'Sin Servicios'),
          }));
        } else {
          setFormData({
            ...formData,
            [name]: newArray,
          });
        }
      }
    } else if (name === 'serviciosVivienda' || name === 'serviciosComunitarios') {
      const newArray = checked
        ? [...formData[name], value]
        : formData[name].filter((item) => item !== value);
  
      setFormData({
        ...formData,
        [name]: newArray,
      });
    } else {
      setFormData({
        ...formData,
        [name]: checked,
      });
    }
  };

  const handleFileUpload = (event) => {
    const { name, files } = event.target;
    if (files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0]  // Guarda el archivo seleccionado en el campo correspondiente
      }));
    }
  };

  const handleNext = () => {
    if (isSectionComplete(activeStep)) {
      setCompletedSteps((prev) => {
        const newSteps = [...prev];
        newSteps[activeStep] = true;
        return newSteps;
      });
      setActiveStep((prev) => Math.min(prev + 1, completedSteps.length - 1));
    } else {
      alert("Por favor, completa todos los campos requeridos antes de continuar.");
    }
  };

  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const isSectionComplete = (step) => {
    switch (step) {
      case 0:
        return (
          formData.nombre &&
          formData.apellidoPaterno &&
          formData.apellidoMaterno &&
          formData.edad &&
          formData.sexo &&
          formData.fechaNacimiento &&
          formData.curp.length === 18 &&
          formData.nivelEstudios
        );
      case 1:
        return (
          formData.domicilio &&
          formData.colonia &&
          formData.municipio &&
          formData.estado &&
          formData.codigoPostal.length === 5 &&
          formData.referencia &&
          formData.telefonoFijo.length === 10 &&
          formData.telefonoMovil.length === 10
        );
        case 2:
          return formData.serviciosVivienda.length > 0 && formData.serviciosComunitarios.length > 0;
          
        case 3:
          return (
            formData.antecedentesPatologicos.length > 0 &&
            formData.serviciosSalud.length > 0 &&
            formData.informeMedico &&
            formData.historialMedico &&
            formData.certificadosTratamientos &&
            formData.apoyoRequerido 
          );

          case 4:
      return (
        formData.comprobanteDomicilio &&
        formData.curpNino &&
        formData.documentoIdentidadNino &&
        formData.fotoPerfil &&
        formData.declaracionImpuestos &&
        formData.comprobanteIngresos &&
        formData.cartaAntecedentes &&
        formData.referencias
      );
      
        default:
          return false;
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault(); // Previene el comportamiento por defecto del formulario
      console.log("Datos enviados:", formData);
      alert("Formulario enviado exitosamente.");
    };

  return (
    <form onSubmit={handleSubmit}>
    <div className="registro-container">
      <div className="header">
        <img src="./logofundacion.png" alt="Fundación" className="fundacion-logo" />
        <h1>Registro para Niño (a)</h1>
        <p className="slogan">Dar & Recibir</p>
      </div>
      <div className="progress-container">
        {completedSteps.map((completed, index) => (
          <div
            key={index}
            className={`progress-circle ${completed ? 'completed' : ''} ${activeStep === index ? 'active' : ''}`}
          >
            {index + 1}
          </div>
        ))}
      </div>
 
      <div className="button-group">
      {activeStep === 0 && (
        <div className="form-section">
          <h2>Datos Personales del Niño (a)</h2>
          <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleInputChange} />
          <input type="text" name="apellidoPaterno" placeholder="Apellido Paterno" value={formData.apellidoPaterno} onChange={handleInputChange} />
          <input type="text" name="apellidoMaterno" placeholder="Apellido Materno" value={formData.apellidoMaterno} onChange={handleInputChange} />
          <input type="number" name="edad" placeholder="Edad" value={formData.edad} onChange={handleInputChange} min="1" max="18" />
          <select name="sexo" value={formData.sexo} onChange={handleInputChange}>
            <option value="">Selecciona Sexo</option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
          </select>
          <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleInputChange} />
          <input type="text" name="curp" placeholder="CURP (18 caracteres)" value={formData.curp} onChange={handleInputChange} maxLength="18" />
          <select name="nivelEstudios" value={formData.nivelEstudios} onChange={handleInputChange}>
            <option value="">Selecciona Nivel de Estudios</option>
            <option value="Educación Preescolar">Educación Preescolar</option>
            <option value="Educación Primaria">Educación Primaria</option>
            <option value="Educación Secundaria">Educación Secundaria</option>
            <option value="Bachillerato">Bachillerato</option>
            <option value="No aplica">No aplica</option>
          </select>
        </div>
        
      )}

      {activeStep === 1 && (
        <div className="form-section">
        <h2>Datos de Contacto y Dirección</h2>
        <input type="text" name="domicilio" placeholder="Domicilio (Calle y Número)" value={formData.domicilio} onChange={handleInputChange} />
        <input type="text" name="colonia" placeholder="Colonia" value={formData.colonia} onChange={handleInputChange} />
        <input type="text" name="municipio" placeholder="Municipio" value={formData.municipio} onChange={handleInputChange} />

            <select name="estado" value={formData.estado} onChange={handleInputChange}>
              <option value="">Selecciona tu Estado</option>
              <option value="Aguascalientes">Aguascalientes</option>
              <option value="Baja California">Baja California</option>
              <option value="Baja California Sur">Baja California Sur</option>
              <option value="Campeche">Campeche</option>
              <option value="Chiapas">Chiapas</option>
              <option value="Chihuahua">Chihuahua</option>
              <option value="Ciudad de México">Ciudad de México</option>
              <option value="Coahuila">Coahuila</option>
              <option value="Colima">Colima</option>
              <option value="Durango">Durango</option>
              <option value="Estado de México">Estado de México</option>
              <option value="Guanajuato">Guanajuato</option>
              <option value="Guerrero">Guerrero</option>
              <option value="Hidalgo">Hidalgo</option>
              <option value="Jalisco">Jalisco</option>
              <option value="Michoacán">Michoacán</option>
              <option value="Morelos">Morelos</option>
              <option value="Nayarit">Nayarit</option>
              <option value="Nuevo León">Nuevo León</option>
              <option value="Oaxaca">Oaxaca</option>
              <option value="Puebla">Puebla</option>
              <option value="Querétaro">Querétaro</option>
              <option value="Quintana Roo">Quintana Roo</option>
              <option value="San Luis Potosí">San Luis Potosí</option>
              <option value="Sinaloa">Sinaloa</option>
              <option value="Sonora">Sonora</option>
              <option value="Tabasco">Tabasco</option>
              <option value="Tamaulipas">Tamaulipas</option>
              <option value="Tlaxcala">Tlaxcala</option>
              <option value="Veracruz">Veracruz</option>
              <option value="Yucatán">Yucatán</option>
              <option value="Zacatecas">Zacatecas</option>
            </select>

        <input type="text" name="codigoPostal" placeholder="Código Postal" value={formData.codigoPostal} onChange={handleInputChange} />
        <input type="text" name="referencia" placeholder="Referencia" value={formData.referencia} onChange={handleInputChange} />
        <input type="text" name="telefonoFijo" placeholder="Teléfono Fijo" value={formData.telefonoFijo} onChange={handleInputChange} />
        <div className="contact-item">
          <input
            type="text"
            name="telefonoFijoExtra"
            placeholder="Teléfono Fijo Extra"
            value={formData.telefonoFijoExtra}
            onChange={handleInputChange}
            disabled={formData.noAplicaFijoExtra}
          />
          <label>
            <input
              type="checkbox"
              name="noAplicaFijoExtra"
              checked={formData.noAplicaFijoExtra}
              onChange={handleInputChange}
            />
            No Aplica
          </label>
        </div> 
        <input type="text" name="telefonoMovil" placeholder="Teléfono Móvil" value={formData.telefonoMovil} onChange={handleInputChange} />
        <div className="contact-item">
          <input
            type="text"
            name="telefonoMovilExtra"
            placeholder="Teléfono Móvil Extra"
            value={formData.telefonoMovilExtra}
            onChange={handleInputChange}
            disabled={formData.noAplicaMovilExtra}
          />
          <label>
            <input
              type="checkbox"
              name="noAplicaMovilExtra"
              checked={formData.noAplicaMovilExtra}
              onChange={handleInputChange}
            />
            No Aplica
          </label>
          
        </div>
      </div>
    )}

    {activeStep === 2 && (
     <div className="form-section">
      <h2>Servicios de Vivienda y Servicios Comunitarios</h2>

     <h3>Servicios de Vivienda (selecciona las opciones que correspondan):</h3>
     <div className="servicios-vivienda-container">
      {[
        'Loza', 'Lámina', 'Cartón', 'Tabique', 'Loseta', 'Piso Firme',
        'Tierra', 'Televisión', 'Radio', 'Computadora'
      ].map((servicio) => (
        <div key={servicio} className="servicio-item">
          <input
            type="checkbox"
            name="serviciosVivienda"
            value={servicio}
            checked={formData.serviciosVivienda.includes(servicio)}
            onChange={handleCheckboxChange}
            id={`serviciosVivienda-${servicio}`}
          />
          <label htmlFor={`serviciosVivienda-${servicio}`}>{servicio}</label>
        </div>
      ))}
    </div>

    <h3>Servicios Comunitarios (selecciona las opciones que correspondan):</h3>
    <div className="servicios-comunitarios-container">
      {[
        'Agua', 'Drenaje', 'Teléfono', 'Pavimento', 'Internet', 'Luz'
      ].map((servicio) => (
        <div key={servicio} className="servicio-item">
          <input
            type="checkbox"
            name="serviciosComunitarios"
            value={servicio}
            checked={formData.serviciosComunitarios.includes(servicio)}
            onChange={handleCheckboxChange}
            id={`serviciosComunitarios-${servicio}`}
          />
          <label htmlFor={`serviciosComunitarios-${servicio}`}>{servicio}</label>
        </div>
    ))}
  </div>
  </div> 
)}

{activeStep === 3 && (
  <div className="form-section">
    <h2>Información Médica del Niño</h2>

    <h3>Antecedentes Patológicos (selecciona las opciones que correspondan):</h3>
    <div className="antecedentes-container">
      {['Diabetes', 'Hipertensión', 'Cáncer', 'Cardiopatía', 'Síndrome', 'Sin antecedentes'].map((antecedente) => (
        <div key={antecedente} className="servicio-item">
          <input
            type="checkbox"
            name="antecedentesPatologicos"
            value={antecedente}
            checked={formData.antecedentesPatologicos.includes(antecedente)}
            onChange={handleCheckboxChange}
            id={`antecedentesPatologicos-${antecedente}`}
          />
          <label htmlFor={`antecedentesPatologicos-${antecedente}`}>{antecedente}</label>
        </div>
      ))}
    </div>

    <h3>Servicios de Salud (selecciona las opciones que correspondan):</h3>
    <div className="servicios-salud-container">
      {['IMSS', 'ISSSTE', 'Seguro Popular', 'Privado', 'Centro de Salud', 'Sin Servicios'].map((servicio) => (
        <div key={servicio} className="servicio-item">
          <input
            type="checkbox"
            name="serviciosSalud"
            value={servicio}
            checked={formData.serviciosSalud.includes(servicio)}
            onChange={handleCheckboxChange}
            id={`serviciosSalud-${servicio}`}
          />
          <label htmlFor={`serviciosSalud-${servicio}`}>{servicio}</label>
        </div>
      ))}
    </div>

    <h3>Información Médica:</h3>
    <div className="file-upload-container">
      <label htmlFor="informeMedico">Informe Médico (subir archivo PDF):</label>
      <input
        type="file"
        id="informeMedico"
        name="informeMedico"
        accept=".pdf"
        onChange={handleFileUpload}
      />
    </div>

    <div className="file-upload-container">
      <label htmlFor="historialMedico">Historial Médico (subir archivo PDF):</label>
      <input
        type="file"
        id="historialMedico"
        name="historialMedico"
        accept=".pdf"
        onChange={handleFileUpload}
      />
    </div>

    <div className="file-upload-container">
      <label htmlFor="certificadosTratamientos">Certificados de Tratamientos Paliativos (subir archivo PDF):</label>
      <input
        type="file"
        id="certificadosTratamientos"
        name="certificadosTratamientos"
        accept=".pdf"
        onChange={handleFileUpload}
      />
    </div>

    <h3>Apoyo Requerido:</h3>
    <div className="file-upload-container">
      <label htmlFor="apoyoRequerido">Realiza una breve descripción del apoyo que se requiere (aproximadamente 100 palabras)</label>
      <textarea
        id="apoyoRequerido"
        name="apoyoRequerido"
        value={formData.apoyoRequerido}
        onChange={handleInputChange}
        className="descripcion-textarea"
      />
    </div>
  </div>
)}

{activeStep === 4 && (
     <div className="form-section">

<h3>Documentación del Niño y Tutor</h3>

<div className="file-upload-container">
  <label htmlFor="comprobanteDomicilio">Comprobante de Domicilio (subir archivo PDF):</label>
  <input
    type="file"
    id="comprobanteDomicilio"
    name="comprobanteDomicilio"
    accept=".pdf"
    onChange={handleFileUpload}
  />
</div>

<div className="file-upload-container">
  <label htmlFor="curpNino">CURP del Niño (subir archivo PDF):</label>
  <input
    type="file"
    id="curpNino"
    name="curpNino"
    accept=".pdf"
    onChange={handleFileUpload}
  />
</div>

<div className="file-upload-container">
  <label htmlFor="documentoIdentidadNino">Documento de Identidad del Niño (subir archivo PDF):</label>
  <input
    type="file"
    id="documentoIdentidadNino"
    name="documentoIdentidadNino"
    accept=".pdf"
    onChange={handleFileUpload}
  />
</div>

<div className="file-upload-container">
  <label htmlFor="fotoPerfil">Foto de Perfil (subir imagen):</label>
  <input
    type="file"
    id="fotoPerfil"
    name="fotoPerfil"
    accept="image/*"
    onChange={handleFileUpload}
  />
</div>

<div className="file-upload-container">
  <label htmlFor="declaracionImpuestos">Declaración de Impuestos del Tutor (subir archivo PDF):</label>
  <input
    type="file"
    id="declaracionImpuestos"
    name="declaracionImpuestos"
    accept=".pdf"
    onChange={handleFileUpload}
  />
</div>

<div className="file-upload-container">
  <label htmlFor="comprobanteIngresos">Comprobante de Ingresos del Tutor (subir archivo PDF):</label>
  <input
    type="file"
    id="comprobanteIngresos"
    name="comprobanteIngresos"
    accept=".pdf"
    onChange={handleFileUpload}
  />
</div>

<div className="file-upload-container">
  <label htmlFor="cartaAntecedentes">Carta de Antecedentes No Penales (subir archivo PDF):</label>
  <input
    type="file"
    id="cartaAntecedentes"
    name="cartaAntecedentes"
    accept=".pdf"
    onChange={handleFileUpload}
  />
</div>

<div className="file-upload-container">
  <label htmlFor="referencias">Referencias Personales/Profesionales (subir archivo PDF):</label>
  <input
    type="file"
    id="referencias"
    name="referencias"
    accept=".pdf"
    onChange={handleFileUpload}
  />
</div>
</div>
)}
</div>
      
<div className="button-group">
          {activeStep > 0 && <button type="button" onClick={handlePrevious}>Anterior</button>}
          {activeStep < completedSteps.length - 1 ? (
            <button type="button" onClick={handleNext}>Siguiente</button>
          ) : (
            <button type="submit">Enviar</button>
          )}

      </div>
    </div>
    </form>
  );
};

export default RegistroNino;
