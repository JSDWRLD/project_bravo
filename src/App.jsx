import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Navbar, ProductDetailed, ProductListPage} from './components'
import { Home, Cart, Login } from './pages';


export default function App() {
  return (
    <main className='bg-black text-gray-400 min-h-screen'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop/board-games" element={<ProductListPage category="boards" />} />
          <Route path="/shop/puzzles" element={<ProductListPage category="puzzles" />} />
          <Route path="/shop/retro-games" element={<ProductListPage category="retros" />} />
          <Route path="/shop/accessories" element={<ProductListPage category="accessories" />} />
          <Route path="/shop/:category/product/:productId" element={<ProductDetailed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </main>
  )
}
