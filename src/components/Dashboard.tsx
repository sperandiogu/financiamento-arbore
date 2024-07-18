import 'chart.js/auto';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const { state } = location;
  const { prestacaoPrice, prazoMeses, valorFinanciado } = state || {};

  // Dados de exemplo para o gráfico
  const data = {
    labels: Array.from({ length: prazoMeses / 12 }, (_, i) => `${i + 1}º ano`),
    datasets: [
      {
        label: 'Valor da Parcela',
        data: Array.from({ length: prazoMeses / 12 }, (_, i) => prestacaoPrice - (i * (prestacaoPrice / (prazoMeses / 12)))),
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Valor da Parcela (R$)',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Resultado da Simulação</h3>
          {state ? (
            <>
              <div className="resultado-item">
                <p>Prestação Mensal:</p>
                <p className="valor">R$ {prestacaoPrice}</p>
              </div>
              <div className="resultado-item">
                <p>Prazo Total (Anos):</p>
                <p className="valor">{(prazoMeses / 12).toFixed(1)}</p>
              </div>
              <div className="resultado-item">
                <p>Valor Financiado:</p>
                <p className="valor">R$ {valorFinanciado}</p>
              </div>
              <Line data={data} options={options} />
              <a
                href="https://api.whatsapp.com/send?phone=551137426888&text=Ol%C3%A1,%20gostaria%20de%20falar%20sobre%20a%20minha%20simula%C3%A7%C3%A3o%20de%20financiamento."
                className="btn btn-continuar btn-success mt-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fale Agora com um Consultor
              </a>
            </>
          ) : (
            <p>Nenhum resultado disponível. Por favor, realize uma simulação primeiro.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
