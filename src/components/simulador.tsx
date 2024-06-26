import React, { useState } from 'react';
import './Simulador.css';

const taxasJurosAnuais = {
  "Banco do Brasil": { taxa: 10.06, imagem: 'bb.png' },
  "Itau": { taxa: 10.28, imagem: 'itau.png' },
  "Caixa": { taxa: 10.26, imagem: 'caixa.png' },
  "Santander": { taxa: 11.34, imagem: 'santander.png' },
  "Sicredi": { taxa: 13.05, imagem: 'sicredi.png' }
};

function Simulador() {
  const [resultado, setResultado] = useState('');
  const [prazo, setPrazo] = useState(3); // Prazo em anos
  const [bancoSelecionado, setBancoSelecionado] = useState('');
  const [valorImovel, setValorImovel] = useState('');
  const [entrada, setEntrada] = useState('');

  const handlePrazoChange = (event) => {
    setPrazo(event.target.value);
  };

  const handleValorImovelChange = (event) => {
    const valor = event.target.value.replace(/\D/g, '');
    const valorFormatado = (valor / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    setValorImovel(valorFormatado);
    const entradaCalculada = ((valor * 0.3) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    setEntrada(entradaCalculada); // Calcula a entrada automaticamente
  };

  const handleBancoChange = (event) => {
    setBancoSelecionado(event.target.value);
  };

  const calcular = (event) => {
    event.preventDefault();
    if (!bancoSelecionado || !valorImovel || !entrada) {
      return;
    }

    const valorImovelNum = parseFloat(valorImovel.replace(/\D/g, '')) / 100;
    const entradaNum = parseFloat(entrada.replace(/\D/g, '')) / 100;

    const taxaJurosAnual = taxasJurosAnuais[bancoSelecionado].taxa / 100;
    const taxaJurosMensal = Math.pow(1 + taxaJurosAnual, 1 / 12) - 1;
    const valorFinanciado = valorImovelNum - entradaNum;

    const prazoMeses = prazo * 12; // Converte o prazo de anos para meses
    const prestacaoPrice = (valorFinanciado * taxaJurosMensal) / (1 - Math.pow((1 + taxaJurosMensal), -prazoMeses));

    const resultado = `
      <div class="resultado-item">
        <p>Prestação Mensal (PRICE):</p>
        <p class="valor">R$ ${prestacaoPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      </div>
      <div class="resultado-item">
        <p>Valor Total do Financiamento:</p>
        <p class="valor">R$ ${(prestacaoPrice * prazoMeses).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      </div>
    `;

    setResultado(resultado);
  };

  return (
    <div className="container">
      <div className="main-content row">
        <div className="info-section col-md-6">
          <h2 className='casa-propria'>Realize o sonho da casa própria!</h2>
          <p className='simular-text'>Preencha os dados referente ao <span>imovel que você deseja simular!*</span></p>
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
                <label className="form-label">Selecione o Banco:</label>
                <div className="d-flex justify-content-between flex-wrap banco-container">
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
                      <label className="btn btn-outline-primary banco-label" htmlFor={banco}>
                        <img
                          src={`/sources/img/${taxasJurosAnuais[banco].imagem}`}
                          alt={banco}
                          className="img-fluid banco-img"
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
            <div id="resultado" className="resultado-container" dangerouslySetInnerHTML={{ __html: resultado }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Simulador;
