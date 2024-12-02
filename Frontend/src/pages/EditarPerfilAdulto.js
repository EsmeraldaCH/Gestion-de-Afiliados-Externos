import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../components/RegistroTerceraEdad.css';

function EditarPerfilAdulto() {
  const [usuario, setUsuario] = useState(null);
  const [formData, setFormData] = useState({});
  const [activeStep, setActiveStep] = useState(1); // Pasos de edición
  const { usuarioId } = useParams(); // ID del usuario a editar
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los datos actuales del usuario desde la API
    fetch(`http://localhost:5000/api/adulto/${usuarioId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Datos recibidos del backend:', data); // Verifica los datos
        setUsuario(data);
        setFormData(data); // Inicializar el formulario con los datos actuales
      })
      .catch((error) => console.error('Error:', error));
  }, [usuarioId]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  // Manejar el siguiente paso
  const nextStep = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, 5)); // Suponiendo que tienes 5 pasos
  };

  // Manejar el paso anterior
  const prevStep = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/api/adulto/${usuarioId}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al guardar los cambios');
        }
        return response.json();
      })
      .then((data) => {
        alert('Datos actualizados con éxito');
        navigate(`/profileAdultos/${usuarioId}`); // Redirigir al perfil del usuario
      })
      .catch((error) => console.error('Error:', error));
  };

  if (!usuario) return <div>Cargando...</div>;

  return (
    <form onSubmit={handleSubmit} className="registro-container">
      <div className="header">
        <img src="../logo.png" alt="Fundación" className="fundacion-logo" />
        <h1>Editar Perfil del Adulto Mayor</h1>
        <p className="slogan">Dar & Recibir</p>
      </div>

      <div className="progress-container">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className={`progress-circle 
              ${activeStep === index + 1 ? 'active' : ''} 
              ${activeStep > index + 1 ? 'completed' : ''}`}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {/* Paso 1: Datos Personales del Adulto */}
      {activeStep === 1 && (
        <div className="form-section">
          <h2>Datos Personales del Adulto</h2>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          <input
            type="text"
            name="apellido_paterno"
            placeholder="Apellido Paterno"
            value={formData.apellido_paterno}
            onChange={handleChange}
          />
          <input
            type="text"
            name="apellido_materno"
            placeholder="Apellido Materno"
            value={formData.apellido_materno}
            onChange={handleChange}
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
            type="text"
            name="curp"
            placeholder="CURP (18 caracteres)"
            value={formData.curp}
            onChange={handleChange}
            maxLength="18"
          />
          <select
            name="estado_civil"
            value={formData.estado_civil}
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
        </div>
      )}

      {/* Paso 2: Información de Contacto y Dirección */}
      {activeStep === 2 && (
        <div className="form-section">
          <h2>Datos de Contacto y Dirección</h2>
          <input
            type="text"
            name="domicilio_calle_numero"
            placeholder="Domicilio (Calle y Número)"
            value={formData.domicilio_calle_numero}
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
        name="codigo_postal"
        placeholder="Código Postal"
        value={formData.codigo_postal}
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
       name="telefono_fijo"
       placeholder="Teléfono Fijo"
       value={formData.telefono_fijo}
       onChange={handleChange}
       maxLength="10"
       />
      <input
       type="text"
       name="telefono_movil"
       placeholder="Teléfono Móvil"
       value={formData.telefono_movil}
       onChange={handleChange}
       maxLength="10"
      />

<h3>Apoyo Requerido:</h3>
      <div className="file-upload-container">
      <label htmlFor="descripcionApoyo">Realiza una breve descripción del apoyo que se requiere (aproximadamente 100 palabras)</label>
      <textarea
        id="descripcionApoyo"
        name="descripcion_apoyo"
        value={formData.descripcion_apoyo}
        onChange={handleChange}
        className="descripcion-textarea"
      />
      </div>
  </div>
        
      )}


      <div className="navigation-buttons">
        {activeStep > 1 && <button type="button" onClick={prevStep}>Paso Anterior</button>}
        {activeStep < 3 && <button type="button" onClick={nextStep}>Siguiente Paso</button>}
        {activeStep === 3 && <button type="submit">Guardar Cambios</button>}
      </div>
    </form>
  );
}

export default EditarPerfilAdulto;
