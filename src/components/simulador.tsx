import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Simulador.css';

const Simulador = ({ onNext, onBack, currentStep }) => {
  const [resultado, setResultado] = useState('');
  const [prazo, setPrazo] = useState(3); // Prazo em anos
  const [valorImovel, setValorImovel] = useState('');
  const [entrada, setEntrada] = useState('');
  const [fgts, setFgts] = useState('');
  const [valorFgts, setValorFgts] = useState('');

  const navigate = useNavigate();

  const handlePrazoChange = (event) => {
    setPrazo(event.target.value);
  };

  const handleValorImovelChange = (event) => {
    const valor = event.target.value.replace(/\D/g, '');
    const valorFormatado = (valor / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    setValorImovel(valorFormatado);
    const entradaCalculada = ((valor * 0.2) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    setEntrada(entradaCalculada); // Calcula a entrada automaticamente
  };

  const handleFgtsChange = (value) => {
    setFgts(value);
    if (value === 'não') {
      setValorFgts('');
    }
  };

  const handleValorFgtsChange = (event) => {
    const valor = event.target.value.replace(/\D/g, '');
    const valorFormatado = (valor / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    setValorFgts(valorFormatado);
  };

  const calcular = (event) => {
    event.preventDefault();
    if (!valorImovel || !entrada) {
      return;
    }

    const valorImovelNum = parseFloat(valorImovel.replace(/\D/g, '')) / 100;
    const entradaNum = parseFloat(entrada.replace(/\D/g, '')) / 100;
    const valorFgtsNum = fgts === 'sim' ? parseFloat(valorFgts.replace(/\D/g, '')) / 100 : 0;

    const taxaJurosAnual = 7.00 / 100; // Considerando apenas a Caixa
    const taxaJurosMensal = Math.pow(1 + taxaJurosAnual, 1 / 12) - 1;
    const valorFinanciado = valorImovelNum - entradaNum - valorFgtsNum;

    const prazoMeses = prazo * 12; // Converte o prazo de anos para meses
    const prestacaoPrice = (valorFinanciado * taxaJurosMensal) / (1 - Math.pow((1 + taxaJurosMensal), -prazoMeses));

    const resultado = `
      <div class="resultado-item">
        <p>Prestação Mensal:</p>
        <p class="valor">R$ ${prestacaoPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      </div>
    `;

    setResultado(resultado);

    const simulationResult = {
      prestacaoMensal: prestacaoPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      valorTotalFinanciado: valorFinanciado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    };

    navigate('/dashboard', { state: simulationResult });
  };

  return (
    <div className="container">
      <div className="main-content row">
        <div className="info-section col-md-6">
          <h2 className='casa-propria'>Realize o sonho da casa própria!</h2>
          <p className='simular-text'>Preencha os dados referente ao <span>imóvel que você deseja simular!*</span></p>
          <img className="logo-caixa-minha img-fluid" src="/sources/img/logo-caixa.png" alt="Logo Caixa" />
          <p className='texto-auxiliar'>*Simulação realizada com base nas condições vigentes da Caixa, sujeita a alteração.</p>
        </div>
        <div className="form-section col-md-6">
          <div className="form-container">
            <form onSubmit={calcular} className="needs-validation" noValidate>
              <div className="mb-3">
                <label className="form-label" htmlFor="valor-imovel">Valor do Imóvel (R$):</label>
                <input
                  className="form-control"
                  type="text"
                  id="valor-imovel"
                  name="valorImovel"
                  value={valorImovel}
                  onChange={handleValorImovelChange}
                  placeholder="Digite o valor do imóvel"
                  required
                />
                <div className="invalid-feedback">Por favor, insira um valor válido.</div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="entrada">Entrada (R$):</label>
                <input
                  className="form-control"
                  type="text"
                  id="entrada"
                  name="entrada"
                  value={entrada}
                  placeholder="Digite o valor da entrada"
                  readOnly
                />
                <div className="invalid-feedback">Por favor, insira um valor válido.</div>
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
                <label className="form-label" htmlFor="fgts">Possui FGTS?</label>
                <div className="btn-group" role="group" aria-label="FGTS options">
                  <input
                    type="radio"
                    className="btn-check"
                    id="fgts-sim"
                    name="fgts"
                    value="sim"
                    checked={fgts === 'sim'}
                    onChange={() => handleFgtsChange('sim')}
                  />
                  <label className="btn btn-outline-primary" htmlFor="fgts-sim">Sim</label>

                  <input
                    type="radio"
                    className="btn-check"
                    id="fgts-nao"
                    name="fgts"
                    value="não"
                    checked={fgts === 'não'}
                    onChange={() => handleFgtsChange('não')}
                  />
                  <label className="btn btn-outline-primary" htmlFor="fgts-nao">Não</label>
                </div>
                {fgts === 'sim' && (
                  <div className="mt-3">
                    <label className="form-label" htmlFor="valor-fgts">Valor do FGTS (R$):</label>
                    <input
                      className="form-control"
                      type="text"
                      id="valor-fgts"
                      name="valorFgts"
                      value={valorFgts}
                      onChange={handleValorFgtsChange}
                      placeholder="Digite o valor do FGTS"
                      required
                    />
                    <div className="invalid-feedback">Por favor, insira um valor válido.</div>
                  </div>
                )}
              </div>
              <button className="btn btn-primary btn-continuar" type="submit">Simular</button>
            </form>
            <div id="resultado" className="resultado-container" dangerouslySetInnerHTML={{ __html: resultado }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulador;
