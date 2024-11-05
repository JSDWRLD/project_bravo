import React, { useState } from 'react';
import AddProduct from './AddProduct';
import RemoveProduct from './RemoveProduct';
import Orders from './Orders';

const Admin = () => {
  const [selectedComponent, setSelectedComponent] = useState('AddProduct');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'AddProduct':
        return <AddProduct />;
      case 'RemoveProduct':
        return <RemoveProduct />;
      case 'Orders':
        return <Orders />;
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
            <button
              onClick={() => setSelectedComponent('AddProduct')}
              className={`w-full p-3 rounded ${
                selectedComponent === 'AddProduct' ? 'bg-indigo-600' : 'bg-gray-700'
              } hover:bg-indigo-500 transition`}
            >
              Add Product
            </button>
            <button
              onClick={() => setSelectedComponent('RemoveProduct')}
              className={`w-full p-3 rounded ${
                selectedComponent === 'RemoveProduct' ? 'bg-indigo-600' : 'bg-gray-700'
              } hover:bg-indigo-500 transition`}
            >
              Remove Product
            </button>
            <button
              onClick={() => setSelectedComponent('Orders')}
              className={`w-full p-3 rounded ${
                selectedComponent === 'Orders' ? 'bg-indigo-600' : 'bg-gray-700'
              } hover:bg-indigo-500 transition`}
            >
              Manage Orders
            </button>
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
