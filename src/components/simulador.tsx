import React, { useState } from 'react';
import './Simulador.css';

const taxasJurosAnuais = {
  "Banco do Brasil": 31.58,
  "Itau": 22.48,
  "Caixa": 16.17,
  "Santander": 26.00,
  "Nubank": 2.00
};

function Simulador() {
  const [resultado, setResultado] = useState('');
  const [valorImovel, setValorImovel] = useState('');
  const [entrada, setEntrada] = useState('');

  const calcular = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    const valorImovel = parseFloat(form.valorImovel.value.replace(/\./g, '').replace(',', '.'));
    const entrada = parseFloat(form.entrada.value.replace(/\./g, '').replace(',', '.'));
    const taxaJurosAnual = parseFloat(form.taxaJuros.value) / 100;
    const prazo = parseInt(form.prazo.value);

    if (entrada < valorImovel * 0.3) {
      form.entrada.setCustomValidity('A entrada não pode ser menor do que 30% do valor do imóvel.');
      form.entrada.reportValidity();
      return;
    } else {
      form.entrada.setCustomValidity('');
    }

    const taxaJurosMensal = Math.pow(1 + taxaJurosAnual, 1 / 12) - 1;
    const valorFinanciado = valorImovel - entrada;
    let resultado = '';

    const prestacaoPrice = (valorFinanciado * taxaJurosMensal) / (1 - Math.pow((1 + taxaJurosMensal), -prazo));
    resultado += `<p>Prestação Mensal (PRICE): R$ ${prestacaoPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>`;

    const amortizacao = valorFinanciado / prazo;
    let totalPago = 0;
    for (let i = 0; i < prazo; i++) {
      const juros = (valorFinanciado - (i * amortizacao)) * taxaJurosMensal;
      totalPago += (amortizacao + juros);
    }
    resultado += `<p>Prestação Mensal Média (SAC): R$ ${(totalPago / prazo).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>`;

    setResultado(resultado);
  };

  const formatarParaReal = (event: React.ChangeEvent<HTMLInputElement>) => {
    let valor = event.target.value.replace(/\D/g, '');
    valor = (valor / 100).toFixed(2) + '';
    valor = valor.replace('.', ',');
    valor = valor.replace(/(\d)(?=(\d{3})+\,)/g, '$1.'); // Linha corrigida
    event.target.value = valor;
  };

  const selecionarBanco = (event: React.ChangeEvent<HTMLInputElement>) => {
    const banco = event.target.value;
    const taxaJurosCampo = document.getElementById('taxa-juros') as HTMLInputElement;
    if (banco in taxasJurosAnuais) {
      taxaJurosCampo.value = taxasJurosAnuais[banco].toString();
    } else {
      taxaJurosCampo.value = '';
    }
  };

  const handleValorImovelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valor = event.target.value;
    setValorImovel(valor);
    const valorNumerico = parseFloat(valor.replace(/\./g, '').replace(',', '.'));
    const entradaCalculada = (valorNumerico * 0.3).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.'); // Linha corrigida
    setEntrada(entradaCalculada);
  };

  return (
    <div className="container text-center">
      <h1>Simulador Financiamento</h1>
      <div className="container" id="simulador-forms">
        <form className="needs-validation" noValidate onSubmit={calcular}>
          <div className="row justify-content-md-center">
            <div className="col mb-3">
              <label className="form-label" htmlFor="valor-imovel">Valor do Imóvel (R$):</label>
              <input
                className="form-control"
                type="text"
                id="valor-imovel"
                name="valorImovel"
                required
                onInput={(e) => {
                  formatarParaReal(e);
                  handleValorImovelChange(e);
                }}
                value={valorImovel}
              />
              <div className="invalid-feedback">Por favor, insira um valor válido.</div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label" htmlFor="entrada">Entrada (R$):</label>
              <input
                className="form-control"
                type="text"
                id="entrada"
                name="entrada"
                required
                value={entrada}
                readOnly
              />
              <div className="invalid-feedback">Por favor, insira um valor válido.</div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label" htmlFor="prazo">Prazo (meses):</label>
              <input className="form-control" type="number" id="prazo" name="prazo" required />
              <div className="invalid-feedback">Por favor, insira um prazo válido.</div>
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="col">
              <label className="form-label">Selecione o Banco:</label>
              <div className="d-flex justify-content-around btn-group">
                {Object.keys(taxasJurosAnuais).map((banco) => (
                  <React.Fragment key={banco}>
                    <input type="radio" className="btn-check" name="banco" id={banco} value={banco} autoComplete="off" onClick={selecionarBanco} required />
                    <label className="btn btn-outline-primary" htmlFor={banco}>
                      <img src={`/sources/img/${banco.toLowerCase().replace(/ /g, '')}.png`} alt={banco} className="img-thumbnail" />
                    </label>
                  </React.Fragment>
                ))}
              </div>
              <div className="invalid-feedback">Por favor, selecione um banco.</div>
            </div>
          </div>
          <div className="row gy-2 gx-3 align-items-center">
            <div className="col d-grid gap-2">
              <button className="btn btn-primary calculo" type="submit">Calcular</button>
            </div>
          </div>
          <input type="hidden" id="taxa-juros" name="taxaJuros" />
        </form>
        <div id="resultado" dangerouslySetInnerHTML={{ __html: resultado }}></div>
      </div>
    </div>
  );
}

export default Simulador;
