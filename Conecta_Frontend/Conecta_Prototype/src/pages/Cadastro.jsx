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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Nome</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full border p-2" required />
          </div>
          <div className="mb-4">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2" required />
          </div>
          <div className="mb-4">
            <label>Senha</label>
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} className="w-full border p-2" required />
          </div>
          <div className="mb-4">
            <label>CPF</label>
            <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} className="w-full border p-2" required />
          </div>
          <div className="mb-4">
            <label>Endereço</label>
            <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} className="w-full border p-2" required />
          </div>
          <div className="mb-4">
            <label>Cidade</label>
            <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} className="w-full border p-2" required />
          </div>
          <div className="mb-4">
            <label>Estado</label>
            <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} className="w-full border p-2" required />
          </div>
          <div className="mb-4">
            <label>Data de Nascimento</label>
            <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} className="w-full border p-2" required />
          </div>
          <div className="mb-6">
            <label>Áreas de Atuação (separe por vírgula)</label>
            <input
              type="text"
              value={areasDeAtuacao}
              onChange={(e) => setAreasDeAtuacao(e.target.value)}
              className="w-full border p-2"
              required
              placeholder="Ex: Pintura,Elétrica,Reparos"
            />
          </div>
          <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            Cadastrar
          </button>
        </form>
        <p className="mt-4 text-sm">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Cadastro;
