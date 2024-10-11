import React, { useState, useEffect } from 'react';
import './loginModal.css';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/user', {
          credentials: 'include',
        });
        const userData = await response.json();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Error obteniendo los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-info">
          <h1>Bienvenido, {user.displayName}!</h1>
          <p>Email: {user.emails[0].value}</p>
          <img src={user.photos[0].value} alt="Foto de perfil" />
        </div>
      ) : (
        <p>Cargando información del usuario...</p>
      )}
    </div>
  );
};

export default Profile;
