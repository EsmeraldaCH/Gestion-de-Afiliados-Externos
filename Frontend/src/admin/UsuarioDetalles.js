import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UsuarioDetalles() {
  const { id } = useParams(); // Obtener el ID del usuario desde la URL
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/ninos/${id}`)
      .then((response) => response.json())
      .then((data) => setUsuario(data))
      .catch((error) => console.error('Error:', error));
  }, [id]);

  if (!usuario) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Detalles del Usuario</h2>
      <p><strong>Nombre:</strong> {usuario.nombre}</p>
      <p><strong>Apellido Paterno:</strong> {usuario.apellido_paterno}</p>
      <p><strong>Apellido Materno:</strong> {usuario.apellido_materno}</p>
      {/* Muestra el resto de los detalles aquí */}
    </div>
  );
}

export default UsuarioDetalles;
