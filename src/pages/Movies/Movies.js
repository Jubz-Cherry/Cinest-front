import React, { useEffect, useState } from "react";
import styles from "./Movies.module.css";
import { useNavigate } from "react-router-dom";


export default function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3005/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Erro ao buscar filmes:", err));
  }, []);

  const navigate = useNavigate();

  const irParaTicket = () => {
    navigate("/tickets"); 
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎬 Catálogo de Filmes</h1>
      <div className={styles.grid}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.card}>
            <h2>{movie.title}</h2>
            <p>{movie.genre}</p>
            <span>⭐ {movie.rating}</span>
          </div>
          
        ))}
        
      </div>
      <button onClick={irParaTicket}>Fazer um ticket</button>
    </div>
  );
}
