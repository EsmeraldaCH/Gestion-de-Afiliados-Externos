import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UsuariosNinos.css'

function UsuariosNinos() {
  const [usuarios, setUsuarios] = useState([]);
  const [searchInput, setSearchInput] = React.useState(""); // Lo que el usuario escribe
  const [searchQuery, setSearchQuery] = React.useState(""); // Búsqueda activada
  const [selectedState, setSelectedState] = React.useState("");

  const navigate = useNavigate(); // Hook para redireccionar

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

// Función que activa la búsqueda al hacer clic en el botón
const handleSearch = () => {
  setSearchQuery(searchInput); // Actualiza el término final para la búsqueda
  console.log("Realizando búsqueda para:", searchInput);
  // Aquí puedes llamar a tu función para buscar usuarios en la base de datos
};

// Función que limpia el input y el término de búsqueda
const handleClearSearch = () => {
  setSearchInput(""); // Limpia el texto en el input
  setSearchQuery(""); // Limpia el término de búsqueda
  setSelectedState(""); // Limpia la selección del estado
  console.log("Búsqueda limpiada");
};


// Filtrar y limitar los usuarios
const filteredUsuarios = usuarios
  .filter((usuario) => {
    const lowerSearchQuery = searchQuery.toLowerCase();
    const searchTerms = lowerSearchQuery.split(' ').filter(term => term !== ''); // Divide el término de búsqueda por espacios

    // Verificar si todos los términos de búsqueda están presentes en los campos correspondientes
    const matchesSearchTerms = searchTerms.every((term) =>
      usuario.nombre.toLowerCase().includes(term) ||
      usuario.apellido_paterno.toLowerCase().includes(term) ||
      usuario.apellido_materno.toLowerCase().includes(term) ||
      usuario.fecha_nacimiento.toLowerCase().includes(term)
    );

    // Filtrar también por estado solo si la búsqueda se ha activado
    const matchesState = selectedState ? usuario.estado === selectedState : true;

    return matchesSearchTerms && matchesState; // Ambos deben coincidir
  })
  .slice(-10) // Limitar a 10 registros
  .reverse(); // Ordenar los resultados


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

   // Función para manejar el clic en el botón "Ver más"
   const handleViewMore = (usuarioId) => {
    navigate(`/usuario/${usuarioId}`); // Redirige a la vista de detalles del usuario
  };

  return (
  < div className="body-beneficiary">
      {/* Header */}
      <header className="beneficiary-header">
        <div className="header-content">
          <img src="/logo.png" alt="Fundación" className="fundacion-logo" />
          
          {/* Contenedor para los enlaces de navegación */}
          <nav className="beneficiary-nav">
            <ul className="beneficiary-nav-list">
              <li className="beneficiary-nav-item"><a href="/"><u>Inicio</u></a></li>
              <li className="beneficiary-nav-item"><a href="#"><u>Sobre Nosotros</u></a></li>
              <li className="beneficiary-nav-item"><a href="#"><u>Servicios</u></a></li>
              <li className="beneficiary-nav-item"><a href="#"><u>Contacto</u></a></li>
            </ul>
          </nav>

          <img src="/dar.png" alt="Fundación Dar" className="header-logo-right" />
        </div>
      </header>


{/* Barra de búsqueda con filtros */}
<section className="admin-busqueda-section">
  <div className="admin-busqueda-container">
    <img className="admin-busqueda-icon" src="/ADMING.png" alt="Icono de Admin" />
    <div className="admin-busqueda-title">Búsqueda de Usuarios</div>
    <input 
      type="busqueda"  // Asegúrate de que sea "text", no "busqueda"
      id="admin-busqueda-input" 
      className="admin-busqueda-input"
      placeholder="Por Nombre,  Apellidos o Fecha de Nacimiento" 
      value={searchInput} // Cambia al estado de entrada
      onChange={(e) => setSearchInput(e.target.value)} 
    />
    <button 
      className="admin-busqueda-button"
      onClick={handleSearch} // Activa la búsqueda
    >
      <img src="/Buscar.png" alt="Buscar" className="admin-busqueda-button-icon" />
      Buscar
    </button>
  </div>

  {/* Filtro por estado */}
  <div className="admin-filter-container">
    <label htmlFor="admin-filter-select" className="admin-filter-label">Filtrar por estado:</label>
    <select 
      id="admin-filter-select" 
      className="admin-filter-select" 
      value={selectedState}
      onChange={(e) => setSelectedState(e.target.value)} // Solo actualiza el estado seleccionado
    >
      <option value="">Todos</option>
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
  </div>
  <button 
      className="admin-limpiar-button"
      onClick={handleClearSearch} // Limpia la búsqueda
    >
      <img src="/limpiar.png" alt="Buscar" className="admin-busqueda-button-icon" />
      Limpiar Búsqueda
    </button>
</section>



      {/* Usuarios - Niños */}
      <div className="container">
        <h2 className="section-title">Usuarios - Niños en Etapa Terminal</h2>

        {/* Datos Personales del Niño */}
        <div className="section">
          <h3 className="subsection-title">Datos Personales del Niño</h3>
          <table className="data-table">
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
                <th>Acciones</th> {/* Nueva columna para el botón */}
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.map((usuario) => (
                <tr key={usuario.beneficiario_id}>
                   
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido_paterno}</td>
                  <td>{usuario.apellido_materno}</td>
                  <td>{usuario.edad}</td>
                  <td>{usuario.sexo}</td>
                  <td>{usuario.fecha_nacimiento ? new Date(usuario.fecha_nacimiento).toISOString().split('T')[0] : ''}</td>
                  <td>{usuario.curp}</td>
                  <td>{usuario.nivel_estudios}</td>
                  <td>
                    <button onClick={() => handleViewMore(usuario.beneficiario_id)}>Ver más</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default UsuariosNinos;
