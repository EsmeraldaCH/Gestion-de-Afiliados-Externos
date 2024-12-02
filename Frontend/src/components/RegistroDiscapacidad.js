import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistroDiscapacidad.css';

function RegistroDiscapacidad() {
  const [activeStep, setActiveStep] = useState(1); // Controla el paso actual
  const [error, setError] = useState(""); // Estado para el mensaje de error
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado para la caja emergente
  const [formData, setFormData] = useState({
    beneficiarioId: JSON.parse(localStorage.getItem('user'))?.id || '',
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    numeroIdentificacionFiscal: "",
    fechaNacimiento: "",
    edad: "",
    sexo: "",
    estadoCivil: "",
    curp: "",
    hijos: "",
    nivelEstudios: "",
    ocupacion: "",

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
    certificadosDiscapacidad: null,
    descripcionApoyo: "",

    comprobanteDomicilio: null,
    curpDocumento: null,
    documentoIdentidad: null,
    declaracionImpuestos: null,
    comprobanteIngresos: null,
    cartaAntecedentesNoPenales: null,
    referenciasPersonalesProfesionales: null,

    certificadosAcademicos: null,
    diplomasTitulos: null,
    fotoPerfil: "",
  });
  const navigate = useNavigate();

  // Campos requeridos para cada paso
  const requiredFieldsByStep = {
    1: ["nombre", "apellidoPaterno", "apellidoMaterno", "numeroIdentificacionFiscal", "fechaNacimiento", "edad", "sexo", "estadoCivil", "curp", "nivelEstudios", "hijos", "ocupacion"],
    2: ["domicilio", "colonia", "municipio", "estado", "codigoPostal", "referencia","telefonoFijo", "telefonoFijoExtra", "telefonoMovil", "telefonoMovilExtra"],
    3: ["serviciosVivienda", "serviciosComunitarios"],
    4: ["antecedentesPatologicos", "serviciosSalud", "certificadosDiscapacidad", "descripcionApoyo"],
    5: ["comprobanteDomicilio", "curpDocumento", "documentoIdentidad", "declaracionImpuestos", "comprobanteIngresos", "cartaAntecedentesNoPenales", "referenciasPersonalesProfesionales", "certificadosAcademicos", "diplomasTitulos", "fotoPerfil"]
    };

  // Validar campos del paso actual
  const validateStep = () => {
    const requiredFields = requiredFieldsByStep[activeStep];
    let errorMessage = ''; // Variable para el mensaje de error general

    for (const field of requiredFields) {
      if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        // Validación para documentos en el paso 5
        if (activeStep === 5) {
          errorMessage = "Por favor, suba todos los documentos requeridos antes de enviar.";
        } else {
          errorMessage = "Por favor, llene todos los campos.";
        }
        break; // Detener la validación en el primer error encontrado
      }
    }
    return errorMessage; // Retornar el mensaje de error
  };

  // Función para avanzar al siguiente paso solo si es válido
  const nextStep = () => {
    const errorMessage = validateStep(); // Validar campos antes de avanzar
  
    if (errorMessage) {
      setError(errorMessage); // Mostrar el mensaje de error
    } else {
      setActiveStep((prevStep) => Math.min(prevStep + 1, 5)); // Avanzar de paso
      setError(""); // Limpiar error al avanzar correctamente
    }
  };

  // Efecto para ocultar el mensaje de error automáticamente después de 3 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer); // Limpiar el temporizador si cambia el estado
    }
  }, [error]);

  const today = new Date();
  const maxDate = today.toISOString().split("T")[0]; // Fecha de hoy
  const minDate = new Date(today.setFullYear(today.getFullYear() -80))
    .toISOString()
    .split("T")[0]; // Hace 18 años

  const handleBlur = (e) => {
    const { name, value } = e.target;
  
    if (name === "fechaNacimiento") {
    // Solo validar cuando el campo esté completo (yyyy-mm-dd)
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const inputDate = new Date(value);
      if (isNaN(inputDate.getTime())) {
        alert("Fecha inválida.");
        return;
      }
  
    const maxDateObj = new Date(maxDate);
    const minDateObj = new Date(minDate);
  
      if (inputDate > maxDateObj || inputDate < minDateObj) {
        alert(
          `La fecha de nacimiento debe ser entre ${minDate} y ${maxDate}.`
        );
        return;
      }
  
    // Calcular la edad y actualizar el estado
    const age = calculateAge(value);
    setFormData((prevData) => ({
      ...prevData,
      fechaNacimiento: value,
      edad: age,
    }));
    } else {
        alert("Por favor, ingresa una fecha completa.");
      }
    }
  };

  const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      
      // Función para formatear texto (para CURP, nombre, domicilio, etc.)
      const formatText = (text, isCURP = false, isMunicipio = false, isColoniaDomicilio = false, isReferencia = false) => {
      if (!text) return text;

      // Si es CURP, convertir todo a mayúsculas y eliminar caracteres no permitidos
      if (isCURP) {
        text = text.toUpperCase().replace(/[^A-Z0-9]/g, ''); // Solo letras y números
        return text.slice(0, 18); // Limitar a 18 caracteres
      }

      // Si es Municipio, solo letras y tildes, primera letra en mayúscula
      if (isMunicipio) {
        text = text.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''); // Elimina caracteres no permitidos
        text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(); // Capitaliza la primera letra
        return text.slice(0, 35); // Limitar a 35 caracteres
      }

      // Si es Colonia o Domicilio, aceptar números, tildes, # y primera letra de cada palabra en mayúscula
      if (isColoniaDomicilio) {
        text = text.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ#\s]/g, ''); // Elimina caracteres no permitidos
        text = text
          .split(' ') // Separa el texto en palabras
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza la primera letra de cada palabra
          .join(' '); // Junta las palabras nuevamente con un espacio
        return text.slice(0, 60); // Limitar a 60 caracteres
      }

      // Si es Referencia, aceptar números, letras, tildes, #, y la primera letra en mayúscula
      if (isReferencia) {
        text = text.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ#\s]/g, ''); // Elimina caracteres no permitidos
        text = text.charAt(0).toUpperCase() + text.slice(1); // Primera letra del texto en mayúscula
        return text.slice(0, 150); // Limitar a 150 caracteres
      }

      // Para nombres y apellidos, eliminamos caracteres no deseados y capitalizamos cada palabra
      text = text.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''); // Solo letras y espacios
      text = text
        .split(' ') // Separa el texto en palabras
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza la primera letra de cada palabra
        .join(' '); // Junta las palabras nuevamente con un espacio
      return text.slice(0, 25); // Limitar a 25 caracteres
  };
    
      // Formateamos el valor según el nombre del campo
    let formattedValue = value;

    if (name === 'curp') {
      formattedValue = formatText(value, true); // Formatear CURP
    } 
    else if (name === 'municipio') {
      formattedValue = formatText(value, false, true); // Formatear Municipio
    } 
    else if (['colonia', 'domicilio'].includes(name)) {
    formattedValue = formatText(value, false, false, true); // Formatear Colonia o Domicilio
    } 
    else if (name === 'referencia') {
    formattedValue = formatText(value, false, false, false, true); // Formatear Referencia
    } 
    else if (name === 'codigoPostal') {
    formattedValue = value.replace(/[^0-9]/g, ''); // Solo números
    formattedValue = formattedValue.slice(0, 5); // Limitar a 5 caracteres
    } 
    else if (['telefonoFijo', 'telefonoFijoExtra', 'telefonoMovil', 'telefonoMovilExtra'].includes(name)) {
    formattedValue = value.replace(/[^0-9]/g, ''); // Solo números
    formattedValue = formattedValue.slice(0, 10); // Limitar a 10 caracteres
    } 
    else if (['nombre', 'apellidoPaterno', 'apellidoMaterno'].includes(name)) {
    formattedValue = formatText(value); // Formatear nombres y apellidos
    }
  // Actualizamos el estado con el valor formateado, manteniendo la lógica para los checkboxes
  setFormData((prevData) => ({
    ...prevData,
    [name]: type === "checkbox" ? checked : formattedValue,
  }));
  };

  const calculateAge = (birthDate) => {
      if (!birthDate) return "";
      const birth = new Date(birthDate);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      const dayDiff = today.getDate() - birth.getDate();
  
      // Ajustar la edad si el cumpleaños aún no ha ocurrido este año
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }
      return age >= 0 ? age : ""; // Devolver vacío si la fecha es inválida
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

   const userStr = localStorage.getItem('user'); // Obtener el ID del usuario del localStorage
   const user = JSON.parse(userStr);
   const userId = user.id;

  const errorMessage = validateStep();  // Validar el paso actual (5)
  if (errorMessage) {
    setError(errorMessage); // Mostrar error si hay problemas
    return;
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
  
  const data = new FormData(); // Crear un FormData para enviar archivos y otros datos

  data.append('beneficiarioId', userId);

  // Agregar otros campos de texto directamente
  Object.keys(formData).forEach((key) => {
    if (
      key !== 'archivos' &&
      key !== 'certificadosDiscapacidad' &&
      key !== 'comprobanteDomicilio' &&
      key !== 'curpDocumento' &&
      key !== 'documentoIdentidad' &&
      key !== 'declaracionImpuestos' &&
      key !== 'comprobanteIngresos' &&
      key !== 'cartaAntecedentesNoPenales' &&
      key !== 'referenciasPersonalesProfesionales' &&
      key !== 'certificadosAcademicos' &&
      key !== 'diplomasTitulos' &&
      key !== 'fotoPerfil' 
    ) {
      data.append(key, formData[key]);
    }
  });


  if (formData.certificadosDiscapacidad) {
    data.append('certificadosDiscapacidad', formData.certificadosDiscapacidad);
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
  if (formData.certificadosAcademicos) {
    data.append('certificadosAcademicos', formData.certificadosAcademicos);
  }
  if (formData.diplomasTitulos) {
    data.append('diplomasTitulos', formData.diplomasTitulos);
  }
  if (formData.fotoPerfil) {
    data.append('fotoPerfil', formData.fotoPerfil);
  }

  try {
    const response = await fetch('http://localhost:5000/api/discapacidad', {
      method: 'POST',
      body: data // Aquí enviamos el FormData // 
    }); // Enviar el FormData con fetch

    const responseData = await response.json();

    if (response.ok) {
      setShowSuccessModal(true); // Mostrar la caja emergente de éxito
      
      setTimeout(() => {
        window.location.href = `/ProfileDiscapacidad/${userId}`; 
      }, 5000); // Redirigir después de unos segundos o cuando el usuario acepte
    } else {
      throw new Error(responseData.message || 'Error en el servidor al guardar los datos');
    }
  } catch (error) {
    console.error('Error al enviar los datos:', error);
    alert('Hubo un problema al enviar los datos: ' + error.message);
  }
};

const submitButtonDisabled = validateStep(); // Deshabilitar el botón de enviar si hay errores

  return (
    <form onSubmit={handleSubmit} className="registro-container">
      <div className="header">
        <img src="./logo.png" alt="Fundación" className="fundacion-logo" />
        <h1>Registro para Discapacidad</h1>
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
          <h2>Datos Personales</h2>
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
            type="text"
            name="numeroIdentificacionFiscal"
            placeholder="Número de Identificación Fiscal"
            value={formData.numeroIdentificacionFiscal}
            onChange={handleChange}
          />

           <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
          
          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange} // Permite escribir sin validar
            onBlur={handleBlur} // Valida solo al salir del campo
            max={maxDate}
            min={minDate}
          />
          <input
            type="number"
            name="edad"
            placeholder="Edad (calculada automáticamente)"
            value={formData.edad}
            readOnly // Este campo será de solo lectura
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
          
          <input 
        type="number" 
        name="hijos" 
        placeholder="Cantidad de Hijos" 
        value={formData.hijos} 
        onChange={handleChange} min="0" max="10" />
         
          <select
            name="estadoCivil"
            value={formData.estadoCivil}
            onChange={handleChange}
          >
            <option value="">Selecciona Estado Civil</option>
            <option value="Soltero/a">Soltero/a</option>
            <option value="Casado/a">Casado/a</option>
            <option value="Unión libre">Unión libre</option>
            <option value="Separado/a">Separado/a</option>
            <option value="Divorciado/a">Divorciado/a</option>
            <option value="Viudo/a">Viudo/a</option>
            <option value="Concubinato">Concubinato</option>
          </select>
         
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
            <option value="Licenciatura">Licenciatura</option>
            <option value="Maestría">Maestría</option>
            <option value="Doctorado">Doctorado</option>
            <option value="No aplica">No aplica</option>
          </select>

          <input
            type="text"
            name="ocupacion"
            placeholder="Ocupación"
            value={formData.ocupacion}
            onChange={handleChange}
          />

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
      )}

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
      )}

      {activeStep === 4 && ( 
  <div className="form-section">
    <h2>Información Médica</h2>
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
    <label htmlFor="certificadosDiscapacidad">Certificado de Discapacidad (PDF)</label>
    <input
      type="file"
      id="certificadosDiscapacidad"
      name="certificadosDiscapacidad"
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
      )}

      {activeStep === 5 && (
  <div className="form-section">
    <h3>Documentación</h3>

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
        <label htmlFor="curpDocumento">Documento CURP (subir archivo PDF)</label>
        <input
          type="file"
          id="curpDocumento"
          name="curpDocumento"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </div>

      <div className="file-upload-item">
        <label htmlFor="documentoIdentidad">Documento de Identidad (subir archivo PDF)</label>
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

      <div className="file-upload-item">
        <label htmlFor="certificadosAcademicos">Certificados Académicos (subir archivo PDF)</label>
        <input
          type="file"
          id="certificadosAcademicos"
          name="certificadosAcademicos"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </div>

      <div className="file-upload-item">
        <label htmlFor="diplomasTitulos">Diplomas o Títulos (subir archivo PDF)</label>
        <input
          type="file"
          id="diplomasTitulos"
          name="diplomasTitulos"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </div>

      <div className="summary-message">
      <p>
    Para completar tu solicitud, asegúrate de haber subido todos los documentos necesarios. Sin ellos, no podremos procesar tu registro.
  </p>
  </div>
    </div>
  </div>
      )}

  {/* Mostrar mensaje de error */}
    {error && ( 
    <div className="error-box">
      <span className="error-icon">⚠️</span> 
      <p className="error-text">{error}</p>
    </div>
    )}

  <div className="navigation-buttons">
  {/* Botón Anterior */}
    {activeStep > 1 && (
      <button type="button" onClick={() => setActiveStep((prevStep) => Math.max(prevStep - 1, 1))}>
        Anterior
      </button>
    )}

    {/* Botón Siguiente */}
    {activeStep < 5 && (
      <button type="button" onClick={nextStep}>
        Siguiente
      </button>
    )}

    {/* Botón Enviar */}
    {activeStep === 5 && (
      <button type="button" disabled={submitButtonDisabled} onClick={handleSubmit}>
        Enviar
      </button>
    )}
    </div>

  {/* Caja emergente de éxito */}
    {showSuccessModal && (
        <div className="modal-overlay">
          <div className="success-modal">
            <h2>¡Datos enviados con éxito!</h2>
            <p>¡Gracias por enviar sus datos! En breve será redirigido a su perfil para ver o actualizar su información.</p>
            <button onClick={() => setShowSuccessModal(false)}>Aceptar</button>
          </div>
        </div>
    )}

</form>
  );
}

export default RegistroDiscapacidad;
