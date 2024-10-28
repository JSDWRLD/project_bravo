import { NavLink } from "react-router-dom";
import { IoClose, IoMenu, IoCart } from "react-icons/io5";
import { useState, useEffect } from "react";
import logo from '/src/assets/full_logo.PNG';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle navbar visibility on scroll
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      // User is scrolling down
      setIsVisible(false);
    } else {
      // User is scrolling up
      setIsVisible(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    <header
      className={`fixed w-full top-0 left-0 bg-transparent z-50 transition-transform duration-300 ${isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'
        }`}
    >
      <nav className="container mx-auto flex justify-between items-center px-4 py-2">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={logo}
            alt="Retro Replay Logo"
            className="h-10 md:h-12 lg:h-16 w-auto"
          />
        </NavLink>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-screen w-full bg-gray-900 shadow-lg p-5 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
            } overflow-y-auto lg:relative lg:translate-x-0 lg:bg-transparent lg:shadow-none lg:h-auto lg:w-auto lg:p-0 lg:flex`}
        >
          <ul className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6">
            <li>
              <NavLink
                to="/"
                className="font-retro text-lg font-medium text-indigo-500 hover:text-indigo-400 transition lg:text-xs"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop/board-games"
                className="font-retro text-lg font-medium text-indigo-500 hover:text-indigo-400 transition lg:text-xs"
              >
                Board Games
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop/retro-games"
                className="font-retro text-lg font-medium text-indigo-500 hover:text-indigo-400 transition lg:text-xs"
              >
                Retro Games
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop/puzzles"
                className="font-retro text-lg font-medium text-indigo-500 hover:text-indigo-400 transition lg:text-xs"
              >
                Puzzles
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop/accessories"
                className="font-retro text-lg font-medium text-indigo-500 hover:text-indigo-400 transition lg:text-xs"
              >
                Accessories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className="font-retro bg-indigo-500 text-black py-1 px-4 rounded-lg hover:bg-indigo-400 transition text-lg lg:text-xs"
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className="text-3xl text-indigo-500 hover:text-indigo-400 transition lg:text-2xl"
              >
                <IoCart />
              </NavLink>
            </li>
          </ul>


          {/* Close Button for Mobile Menu */}
          <div
            className="absolute top-4 right-4 text-2xl text-indigo-500 cursor-pointer lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <IoClose />
          </div>
        </div>

        {/* Hamburger Menu Icon */}
        <div
          className="text-2xl text-indigo-400 cursor-pointer lg:hidden"
          onClick={() => setIsOpen(true)}
        >
          <IoMenu />

        </div>
      </nav>
    </header>
  );
};

export default Navbar;
