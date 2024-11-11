import React, { useState } from 'react';
import './RegistroNino.css';

function RegistroNino() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    edad: "",
    sexo: "",
    fechaNacimiento: "",
    curp: "",
    nivelEstudios: "",
    domicilio: "",
    colonia: "",
    municipio: "",
    estado: "",
    codigoPostal: "",
    referencia: "",
    telefonoFijo: '',
    telefonoFijoExtra: '',
    noAplicaFijoExtra: false,
    telefonoMovil: '',
    telefonoMovilExtra: '',
    noAplicaMovilExtra: false,
    serviciosVivienda: [],
    otroServicioVivienda: "",
    serviciosComunitarios: [],
    otroServicioComunitario: "",
    antecedentesPatologicos: [],
    otroAntecedentesPatologicos: "",
    serviciosSalud: [],
    otroServiciosSalud: "",
    informeMedico: null,
    historialMedico: null,
    certificadosTratamientosPaliativos: null,
    descripcionApoyo: "",
    comprobanteDomicilio: null,
    curpDocumento: null,
    documentoIdentidad: null,
    declaracionImpuestos: null,
    comprobanteIngresos: null,
    cartaAntecedentesNoPenales: null,
    referenciasPersonalesProfesionales: null,
    fotoPerfil: null,
  });

  const [activeStep, setActiveStep] = useState(1); // Controla el paso actual
  console.log("Active Step: ", activeStep);

  const nextStep = () => setActiveStep((prevStep) => Math.min(prevStep + 1, 6));
  const prevStep = () => setActiveStep((prevStep) => Math.max(prevStep - 1, 1));


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Maneja los cambios en las opciones de checkbox
  const handleCheckboxChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevFormData) => {
    const isChecked = prevFormData[name].includes(value);
    const updatedList = isChecked
      ? prevFormData[name].filter((item) => item !== value)
      : [...prevFormData[name], value];
    return {
      ...prevFormData,
      [name]: updatedList,
    };
  });
  };
 // Maneja el cambio en el campo "Otro" solo al modificar el texto
  const handleOtroChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value, 
  }));
  };
  // Agrega la entrada de "Otro" al array al presionar Enter o al salir del campo
  const handleOtroBlurOrEnter = (e) => {
    const { name, value } = e.target;
    
    // Determina si es otro servicio de salud o antecedentes patológicos
    const listName =
        name === "otroServicioVivienda" 
        ? "serviciosVivienda" 
        
        : name === "otroServicioComunitario"
        ? "serviciosComunitarios"

        : name === "otroAntecedentesPatologicos"
        ? "antecedentesPatologicos"

        : name === "otroServicioSalud"
        ? "serviciosSalud"

        : null;
    // Si el valor no está vacío y no está en el array, agregarlo
    if (value.trim() && !formData[listName].includes(value.trim())) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [listName]: [...prevFormData[listName], value.trim()],
      }));
    }
  };

  // Manejar carga de archivos
  const handleFileChange = (e) => {
  const { name, files } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: files[0], // Guardamos el archivo en el estado
  }));
  };

  // Manejar el envío del formulario
const handleSubmit = async (e) => {
  e.preventDefault();

  // Verifica si estamos en el paso 5 antes de proceder
  if (activeStep !== 6) {
    console.log("No puedes enviar el formulario en este paso");
    return; // No hacer nada si no estamos en el paso 6
  }

  const serviciosVivienda = [...formData.serviciosVivienda];
if (formData.otroServicioVivienda) {
    serviciosVivienda.push(formData.otroServicioVivienda);
}
  const serviciosComunitarios = [...formData.serviciosComunitarios];
  if (formData.otroServicioComunitario) {
    serviciosComunitarios.push(formData.otroServicioComunitario);
  }
  const antecedentesPatologicos = [...formData.antecedentesPatologicos];
  if (formData.otroAntecedentesPatologicos) {
    antecedentesPatologicos.push(formData.otroAntecedentesPatologicos);
  }
  const serviciosSalud = [...formData.serviciosSalud];
  if (formData.otroServicioSalud) {
    serviciosSalud.push(formData.otroServicioSalud);
  }

  // Crear un FormData para enviar archivos y otros datos 
  const data = new FormData();
   
   // Agregar otros campos de texto directamente
   Object.keys(formData).forEach((key) => {
     if (
       key !== 'archivos' &&
       key !== 'informeMedico' &&
       key !== 'historialMedico' &&
       key !== 'certificadosTratamientosPaliativos' &&
       key !== 'comprobanteDomicilio' &&
       key !== 'curpDocumento' &&
       key !== 'documentoIdentidad' &&
       key !== 'declaracionImpuestos' &&
       key !== 'comprobanteIngresos' &&
       key !== 'cartaAntecedentesNoPenales' &&
       key !== 'referenciasPersonalesProfesionales' &&
       key !== 'fotoPerfil'
     ) {
       data.append(key, formData[key]);
     }
   });
 
   // Agregar los archivos de Información Médica
   if (formData.informeMedico) {
     data.append('informeMedico', formData.informeMedico);
   }
   if (formData.historialMedico) {
     data.append('historialMedico', formData.historialMedico);
   }
   if (formData.certificadosTratamientosPaliativos) {
     data.append('certificadosTratamientosPaliativos', formData.certificadosTratamientosPaliativos);
   }
   if (formData.comprobanteDomicilio) {
    data.append('comprobanteDomicilio', formData.comprobanteDomicilio);
   }
   if (formData.curpDocumento) {
    data.append('curpDocumento', formData.curpDocumento);
   }
   if (formData.documentoIdentidad) {
    data.append('documentoIdentidad', formData.documentoIdentidad);
   }
   if (formData.declaracionImpuestos) {
    data.append('declaracionImpuestos', formData.declaracionImpuestos);
   }
   if (formData.comprobanteIngresos) {
    data.append('comprobanteIngresos', formData.comprobanteIngresos);
   }
   if (formData.cartaAntecedentesNoPenales) {
    data.append('cartaAntecedentesNoPenales', formData.cartaAntecedentesNoPenales);
   }
   if (formData.referenciasPersonalesProfesionales) {
    data.append('referenciasPersonalesProfesionales', formData.referenciasPersonalesProfesionales);
   }
   if (formData.fotoPerfil) {
    data.append('fotoPerfil', formData.fotoPerfil);
   }

  try {
    const response = await fetch('http://localhost:5000/api/ninos', {
      method: 'POST',
      body: data // Aquí enviamos el FormData en lugar de JSON
    });

    if (response.ok) {
      window.location.href = 'http://localhost:3000/Profile';
      alert('Datos enviados correctamente');
    } else {
      throw new Error('Error en el servidor al guardar los datos');
    }
  } catch (error) {
    console.error('Error al enviar los datos:', error);
    alert('Hubo un problema al enviar los datos');
  }
};

  return (
    <form onSubmit={handleSubmit} className="registro-container">
      <div className="header">
        <img src="./logo.png" alt="Fundación" className="fundacion-logo" />
        <h1>Registro para Niño (a)</h1>
        <p className="slogan">Dar & Recibir</p>
      </div>
      

      <div className="progress-container">
  {Array.from({ length: 5 }, (_, index) => (
    <div
      key={index}
      className={`progress-circle 
        ${activeStep === index + 1 ? 'active' : ''} 
        ${activeStep > index + 1 ? 'completed' : ''}
      `}
    >
      {index + 1}
    </div>
  ))}
</div>


      {activeStep === 1 && (
        <div className="form-section">
          <h2>Datos Personales del Niño (a)</h2>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          <input
            type="text"
            name="apellidoPaterno"
            placeholder="Apellido Paterno"
            value={formData.apellidoPaterno}
            onChange={handleChange}
          />
          <input
            type="text"
            name="apellidoMaterno"
            placeholder="Apellido Materno"
            value={formData.apellidoMaterno}
            onChange={handleChange}
          />
          <input
            type="number"
            name="edad"
            placeholder="Edad"
            value={formData.edad}
            onChange={handleChange}
            min="1"
            max="18"
          />
          <select
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
          >
            <option value="">Selecciona Género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
          <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
          <input
            type="date"
            id="fecha_nacimiento"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
          />
          <input
            type="text"
            name="curp"
            placeholder="CURP (18 caracteres)"
            value={formData.curp}
            onChange={handleChange}
            maxLength="18"
          />
          <select
            name="nivelEstudios"
            value={formData.nivelEstudios}
            onChange={handleChange}
          >
            <option value="">Selecciona Nivel de Estudios</option>
            <option value="Educación Preescolar">Educación Preescolar</option>
            <option value="Educación Primaria">Educación Primaria</option>
            <option value="Educación Secundaria">Educación Secundaria</option>
            <option value="Educación Media Superior">Educación Media Superior</option>
            <option value="No aplica">No aplica</option>
          </select>
        </div>
      )}

      {activeStep === 2 && (
        <div className="form-section">
          <h2>Datos de Contacto y Dirección</h2>
          <input
            type="text"
            name="domicilio"
            placeholder="Domicilio (Calle y Número)"
            value={formData.domicilio}
            onChange={handleChange}
            maxLength="100"
          />
          <input
            type="text"
            name="colonia"
            placeholder="Colonia"
            value={formData.colonia}
            onChange={handleChange}
            maxLength="100"
          />
          <input
            type="text"
            name="municipio"
            placeholder="Municipio"
            value={formData.municipio}
            onChange={handleChange}
            maxLength="40"
          />
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
          >
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
          <input
            type="text"
            name="codigoPostal"
            placeholder="Código Postal"
            value={formData.codigoPostal}
            onChange={handleChange}
            maxLength="5"
          />
          <input
            type="text"
            name="referencia"
            placeholder="Referencia"
            value={formData.referencia}
            onChange={handleChange}
            maxLength="255"
          />
          <input
            type="text"
            name="telefonoFijo"
            placeholder="Teléfono Fijo"
            value={formData.telefonoFijo}
            onChange={handleChange}
            maxLength="10"
          />
          <div className="contact-item">
            <input
              type="text"
              name="telefonoFijoExtra"
              placeholder="Teléfono Fijo Extra"
              value={formData.noAplicaFijoExtra ? "no aplica" : formData.telefonoFijoExtra}
              onChange={handleChange}
              disabled={formData.noAplicaFijoExtra}
              maxLength="10"
            />
            <label>
              <input
                type="checkbox"
                name="noAplicaFijoExtra"
                checked={formData.noAplicaFijoExtra}
                onChange={(e) => {
                  handleChange(e);
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    telefonoFijoExtra: e.target.checked ? "no aplica" : ""
                  }));
                }}
              />
              No Aplica
            </label>
          </div>
          <input
            type="text"
            name="telefonoMovil"
            placeholder="Teléfono Móvil"
            value={formData.telefonoMovil}
            onChange={handleChange}
            maxLength="10"
          />
          <div className="contact-item">
            <input
              type="text"
              name="telefonoMovilExtra"
              placeholder="Teléfono Móvil Extra"
              value={formData.noAplicaMovilExtra ? "no aplica" : formData.telefonoMovilExtra}
              onChange={handleChange}
              disabled={formData.noAplicaMovilExtra}
              maxLength="10"
            />
            <label>
              <input
                type="checkbox"
                name="noAplicaMovilExtra"
                checked={formData.noAplicaMovilExtra}
                onChange={(e) => {
                  handleChange(e);
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    telefonoMovilExtra: e.target.checked ? "no aplica" : ""
                  }));
                }}
              />
              No Aplica
            </label>
          </div>

        </div>
        )
      }

      {activeStep === 3 && (
      <div className="form-section">
    <h2>Servicios de Vivienda y Servicios Comunitarios</h2>

    <h3>Servicios de Vivienda (selecciona las opciones que correspondan):</h3>
    <div className="servicios-vivienda-container">
      {[
        " Loza",
        " Lámina",
        " Cartón",
        " Tabique",
        " Loseta",
        " Piso Firme",
        " Tierra",
        " Televisión",
        " Radio",
        " Computadora",
      ].map((servicio) => (
        <div key={servicio} className="servicio-item">
          <input
            type="checkbox"
            name="serviciosVivienda"
            value={servicio}
            checked={formData.serviciosVivienda.includes(servicio)}
            onChange={handleCheckboxChange}
            id={`serviciosVivienda-${servicio}` }
          />
          <label htmlFor={`serviciosVivienda-${servicio}`}>{ servicio }</label>
        </div>
      ))}
      <div className="servicio-item">
        <label>Otro:</label>
        <input
          type="text"
          name="otroServicioVivienda"
          value={formData.otroServicioVivienda}
          onChange={handleOtroChange}
          onBlur={handleOtroBlurOrEnter}
          onKeyDown={(e) => {
            if (e.key === " Enter") {
              e.preventDefault();
              handleOtroBlurOrEnter(e);
            }
          }}
          placeholder="Especifique otro servicio de vivienda (Opcional)"
        />
      </div>
    </div>

    <h3>Servicios Comunitarios (selecciona las opciones que correspondan):</h3>
    <div className="servicios-comunitarios-container">
      {[
        " Agua",
        " Drenaje",
        " Teléfono",
        " Pavimento",
        " Internet",
        " Luz",
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
      <div className="servicio-item">
        <label>Otro:</label>
        <input
          type="text"
          name="otroServicioComunitario"
          value={formData.otroServicioComunitario}
          onChange={handleOtroChange}
          onBlur={handleOtroBlurOrEnter}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleOtroBlurOrEnter(e);
            }
          }}
          placeholder="Especifique otro servicio comunitario (Opcional)"
        />
      </div>
    </div>
      </div>
        )
      }

      {activeStep === 4 && ( 
  <div className="form-section">

    <h2>Información Médica del Niño</h2>

    <h3>Antecedentes Patológicos (selecciona las opciones que correspondan):</h3>
    <div className="antecedentes-container">
  {[
    " Diabetes", 
    " Hipertensión", 
    " Cáncer", 
    " Cardiopatía", 
    " Síndrome", 
    " Sin antecedentes"
  ].map((antecedente) => (
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
  
  <div className="servicio-item">
    <label>Otro:</label>
    <input
      type="text"
      name="otroAntecedentesPatologicos"
      value={formData.otroAntecedentesPatologicos}
      onChange={handleOtroChange}
      onBlur={handleOtroBlurOrEnter}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleOtroBlurOrEnter(e);
        }
      }}
      placeholder="Especifique otro antecedente (Opcional)"
    />
  </div>
    </div>

    <h3>Servicios de Salud (selecciona las opciones que correspondan):</h3>
    <div className="servicios-salud-container">
  {[
    " IMSS", 
    " ISSSTE", 
    " Seguro Popular", 
    " Privado", 
    " Centro de Salud", 
    " Sin Servicios"
  ].map((servicio) => (
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
  
  <div className="servicio-item">
    <label>Otro:</label>
    <input
      type="text"
      name="otroServicioSalud"
      value={formData.otroServicioSalud}
      onChange={handleOtroChange}
      onBlur={handleOtroBlurOrEnter}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleOtroBlurOrEnter(e);
        }
      }}
      placeholder="Especifique otro servicio de salud (Opcional)"
    />
  </div>
    </div>

    <h3>Información Médica</h3>
    <div className="informacion-medica-container">

      <div className="file-upload-item">
    <label htmlFor="informeMedico">Informe Médico (PDF)</label>
    <input
      type="file"
      id="informeMedico"
      name="informeMedico"
      accept="application/pdf"
      onChange={handleFileChange}
    />
      </div>
      <div className="file-upload-item">
    <label htmlFor="historialMedico">Historial Médico (PDF)</label>
    <input
      type="file"
      id="historialMedico"
      name="historialMedico"
      accept="application/pdf"
      onChange={handleFileChange}
    />
      </div>
      <div className="file-upload-item">
    <label htmlFor="certificadosTratamientosPaliativos">Certificados de Tratamientos Paliativos (PDF)</label>
    <input
      type="file"
      id="certificadosTratamientosPaliativos"
      name="certificadosTratamientosPaliativos"
      accept="application/pdf"
      onChange={handleFileChange}
    />
      </div>
    </div>

    <h3>Apoyo Requerido:</h3>
      <div className="file-upload-container">
      <label htmlFor="descripcionApoyo">Realiza una breve descripción del apoyo que se requiere (aproximadamente 100 palabras)</label>
      <textarea
        id="descripcionApoyo"
        name="descripcionApoyo"
        value={formData.descripcionApoyo}
        onChange={handleChange}
        className="descripcion-textarea"
      />
      </div>
    </div>
        )
      }
      {activeStep === 5 && (
  <div className="form-section">
    <h3>Documentación del Niño y Tutor</h3>

    <div className="informacion-medica-container">
      <div className="file-upload-item">
        <label htmlFor="comprobanteDomicilio">Comprobante de Domicilio (subir archivo PDF)</label>
        <input
          type="file"
          id="comprobanteDomicilio"
          name="comprobanteDomicilio"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </div>

      <div className="file-upload-item">
        <label htmlFor="curpDocumento">CURP del Niño (subir archivo PDF)</label>
        <input
          type="file"
          id="curpDocumento"
          name="curpDocumento"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </div>

      <div className="file-upload-item">
        <label htmlFor="documentoIdentidad">Documento de Identidad del Niño (subir archivo PDF)</label>
        <input
          type="file"
          id="documentoIdentidad"
          name="documentoIdentidad"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </div>

      <div className="file-upload-item">
        <label htmlFor="fotoPerfil">Foto de Perfil (subir imagen)</label>
        <input
          type="file"
          id="fotoPerfil"
          name="fotoPerfil"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div className="file-upload-item">
        <label htmlFor="declaracionImpuestos">Declaración de Impuestos del Tutor (subir archivo PDF)</label>
        <input
          type="file"
          id="declaracionImpuestos"
          name="declaracionImpuestos"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </div>

      <div className="file-upload-item">
        <label htmlFor="comprobanteIngresos">Comprobante de Ingresos del Tutor (subir archivo PDF)</label>
        <input
          type="file"
          id="comprobanteIngresos"
          name="comprobanteIngresos"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </div>

      <div className="file-upload-item">
        <label htmlFor="cartaAntecedentesNoPenales">Carta de Antecedentes No Penales (subir archivo PDF)</label>
        <input
          type="file"
          id="cartaAntecedentesNoPenales"
          name="cartaAntecedentesNoPenales"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </div>

      <div className="file-upload-item">
        <label htmlFor="referenciasPersonalesProfesionales">Referencias Personales/Profesionales (subir archivo PDF)</label>
        <input
          type="file"
          id="referenciasPersonalesProfesionales"
          name="referenciasPersonalesProfesionales"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </div>
    </div>
  </div>
        ) 
    }

  <div className="navigation-buttons">
      {activeStep > 1 && <button type="button" onClick={prevStep}>Anterior</button>}
      {activeStep < 6 ? (
        <button type="button" onClick={nextStep}>Siguiente</button>
      ) : (
        <button type="submit" className="submit-button">Enviar</button>
      )}
    </div>
  </form>
  
  );
}

export default RegistroNino;

 





/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistroNino.css';

const RegistroNino = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const [completedSteps, setCompletedSteps] = useState([false, false, false, false, false]);
   
  const [formData, setFormData] = useState({
    nombre: "",
    apellidoPaterno:"",
    apellidoMaterno:"",
    edad: "",
    sexo: "",
    fechaNacimiento:"",
    curp: "",
    nivelEstudios: "",
    domicilio: "",
    colonia: "",
    municipio: "",
    estado: "",
    codigoPostal: "",
    referencia: "",
    telefonoFijo: "",
    telefonoFijoExtra: "",
    telefonoMovil: "",
    telefonoMovilExtra: "",
    serviciosVivienda: "",
    serviciosComunitarios: "",
    otroServicioVivienda: "", // Campo para "Otro"
    otroServicioComunitario: "", 
    antecedentesPatologicos:"",
    serviciosSalud: "",
    otroAntecedentesPatologicos: "", // Campo para "Otro"
    otroServiciosSalud: "",
    informeMedico: null, 
    historialMedico: null, 
    certificadosTratamientos: null, 
    descripcionApoyo: "", 
    comprobanteDomicilio: null,     
    curpNino: null,           ////////// hola
    documentoIdentidadNino: null, /////////////// hola
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
        .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '') // Bien, pero agregar más acentos
        .toLowerCase()
        .replace(/(^|\s)\S/g, (l) => l.toUpperCase())
        .trim(); // Agregar trim() para eliminar espacios innecesarios
    }

    if (name === 'edad') {
        // Agregar validación más específica para niños en etapa terminal
        formattedValue = Math.max(0, Math.min(17, Number(value) || 0)); // Cambiar a 17 años máximo
        if (isNaN(formattedValue)) formattedValue = ''; // Manejar valores no numéricos
    }

    if (name === 'curp') {
      // Agregar validación de formato CURP
      const curpRegex = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z][0-9]$/;
      formattedValue = value.toUpperCase().slice(0, 18);
      
    }

    if (name === 'fechaNacimiento') {
      const fechaSeleccionada = new Date(value);
      const hoy = new Date();
      if (fechaSeleccionada > hoy) {
          formattedValue = ''; // o la fecha actual
      } else {
          formattedValue = value;
      }
    }

    if (['domicilio', 'municipio', 'colonia', 'referencia'].includes(name)) {
      formattedValue = value
        .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]/g, '')
        .toLowerCase()
        .replace(/(^|\s)\S/g, (l) => l.toUpperCase())
        .trim(); // Agregar trim() para eliminar espacios innecesarios
    }

    if (name === 'codigoPostal') {
      formattedValue = value.replace(/[^0-9]/g, '').slice(0, 5);
    }
    
    if (name === "descripcionApoyo" && value.length > 300) {
      alert("La descripción no debe exceder los 300 caracteres.");
      return;
    }

    if (['telefonoFijo', 'telefonoFijoExtra', 'telefonoMovil', 'telefonoMovilExtra'].includes(name)) {
      formattedValue = value.replace(/[^0-9]/g, '').slice(0, 10);
    }
    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const handleOtroChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        [name]: value, // Guarda la opción "Otro" seleccionada
      });
    } else {
      setFormData({
        ...formData,
        [name]: '', // Borra el texto si se desmarca
      });
    }
  };
  
  // Cambiar el onChange del checkbox "Otro"
  <input
    type="checkbox"
    name="serviciosVivienda"
    value="Otro"
    checked={!!formData.otroServicioVivienda}
    onChange={handleOtroChange}
    id="otroServicioVivienda"
  />

  // Manejo de cambios en los checkboxes
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    const formattedValue = value.trim();
    
    if (name === 'serviciosVivienda' || name === 'serviciosComunitarios' || 
        name === 'antecedentesPatologicos' || name === 'serviciosSalud') {
        let currentValues = formData[name] ? formData[name].split(', ') : [];
        currentValues = currentValues.filter(v => v); // Eliminar valores vacíos
        
        if (checked && !currentValues.includes(formattedValue)) {
            currentValues.push(formattedValue);
        } else if (!checked) {
            currentValues = currentValues.filter(v => v !== formattedValue);
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: currentValues.join(', ')
        }));
    }
};

  const handleFileUpload = (event) => {
    const { name, files } = event.target;
    if (files.length > 0) {
        const file = files[0];
        // Agregar validación de tamaño y tipo de archivo
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            alert('El archivo es demasiado grande. Máximo 5MB');
            return;
        }
        // Validar tipo de archivo según el campo
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            alert('Tipo de archivo no permitido. Use JPG, PNG o PDF');
            return;
        }
        // Aquí se debería subir el archivo al servidor y asignar la ruta correspondiente al campo
        setFormData((prevData) => ({
            ...prevData,
            [name]: file  // Esto solo asigna el archivo, pero puedes guardar la ruta de ese archivo
        }));
    }
};

  // Función para avanzar al siguiente paso y actualizar los pasos completados
  const handleNext = () => {
  if (activeStep < completedSteps.length - 1) {
      const newCompletedSteps = [...completedSteps];
      newCompletedSteps[activeStep] = true; // Marca el paso actual como completado
      setCompletedSteps(newCompletedSteps); // Actualiza los pasos completados
      setActiveStep((prevStep) => prevStep + 1);
  } else {
      handleSubmit(); // En el último paso, envía el formulario
  }
  };

  const handlePrevious = () => {
  if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
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
          return (
            formData.serviciosVivienda.length > 0 && 
            formData.serviciosComunitarios.length > 0
            
          );
        case 3:
          return (
            formData.antecedentesPatologicos.length > 0 &&
            formData.serviciosSalud.length > 0 &&
            formData.informeMedico &&
            formData.historialMedico &&
            formData.certificadosTratamientos &&
            formData.descripcionApoyo 
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

  // Enviar el formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Prepara los datos antes de enviarlos
    const dataToSubmit = {
        ...formData,
        serviciosVivienda: formData.otroServicioVivienda
            ? `${formData.serviciosVivienda}, ${formData.otroServicioVivienda}`.replace(/^, /, "")
            : formData.serviciosVivienda,
        serviciosComunitarios: formData.otroServicioComunitario
            ? `${formData.serviciosComunitarios}, ${formData.otroServicioComunitario}`.replace(/^, /, "")
            : formData.serviciosComunitarios,
        antecedentesPatologicos: formData.otroAntecedentesPatologicos
            ? `${formData.antecedentesPatologicos}, ${formData.otroAntecedentesPatologicos}`.replace(/^, /, "")
            : formData.antecedentesPatologicos,
        serviciosSalud: formData.otroServiciosSalud
            ? `${formData.serviciosSalud}, ${formData.otroServiciosSalud}`.replace(/^, /, "")
            : formData.serviciosSalud,
        fotoPerfil: formData.fotoPerfil ? formData.fotoPerfil.name : null, // Se pasa el nombre o ruta del archivo
        comprobanteDomicilio: formData.comprobanteDomicilio ? formData.comprobanteDomicilio.name : null,
        curpNino: formData.curpNino ? formData.curpNino.name : null,
        documentoIdentidadNino: formData.documentoIdentidadNino ? formData.documentoIdentidadNino.name : null,
        declaracionImpuestos: formData.declaracionImpuestos ? formData.declaracionImpuestos.name : null,
        comprobanteIngresos: formData.comprobanteIngresos ? formData.comprobanteIngresos.name : null,
        cartaAntecedentes: formData.cartaAntecedentes ? formData.cartaAntecedentes.name : null,
    };

    try {
        // Realiza la solicitud al backend
        const response = await fetch('http://localhost:5000/registrar-nino-terminal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSubmit), // Se asegura de enviar los datos en formato JSON
        });

        const result = await response.json();
        if (response.ok) {
            alert('Registro exitoso');
            navigate('/nextPage');  // Redirige después de guardar correctamente
        } else {
            alert(result.message || 'Hubo un error al guardar los datos');
        }
    } catch (error) {
        alert('Error en la conexión');
        console.error('Error:', error);
    }
};
       
  
  return (
    <form onSubmit={handleSubmit}>.
    <div className="registro-container">
      <div className="header">
        <img src="./logo.png" alt="Fundación" className="fundacion-logo" />
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
            <option value="">Selecciona Género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
          <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
          <input
          type="date"
          id="fecha_nacimiento"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleInputChange}
          />
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
        <input type="text" name="domicilio" placeholder="Domicilio (Calle y Número)" value={formData.domicilio} onChange={handleInputChange} maxLength="100" />
        <input type="text" name="colonia" placeholder="Colonia" value={formData.colonia} onChange={handleInputChange} maxLength="100"/>
        <input type="text" name="municipio" placeholder="Municipio" value={formData.municipio} onChange={handleInputChange} maxLength="40"/>
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

        <input type="text" name="codigoPostal" placeholder="Código Postal" value={formData.codigoPostal} onChange={handleInputChange} maxLength="5"/>
        <input type="text" name="referencia" placeholder="Referencia" value={formData.referencia} onChange={handleInputChange} maxLength="255"/>

        <input type="text" name="telefonoFijo" placeholder="Teléfono Fijo" value={formData.telefonoFijo} onChange={handleInputChange} maxLength="10" />
        
        <div className="contact-item">
          <input  type="text" name="telefonoFijoExtra" placeholder="Teléfono Fijo Extra" value={formData.noAplicaFijoExtra ? "no aplica" : formData.telefono_fijo_extra} onChange={handleInputChange} disabled={formData.noAplicaFijoExtra} maxLength="10"  />
        <label>
          <input type="checkbox" name="noAplicaFijoExtra"  checked={formData.telefonoFijoExtra}  onChange={(e) => { handleInputChange(e);
            setFormData({
              ...formData,
              telefono_fijo_extra: e.target.checked ? "no aplica" : ""
            });
          }}
        />
        No Aplica
      </label>
    </div>  

        <input type="text" name="telefonoMovil" placeholder="Teléfono Móvil" value={formData.telefonoMovil} onChange={handleInputChange} maxLength="10" />

        <div className="contact-item">
      <input type="text" name="telefonoMovilExtra" placeholder="Teléfono Móvil Extra" value={formData.noAplicaMovilExtra ? "no aplica" : formData.telefono_movil_extra} onChange={handleInputChange} disabled={formData.noAplicaMovilExtra} maxLength="10" />
      <label>
        <input 
          type="checkbox" name="noAplicaMovilExtra" checked={formData.telefonoMovilExtra} onChange={(e) => { handleInputChange(e);
            setFormData({
              ...formData,
              telefono_movil_extra: e.target.checked ? "no aplica" : ""
            });
          }}
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
        "Loza",
        "Lámina",
        "Cartón",
        "Tabique",
        "Loseta",
        "Piso Firme",
        "Tierra",
        "Televisión",
        "Radio",
        "Computadora"
      ].map((servicio) => (
        <div key={servicio} className="servicio-item">
          <input
            type="checkbox"
            name="serviciosVivienda"
            value={JSON.stringify(servicio).replace(/"/g, '')}
            checked={formData.serviciosVivienda.includes(servicio)}
            onChange={handleCheckboxChange}
            id={`serviciosVivienda-${servicio}`}
          />
          <label htmlFor={`serviciosVivienda-${servicio}`}>{servicio}</label>
        </div>
      ))}
      <div className="servicio-item">
        <input
          type="checkbox"
          name="serviciosVivienda"
          value="Otro"
          checked={!!formData.otroServicioVivienda}
          onChange={() => {}}
          disabled // Deshabilitamos el checkbox de "Otro" ya que usaremos el campo de texto
        />
        <label>Otro:</label>
        <input
          type="text"
          name="otroServicioVivienda"
          value={formData.otroServicioVivienda}
          onChange={handleOtroChange}
          placeholder="Especifique otro servicio de vivienda (Opcional)"
        />
      </div>
    </div>

    <h3>Servicios Comunitarios (selecciona las opciones que correspondan):</h3>
    <div className="servicios-comunitarios-container">
      {[
        "Agua",
        "Drenaje",
        "Teléfono",
        "Pavimento",
        "Internet",
        "Luz"
      ].map((servicio) => (
        <div key={servicio} className="servicio-item">
          <input
            type="checkbox"
            name="serviciosComunitarios"
            value={JSON.stringify(servicio).replace(/"/g, '')}
            checked={formData.serviciosComunitarios.includes(servicio)}
            onChange={handleCheckboxChange}
            id={`serviciosComunitarios-${servicio}`}
          />
          <label htmlFor={`serviciosComunitarios-${servicio}`}>{servicio}</label>
        </div>
      ))}
      <div className="servicio-item">
        <input
          type="checkbox"
          name="serviciosComunitarios"
          value="Otro"
          checked={!!formData.otroServicioComunitario}
          onChange={() => {}}
          disabled
        />
        <label>Otro:</label>
        <input
          type="text"
          name="otroServicioComunitario"
          value={formData.otroServicioComunitario}
          onChange={handleOtroChange}
          placeholder="Especifique otro servicio comunitario (Opcional)"
        />
      </div>
    </div>

  </div>
)}

{activeStep === 3 && (
  <div className="form-section">
    <h2>Información Médica del Niño</h2>

    <h3>Antecedentes Patológicos (selecciona las opciones que correspondan):</h3>
<div className="antecedentes-container">
  {[
    "Diabetes", 
    "Hipertensión", 
    "Cáncer", 
    "Cardiopatía", 
    "Síndrome", 
    "Sin antecedentes"
  ].map((antecedente) => (
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
  <div className="servicio-item">
    <input
      type="checkbox"
      name="antecedentesPatologicos"
      value="Otro"
      checked={!!formData.otroAntecedentesPatologicos}
      onChange={() => {}}
      disabled // Deshabilitamos el checkbox de "Otro" ya que usaremos el campo de texto
    />
    <label>Otro:</label>
    <input
      type="text"
      name="otroAntecedentesPatologicos"
      value={formData.otroAntecedentesPatologicos}
      onChange={handleOtroChange}
      placeholder="Especifique otro antecedente (Opcional)"
    />
  </div>
</div>

<h3>Servicios de Salud (selecciona las opciones que correspondan):</h3>
<div className="servicios-salud-container">
  {[
    "IMSS", 
    "ISSSTE", 
    "Seguro Popular", 
    "Privado", 
    "Centro de Salud", 
    "Sin Servicios"
  ].map((servicio) => (
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
  <div className="servicio-item">
    <input
      type="checkbox"
      name="serviciosSalud"
      value="Otro"
      checked={!!formData.otroServiciosSalud}
      onChange={() => {}}
      disabled // Deshabilitamos el checkbox de "Otro" ya que usaremos el campo de texto
    />
    <label>Otro:</label>
    <input
      type="text"
      name="otroServiciosSalud"
      value={formData.otroServiciosSalud}
      onChange={handleOtroChange}
      placeholder="Especifique otro servicio de salud (Opcional)"
    />
  </div>
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
      <label htmlFor="descripcionApoyo">Realiza una breve descripción del apoyo que se requiere (aproximadamente 100 palabras)</label>
      <textarea
        id="descripcionApoyo"
        name="descripcionApoyo"
        value={formData.descripcionApoyo}
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
                    <button type="button" onClick={handleSubmit}>Guardar</button>
                )}
            </div>
    </div>
    </form>
  );
};
export default RegistroNino;
*/