import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ErrorBoundary from './components/ErrorBoundary'; // Importa ErrorBoundary
import Profile from './pages/Profile';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Ruta para la página principal */}
          <Route path="/" element={<HomePage />} />
          {/* Ruta para la página de perfil */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
