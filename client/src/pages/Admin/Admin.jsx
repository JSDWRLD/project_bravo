import React, { useState } from 'react';
import AddProduct from './AddProduct';
import RemoveProduct from './RemoveProduct';
import Orders from './Orders';
import GiftCardManager from './GiftCardManager';
import UserManager from './UserManager';
import UpdateProduct from './UpdateProduct';

const Admin = () => {
  const [selectedComponent, setSelectedComponent] = useState('AddProduct');

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
    <div className="pt-12 flex items-center justify-center min-h-screen bg-black text-white p-6 lg:p-12">
      <div className="flex w-full max-w-6xl bg-gray-900 rounded-lg shadow-lg overflow-hidden">

        {/* Sidebar */}
        <aside className="w-1/4 bg-gray-800 p-6">
          <h2 className="text-2xl font-retro font-bold text-indigo-600 mb-6 text-center">
            Admin Dashboard
          </h2>
          <nav className="space-y-4">
            {['AddProduct', 'RemoveProduct', 'UpdateProduct', 'Orders', 'GiftCards', 'UserManager'].map((item) => (
              <button
                key={item}
                onClick={() => setSelectedComponent(item)}
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
        <main className="flex-1 p-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-inner h-[900px] overflow-y-auto">
            {renderComponent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
