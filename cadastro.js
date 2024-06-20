// JavaScript de validação do Bootstrap, redirecionamento e busca de endereço
(function () {
  'use strict';
  const forms = document.querySelectorAll('.needs-validation');
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        // Redirecionar para a página do simulador
        event.preventDefault();
        window.location.href = 'simulador.html';
      }
      form.classList.add('was-validated');
    }, false);
  });
})();

function buscarEndereco() {
  const cep = document.getElementById('cep').value.replace(/\D/g, '');
  if (cep.length === 8) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (!data.erro) {
          document.getElementById('address').value = data.logradouro;
          document.getElementById('city').value = data.localidade;
          document.getElementById('state').value = data.uf;
        } else {
          alert('CEP não encontrado.');
        }
      })
      .catch(error => {
        alert('Erro ao buscar o CEP.');
        console.error('Erro ao buscar o CEP:', error);
      });
  } else {
    alert('Por favor, insira um CEP válido.');
  }
}
