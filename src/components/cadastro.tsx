import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css'; // Certifique-se de criar e ajustar o arquivo CSS conforme necessário

const Cadastro = () => {
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cepValido, setCepValido] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleTelefoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let valor = event.target.value.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
    setTelefone(valor);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleCepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valor = event.target.value.replace(/\D/g, '');
    setCep(valor);

    if (valor.length === 8) {
      fetch(`https://viacep.com.br/ws/${valor}/json/`)
        .then(response => response.json())
        .then(data => {
          if (!data.erro) {
            setLogradouro(data.logradouro);
            setBairro(data.bairro);
            setCidade(data.localidade);
            setEstado(data.uf);
            setCepValido(true);
          } else {
            setLogradouro('');
            setBairro('');
            setCidade('');
            setEstado('');
            setCepValido(false);
          }
        });
    } else {
      setLogradouro('');
      setBairro('');
      setCidade('');
      setEstado('');
      setCepValido(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      return;
    }
    // lógica de submissão do formulário
    navigate('/simulador'); // Redireciona para a tela do simulador após o envio
  };

  return (
    <div className="container text-center">
      <h1>Cadastro</h1>
      <div className="container" id="cadastro-forms">
        <form className="needs-validation" noValidate onSubmit={handleSubmit}>

          <h2 className="section-title">Informações Pessoais</h2>
          <div className="row justify-content-md-center">
            <div className="col mb-3">
              <label className="form-label" htmlFor="nome-completo">Nome Completo:</label>
              <input
                className="form-control"
                type="text"
                id="nome-completo"
                name="nomeCompleto"
                placeholder="Escreva seu nome completo"
                required
              />
              <div className="invalid-feedback">Por favor, insira seu nome completo.</div>
            </div>
          </div>

          <h2 className="section-title">Informações de Contato</h2>
          <div className="row justify-content-md-center">
            <div className="col mb-3">
              <label className="form-label" htmlFor="telefone">Whatsapp:</label>
              <input
                className="form-control"
                type="text"
                id="telefone"
                name="telefone"
                value={telefone}
                placeholder="Adicione o Número do seu Whatsapp"
                onChange={handleTelefoneChange}
                required
              />
              <div className="invalid-feedback">Por favor, insira um telefone válido.</div>
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="col mb-3">
              <label className="form-label" htmlFor="email">Email:</label>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Escreva seu melhor email"
                onChange={handleEmailChange}
                required
              />
              <div className="invalid-feedback">Por favor, insira um email válido.</div>
            </div>
          </div>

          <h2 className="section-title">Endereço</h2>
          <div className="row justify-content-md-center">
            <div className="col mb-3">
              <label className="form-label" htmlFor="cep">CEP:</label>
              <input
                className="form-control"
                type="text"
                id="cep"
                name="cep"
                value={cep}
                placeholder="Complete seu CEP"
                onChange={handleCepChange}
                required
              />
              <div className="invalid-feedback">Por favor, insira um CEP válido.</div>
            </div>
          </div>

          {cepValido && (
            <>
              <div className="row justify-content-md-center">
                <div className="col mb-3">
                  <label className="form-label" htmlFor="logradouro">Logradouro:</label>
                  <input
                    className="form-control"
                    type="text"
                    id="logradouro"
                    name="logradouro"
                    value={logradouro}
                    readOnly
                    required
                  />
                  <div className="invalid-feedback">Por favor, insira seu logradouro.</div>
                </div>
              </div>
              <div className="row justify-content-md-center">
                <div className="col mb-3">
                  <label className="form-label" htmlFor="numero">Número:</label>
                  <input
                    className="form-control"
                    type="text"
                    id="numero"
                    name="numero"
                    placeholder="Adicione o número da sua casa, ou, do seu condomínio"
                    required
                  />
                  <div className="invalid-feedback">Por favor, insira o número.</div>
                </div>
              </div>
              <div className="row justify-content-md-center">
                <div className="col mb-3">
                  <label className="form-label" htmlFor="complemento">Complemento:</label>
                  <input
                    className="form-control"
                    type="text"
                    id="complemento"
                    name="complemento"
                    placeholder="Bloco, Apartamento, Número da Casa"
                  />
                  <div className="invalid-feedback">Por favor, insira o complemento.</div>
                </div>
              </div>
              <div className="row justify-content-md-center">
                <div className="col mb-3">
                  <label className="form-label" htmlFor="bairro">Bairro:</label>
                  <input
                    className="form-control"
                    type="text"
                    id="bairro"
                    name="bairro"
                    value={bairro}
                    readOnly
                    required
                  />
                  <div className="invalid-feedback">Por favor, insira seu bairro.</div>
                </div>
              </div>
              <div className="row justify-content-md-center">
                <div className="col mb-3">
                  <label className="form-label" htmlFor="cidade">Cidade:</label>
                  <input
                    className="form-control"
                    type="text"
                    id="cidade"
                    name="cidade"
                    value={cidade}
                    readOnly
                    required
                  />
                  <div className="invalid-feedback">Por favor, insira sua cidade.</div>
                </div>
              </div>
              <div className="row justify-content-md-center">
                <div className="col mb-3">
                  <label className="form-label" htmlFor="estado">Estado:</label>
                  <input
                    className="form-control"
                    type="text"
                    id="estado"
                    name="estado"
                    value={estado}
                    readOnly
                    required
                  />
                  <div className="invalid-feedback">Por favor, insira seu estado.</div>
                </div>
              </div>
            </>
          )}

          <div className="row gy-2 gx-3 align-items-center">
            <div className="col d-grid gap-2">
              <button className="btn btn-primary" type="submit">Cadastrar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
