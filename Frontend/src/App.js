import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import HomePage from './pages/HomePage';
import ErrorBoundary from './components/ErrorBoundary';
import Profile from './pages/Profile';
import ProfileDiscapacidad from './pages/ProfileDiscapacidad';
import ProfileAdultos from './pages/ProfileAdultos';
import EditarPerfil from './pages/EditarPerfil';
import EstadisticasAfiliados from './admin/EstadisticasAfiliados';

// Importación de componentes
import PerfilUsuario from './components/PerfilUsuario';
import SeleccionBeneficiario from './components/SeleccionBeneficiario';
import RegistroNino from './components/RegistroNino';
import RegistroTerceraEdad from './components/RegistroTerceraEdad';
import RegistroDiscacidad from './components/RegistroDiscapacidad'; 

// Importación de componentes del administrador

import AdminDashboard from './admin/AdminDashboard'; // Añade esta importación
import Usuarios from './admin/Usuarios';
import AgregarEvento from './admin/AgregarEvento';
import Configuracion from './admin/Configuracion';
import AddAdmin from './admin/AddAdmin';

// Importación de componentes de la vista de cada perfil
import UsuariosNinos from './admin/UsuariosNinos';
import UsuarioNinosDetalles from './admin/UsuarioNinosDetalles';
import UsuariosDiscapacidad from './admin/UsuariosDiscapacidad';
import UsuarioDiscapacidadDetalles from './admin/UsuarioDiscapacidadDetalles';
import UsuariosTerceraEdad from './admin/UsuariosTerceraEdad';
import UsuarioAdultoDetalles from './admin/UsuarioAdultoDetalles';

// Importación de páginas
import PrivacyNotice from './pages/PrivacyNotice';
import TermsAndConditions from './pages/TermsAndConditions';
import AccountSecurity from './pages/AccountSecurity'; 

function App() {
  // Obtener la información del usuario del localStorage o del estado global
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

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
          <Route path="/Profile/:usuarioId" element={<Profile />} />
          <Route path="/ProfileDiscapacidad/:usuarioId" element={<ProfileDiscapacidad />} />
          <Route path="/ProfileAdultos/:usuarioId" element={<ProfileAdultos />} />
          <Route path="/editar/:usuarioId" element={<EditarPerfil />} />

          <Route path="/perfil" element={<PerfilUsuario />} />
          <Route path="/seleccion-beneficiario" element={<SeleccionBeneficiario />} />
          <Route path="/registro-nino" element={<RegistroNino />} />
          <Route path="/registro-tercera-edad" element={<RegistroTerceraEdad />} />
          <Route path="/registro-discapacidad" element={<RegistroDiscacidad />} />
          <Route path="/AccountSecurity" element={<AccountSecurity />} />

          {/* Rutas para el administrador */}
          <Route 
            path="/admin/dashboard" 
            element={
              user ? (
                <AdminDashboard 
                  isPrincipal={user.isPrincipal} 
                  adminName={user.nombre}
                />
              ) : (
                <Navigate to="/" />
              )
            } 
          />

          <Route path="/admin/Usuarios" element={<Usuarios />} />
          <Route path="/admin/AgregarEvento" element={<AgregarEvento />} />
          <Route path="/admin/Configuracion" element={<Configuracion />} />
          <Route path="/admin/AddAdmin" element={<AddAdmin />} />
          <Route path="/admin/EstadisticasAfiliados" element={<EstadisticasAfiliados/>} />
          
          <Route path="/admin/Usuarios/Discapacidad" element={<UsuariosDiscapacidad />} />
          <Route path="/admin/Usuarios/TerceraEdad" element={<UsuariosTerceraEdad />} />
          <Route path="/admin/Usuarios/Ninos" element={<UsuariosNinos />} />

          <Route path="/discapacidad/:id" element={<UsuarioDiscapacidadDetalles />} />
          <Route path="/adulto/:id" element={<UsuarioAdultoDetalles />} />
          <Route path="/usuario/:id" element={<UsuarioNinosDetalles />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;