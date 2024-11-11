import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import HomePage from './pages/HomePage';
import ErrorBoundary from './components/ErrorBoundary'; // Importa ErrorBoundary
import Profile from './pages/Profile';

// Importación de componentes
import PerfilUsuario from './components/PerfilUsuario';
import SeleccionBeneficiario from './components/SeleccionBeneficiario';
import RegistroNino from './components/RegistroNino';
import RegistroTerceraEdad from './components/RegistroTerceraEdad';
import RegistroDiscacidad from './components/RegistroDiscapacidad'; 

// Importación de componentes del administrador
import AdminAiKoi from './admin/AdminAiKoi';
import Usuarios from './admin/Usuarios';
import AgregarEvento from './admin/AgregarEvento';
import Configuracion from './admin/Configuracion';

// Importación de componentes de la vista de cada perfil
import UsuariosNinos from './admin/UsuariosNinos';
import UsuariosDiscapacidad from './admin/UsuariosDiscapacidad';
import UsuariosTerceraEdad from './admin/UsuariosTerceraEdad';

// Importación de páginas
import PrivacyNotice from './pages/PrivacyNotice';
import TermsAndConditions from './pages/TermsAndConditions';
import AccountSecurity from './pages/AccountSecurity'; 

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Ruta para la página principal */}
          <Route path="/" element={<HomePage />} />
          <Route path="/terminos" element={<TermsAndConditions />} />
          <Route path="/privacidad" element={<PrivacyNotice />} />

          {/* Ruta para la página de registro y perfil */}
          <Route path="/Register" element={<Register />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/perfil" element={<PerfilUsuario />} />
          <Route path="/seleccion-beneficiario" element={<SeleccionBeneficiario />} />
          <Route path="/registro-nino" element={<RegistroNino />} />
          <Route path="/registro-tercera-edad" element={<RegistroTerceraEdad />} />
          <Route path="/registro-discapacidad" element={<RegistroDiscacidad />} />
          <Route path="/AccountSecurity" element={<AccountSecurity />} />

          {/* Rutas para el administrador */}
          <Route path="/admin/AdminAiKoi" element={<AdminAiKoi />} />
          <Route path="/admin/Usuarios" element={<Usuarios />} />
          <Route path="/admin/AgregarEvento" element={<AgregarEvento />} />
          <Route path="/admin/Configuracion" element={<Configuracion />} />


          <Route path="/admin/Usuarios/Ninos" element={<UsuariosNinos />} />
          <Route path="/admin/Usuarios/Discapacidad" element={<UsuariosDiscapacidad />} />
          <Route path="/admin/Usuarios/TerceraEdad" element={<UsuariosTerceraEdad />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
