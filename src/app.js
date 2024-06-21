import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Cadastro from './components/cadastro';
import Simulador from './components/simulador';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Cadastro />} />
          <Route path="/simulador" element={<Simulador />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
