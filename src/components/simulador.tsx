import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Simulador.css';

const taxasJurosAnuais = {
  "Banco do Brasil": { taxa: 31.58, imagem: 'bb.png' },
  "Itau": { taxa: 22.48, imagem: 'itau.png' },
  "Caixa": { taxa: 16.17, imagem: 'caixa.png' },
  "Santander": { taxa: 26.00, imagem: 'santander.png' },
  "Nubank": { taxa: 2.00, imagem: 'nubank.png' }
};

function Simulador() {
  const [prazo, setPrazo] = useState(3); // Prazo em anos
  const [bancoSelecionado, setBancoSelecionado] = useState('');
  const [valorImovel, setValorImovel] = useState('');
  const [entrada, setEntrada] = useState('');
  const navigate = useNavigate();

  const handlePrazoChange = (event) => {
    setPrazo(event.target.value);
  };

  const handleValorImovelChange = (event) => {
    const valor = event.target.value.replace(/\D/g, '');
    setValorImovel(valor);
    setEntrada((valor * 0.3).toFixed(2)); // Calcula a entrada automaticamente
  };

  const handleBancoChange = (event) => {
    setBancoSelecionado(event.target.value);
  };

  const calcular = (event) => {
    event.preventDefault();
    if (!bancoSelecionado || !valorImovel || !entrada) {
      return;
    }

    const taxaJurosAnual = taxasJurosAnuais[bancoSelecionado].taxa / 100;
    const taxaJurosMensal = Math.pow(1 + taxaJurosAnual, 1 / 12) - 1;
    const valorFinanciado = valorImovel - entrada;

    const prazoMeses = prazo * 12; // Converte o prazo de anos para meses
    const prestacaoPrice = (valorFinanciado * taxaJurosMensal) / (1 - Math.pow((1 + taxaJurosMensal), -prazoMeses));

    const data = {
      valorTotalFinanciamento: (prestacaoPrice * prazoMeses).toFixed(2),
      valorTotalEntrada: parseFloat(entrada),
      taxaJurosBanco: (taxasJurosAnuais[bancoSelecionado].taxa).toFixed(2),
      bancoSelecionado: bancoSelecionado,
      tempoSelecionado: prazoMeses
    };

    navigate('/dashboard', { state: { data } });
  };

  const formatarValor = (valor) => {
    if (!valor) return '';
    return (parseFloat(valor) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="container">
      <div className="main-content row">
        <div className="info-section col-md-6">
          <div className="icon-ctg">
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="90" height="90" rx="5" fill="#267E3E" />
              {/* SVG content here */}
            </svg>
          </div>
          <p className="contg-passos">Preencha as informações ao lado para simular o financiamento do seu imóvel.</p>
        </div>
        <div className="form-section col-md-6">
          <div className="form-container">
            <form onSubmit={calcular}>
              <h2 className="section-title">Simulação de Financiamento</h2>
              <div className="mb-3">
                <label className="form-label" htmlFor="valor-imovel">Valor do Imóvel:</label>
                <input
                  type="text"
                  className="form-control"
                  id="valor-imovel"
                  name="valorImovel"
                  value={formatarValor(valorImovel)}
                  onChange={handleValorImovelChange}
                  required
                />
                <div className="invalid-feedback">Informe o valor do imóvel.</div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="entrada">Valor de Entrada:</label>
                <input
                  type="text"
                  className="form-control"
                  id="entrada"
                  name="entrada"
                  value={formatarValor(entrada)}
                  readOnly
                />
                <div className="invalid-feedback">Informe o valor da entrada.</div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="prazo">Prazo (anos):</label>
                <input
                  type="range"
                  className="form-range"
                  id="prazo"
                  name="prazo"
                  min="3"
                  max="30"
                  value={prazo}
                  onChange={handlePrazoChange}
                />
                <div>{prazo} anos</div>
              </div>
              <div className="mb-3">
                <label className="form-label">Selecione o Banco:</label>
                <div className="banco-container">
                  {Object.keys(taxasJurosAnuais).map((banco) => (
                    <React.Fragment key={banco}>
                      <input
                        type="radio"
                        className="btn-check"
                        name="banco"
                        id={banco}
                        value={banco}
                        autoComplete="off"
                        onChange={handleBancoChange}
                        required
                      />
                      <label
                        className="btn btn-outline-primary banco-label"
                        htmlFor={banco}
                      >
                        <img
                          src={`/sources/img/${taxasJurosAnuais[banco].imagem}`}
                          alt={banco}
                          className="img-thumbnail banco-img"
                        />
                      </label>
                    </React.Fragment>
                  ))}
                </div>
                <div className="invalid-feedback">Por favor, selecione um banco.</div>
              </div>
              <div className="d-grid">
                <button className="btn btn-primary btn-continuar" type="submit">Simular</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Simulador;
