import React, { useState } from 'react';

const PerfilUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se realizaría la lógica para enviar los datos al backend.
    console.log('Datos del perfil:', { nombre, direccion, fotoPerfil });
  };

  const handleFileChange = (e) => {
    setFotoPerfil(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Dirección:</label>
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Foto de Perfil:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>
      <button type="submit">Guardar Perfil</button>
    </form>
  );
};

export default PerfilUsuario;
