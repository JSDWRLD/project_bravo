import React, { useState } from 'react';
import AddProduct from './AddProduct';
import RemoveProduct from './RemoveProduct';
import Orders from './Orders';
import GiftCardManager from './GiftCardManager';
import UserManager from './UserManager';
import UpdateProduct from './UpdateProduct';

const Admin = () => {
  const [selectedComponent, setSelectedComponent] = useState('AddProduct');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'AddProduct':
        return <AddProduct />;
      case 'RemoveProduct':
        return <RemoveProduct />;
      case 'UpdateProduct':
        return <UpdateProduct />;
      case 'Orders':
        return <Orders />;
      case 'GiftCards':
        return <GiftCardManager />;
      case 'UserManager':
        return <UserManager />;
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{ paddingTop: '6rem', paddingBottom:'6rem' }} 
    >
      <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto bg-gray-900 rounded-lg shadow-lg overflow-hidden">

        {/* Sidebar */}
        <aside className="bg-gray-800 w-full lg:w-1/4 lg:flex lg:flex-col">
          <div className="p-4 border-b border-gray-700 lg:border-none">
            <h2 className="text-2xl font-retro font-bold text-indigo-600 mb-4 text-center lg:text-left">
              Admin Dashboard
            </h2>

            {/* Dropdown Toggle for Small Screens */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="block lg:hidden w-full p-3 bg-indigo-600 rounded hover:bg-indigo-500 transition"
            >
              {isMenuOpen ? 'Close Menu' : 'Open Menu'}
            </button>
          </div>

          <nav
            className={`lg:flex lg:flex-col space-y-4 p-6 transition-all duration-300 ${
              isMenuOpen ? 'block' : 'hidden'
            } lg:block`}
          >
            {['AddProduct', 'RemoveProduct', 'UpdateProduct', 'Orders', 'GiftCards', 'UserManager'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setSelectedComponent(item);
                  setIsMenuOpen(false); // Close menu on selection for small screens
                }}
                className={`w-full p-3 rounded ${
                  selectedComponent === item ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'
                } hover:bg-indigo-500 transition`}
              >
                {item === 'AddProduct' && 'Add Product'}
                {item === 'RemoveProduct' && 'Remove Product'}
                {item === 'UpdateProduct' && 'Update Product'}
                {item === 'Orders' && 'Manage Orders'}
                {item === 'GiftCards' && 'Manage Gift Cards'}
                {item === 'UserManager' && 'Manage Users'}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6">
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-inner h-[calc(100vh-160px)] lg:h-[900px] overflow-y-auto">
            {renderComponent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
