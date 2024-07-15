import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Simulador.css';

const Simulador = ({ onNext, onBack, currentStep }) => {
  const [resultado, setResultado] = useState('');
  const [prazo, setPrazo] = useState(3); // Prazo em anos
  const [valorImovel, setValorImovel] = useState('');
  const [entrada, setEntrada] = useState('');
  const [fgts, setFgts] = useState(false);
  const [valorFgts, setValorFgts] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (currentStep === 2) {
      navigate('/simulador');
    } else if (currentStep === 3) {
      navigate('/dashboard');
    }
  }, [currentStep, navigate]);

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

  const handleFgtsChange = (event) => {
    setFgts(event.target.value === 'sim');
    if (event.target.value !== 'sim') {
      setValorFgts('');
    }
  };

  const handleValorFgtsChange = (event) => {
    const valor = event.target.value.replace(/\D/g, '');
    const valorFormatado = (valor / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    setValorFgts(valorFormatado);
  };

  const validate = () => {
    let errors = {};
    if (!valorImovel) errors.valorImovel = "Valor do imóvel é obrigatório";
    if (!entrada) errors.entrada = "Entrada é obrigatória";
    if (fgts && !valorFgts) errors.valorFgts = "Valor do FGTS é obrigatório se FGTS for selecionado";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calcular = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const valorImovelNum = parseFloat(valorImovel.replace(/\D/g, '')) / 100;
    const entradaNum = parseFloat(entrada.replace(/\D/g, '')) / 100;
    const valorFgtsNum = fgts ? parseFloat(valorFgts.replace(/\D/g, '')) / 100 : 0;

    const taxaJurosAnual = 10.26 / 100; // Considerando apenas a Caixa
    const taxaJurosMensal = Math.pow(1 + taxaJurosAnual, 1 / 12) - 1;
    const valorFinanciado = valorImovelNum - entradaNum - valorFgtsNum;

    const prazoMeses = prazo * 12; // Converte o prazo de anos para meses
    const prestacaoPrice = (valorFinanciado * taxaJurosMensal) / (1 - Math.pow((1 + taxaJurosMensal), -prazoMeses));

    setResultado(`
      <div class="resultado-item">
        <p>Prestação Mensal:</p>
        <p class="valor">R$ ${prestacaoPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      </div>
    `);
    onNext(); // Avança para a próxima etapa
  };

  return (
    <div className="container">
      <div className="main-content row">
        <div className="info-section col-md-6 align-self-center">
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
                  className={`form-control ${errors.valorImovel ? 'is-invalid' : ''}`}
                  type="text"
                  id="valor-imovel"
                  name="valorImovel"
                  value={valorImovel}
                  onChange={handleValorImovelChange}
                  placeholder="Digite o valor do imóvel"
                  required
                />
                <div className="invalid-feedback">{errors.valorImovel}</div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="entrada">Entrada (R$):</label>
                <input
                  className={`form-control ${errors.entrada ? 'is-invalid' : ''}`}
                  type="text"
                  id="entrada"
                  name="entrada"
                  value={entrada}
                  placeholder="Digite o valor da entrada"
                  readOnly
                />
                <div className="invalid-feedback">{errors.entrada}</div>
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
                <label className="form-label">Possui FGTS?</label>
                <div className="btn-group" role="group" aria-label="FGTS options">
                  <input type="radio" className="btn-check" name="fgts" id="fgts-sim" value="sim" checked={fgts === true} onChange={handleFgtsChange} />
                  <label className="btn btn-outline-primary" htmlFor="fgts-sim">Sim</label>
                  <input type="radio" className="btn-check" name="fgts" id="fgts-nao" value="nao" checked={fgts === false} onChange={handleFgtsChange} />
                  <label className="btn btn-outline-primary" htmlFor="fgts-nao">Não</label>
                </div>
                <div className="invalid-feedback d-block">{errors.fgts}</div>
                {fgts && (
                  <div className="mt-3">
                    <label className="form-label" htmlFor="valor-fgts">Valor do FGTS (R$):</label>
                    <input
                      className={`form-control ${errors.valorFgts ? 'is-invalid' : ''}`}
                      type="text"
                      id="valor-fgts"
                      name="valorFgts"
                      value={valorFgts}
                      onChange={handleValorFgtsChange}
                      placeholder="Digite o valor do FGTS"
                      required
                    />
                    <div className="invalid-feedback">{errors.valorFgts}</div>
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
