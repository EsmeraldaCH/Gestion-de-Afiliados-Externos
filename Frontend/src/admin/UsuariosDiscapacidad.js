import React, { useEffect, useState } from 'react';

function UsuariosDiscapacidad() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Llamada al backend para obtener la lista de niños
    fetch('http://localhost:5000/api/ninos')
      .then((response) => response.json())
      .then((data) => setUsuarios(data));
  }, []);

  return (
    <div>
      <h2>Usuarios - Personas con Discapacidad</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>{usuario.nombre} - {usuario.edad}</li>
        ))}
      </ul>
    </div>
  );
}

export default UsuariosDiscapacidad;
