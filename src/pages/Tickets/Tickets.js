import React, { useEffect, useState } from "react";
import style from "./Tickets.module.css";
import { useNavigate } from "react-router-dom";

export default function TicketPage() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({
    movieName: "",
    cinema: "",
    date: "",
    quantity: 1,
  });

  // Carrega filmes
  useEffect(() => {
    fetch("http://localhost:3005/movies")
      .then((res) => res.json())
      .then(setMovies)
      .catch((err) => console.error(err));
  }, []);

  // Atualiza inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "quantity" ? Number(value) : value,
    });
  };

  // Cria ticket
  const handleCreate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3005/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Erro ao criar ticket: " + data.message);
      return;
    }

    alert("Ticket criado com sucesso!");

    // 👉 redireciona para a lista de tickets
    navigate("/alltickets");
  };

  return (
    <form className={style.form} onSubmit={handleCreate}>
      <h1>Criar Ticket</h1>

      <select name="movieName" onChange={handleChange}>
        <option value="">Selecione um filme</option>
        {movies.map((m) => (
          <option key={m.id} value={m.title}>
            {m.title}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="cinema"
        placeholder="Cinema"
        onChange={handleChange}
      />

      <input type="date" name="date" onChange={handleChange} />

      <input
        type="number"
        name="quantity"
        min="1"
        value={form.quantity}
        onChange={handleChange}
      />

      <button type="submit">Criar Ticket</button>

      <p>Lembre-se de mostrar o ticket no local escolhido!</p>
    </form>
  );
}
