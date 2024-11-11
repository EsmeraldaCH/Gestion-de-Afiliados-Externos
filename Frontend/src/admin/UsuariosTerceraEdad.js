import React, { useEffect, useState } from 'react';

function UsuariosTerceraEdad() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Llamada al backend para obtener la lista de niños
    fetch('http://localhost:5000/api/ninos')
  .then((response) => response.json())
  .then((data) => setUsuarios(data))
  .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h2>Usuarios - Personas de la Tercera Edad</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>{usuario.nombre} - {usuario.edad}</li>
        ))}
      </ul>
    </div>
  );
}

export default UsuariosTerceraEdad;
