import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Register from './pages/Register/Register';
import Movies from './pages/Movies/Movies';


function App() {
  return (
    <BrowserRouter>

    <Routes>

      <Route path="/" element={<Register />} />
      <Route path="/filmes" element={<Movies />} />
      
    </Routes>

     </BrowserRouter>
  );
}

export default App;
