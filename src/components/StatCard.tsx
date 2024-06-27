import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, growth }) => {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <p>{value}</p>
      <p>{growth}</p>
    </div>
  );
}

export default StatCard;
