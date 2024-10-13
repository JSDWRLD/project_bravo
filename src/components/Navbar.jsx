import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { useState } from "react";
import logo from '/src/assets/full_logo.PNG';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 left-0 bg-transparent z-50">
      <nav className="container mx-auto flex justify-between items-center px-4 py-2">
        <NavLink to="/" className="flex items-center">
          <img src={logo} alt="Retro Replay Logo" className="h-10 md:h-12 lg:h-16 w-auto" />
        </NavLink>

        <div className={`fixed top-0 right-0 h-full w-full bg-gray-900 shadow-lg p-5 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto lg:relative lg:translate-x-0 lg:bg-transparent lg:shadow-none lg:h-auto lg:w-auto lg:p-0 lg:flex`}>
          <ul className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6">
            <li>
              <NavLink to="/" className="font-retro text-sm font-sm text-indigo-500  hover:text-indigo-400 transition">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop/board-games" className="font-retro text-sm font-medium text-indigo-500 hover:text-indigo-400 transition">
                Board Games
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop/retro-games" className="font-retro text-sm font-medium text-indigo-500 hover:text-indigo-400 transition">
                Retro Games
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop/puzzles" className="font-retro text-sm font-medium text-indigo-500 hover:text-indigo-400 transition">
                Puzzles
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop/accessories" className="font-retro text-sm font-medium text-indigo-500 hover:text-indigo-400 transition">
                Accessories
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className="font-retro bg-indigo-500 text-black py-1 px-4 rounded-lg hover:bg-indigo-400 transition text-sm">
                Login
              </NavLink>
            </li>
          </ul>
          <div
            className="absolute top-4 right-4 text-2xl text-indigo-500 cursor-pointer lg:hidden"
            onClick={() => setIsOpen(false)}
          >
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
