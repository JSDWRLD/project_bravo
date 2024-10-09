import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { useState } from "react";
import logo from '/src/assets/full_logo.PNG';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 left-0 bottom-40 bg-transparent z-50">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <NavLink to="/" className="flex items-center -ml-20"> {/*adjust as needed*/}
          <img src={logo} alt="Retro Replay Logo" className="h-12 md:h-20 lg:h-24 w-auto" /> {/*adjust as needed*/}
        </NavLink>

        {/* Toggle Menu */}
        <div className={`absolute top-0 right-0 h-screen w-2/4 bg-white shadow-lg p-5 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:relative lg:translate-x-0 lg:bg-transparent lg:shadow-none lg:h-auto lg:w-auto lg:p-0 lg:flex`}>
          <ul className="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-8">
            <li>
              <NavLink to="/" className="text-lg font-medium text-gray-800 hover:text-indigo-600 transition">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop/best-sellers" className="text-lg font-medium text-gray-800 hover:text-indigo-600 transition">
                Best Sellers
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop/board-games" className="text-lg font-medium text-gray-800 hover:text-indigo-600 transition">
                Board Games
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop/games" className="text-lg font-medium text-gray-800 hover:text-indigo-600 transition">
                Retro Games
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop/puzzles" className="text-lg font-medium text-gray-800 hover:text-indigo-600 transition">
                Puzzles
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop/accessories" className="text-lg font-medium text-gray-800 hover:text-indigo-600 transition">
                Accessories
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-500 transition">
                Login
              </NavLink>
            </li>
          </ul>
          <div
            className="absolute top-4 right-4 text-2xl text-gray-800 cursor-pointer lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <IoClose />
          </div>
        </div>

        <div className="text-2xl text-gray-800 cursor-pointer lg:hidden" onClick={() => setIsOpen(true)}>
          <IoMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
