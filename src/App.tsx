import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard.tsx';
import Header from './components/Header.tsx';
import Cadastro from './components/cadastro.tsx';
import Simulador from './components/simulador.tsx';

const App = () => {

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Cadastro />} />
          <Route path="/simulador" element={<Simulador />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
