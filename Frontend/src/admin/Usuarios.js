// src/components/Usuarios.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesUsuarios.css';

function Usuarios() {
  const navigate = useNavigate();

  const handleNavigation = (category) => {
    navigate(`/admin/Usuarios/${category}`);
  };

  return (
    <div className="usuarios-container">
      <h2>Usuarios Registrados</h2>
      <div className="category-buttons">
        <button onClick={() => handleNavigation('Ninos')}>Niños</button>
        <button onClick={() => handleNavigation('Discapacidad')}>Discapacidad</button>
        <button onClick={() => handleNavigation('TerceraEdad')}>Tercera Edad</button>
      </div>
    </div>
  );
}

  
export default Usuarios;
