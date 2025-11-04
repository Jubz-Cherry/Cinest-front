import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Register.module.css';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const API = process.env.REACT_APP_API_URL || 'http://localhost:3000';
      const res = await fetch(`${API}/user`, {
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
        console.error('Registro falhou:', res.status, data);
        alert(data.message || `Erro no registro (status ${res.status})`);
        return;
      }

      alert('Usuário registrado com sucesso!');
      setForm({ name: '', email: '', password: '' });
      navigate('/filmes'); // redireciona para catálogo (rota definida em App.js)
    } catch (err) {
      console.error('Erro na requisição de registro:', err);
      // mostrar mensagem de erro mais específica
      alert(`Erro ao registrar usuário — ${err.message || 'ver console para detalhes'}`);
    }
  };

  return (
    <div className={style.Register}>
      <div className={style["register-container"]}>
        <h1>Faça sua conta!</h1>
        <form className={style["register-form"]} onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={form.name}
            onChange={handleChange}
            required
          />
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
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
