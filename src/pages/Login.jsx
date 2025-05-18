import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && senha) {
      navigate('/home');
    } else {
      alert('Preencha todos os campos');
    }
  };

  return (

    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: 'linear-gradient(135deg, #1C88EB, #4014F0)',
        padding: '20px',
      }}
    >
      <div
        className="card shadow-lg rounded-4 p-4 w-100"
        style={{
          maxWidth: '420px',
          backgroundColor: '#ffffffee',
          border: '1px solid #1AEBDB',
        }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: '#1630F0' }}>Login</h2>
          <p className="text-muted small">Acesse sua conta para gerenciar serviços</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold" style={{ color: '#1C88EB' }}>
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-3"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="senha" className="form-label fw-semibold" style={{ color: '#1C88EB' }}>
              Senha
            </label>
            <input
              type="password"
              className="form-control rounded-3"
              id="senha"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100 rounded-3 fw-semibold"
            style={{
              backgroundColor: '#1AEBDB',
              border: 'none',
              color: '#fff',
            }}
          >
            <i className="bi bi-box-arrow-in-right me-2"></i> Entrar
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="mb-0 small">
            Não tem uma conta?{' '}
            <a
              href="/cadastro"
              className="text-decoration-none fw-semibold"
              style={{ color: '#1E78EB' }}
            >
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );

}

export default Login;
