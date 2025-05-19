import React, { useState } from "react";
import { Link } from "react-router-dom";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [areasDeAtuacao, setAreasDeAtuacao] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Nome", nome);
    formData.append("Email", email);
    formData.append("Senha", senha);
    formData.append("CPF", cpf);
    formData.append("Endereco", endereco);
    formData.append("Cidade", cidade);
    formData.append("Estado", estado);
    formData.append("DataNascimento", dataNascimento, "2000-01-01");
    formData.append("AreasDeAtuacao", areasDeAtuacao); // string separada por vírgulas

    try {
      const response = await fetch("http://localhost:5295/PrestadorDeServico", {
        method: "POST",
        body: formData,
      });

     if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        } else {
        const errorData = await response.json();
        console.error("Detalhes do erro:", errorData);
        alert(`Erro ao cadastrar: ${errorData.message || "Erro desconhecido."}`);
        }

    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro na requisição.");
    }
  };

  return (
  <div className="d-flex align-items-center justify-content-center min-vh-100 p-3"
       style={{background: "linear-gradient(135deg, #1C88EB, #4014F0)"}}>
    
    <div className="shadow-lg p-4 rounded-4"
         style={{width: "100%", maxWidth: "600px", backgroundColor: "#ffffffee", border: "1px solid #1AEBDB"}}>

      <div className="text-center mb-4">
        <h2 className="fw-bold" style={{ color: '#1630F0' }}>Cadastro de Usuário</h2>
      </div>

      <form onSubmit={handleSubmit}>

        {/* Primeira linha - Nome e CPF */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="nome" className="form-label fw-semibold" style={{ color: '#1C88EB' }}>
              Nome
            </label>
            <input 
              type="text"
              className="form-control rounded-3"  
              id="nome"
              value={nome} onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome" 
              required
            />        
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="cpf" className="form-label fw-semibold" style={{ color: '#1C88EB' }}>
              CPF
            </label>
            <input
              type="text"
              className="form-control rounded-3"
              id="cpf"
              value={cpf} onChange={(e) => setCpf(e.target.value)}
              placeholder="Digite seu CPF"
              required
            />
          </div>
        </div>

        {/* Segunda linha - Email e Senha */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="email" className="form-label fw-semibold" style={{ color: '#1C88EB' }}>
              Email
            </label>
            <input 
              type="email" 
              className="form-control rounded-3" 
              id="email"
              value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required 
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="senha" className="form-label fw-semibold" style={{ color: '#1C88EB' }}>
              Senha
            </label>
            <input
              type="password"
              className="form-control rounded-3"
              id="senha"
              value={senha} onChange={(e) => setSenha(e.target.value)}
              placeholder="Defina uma senha"
              required
            />
          </div>
        </div>

        {/* Data Nascimento (full width) */}
        <div className="mb-3">
          <label htmlFor="dataNascimento" className="form-label fw-semibold" style={{ color: '#1C88EB' }}>
            Data de Nascimento
          </label>
          <input
            type="date"
            className="form-control rounded-3"
            id="dataNascimento"
            value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </div>

        {/* Endereço (full width) */}
        <div className="mb-3">
          <label htmlFor="endereco" className="form-label fw-semibold" style={{ color: '#1C88EB' }}>
            Endereço
          </label>
          <input
            type="text"
            className="form-control rounded-3"
            id="endereco"
            value={endereco} onChange={(e) => setEndereco(e.target.value)}
            placeholder="Digite seu endereço"
            required
          />
        </div>

        {/* Quarta linha - Cidade e Estado */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="cidade" className="form-label fw-semibold" style={{ color: '#1C88EB' }}>
              Cidade
            </label>
            <input
              type="text"
              className="form-control rounded-3"
              id="cidade"
              value={cidade} onChange={(e) => setCidade(e.target.value)}
              placeholder="Digite sua cidade"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="estado" className="form-label fw-semibold" style={{ color: '#1C88EB' }}>
              Estado
            </label>
            <input
              type="text"
              className="form-control rounded-3"
              id="estado"
              value={estado} onChange={(e) => setEstado(e.target.value)}
              placeholder="Digite seu estado"
              required
            />
          </div>
        </div>

        {/* Áreas de Atuação (full width) */}
        <div className="mb-3">
          <label htmlFor="areasDeAtuacao" className="form-label fw-semibold" style={{ color: '#1C88EB' }}>
            Áreas de Atuação (separar por vírgula)
          </label>
          <input
            type="text"
            className="form-control rounded-3"
            id="areasDeAtuacao"
            value={areasDeAtuacao} onChange={(e) => setAreasDeAtuacao(e.target.value)}
            placeholder="Ex: Pintura,Elétrica,Reparos"
            required
          />
        </div>

        <button type="submit" className="btn w-100 rounded-3 fw-semibold py-2 mt-3"
          style={{ backgroundColor: '#1AEBDB', border: 'none', color: '#fff' }}
        >
          Cadastrar
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="mb-0 small">
          Já tem uma conta?{' '}
          <a href="./" className="text-decoration-none fw-semibold" style={{ color: '#1E78EB' }}>
            Faça login
          </a>
        </p>
      </div>
    </div>
  </div>
);
}

export default Cadastro;
