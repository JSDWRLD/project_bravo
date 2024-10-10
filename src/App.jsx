import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home, Accessories, Cart, BestSellers, Board, Game, Puzzle, Login } from './pages';

export default function App() {
  return (
    <main className='bg-black text-gray-400 min-h-screen'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop/best-sellers" element={<BestSellers />} />
          <Route path="/shop/board-games" element={<Board />} />
          <Route path="/shop/games" element={<Game />} />
          <Route path="/shop/puzzles" element={<Puzzle />} />
          <Route path="/shop/accessories" element={<Accessories />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </main>
  )
}
