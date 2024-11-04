import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productListAction, deleteProduct } from '../../redux/Actions/Product';

const RemoveProduct = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.productListReducer);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(productId));
    }
  };

  const filteredProducts = Array.isArray(products)
    ? products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg min-h-screen">
      <h2 className="text-2xl font-retro font-semibold text-indigo-600 mb-4 text-center">
        Remove Product
      </h2>
      <input
        type="text"
        placeholder="Search for a product"
        className="w-full p-3 mb-6 bg-gray-800 text-gray-300 border border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <p className="text-gray-300 text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg"
            >
              <img
                src={product.productImage[0]}
                alt={product.productName}
                className="w-32 h-32 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg text-indigo-400 font-semibold mb-2 text-center">
                {product.productName}
              </h3>
              <p className="text-gray-300 mb-4">${product.productPrice.toFixed(2)}</p>
              <button
                className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-500 transition"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <p className="text-gray-500 text-center col-span-full">No products found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RemoveProduct;
