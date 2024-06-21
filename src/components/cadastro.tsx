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

    try {
      const response = await fetch('/api/hooks/catch/18025143/2bhlz94/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        navigate('/simulador'); // Redireciona para a tela do simulador após o envio
      } else {
        console.error('Erro ao enviar os dados do formulário');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados do formulário:', error);
    }
  };

  return (
    <div className="container">
      <div className="info-section">
        <img src="/path/to/icon.png" alt="Ícone" className="info-icon" />
        <p>PASSO {step}/3</p>
        <h2>Continue sua simulação e saiba se possui <strong>um valor pré-aprovado</strong></h2>
        <p>Preencha as informações a seguir, para criarmos a <strong>melhor oferta de crédito</strong></p>
        <p>Não se preocupe, você ainda não estará contratando o empréstimo.</p>
      </div>
      <div className="form-section">
        <h1>Cadastro</h1>
        <div className="container" id="cadastro-forms">
          <form className={`needs-validation ${isSubmitted ? 'was-validated' : ''}`} noValidate onSubmit={step === 3 ? handleFinalSubmit : handleNext}>
            {step === 1 && (
              <>
                <h2 className="section-title">Informações Pessoais</h2>
                <div className="row justify-content-md-center">
                  <div className="col mb-3">
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
                </div>
                <div className="row justify-content-md-center">
                  <div className="col mb-3">
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
                </div>
                <div className="row justify-content-md-center">
                  <div className="col mb-3">
                    <label className="form-label" htmlFor="rg">Número do seu RG ou RNE (opcional):</label>
                    <input
                      className="form-control"
                      type="text"
                      id="rg"
                      name="rg"
                      value={rg}
                      placeholder="Número do seu RG ou RNE - opcional"
                      onChange={handleRgChange}
                    />
                  </div>
                </div>
                <div className="row justify-content-md-center">
                  <div className="col mb-3">
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
                </div>
              </>
            )}

            {step === 2 && (
              <>
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
                      placeholder="Qual o seu email?"
                      onChange={handleEmailChange}
                      required
                    />
                    <div className="invalid-feedback">Informe o email antes de continuar.</div>
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="section-title">Outras Informações</h2>
                <div className="row justify-content-md-center">
                  <div className="col mb-3">
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
                </div>
                <div className="row justify-content-md-center">
                  <div className="col mb-3">
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
                </div>
                <div className="row justify-content-md-center">
                  <div className="col mb-3">
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
                </div>
                <div className="row justify-content-md-center">
                  <div className="col mb-3">
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
                </div>
              </>
            )}

            <div className="row gy-2 gx-3 align-items-center">
              <div className="col d-grid gap-2">
                {step > 1 && (
                  <button type="button" className="btn btn-secondary" onClick={handlePrev}>Voltar</button>
                )}
                <button className="btn btn-primary" type="submit">{step === 3 ? 'Cadastrar' : 'Continuar'}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
