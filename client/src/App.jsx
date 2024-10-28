import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { Navbar, ProductDetailed, ProductListPage } from './components'
import { Home, Cart, Contact, AuthPage } from './pages';
import { useSelector } from 'react-redux';

export default function App() {
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

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
          <Route path="/login" element={userInfo ? <Navigate to="/"></Navigate> : <AuthPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </main>
  )
}
