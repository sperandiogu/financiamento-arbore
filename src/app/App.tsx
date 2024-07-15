import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cadastro from '../components/cadastro.tsx';
import Dashboard from '../components/Dashboard.tsx';
import Header from '../components/Header.tsx';
import Simulador from '../components/simulador.tsx';
import StepProgress from '../components/StepProgress.tsx';

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => (prevStep > 0 ? prevStep - 1 : 0));
  };

  return (
    <Router>
      <div>
        <Header />
        <StepProgress currentStep={currentStep} />
        <Routes>
          <Route path="/" element={<Cadastro onNext={handleNext} onBack={handleBack} currentStep={currentStep} />} />
          <Route path="/simulador" element={<Simulador onNext={handleNext} onBack={handleBack} currentStep={currentStep} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
