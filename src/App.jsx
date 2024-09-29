import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home, Retro, Board, Puzzle } from './pages';

export default function App() {
  return (
    <main className='bg-white'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/retrogames" element={<Retro />} />
          <Route path="/boardgames" element={<Board />} />
          <Route path="/puzzles" element={<Puzzle />} />
        </Routes>
      </Router>
    </main>
  )
}
