import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminOrderListAction, orderDeliveryAction } from '../../redux/Actions/Order';
import { BASE_URL } from '../../redux/Constants/BASE_URL';

const AdminOrders = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(''); // New search term state
  

  useEffect(() => {
    dispatch(adminOrderListAction());
  }, [dispatch]);

  const adminOrderListReducer = useSelector((state) => state.adminOrderListReducer);
  const { orders = [], loading, error } = adminOrderListReducer;

  const handleMarkAsDelivered = (orderId) => {
    dispatch(orderDeliveryAction(orderId));
  };

  // you must also user ${BASE_URL} in the api request

  // Filter orders by ID based on the search term
  const filteredOrders = orders.filter((order) =>
    order._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg min-h-screen">
      <h2 className="text-2xl font-retro font-semibold text-indigo-600 mb-4 text-center">Manage Orders</h2>
      <input
        type="text"
        placeholder="Search for an order by ID"
        className="w-full p-3 mb-6 bg-gray-800 text-gray-300 border border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <p className="text-gray-300 text-center">Loading orders...</p>
      ) : error ? (
        <p className="text-red-500 text-center">Error loading orders: {error}</p>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-indigo-400">Order #{order._id}</h3>
                  <p className="text-gray-300">Customer ID: {order.user || 'N/A'}</p>
                  <p className="text-gray-300">Total: $ {order.totalPrice?.toFixed(2) || '0.00'}</p>
                </div>
                <div className="space-x-2">
                  {!order.isDelivered && (
                    <button
                      onClick={() => handleMarkAsDelivered(order._id)}
                      className="bg-indigo-600 text-white px-3 py-1 text-sm rounded hover:bg-green-500 transition"
                    >
                      Mark as Delivered
                    </button>
                  )}
                </div>
              </div>
              <div className="text-sm mt-2 text-gray-400">
                <p>Status: {order.isPaid ? 'Paid' : 'Unpaid'}</p>
                <p>Delivery: {order.isDelivered ? 'Delivered' : 'Not Delivered'}</p>
              </div>
            </div>
          ))}
          {filteredOrders.length === 0 && (
            <p className="text-gray-500 text-center">No orders found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
