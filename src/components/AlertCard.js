import React from 'react';
import './AlertCard.css'; // Estilos para o alerta

const AlertCard = ({ message, type, onClose }) => {
  return (
    <div className={`alert-card ${type}`}>
      <p>{message}</p>
      <button onClick={onClose} className="close-btn">×</button>
    </div>
  );
};

export default AlertCard;
