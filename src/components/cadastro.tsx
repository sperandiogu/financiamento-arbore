import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css';

const Cadastro = () => {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [nacionalidade, setNacionalidade] = useState('Brasil');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [rendaMensal, setRendaMensal] = useState('');
  const [situacaoProfissional, setSituacaoProfissional] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNomeCompletoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNomeCompleto(event.target.value);
  };

  const handleTelefoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let valor = event.target.value.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
    setTelefone(valor);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let valor = event.target.value.replace(/\D/g, '');
    if (valor.length > 9) {
      valor = valor.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    } else if (valor.length > 6) {
      valor = valor.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1.$2.$3');
    } else if (valor.length > 3) {
      valor = valor.replace(/^(\d{3})(\d{3})$/, '$1.$2');
    }
    setCpf(valor);
  };

  const handleRgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRg(event.target.value);
  };

  const handleDataNascimentoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataNascimento(event.target.value);
  };

  const handleNacionalidadeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNacionalidade(event.target.value);
  };

  const handleEstadoCivilChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEstadoCivil(event.target.value);
  };

  const handleRendaMensalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let valor = event.target.value.replace(/\D/g, '');
    valor = (parseInt(valor, 10) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    setRendaMensal(valor);
  };

  const handleSituacaoProfissionalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSituacaoProfissional(event.target.value);
  };

  const handleNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    setIsSubmitted(true);
    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      return;
    }
    setStep(step + 1);
    setIsSubmitted(false);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleFinalSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    setIsSubmitted(true);
    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    const data = {
      nomeCompleto,
      email,
      cpf,
      rg,
      dataNascimento,
      telefone,
      nacionalidade,
      estadoCivil,
      rendaMensal,
      situacaoProfissional,
    };

    const apiUrl = 'https://hook.us1.make.com/042oqm2cszci4bkq47dtxk6d596uqnmu';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      navigate('/simulador'); // Redireciona para a tela do simulador após o envio
    } catch (error) {
      console.error('Erro ao enviar os dados do formulário:', error.message);
      alert('Erro ao enviar os dados do formulário. Por favor, tente novamente.');
    }
  };

  return (
    <div className="container">
      <div className="main-content row">
        <div className="info-section col-md-6">
          <div className="icon-ctg">
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="90" height="90" rx="5" fill="#267E3E" />
              <path d="M56.25 66.9375H33.75C23.8275 66.9375 20.8125 63.9225 20.8125 54V36C20.8125 26.0775 23.8275 23.0625 33.75 23.0625H56.25C66.1725 23.0625 69.1875 26.0775 69.1875 36V54C69.1875 63.9225 66.1725 66.9375 56.25 66.9375ZM33.75 26.4375C25.695 26.4375 24.1875 27.9675 24.1875 36V54C24.1875 62.0325 25.695 63.5625 33.75 63.5625H56.25C64.305 63.5625 65.8125 62.0325 65.8125 54V36C65.8125 27.9675 64.305 26.4375 56.25 26.4375H33.75Z" fill="white" />
              <path d="M60.75 37.6875H49.5C48.5775 37.6875 47.8125 36.9225 47.8125 36C47.8125 35.0775 48.5775 34.3125 49.5 34.3125H60.75C61.6725 34.3125 62.4375 35.0775 62.4375 36C62.4375 36.9225 61.6725 37.6875 60.75 37.6875Z" fill="white" />
              <path d="M60.75 46.6875H51.75C50.8275 46.6875 50.0625 45.9225 50.0625 45C50.0625 44.0775 50.8275 43.3125 51.75 43.3125H60.75C61.6725 43.3125 62.4375 44.0775 62.4375 45C62.4375 45.9225 61.6725 46.6875 60.75 46.6875Z" fill="white" />
              <path d="M60.75 55.6875H56.25C55.3275 55.6875 54.5625 54.9225 54.5625 54C54.5625 53.0775 55.3275 52.3125 56.25 52.3125H60.75C61.6725 52.3125 62.4375 53.0775 62.4375 54C62.4375 54.9225 61.6725 55.6875 60.75 55.6875Z" fill="white" />
              <path d="M37.126 45.0898C33.9535 45.0898 31.366 42.5023 31.366 39.3298C31.366 36.1573 33.9535 33.5698 37.126 33.5698C40.2985 33.5698 42.8859 36.1573 42.8859 39.3298C42.8859 42.5023 40.2985 45.0898 37.126 45.0898ZM37.126 36.9448C35.821 36.9448 34.741 38.0248 34.741 39.3298C34.741 40.6348 35.821 41.7148 37.126 41.7148C38.431 41.7148 39.511 40.6348 39.511 39.3298C39.511 38.0248 38.431 36.9448 37.126 36.9448Z" fill="white" />
              <path d="M44.9998 56.43C44.1448 56.43 43.4023 55.7775 43.3123 54.9C43.0648 52.47 41.1073 50.5125 38.6548 50.2875C37.6198 50.1975 36.5848 50.1975 35.5498 50.2875C33.0973 50.5125 31.1398 52.4475 30.8923 54.9C30.8023 55.8225 29.9698 56.52 29.0473 56.4075C28.1248 56.3175 27.4498 55.485 27.5398 54.5625C27.9448 50.5125 31.1623 47.295 35.2348 46.935C36.4723 46.8225 37.7323 46.8225 38.9698 46.935C43.0198 47.3175 46.2598 50.535 46.6648 54.5625C46.7548 55.485 46.0798 56.3175 45.1573 56.4075C45.1123 56.43 45.0448 56.43 44.9998 56.43Z" fill="white" />
            </svg>
          </div>
          <p className="contg-passos">Passo {step}/3</p>
          <h2>Continue sua simulação e saiba se possui <strong>um valor pré-aprovado</strong></h2>
          <p>Preencha as informações a seguir, para criarmos a <strong>melhor oferta de crédito</strong></p>
          <p>Não se preocupe, você ainda não estará contratando o empréstimo.</p>
        </div>
        <div className="form-section col-md-6">
          <div className="form-container">
            <form className={`needs-validation ${isSubmitted ? 'was-validated' : ''}`} noValidate onSubmit={step === 3 ? handleFinalSubmit : handleNext}>
              {step === 1 && (
                <>
                  <h2 className="section-title">Informações Pessoais</h2>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="nome-completo">Nome Completo:</label>
                    <input
                      className="form-control"
                      type="text"
                      id="nome-completo"
                      name="nomeCompleto"
                      value={nomeCompleto}
                      placeholder="Qual seu nome completo?"
                      onChange={handleNomeCompletoChange}
                      required
                    />
                    <div className="invalid-feedback">Insira seu nome completo para continuar.</div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="cpf">CPF:</label>
                    <input
                      className="form-control"
                      type="text"
                      id="cpf"
                      name="cpf"
                      value={cpf}
                      placeholder="CPF"
                      onChange={handleCpfChange}
                      required
                    />
                    <div className="invalid-feedback">Informe o CPF antes de continuar.</div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="rg">Número do seu RG ou RNE (opcional):</label>
                    <input
                      className="form-control"
                      type="number"
                      id="rg"
                      name="rg"
                      value={rg}
                      placeholder="Número do seu RG ou RNE - opcional"
                      onChange={handleRgChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="data-nascimento">Data de nascimento:</label>
                    <input
                      className="form-control"
                      type="date"
                      id="data-nascimento"
                      name="dataNascimento"
                      value={dataNascimento}
                      onChange={handleDataNascimentoChange}
                      required
                    />
                    <div className="invalid-feedback">Verifique a data de nascimento.</div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="section-title">Informações de Contato</h2>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="telefone">Whatsapp:</label>
                    <input
                      className="form-control"
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={telefone}
                      placeholder="Adicione o Número do seu Whatsapp"
                      onChange={handleTelefoneChange}
                      required
                    />
                    <div className="invalid-feedback">Por favor, insira um telefone válido.</div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="email">Email:</label>
                    <input
                      className="form-control"
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      placeholder="Qual o seu email?"
                      onChange={handleEmailChange}
                      required
                    />
                    <div className="invalid-feedback">Informe o email antes de continuar.</div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="section-title">Outras Informações</h2>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="nacionalidade">País da sua nacionalidade:</label>
                    <select
                      className="form-control"
                      id="nacionalidade"
                      name="nacionalidade"
                      value={nacionalidade}
                      onChange={handleNacionalidadeChange}
                      required
                    >
                      <option value="Brasil">Brasil</option>
                      {/* Adicione outras opções conforme necessário */}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="estado-civil">Estado civil:</label>
                    <select
                      className="form-control"
                      id="estado-civil"
                      name="estadoCivil"
                      value={estadoCivil}
                      onChange={handleEstadoCivilChange}
                      required
                    >
                      <option value="" disabled>Selecione uma opção</option>
                      <option value="Solteiro(a)">Solteiro(a)</option>
                      <option value="Casado(a)">Casado(a)</option>
                      <option value="Divorciado(a)">Divorciado(a)</option>
                      <option value="Viúvo(a)">Viúvo(a)</option>
                      <option value="Separado(a)">Separado(a)</option>
                      {/* Adicione outras opções conforme necessário */}
                    </select>
                    <div className="invalid-feedback">Selecione uma opção para continuar.</div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="renda-mensal">Renda mensal da sua família:</label>
                    <input
                      className="form-control"
                      type="text"
                      id="renda-mensal"
                      name="rendaMensal"
                      value={rendaMensal}
                      placeholder="Preencha esse campo para continuar"
                      onChange={handleRendaMensalChange}
                      required
                    />
                    <div className="invalid-feedback">Preencha esse campo para continuar.</div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="situacao-profissional">Situação profissional:</label>
                    <select
                      className="form-control"
                      id="situacao-profissional"
                      name="situacaoProfissional"
                      value={situacaoProfissional}
                      onChange={handleSituacaoProfissionalChange}
                      required
                    >
                      <option value="" disabled>Selecione uma opção</option>
                      <option value="Empregado">Empregado</option>
                      <option value="Desempregado">Desempregado</option>
                      <option value="Aposentado">Aposentado</option>
                      <option value="Estudante">Estudante</option>
                      {/* Adicione outras opções conforme necessário */}
                    </select>
                    <div className="invalid-feedback">Preencha esse campo para continuar.</div>
                  </div>
                </>
              )}

              <div className="d-grid">
                {step > 1 && (
                  <button type="button" className="btn btn-link btn-voltar" onClick={handlePrev}>Voltar</button>
                )}
                <button className="btn btn-primary btn-continuar" type="submit">{step === 3 ? 'Cadastrar' : 'Continuar'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
