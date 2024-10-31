import { NavLink, useNavigate } from "react-router-dom";
import { IoClose, IoMenu, IoCart } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutAction } from "../redux/Actions/User";
import logo from '/src/assets/full_logo.PNG';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  const handleLogout = () => {
    dispatch(userLogoutAction());
    navigate('/');
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    // Show navbar when scrolling up and hide when scrolling down
    setIsVisible(currentScrollY <= lastScrollY || currentScrollY < 100);
    
    // Close dropdown when scrolling
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
    
    setLastScrollY(currentScrollY);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    <header className={`fixed w-full top-0 left-0 bg-transparent z-50 transition-transform ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <nav className="container mx-auto flex justify-between items-center px-4 py-2 relative">
        <NavLink to="/" className="flex items-center">
          <img src={logo} alt="Retro Replay Logo" className="h-10 md:h-12 lg:h-16 w-auto" />
        </NavLink>

        <div className={`fixed top-0 right-0 h-screen w-full bg-gray-900 shadow-lg p-5 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-visible lg:relative lg:translate-x-0 lg:bg-transparent lg:shadow-none lg:h-auto lg:w-auto lg:p-0 lg:flex`}>
          <ul className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6">
            <li><NavLink to="/" className="font-retro text-lg font-medium text-indigo-500 hover:text-indigo-400 transition lg:text-xs">Home</NavLink></li>
            <li><NavLink to="/shop/board-games" className="font-retro text-lg font-medium text-indigo-500 hover:text-indigo-400 transition lg:text-xs">Board Games</NavLink></li>
            <li><NavLink to="/shop/retro-games" className="font-retro text-lg font-medium text-indigo-500 hover:text-indigo-400 transition lg:text-xs">Retro Games</NavLink></li>
            <li><NavLink to="/shop/puzzles" className="font-retro text-lg font-medium text-indigo-500 hover:text-indigo-400 transition lg:text-xs">Puzzles</NavLink></li>
            <li><NavLink to="/shop/consoles" className="font-retro text-lg font-medium text-indigo-500 hover:text-indigo-400 transition lg:text-xs">Consoles</NavLink></li>
            <li className="relative" ref={dropdownRef}>
              {userInfo ? (
                <>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="font-retro bg-indigo-500 text-black py-1 px-4 rounded-lg hover:bg-indigo-400 transition text-lg lg:text-xs">
                    Account
                  </button>
                  {isDropdownOpen && (
                    <ul className="absolute left-0 mt-2 w-48 bg-gray-900 border border-indigo-500 rounded-lg shadow-lg text-indigo-400 z-50 flex flex-col">
                      <li>
                        <NavLink
                          to="/account"
                          className="block px-4 py-2 hover:bg-indigo-500 hover:text-black transition">
                          View Account
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/order-history"
                          className="block px-4 py-2 hover:bg-indigo-500 hover:text-black transition">
                          Order History
                        </NavLink>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-indigo-400 bg-gray-900 hover:bg-indigo-500 hover:text-black transition rounded-lg">
                          Sign Out
                        </button>
                      </li>
                    </ul>
                  )}
                </>
              ) : (
                <NavLink to="/login" className="font-retro bg-indigo-500 text-black py-1 px-4 rounded-lg hover:bg-indigo-400 transition text-lg lg:text-xs">Login</NavLink>
              )}
            </li>
            <li>
              <NavLink to="/cart" className="text-3xl text-indigo-500 hover:text-indigo-400 transition lg:text-2xl">
                <IoCart />
              </NavLink>
            </li>
          </ul>

          <div className="absolute top-4 right-4 text-2xl text-indigo-500 cursor-pointer lg:hidden" onClick={() => setIsOpen(false)}>
            <IoClose />
          </div>
        </div>

        <div className="text-2xl text-indigo-400 cursor-pointer lg:hidden" onClick={() => setIsOpen(true)}>
          <IoMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
