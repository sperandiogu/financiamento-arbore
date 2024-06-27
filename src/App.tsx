import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cadastro from './components/cadastro.tsx';
import Dashboard from './components/Dashboard.tsx';
import Header from './components/Header.tsx';
import Simulador from './components/simulador.tsx';

const App = () => {
  const mockData = {
    valorTotalFinanciamento: 177767.53,
    valorTotalEntrada: 16650.00,
    taxaJurosBanco: 16.17,
    bancoSelecionado: "Caixa",
    tempoSelecionado: 360 // 30 anos
  };

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/simulador" element={<Simulador />} />
          <Route path="/dashboard" element={<Dashboard data={mockData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
