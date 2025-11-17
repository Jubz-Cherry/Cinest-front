import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Login.module.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const API = 'http://localhost:3005';
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      // lidar com respostas que não retornam JSON e registrar o status
      const contentType = res.headers.get('content-type') || '';
      let data;
      if (contentType.includes('application/json')) {
        data = await res.json();
      } else {
        // pode ser texto, HTML de erro ou body vazio
        const text = await res.text();
        data = { message: text };
      }

      if (!res.ok) {
        console.error('Login falhou:', res.status, data);
        alert(data.message || `Erro no login (status ${res.status})`);
        return;
      }

      alert('Login feito com sucesso!');
      setForm({ email: '', password: '' });
      navigate('/filmes'); // redireciona para catálogo (rota definida em App.js)
    } catch (err) {
      console.error('Erro na requisição de registro:', err);
      // mostrar mensagem de erro mais específica
      alert(`Erro ao entrar — ${err.message || 'ver console para detalhes'}`);
    }
  };

  return (
    <div className={style.Login}>
      <div className={style["login-container"]}>
        <h1>Entre na sua conta!</h1>
        <form className={style["login-form"]} onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"  
            name="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
