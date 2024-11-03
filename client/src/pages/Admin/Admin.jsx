import React from 'react';
import AddProduct from './AddProduct';

const Admin = () => {
  return (
    <div className="pt-20 lg:pt-24 bg-black min-h-screen text-white flex flex-col items-center">
      <div className="p-6 text-center">
        <h1 className="text-2xl font-retro font-bold text-indigo-600 mb-6">Admin Dashboard</h1> {/* Increased margin-bottom */}
        <div className="py-4 text-center border-b-2 border-indigo-600 transform hover:-translate-y-1 hover:shadow-xl transition duration-300 ease-in-out bg-gray-900 rounded-md mx-4">
          <AddProduct />
        </div>
      </div>
    </div>
  );
};

export default Admin;
