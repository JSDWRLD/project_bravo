import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { orderDetailAction } from "../redux/Actions/Order";
import { sendOrderEmail } from "./OrderEmail"

const Spinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
  </div>
);

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false); // Manage email sent state


  useEffect(() => {
    if (orderId) {
      dispatch(orderDetailAction(orderId));
    }
  }, [dispatch, orderId]);

  const { order, loading, error } = useSelector(
    (state) => state.orderDetailReducer
  );

  useEffect(() => {
    if (!loading && order && !emailSent) {
      const itemsTotal = calculateTotalPrice(order.orderItems);
      const totalPrice = (
        parseFloat(itemsTotal) +
        (order.shippingPrice || 0) +
        (order.taxPrice || 0)
      ).toFixed(2);
  
      const orderDetails = {
        _id: order._id,
        createdAt: order.createdAt,
        user: {
          name: order.user?.name,
          email: order.user?.email,
        },
        shippingAddress: order.shippingAddress,
        orderItems: order.orderItems.map((item) => ({
          itemName: item.itemName,
          itemQuantity: item.itemQuantity,
          itemPrice: item.itemPrice,
          displayImage: item.displayImage,
        })),
        shippingPrice: order.shippingPrice,
        taxPrice: order.taxPrice,
        totalPrice, // Pass calculated totalPrice
      };
  
      sendOrderEmail(orderDetails, order.user?.email);
      setEmailSent(true);
    }
  }, [order, emailSent, loading]); // Removed totalPrice from dependencies
  

  const calculateTotalPrice = (items) => {
    if (!Array.isArray(items)) return 0;
    return items.reduce(
      (total, item) => total + (item.itemPrice || 0) * (item.itemQuantity || 1),
      0
    ).toFixed(2);
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;
  if (!order) return <p className="text-yellow-500 text-center">No order details available.</p>;


  const itemsTotal = calculateTotalPrice(order?.orderItems);
  const totalPrice = (
    parseFloat(itemsTotal) +
    (order?.shippingPrice || 0) +
    (order?.taxPrice || 0)
  ).toFixed(2);

  // Prepare orderDetails 
  const orderDetails = {
    _id: order?._id,
    createdAt: order?.createdAt,
    user: {
      name: order?.user?.name,
      email: order?.user?.email,
    },
    shippingAddress: order?.shippingAddress,
    orderItems: order?.orderItems.map((item) => ({
      itemName: item.itemName,
      itemQuantity: item.itemQuantity,
      itemPrice: item.itemPrice,
      displayImage: item.displayImage,
    })),
    shippingPrice: order?.shippingPrice,
    taxPrice: order?.taxPrice,
    totalPrice,
  };

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-gradient-to-br from-gray-950 to-black text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto bg-gray-900 p-6 lg:p-8 rounded-lg shadow-lg border border-indigo-600">
          <h2 className="text-2xl lg:text-3xl font-bold text-indigo-400 mb-6">
            Thank You for Your Order!
          </h2>
          <p className="text-gray-300 mb-8">
            Your order has been successfully placed. A confirmation email has
            been sent to{" "}
            <span className="text-indigo-400 font-semibold">
              {order?.user?.email || "your email address"}.
            </span>
          </p>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-400">Order ID:</span>
              <span className="font-semibold text-gray-200">{order?._id}</span>
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

          {/* Continue Shopping Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-indigo-500 text-white rounded-md font-semibold hover:bg-indigo-400 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
