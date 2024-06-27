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
  const [resultado, setResultado] = useState('');
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
    const valorFormatado = (parseInt(valor) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    setValorImovel(valorFormatado);
    setEntrada(((parseInt(valor) / 100) * 0.3).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
  };

  const handleBancoChange = (event) => {
    setBancoSelecionado(event.target.value);
  };

  const calcular = (event) => {
    event.preventDefault();
    if (!bancoSelecionado || !valorImovel || !entrada) {
      return;
    }

    const valorImovelNumerico = parseFloat(valorImovel.replace(/\D/g, '')) / 100;
    const entradaNumerica = parseFloat(entrada.replace(/\D/g, '')) / 100;

    const taxaJurosAnual = taxasJurosAnuais[bancoSelecionado].taxa / 100;
    const taxaJurosMensal = Math.pow(1 + taxaJurosAnual, 1 / 12) - 1;
    const valorFinanciado = valorImovelNumerico - entradaNumerica;

    const prazoMeses = prazo * 12; // Converte o prazo de anos para meses
    const prestacaoPrice = (valorFinanciado * taxaJurosMensal) / (1 - Math.pow((1 + taxaJurosMensal), -prazoMeses));
    const totalJuros = (prestacaoPrice * prazoMeses) - valorFinanciado;

    const resultado = {
      prestacaoPrice,
      valorFinanciado,
      totalJuros,
    };

    navigate('/dashboard', {
      state: {
        resultado,
        valorTotalFinanciamento: (prestacaoPrice * prazoMeses).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        valorEntrada: entrada,
        taxaJuros: taxasJurosAnuais[bancoSelecionado].taxa,
        bancoSelecionado,
        prazoAnos: prazo,
        prazoMeses,
      }
    });
  };

  return (
    <div className="container">
      <div className="main-content row">
        <div className="info-section col-md-6">
          <div className="icon-ctg">
            {/* Ícone */}
          </div>
          <p className="contg-passos">Simulador de Financiamento</p>
          <h2>Preencha os dados para calcular as parcelas do seu financiamento</h2>
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
                <div className="d-flex justify-content-around banco-container">
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
