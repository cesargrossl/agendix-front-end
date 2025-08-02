import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });
  const [erro, setErro] = useState('');

  const fetchUsuarios = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setUsuarios(Array.isArray(data) ? data : []));
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const resp = await fetch(API_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!resp.ok) {
        const errData = await resp.json();
        setErro(errData.erro || 'Erro desconhecido');
      } else {
        fetchUsuarios();
        setForm({ nome: '', email: '', senha: '' });
      }
    } catch (error) {
      setErro('Erro de conexão');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Usuários</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          value={form.nome}
          onChange={e => setForm({ ...form, nome: e.target.value })}
          required />
        <input
          placeholder="E-mail"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required />
        <input
          placeholder="Senha"
          type="password"
          value={form.senha}
          onChange={e => setForm({ ...form, senha: e.target.value })}
          required />
        <button type="submit">Criar Usuário</button>
      </form>
      {erro && <div style={{color: 'red', margin: '8px 0'}}>{erro}</div>}
      <ul>
        {usuarios.map(u => (
          <li key={u.id}>{u.nome} — {u.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
