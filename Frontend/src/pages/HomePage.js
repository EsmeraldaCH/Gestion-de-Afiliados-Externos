import React, { useState, useEffect } from 'react';
import './HomePage.css';
import './loginModal.css';

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [erroresContraseña, setErroresContraseña] = useState([]);
  const [error, setError] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); 

  const handleScroll = () => {
    const linksSection = document.querySelector('.links-section');
    if (linksSection && window.scrollY > linksSection.offsetTop + linksSection.offsetHeight) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const openModal = (viewType) => {
    setView(viewType);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  // Función para manejar el inicio de sesión 
const handleLogin = async () => {
  if (!correo || !contraseña) {
    setError('Por favor, completa todos los campos.');
    return;
  }
  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correo, contraseña }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('Inicio de sesión exitoso:', data);
      setError(null);
      alert('Inicio de sesión exitoso'); // Alerta de éxito


      ///////////////////////agregar los 3 formularios
      window.location.href = '/registro-tercera-edad'; // Ruta para mandar el usuario despues de iniciar sesión
    } else {
      console.error('Error en el inicio de sesión:', data.message);
      setError(data.message || 'Hubo un problema al iniciar sesión');
    }
  } catch (error) {
    console.error('Error en la solicitud de inicio de sesión:', error);
    setError('Error en la solicitud de inicio de sesión. Detalles: ' + error.message);
  }
};

  const validarContraseña = (contraseña) => {
    const errores = [];
    if (contraseña.length < 8) {
      errores.push('La contraseña debe tener al menos 8 caracteres.');
    }
    if (!/[A-Z]/.test(contraseña)) {
      errores.push('La contraseña debe tener al menos una letra mayúscula.');
    }
    if (!/[a-z]/.test(contraseña)) {
      errores.push('La contraseña debe tener al menos una letra minúscula.');
    }
    if (!/\d/.test(contraseña)) {
      errores.push('La contraseña debe tener al menos un número.');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(contraseña)) {
      errores.push('La contraseña debe tener al menos un carácter especial.');
    }
    setErroresContraseña(errores);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (erroresContraseña.length === 0) {
      try {
        const response = await fetch('http://localhost:5000/registro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ correo, contraseña }),
        });

        const data = await response.json();
        if (response.ok) {
          alert('Usuario registrado con éxito');
          setCorreo('');
          setContraseña('');
          closeModal();
        } else {
          alert(data.message || 'Hubo un problema al registrar, intenta de nuevo');
        }
      } catch (error) {
        alert('Hubo un problema al registrar, intenta de nuevo');
      }
    } else {
      alert('Por favor, corrige los errores de la contraseña antes de continuar.');
    }
  };

  return (
    <div className="home-container">
        <header className="home-header">
            <img src="./logo.png" alt="Logo de la Fundación" className="home-logo" />
            <div className="links-section static-links">
                <a href="#pagina-web">Inicio</a>
                <a href="#e-comerce">E-commerce</a>
                <a href="#e-learning">E-learning</a>
                <a href="#afiliados">Afiliados</a>
                <a href="#iniciar-sesion">Iniciar Sesión</a>
                <p className="home-slogan">Dar & Recibir</p>
                <h1 className="welcome-title">Bienvenido a Nuestro Espacio de Apoyo y Esperanza</h1>
            </div>
        </header>
        

{/* Nuevas secciones */}
<section className="home-sections">
  <h2 className="section-title">¿Quiénes forman parte de nuestra visión?</h2>
  <div className="section-item">

    <div className="section-text">
      <h3 className="section-name">Personas de la Tercera Edad</h3>
      <p className="section-description">
      En nuestra fundación, valoramos la sabiduría de la tercera edad. Ofrecemos apoyo integral para promover la dignidad y el bienestar, asegurando que cada persona mayor se sienta valorada y acompañada en su camino.
      
       </p>
    </div>
      <div className="section-images">
        <img src="./tercera_edad_imagen1.png" alt="Tercera Edad 1" className="section-image" />
        <img src="./tercera_edad_imagen3.png" alt="Tercera Edad 2" className="section-image" />
        <img src="./tercera_edad_imagen4.png" alt="Tercera Edad 3" className="section-image" />
      </div> 
      </div>

      <div className="section-item">
<div className="section-text">
      <h3 className="section-name"> Personas con Discapacidad</h3>
      <p className="section-description">   
      Creemos que cada vida es única y cada desafío, una oportunidad para crecer. Nos dedicamos a brindar asistencia a personas con discapacidad, promoviendo la inclusión y celebrando la diversidad para construir un mundo más justo.
       </p>
    </div>
      <div className="section-images">
        <img src="./discapacidad_imagen1.png" alt="Discapacidad 1" className="section-image" />
        <img src="./discapacidad_imagen2.png" alt="Discapacidad 2" className="section-image" />
        <img src="./discapacidad_imagen3.png" alt="Discapacidad 3" className="section-image" />
      </div> 
    </div>

    <div className="section-item">
<div className="section-text">
  <h3 className="section-name">Niños en Etapa Terminal</h3>
  <p className="section-description">
  Los niños son nuestra esperanza y merecen amor y cuidado. En nuestra fundación, brindamos un entorno de apoyo para que los niños en etapa terminal vivan con alegría y dignidad, creando recuerdos que trascienden el tiempo.
   </p>
</div>
  <div className="section-images">
    <img src="./nino_imagen3.png" alt="Nino 1" className="section-image" />
    <img src="./nino_imagen2.png" alt="Nino 2" className="section-image" />
    <img src="./nino_imagen1.png" alt="Nino 3" className="section-image" />
  </div> 
  </div>

</section>


{/* Galería de imágenes */}
<section className="home-gallery">
  <h2 className="gallery-title">Nuestro Impacto de la Fundación</h2>
  <div className="gallery-row">
    <img src="./actividades_imagen2.png" alt="Actividad 1" className="gallery-image" />
    <img src="./actividades_imagen4.png" alt="Actividad 2" className="gallery-image" />
    <img src="./actividades_imagen1.png" alt="Actividad 3" className="gallery-image" />
    <img src="./actividades_imagen3.png" alt="Actividad 4" className="gallery-image" />
  </div>
</section>

 {/* Sección de Nuestra Encargada */}
 <section className="home-encargada">
  <div className="encargada-content">
    {/* Parte izquierda: Nombre y Descripción */}
    <div className="encargada-info">
      <h2 className="encargada-title">Lic. Adriana Yazmin Fuentes Rojas</h2>
      <p className="encargada-description">
        Con una pasión por la ayuda social, Adriana se ha dedicado a transformar vidas a través de su liderazgo en la fundación. Su compromiso con el bienestar de cada persona la impulsa a seguir apoyando a quienes más lo necesitan.
      </p>
      <p className="inspiration-text">
        "Sabemos que no cambiaremos al mundo, pero sí cambiamos el entorno, ya habremos hecho una gran diferencia en la sociedad."
      </p>
    </div>

    {/* Parte derecha: Foto de Adriana */}
    <div className="encargada-photo">
      <img src="./licenciada.png" alt="Lic. Adriana" className="photo-image" />
    </div>
  </div>
</section>



{/* Botones de sesión */}
<div className="home-buttons">
        <button className="btn-login" onClick={() => openModal('login')}>
          Iniciar Sesión
        </button>
        <button className="btn-register" onClick={() => openModal('register')}>
          Crear Cuenta
        </button>
      </div>
        
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-left">
              <img src="./logo.png" alt="Fundación Ai Koi" className="modal-logo" />
            </div>
            <div className="modal-right">
              {view === 'login' ? (
                <div>
                  <h2>Iniciar Sesión</h2>
                  <input
                    type="email"
                    placeholder="Ingrese su Correo electrónico"
                    className="input-field"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                  <div className="password-container">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Ingrese su Contraseña"
                      className="input-field"
                      value={contraseña}
                      onChange={(e) => setContraseña(e.target.value)}
                    />
                  </div>
                  <button className="btn-google" onClick={handleGoogleLogin}>
                    <img src="./google.png" alt="Google Icon" className="google-icon" />
                    Iniciar sesión con Google
                  </button>
                  <button className="login-btn" onClick={handleLogin}>
                    Ingresar
                  </button>
                  {error && <p className="error-message">{error}</p>}

                  <p className="login-link">
                    ¿No tienes una cuenta?{' '}
                    <a onClick={() => setView('register')}>
                      Regístrate aquí
                    </a>

                  </p>
                </div>
              ) : (
                <div>
                  <h1>Crear Cuenta</h1>
                  <input
                    type="email"
                    placeholder="Ingrese su Correo Electrónico"
                    className="input-field"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                  <div className="password-container">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Ingrese su Contraseña"
                      className="input-field"
                      value={contraseña}
                      onChange={(e) => {
                        setContraseña(e.target.value);
                        validarContraseña(e.target.value);
                      }}
                    />
                  </div>
                  <ul className="error-list">
                    {erroresContraseña.map((error, index) => (
                      <li key={index} className="error-message">
                        {error}
                      </li>
                    ))}
                  </ul>
                  <button className="register-btn" onClick={handleRegister}>
                    Crear cuenta 
                  </button>
                  <button className="btn-google" onClick={handleGoogleLogin}>
                    <img src="./google.png" alt="Google Icon" className="google-icon" />
                    Registrarse con Google
                  </button>
                  <p className="register-link">
                    ¿Ya tienes una cuenta?{' '}
                    <a onClick={() => setView('login')}>
                      Inicia sesión aquí
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
          </div>
      )}


      <section className="home-media">
        <div className="home-tutorial">
          <p>¿Cómo crear una cuenta?</p>
          <iframe
            src="/video.mp4"
            className="home-video"
            title="Video tutorial"
          ></iframe>
        </div>
        <div className="home-location">
          <p>Nuestra Ubicación</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3757.721890064961!2d-99.16936172628735!3d19.639184134054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f50dca49c49d%3A0x875fd45ba2858bac!2sFundaci%C3%B3n%20Ai%20Koi%20A.C.!5e0!3m2!1ses-419!2smx!4v1727810727485!5m2!1ses-419!2smx"
            width="100%"
            height="200px"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="home-map"
            title="Ubicación"
          ></iframe>
        </div>
      </section>
 {/* Redes sociales */}
 <footer className="home-footer">
        <div className="social-icons">
        <a
            href="https://www.facebook.com/profile.php?id=100070034597140&mibextid=LQQJ4d"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="icon" src="./facebook.png" alt="Facebook" />
          </a>
          <a
            href="https://www.youtube.com/@fundacionaikoi7305"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="icon" src="./youtube.png" alt="YouTube" />
          </a>
          <a
            href="https://www.instagram.com/fundacionaikoi/?hl=es-la"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="icon" src="./instagram.png" alt="Instagram" />
          </a>
          <a
            href="https://www.tiktok.com/@aikoiac"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="icon" src="./tik-tok.png" alt="TikTok" />
          </a>
          <a
            href="https://twitter.com/fundacionaikoi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="icon" src="./twiter.png" alt="Twitter" />
          </a>
          <a href="mailto:fundacion.aikoi@gmail.com" target="_blank">
            <img className="icon" src="./gmail.png" alt="Gmail" />
          </a>
          <a href="https://wa.me/525610152625" target="_blank">
            <img className="icon" src="./whatsapp.png" alt="WhatsApp" />
          </a>
        </div>
        Fundación Ai Koi - <a href="./privacidad">Aviso de Privacidad</a> - <a href="./terminos">Términos y Condiciones</a> 
      </footer>
    </div>
  );
};
export default HomePage;
