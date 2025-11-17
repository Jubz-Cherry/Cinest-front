import React, { useEffect, useState } from "react";
import style from "./AllTickets.module.css";

export default function AllTickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3005/tickets")
      .then(res => res.json())
      .then(setTickets)
      .catch(err => console.error(err));
  }, []);

  return (
    <div className={style.container}>
      <h1>Meus Tickets</h1>

      {tickets.length === 0 ? (
        <p className={style.empty}>Nenhum ticket criado ainda.</p>
      ) : (
        <div className={style.list}>
          {tickets.map(ticket => (
            <div key={ticket.id} className={style.card}>
              <h2>{ticket.movieName}</h2>
              <p><strong>Cinema:</strong> {ticket.cinema}</p>
              <p><strong>Data:</strong> {new Date(ticket.date).toLocaleDateString()}</p>
              <p><strong>Quantidade:</strong> {ticket.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
