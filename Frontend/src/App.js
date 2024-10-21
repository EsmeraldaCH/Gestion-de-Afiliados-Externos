import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import HomePage from './pages/HomePage';
import ErrorBoundary from './components/ErrorBoundary'; // Importa ErrorBoundary
import Profile from './pages/Profile';
import AdminAiKoi from './admin/AdminAiKoi';
import Usuarios from './admin/Usuarios';
import AgregarEvento from './admin/AgregarEvento';
import Configuracion from './admin/Configuracion';



function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Ruta para la página principal */}
          <Route path="/" element={<HomePage />} />
          {/* Ruta para la página de perfil */}
          <Route path="/Register" element={<Register />} />
          <Route path="/Profile" element={<Profile />} />

            {/* Rutas para el administrador */}
        <Route path="/admin/AdminAiKoi" element={<AdminAiKoi />} />
        <Route path="/admin/Usuarios" element={<Usuarios />} />
        <Route path="/admin/AgregarEvento" element={<AgregarEvento />} />
        <Route path="/admin/Configuracion" element={<Configuracion />} />
       
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
