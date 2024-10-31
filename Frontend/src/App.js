import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import HomePage from './pages/HomePage';
import ErrorBoundary from './components/ErrorBoundary'; // Importa ErrorBoundary
import Profile from './pages/Profile';
import PerfilUsuario from './components/PerfilUsuario';
import RegistroNino from './components/RegistroNino';
import RegistroTerceraEdad from './components/RegistroTerceraEdad'; // Importa el nuevo componente
import RegistroDiscacidad from './components/RegistroDiscapacidad'; // Importa el nuevo componente

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
          <Route path="/perfil" element={<PerfilUsuario />} />
          <Route path="/registro-nino" element={<RegistroNino />} />
          <Route path="/registro-tercera-edad" element={<RegistroTerceraEdad />} /> {/* Nueva ruta para RegistroTerceraEdad */}
          <Route path="/registro-discapacidad" element={<RegistroDiscacidad />} /> {/* Nueva ruta para RegistroDiscapacidad */}


        </Routes>
      </Router>
    </ErrorBoundary>
  );
}


export default App; 
