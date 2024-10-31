import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoChevronDown } from 'react-icons/io5';

export default function UserDropdown({ logoutHandler }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const handleToggle = () => setIsOpen(!isOpen);

  // Close dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown button */}
      <button
        onClick={handleToggle}
        className="inline-flex items-center font-retro text-indigo-400 bg-gray-800 py-2 px-4 rounded hover:bg-indigo-500 hover:text-black transition"
      >
        User <IoChevronDown className="ml-2" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="fixed right-4 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50"
          style={{ top: '4rem' }}
        >
          <ul className="py-1">
            <li>
              <Link
                to="/order-history"
                className="block px-4 py-2 text-indigo-400 font-retro hover:bg-gray-800 hover:text-white transition"
                onClick={() => setIsOpen(false)}
              >
                Order History
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  logoutHandler();
                  setIsOpen(false);
                }}
                className="w-full text-left block px-4 py-2 text-indigo-400 font-retro hover:bg-gray-800 hover:text-white transition"
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
