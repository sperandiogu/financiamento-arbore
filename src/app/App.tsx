import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cadastro from '../components/cadastro.tsx';
import Dashboard from '../components/Dashboard.tsx';
import Header from '../components/Header.tsx';
import Simulador from '../components/simulador.tsx';
import StepProgress from '../components/StepProgress.tsx';

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [dadosCadastro, setDadosCadastro] = useState({});
  const [dataSimulacao, setDataSimulacao] = useState({});

  const handleNext = (data) => {
    if (currentStep === 0) {
      setDadosCadastro(data);
      setCurrentStep(1);
    } else if (currentStep === 1) {
      setDataSimulacao(data);
      enviarDadosParaWebhook({ ...dadosCadastro, ...data });
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      setCurrentStep(0);
    } else if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const enviarDadosParaWebhook = (dadosCompletos) => {
    fetch('https://hook.us1.make.com/042oqm2cszci4bkq47dtxk6d596uqnmu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosCompletos)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na resposta do webhook');
        }
        return response.text(); // Não espera um JSON válido
      })
      .then(data => {
        console.log('Sucesso:', data);
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  };

  return (
    <Router>
      <div>
        <Header />
        <StepProgress currentStep={currentStep} />
        <Routes>
          <Route
            path="/"
            element={
              <Cadastro
                onNext={(data) => handleNext(data)}
                onBack={handleBack}
                currentStep={currentStep}
              />
            }
          />
          <Route
            path="/simulador"
            element={
              <Simulador
                onNext={(data) => {
                  setDataSimulacao(data);
                  enviarDadosParaWebhook({ ...dadosCadastro, ...data });
                  setCurrentStep(2);
                }}
                onBack={handleBack}
                currentStep={currentStep}
                dadosCadastro={dadosCadastro}
              />
            }
          />
          <Route path="/dashboard" element={<Dashboard dataSimulacao={dataSimulacao} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
