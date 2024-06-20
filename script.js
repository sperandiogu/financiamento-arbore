// Taxas de juros anuais para cada banco
const taxasJurosAnuais = {
  "Banco do Brasil": 31.58,
  "Itau": 22.48,
  "Caixa": 16.17
};

function formatarNumero(campo) {
  let valor = campo.value.replace(/\./g, '').replace(',', '.');
  valor = parseFloat(valor);
  if (!isNaN(valor)) {
      campo.value = valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else {
      campo.value = '';
  }
}

function atualizarEntrada() {
  const campoValorImovel = document.getElementById('valor-imovel');
  let valorImovel = parseFloat(campoValorImovel.value.replace(/\./g, '').replace(',', '.'));
  if (!isNaN(valorImovel)) {
      campoValorImovel.value = valorImovel.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      const entradaMinima = valorImovel * 0.3;
      const entradaCampo = document.getElementById('entrada');
      entradaCampo.value = entradaMinima.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}

function selecionarBanco(banco) {
  const taxaJurosCampo = document.getElementById('taxa-juros');
  if (banco in taxasJurosAnuais) {
      taxaJurosCampo.value = taxasJurosAnuais[banco];
  } else {
      taxaJurosCampo.value = '';
  }
}

function calcular() {
  const valorImovel = parseFloat(document.getElementById('valor-imovel').value.replace(/\./g, '').replace(',', '.'));
  const entrada = parseFloat(document.getElementById('entrada').value.replace(/\./g, '').replace(',', '.'));
  const taxaJurosAnual = parseFloat(document.getElementById('taxa-juros').value) / 100;
  const prazo = parseInt(document.getElementById('prazo').value);

  if (isNaN(valorImovel) || isNaN(entrada) || isNaN(taxaJurosAnual) || isNaN(prazo)) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
  }

  if (entrada < valorImovel * 0.3) {
      alert("A entrada não pode ser menor do que 30% do valor do imóvel.");
      return;
  }

  // Converter taxa de juros anual para mensal
  const taxaJurosMensal = Math.pow(1 + taxaJurosAnual, 1 / 12) - 1;

  const valorFinanciado = valorImovel - entrada;
  let resultado = '';

  // Cálculo pelo método PRICE
  const prestacaoPrice = (valorFinanciado * taxaJurosMensal) / (1 - Math.pow((1 + taxaJurosMensal), -prazo));
  resultado += `<p>Prestação Mensal (PRICE): R$ ${prestacaoPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>`;

  // Cálculo pelo método SAC
  const amortizacao = valorFinanciado / prazo;
  let totalPago = 0;
  for (let i = 0; i < prazo; i++) {
      const juros = (valorFinanciado - (i * amortizacao)) * taxaJurosMensal;
      totalPago += (amortizacao + juros);
  }
  resultado += `<p>Prestação Mensal Média (SAC): R$ ${(totalPago / prazo).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>`;

  document.getElementById('resultado').innerHTML = resultado;
}

document.querySelectorAll('input[type="text"]').forEach((input) => {
  input.addEventListener('input', (event) => {
      event.target.value = event.target.value.replace(/[^\d.,]/g, '');
  });
});
