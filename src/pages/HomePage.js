import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/homepage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Lógica para envio de formulário, exibir credenciais ou autenticar
    console.log("Formulário enviado");
  };

  const toggleForm = () => setIsLogin(!isLogin);

  const handleAboutRedirect = () => {
    window.location.href = 'https://exploramanaus.github.io/view/';
  };

  return (
    <div className="login-page">
      <div className="img-container"></div>
      <div className="login-container">
        <h1>Explora Manaus</h1>
        <h2>{isLogin ? 'Fazer Login' : 'Criar Conta'}</h2>
        <form onSubmit={handleFormSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name"></label>
              <input type="text" id="name" name="name" placeholder="Nome" required />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email"></label>
            <input type="email" id="email" name="email" placeholder="Email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password"></label>
            <input type="password" id="password" name="password" placeholder="Senha" required />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword"></label>
              <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirmar senha" required />
            </div>
          )}
          <button type="submit" className="btn-submit">
            {isLogin ? 'Entrar' : 'Criar Conta'}
          </button>
          {isLogin && (
            <button type="button" onClick={() => navigate('/main')} className="btn-secondary">
              Entrar sem conta
            </button>
          )}
          <button type="button" onClick={toggleForm} className="btn-link">
            {isLogin ? 'Criar Conta' : 'Já tenho conta'}
          </button>
        </form>
        {/* Botão para a página "Sobre o Projeto" */}
        <button type="button" onClick={handleAboutRedirect} className="btn-about">
          Sobre o Projeto
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
