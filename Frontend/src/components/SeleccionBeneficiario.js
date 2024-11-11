import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SeleccionBeneficiario.css';

const SeleccionBeneficiario = () => {
  const navigate = useNavigate();

  const handleBeneficiarySelection = (type) => {
    if (type === 'tercera-edad') {
      navigate('/registro-tercera-edad');
    } else if (type === 'discapacidad') {
      navigate('/registro-discapacidad');
    } else if (type === 'ninos-etapa-terminal') {
      navigate('/registro-nino');
    }
  };

  return (
    <div className="fullscreen-container">
      <div className="beneficiary-selection">
        <h1>Selecciona el Tipo de Beneficio</h1>
        <button className="beneficiary-button" onClick={() => handleBeneficiarySelection('tercera-edad')}>
          Tercera Edad
        </button>
        <button className="beneficiary-button" onClick={() => handleBeneficiarySelection('discapacidad')}>
          Discapacidad
        </button>
        <button className="beneficiary-button" onClick={() => handleBeneficiarySelection('ninos-etapa-terminal')}>
          Niños en Etapa Terminal
        </button>
      </div>
    </div>
  );
};

export default SeleccionBeneficiario;
