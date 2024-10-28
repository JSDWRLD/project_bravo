import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Navbar, ProductDetailed, ProductListPage } from './components'
import { Home, Cart, Contact, AuthPage } from './pages';


export default function App() {
  return (
    <main className='bg-black text-gray-400 min-h-screen'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop/board-games" element={<ProductListPage category="board-games" />} />
          <Route path="/shop/puzzles" element={<ProductListPage category="puzzles" />} />
          <Route path="/shop/retro-games" element={<ProductListPage category="retro-games" />} />
          <Route path="/shop/accessories" element={<ProductListPage category="accessories" />} />
          <Route path="/shop/:category/product/:id" element={<ProductDetailed />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </main>
  )
}
