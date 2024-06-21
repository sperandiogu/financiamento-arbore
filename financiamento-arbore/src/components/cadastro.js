import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css';

function Cadastro() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      navigate('/simulador');
    } else {
      event.stopPropagation();
    }
    event.target.classList.add('was-validated');
  };

  const buscarEndereco = async (event) => {
    const cep = event.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          document.getElementById('address').value = data.logradouro;
          document.getElementById('city').value = data.localidade;
          document.getElementById('state').value = data.uf;
        } else {
          alert('CEP não encontrado.');
        }
      } catch (error) {
        alert('Erro ao buscar o CEP.');
        console.error('Erro ao buscar o CEP:', error);
      }
    } else {
      alert('Por favor, insira um CEP válido.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Cadastro</h1>
      <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label">Nome</label>
          <input type="text" className="form-control" id="firstName" required />
          <div className="invalid-feedback">Por favor, insira seu nome.</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label">Sobrenome</label>
          <input type="text" className="form-control" id="lastName" required />
          <div className="invalid-feedback">Por favor, insira seu sobrenome.</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" required />
          <div className="invalid-feedback">Por favor, insira um email válido.</div>
        </div>
        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">Telefone</label>
          <input type="tel" className="form-control" id="phone" required />
          <div className="invalid-feedback">Por favor, insira um telefone válido.</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="cep" className="form-label">CEP</label>
          <input type="text" className="form-control" id="cep" required onBlur={buscarEndereco} />
          <div className="invalid-feedback">Por favor, insira um CEP válido.</div>
        </div>
        <div className="col-md-8">
          <label htmlFor="address" className="form-label">Endereço</label>
          <input type="text" className="form-control" id="address" required />
          <div className="invalid-feedback">Por favor, insira seu endereço.</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="city" className="form-label">Cidade</label>
          <input type="text" className="form-control" id="city" required />
          <div className="invalid-feedback">Por favor, insira sua cidade.</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="state" className="form-label">Estado</label>
          <select className="form-select" id="state" required>
            <option selected disabled value="">Escolha...</option>
            <option>SP</option>
            <option>RJ</option>
            <option>MG</option>
            {/* Adicione mais estados conforme necessário */}
          </select>
          <div className="invalid-feedback">Por favor, selecione um estado válido.</div>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="terms" required />
            <label className="form-check-label" htmlFor="terms">Concordo com os termos e condições</label>
            <div className="invalid-feedback">Você deve concordar antes de enviar.</div>
          </div>
        </div>
        <div className="col-12 d-grid">
          <button className="btn btn-primary" type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;
