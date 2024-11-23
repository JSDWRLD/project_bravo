import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { orderDetailAction } from "../redux/Actions/Order";

const Spinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
  </div>
);

const OrderDetailed = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (orderId) {
      dispatch(orderDetailAction(orderId));
    }
  }, [dispatch, orderId]);

  const { order, loading, error } = useSelector(
    (state) => state.orderDetailReducer
  );

  const calculateTotalPrice = (items) => {
    if (!Array.isArray(items)) return 0;
    return items.reduce(
      (total, item) => total + (item.itemPrice || 0) * (item.itemQuantity || 1),
      0
    ).toFixed(2);
  };

  if (loading) return <Spinner />;
  if (error)
    return <p className="text-red-500 text-center">Error: {error}</p>;
  if (!order)
    return <p className="text-yellow-500 text-center">No order details available.</p>;

  const itemsTotal = calculateTotalPrice(order?.orderItems);
  const totalPrice = (
    parseFloat(itemsTotal) +
    (order?.shippingPrice || 0) +
    (order?.taxPrice || 0)
  ).toFixed(2);

  return (
    <div className="pt-20 pb-20 lg:pt-24 min-h-screen bg-gradient-to-br from-gray-950 to-black text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-5xl mx-auto bg-gray-900 p-6 lg:p-8 rounded-lg shadow-lg border border-indigo-600">
          {/* Back Arrow */}
          <button
            onClick={() => navigate("/order-history")}
            className="mb-6 flex items-center text-indigo-400 hover:text-indigo-300 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Order History
          </button>

          <h2 className="text-2xl lg:text-3xl font-retro text-indigo-400 mb-6">
            Order Details
          </h2>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-400">Order ID:</span>
              <span className="font-semibold text-gray-200">{order?._id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-400">Customer Email:</span>
              <span className="font-semibold text-gray-200">{order?.user?.email || "Not available"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-400">Date:</span>
              <span className="font-semibold text-gray-200">
                {order?.createdAt &&
                  new Date(order.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-400">Items Total:</span>
              <span className="font-semibold text-gray-200">
                ${itemsTotal}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-400">Shipping Price:</span>
              <span className="font-semibold text-gray-200">
                ${order?.shippingPrice?.toFixed(2) || "0.00"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-400">Tax Price:</span>
              <span className="font-semibold text-gray-200">
                ${order?.taxPrice?.toFixed(2) || "0.00"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-400">Total Price:</span>
              <span className="font-semibold text-gray-200">${totalPrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-400">Payment Status:</span>
              <span
                className={`font-semibold ${
                  order?.isPaid ? "text-green-400" : "text-red-500"
                }`}
              >
                {order?.isPaid ? "Paid" : "Not Paid"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-400">Delivery Status:</span>
              <span
                className={`font-semibold ${
                  order?.isDelivered ? "text-green-400" : "text-red-500"
                }`}
              >
                {order?.isDelivered ? "Delivered" : "Pending"}
              </span>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-indigo-400 mb-4">
              Shipping Address
            </h3>
            {order?.shippingAddress ? (
              <div className="bg-gray-800 p-4 rounded-md shadow-md">
                <p className="text-gray-200">
                  {order.shippingAddress.address}, {order.shippingAddress.city}
                </p>
                <p className="text-gray-400">
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
              </div>
            ) : (
              <p className="text-gray-400">No shipping address available.</p>
            )}
          </div>

          {/* Order Items */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-indigo-400 mb-4">
              Order Items
            </h3>
            {order?.orderItems?.length > 0 ? (
              <ul className="space-y-4">
                {order.orderItems.map((item) => (
                  <li
                    key={item._id}
                    className="flex items-center justify-between bg-gray-800 p-4 rounded-md shadow-md"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.displayImage}
                        alt={item.itemName}
                        className="w-12 h-12 rounded-md"
                      />
                      <p className="text-gray-200">{item.itemName}</p>
                    </div>
                    <span className="text-gray-400">
                      {item.itemQuantity} x ${item.itemPrice?.toFixed(2)} = $
                      {(item.itemQuantity * item.itemPrice).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No items in this order.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailed;
