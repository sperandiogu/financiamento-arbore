import React from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const { state } = location;

  if (!state) {
    return <div>Nenhum dado de simulação encontrado.</div>;
  }

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
      <button className="btn btn-primary" onClick={() => window.print()}>Imprimir Resultado</button>
    </div>
  );
};

export default Dashboard;
