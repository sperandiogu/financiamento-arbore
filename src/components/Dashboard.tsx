import React from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const { state } = location;

  if (!state) {
    return <div>Nenhum dado de simulação encontrado.</div>;
  }

  const handleConsultorClick = () => {
    window.location.href = "https://api.whatsapp.com/send?phone=551137426888&text=Ol%C3%A1,%20gostaria%20de%20falar%20sobre%20a%20minha%20simula%C3%A7%C3%A3o%20de%20financiamento.";
  };

  return (
    <div className="container">
      <h2>Resultado da Simulação</h2>
      <div className="resultado-item">
        <p>Prestação Mensal:</p>
        <p className="valor">R$ {state.prestacaoMensal}</p>
      </div>
      <div className="resultado-item">
        <p>Valor Total Financiado:</p>
        <p className="valor">{state.valorTotalFinanciado}</p>
      </div>
      <button className="btn btn-primary" onClick={handleConsultorClick}>Fale Agora com um Consultor</button>
    </div>
  );
};

export default Dashboard;
