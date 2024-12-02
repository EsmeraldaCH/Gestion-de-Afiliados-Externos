import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Asegúrate de tener axios instalado
import './stylesConfiguracion.css';

const Configuracion = () => {
  const [adminData, setAdminData] = useState({
    id: null,
    nombre: '',
    correo: '',
    curp: '',
    nuevaContrasena: '',
    confirmarContrasena: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar datos del usuario desde localStorage
    const userStr = localStorage.getItem('user');
    
    if (!userStr) {
      setError('No se encontró información de usuario');
      setLoading(false);
      return;
    }

    try {
      const user = JSON.parse(userStr);
      
      if (!user.id) {
        setError('No se encontró ID de administrador');
        setLoading(false);
        return;
      }

      // Fetch de los datos del administrador
      const fetchAdminDetails = async () => {
        try {
          const response = await axios.get(`/api/administradores/${user.id}`);
          setAdminData({
            ...adminData,
            id: user.id,
            nombre: response.data.nombre || '',
            correo: response.data.correo || '',
            curp: response.data.curp || ''
          });
          setLoading(false);
        } catch (error) {
          setError('Error al cargar los datos del administrador');
          setLoading(false);
        }
      };

      fetchAdminDetails();
    } catch (err) {
      setError('Error al procesar la información de usuario');
      setLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validaciones
    if (!adminData.nombre.trim()) {
      setError('El nombre es obligatorio');
      return;
    }

    // Validación de contraseña si se proporciona
    if (adminData.nuevaContrasena) {
      if (adminData.nuevaContrasena !== adminData.confirmarContrasena) {
        setError('Las contraseñas no coinciden');
        return;
      }
    }

    try {
      // Preparar datos para enviar
      const dataToSubmit = {
        nombre: adminData.nombre.trim(),
        correo: adminData.correo,
        curp: adminData.curp,
        nuevaContrasena: adminData.nuevaContrasena || undefined
      };

      // Enviar actualización
      const response = await axios.put(`/api/administradores/${adminData.id}`, dataToSubmit);
      
      // Actualizar localStorage si es necesario
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        user.nombre = dataToSubmit.nombre;
        localStorage.setItem('user', JSON.stringify(user));
      }

      alert('Datos actualizados correctamente');
      
      // Limpiar contraseñas después de actualizar
      setAdminData(prev => ({
        ...prev,
        nuevaContrasena: '',
        confirmarContrasena: ''
      }));

    } catch (error) {
      setError(error.response?.data?.error || 'Error al actualizar los datos');
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="admin-config-container">

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
      <section className="config-section body-configuracion">
        <h1>Actualizar información del Administrador</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={adminData.nombre}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo Electrónico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={adminData.correo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="curp">CURP</label>
            <input
              type="text"
              id="curp"
              name="curp"
              value={adminData.curp}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nuevaContrasena">Nueva Contraseña</label>
            <input
              type="password"
              id="nuevaContrasena"
              name="nuevaContrasena"
              value={adminData.nuevaContrasena}
              onChange={handleInputChange}
              placeholder="Dejar en blanco si no desea cambiar"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmarContrasena">Confirmar Nueva Contraseña</label>
            <input
              type="password"
              id="confirmarContrasena"
              name="confirmarContrasena"
              value={adminData.confirmarContrasena}
              onChange={handleInputChange}
              placeholder="Confirme la nueva contraseña"
            />
          </div>
          <button type="submit" className="save-btn">Guardar Cambios</button>
        </form>
      </section>
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
};

export default Configuracion;