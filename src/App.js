import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Register from './pages/Register/Register';
import Movies from './pages/Movies/Movies';
import Login from './pages/Login/Login';
import Tickets from './pages/Tickets/Tickets';
import AllTickets from './pages/AllTickets/AllTickets';

function App() {
  return (
    <BrowserRouter>

    <Routes>

      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/filmes" element={<Movies />} />
      <Route path="/tickets" element={<Tickets />} />
      <Route path="/alltickets" element={<AllTickets />} />
      
    </Routes>

     </BrowserRouter>
  );
}

export default App;
