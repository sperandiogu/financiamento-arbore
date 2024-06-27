import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart, registerables } from 'chart.js';
import React from 'react';
import { Line, Pie } from 'react-chartjs-2';

Chart.register(...registerables);

const Dashboard = ({ location }) => {
  const data = location.state?.data;

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
    <div className="container">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
      </div>
      <div className="row mb-3">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">Valor Total do Financiamento</div>
            <div className="card-body">
              <h5 className="card-title">R$ {valorTotalFinanciamento.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Valor Total da Entrada</div>
            <div className="card-body">
              <h5 className="card-title">R$ {valorTotalEntrada.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-header">Taxa de Juros do Banco Selecionado</div>
            <div className="card-body">
              <h5 className="card-title">{taxaJurosBanco}%</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-info mb-3">
            <div className="card-header">Banco Selecionado</div>
            <div className="card-body">
              <h5 className="card-title">{bancoSelecionado}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-secondary mb-3">
            <div className="card-header">Tempo Selecionado</div>
            <div className="card-body">
              <h5 className="card-title">{tempoSelecionado} meses</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-8 col-lg-7">
          <div className="card mb-4">
            <div className="card-header">
              Evolução das Parcelas
            </div>
            <div className="card-body">
              <Line data={lineChartData} />
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-5">
          <div className="card mb-4">
            <div className="card-header">
              Divisão de Financiamento e Juros
            </div>
            <div className="card-body">
              <Pie data={pieChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
