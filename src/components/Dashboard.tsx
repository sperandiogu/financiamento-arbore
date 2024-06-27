import React from 'react';
import './Dashboard.css';
import LineChart from './LineChart.tsx';
import PieChart from './PieChart.tsx';
import Sidebar from './Sidebar.tsx';
import StatCard from './StatCard.tsx';

const Dashboard = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  const {
    valorTotalFinanciamento,
    valorTotalEntrada,
    taxaJurosBanco,
    bancoSelecionado,
    tempoSelecionado
  } = data;

  const lineChartData = {
    labels: Array.from({ length: tempoSelecionado }, (_, i) => i + 1),
    datasets: [{
      label: 'Valor da Parcela (R$)',
      data: Array.from({ length: tempoSelecionado }, () => Math.random() * 1000),
      backgroundColor: 'rgba(38, 126, 62, 0.2)',
      borderColor: 'rgba(38, 126, 62, 1)',
      borderWidth: 1
    }]
  };

  const pieChartData = {
    labels: ['Financiamento', 'Juros'],
    datasets: [{
      data: [valorTotalFinanciamento - valorTotalEntrada, valorTotalEntrada],
      backgroundColor: ['rgba(38, 126, 62, 0.5)', 'rgba(255, 99, 132, 0.5)'],
      borderColor: ['rgba(38, 126, 62, 1)', 'rgba(255, 99, 132, 1)'],
      borderWidth: 1
    }]
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <header>
          <h1>Dashboard</h1>
        </header>
        <div className="stats">
          <StatCard title="Valor Total do Financiamento" value={`R$ ${valorTotalFinanciamento}`} />
          <StatCard title="Valor Total da Entrada" value={`R$ ${valorTotalEntrada}`} />
          <StatCard title="Taxa de Juros do Banco Selecionado" value={`${taxaJurosBanco}%`} />
          <StatCard title="Banco Selecionado" value={bancoSelecionado} />
          <StatCard title="Tempo Selecionado" value={`${tempoSelecionado} meses`} />
        </div>
        <div className="charts">
          <div className="chart">
            <h2>Evolução das Parcelas</h2>
            <LineChart data={lineChartData} />
          </div>
          <div className="chart">
            <h2>Divisão de Financiamento e Juros</h2>
            <PieChart data={pieChartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
