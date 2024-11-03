import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { Navbar, ProductDetailed, ProductListPage, Footer } from './components';
import { Home, Cart, Contact, Login, Register, Account, OrderHistory, PlaceOrder} from './pages';
import { useSelector } from 'react-redux';

export default function App() {
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-400">
      <Router>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop/board-games" element={<ProductListPage category="board-games" />} />
            <Route path="/shop/puzzles" element={<ProductListPage category="puzzles" />} />
            <Route path="/shop/retro-games" element={<ProductListPage category="retro-games" />} />
            <Route path="/shop/consoles" element={<ProductListPage category="consoles" />} />
            <Route path="/shop/:category/product/:id" element={<ProductDetailed />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={userInfo ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={userInfo ? <Navigate to="/" /> : <Register />} />
            <Route path="/account" element={<Account />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}
