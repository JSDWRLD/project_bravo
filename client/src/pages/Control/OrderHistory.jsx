import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { orderListAction } from "../../redux/Actions/Order";
import moment from 'moment';

const Spinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
  </div>
);

const OrderHistory = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderListAction());
  }, [dispatch]);

  const orderListReducer = useSelector((state) => state.orderListReducer);
  const { orders, loading, error } = orderListReducer;

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <>
      <div className="bg-gradient-to-br from-gray-950 to-black py-12"></div>
      <section className="bg-black min-h-screen text-white antialiased md:py-16">
        <div className="container mx-auto px-4 2xl:px-0">
          <div className="max-w-5xl mx-auto">
            <div className="py-4 text-center border-b-2 border-indigo-600 transform hover:-translate-y-1 hover:shadow-xl transition duration-300 ease-in-out bg-gray-900 rounded-md mx-4">
              <h2 className="text-2xl font-retro font-bold text-indigo-600">My Orders</h2>
            </div>

            <div className="mt-6 flow-root sm:mt-8">
              <div className="divide-y divide-gray-700">
                {orders && (
                  orders.map((order) => (
                    <div key={order._id} className="flex flex-wrap items-center gap-y-4 py-6">
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-400">Order ID:</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-200">
                          <a href="#" className="hover:underline">#{order._id}</a>
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1 ml-10">
                        <dt className="text-base font-medium text-gray-400">Date:</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-200">
                          {moment(order.createdAt).format("MMM Do YY")}
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1 ml-10">
                        <dt className="text-base font-medium text-gray-400">Price:</dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-200">$ {order.totalPrice}</dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1 ml-10">
                        <dt className="text-base font-medium text-gray-400">Status:</dt>
                        <dd className={`me-2 mt-1.5 inline-flex items-center rounded ${order.isPaid ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"} px-2.5 py-0.5 text-xs font-medium`}>
                          <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                          </svg>
                          {order.isPaid ? `Paid` : `Not Paid`}
                        </dd>
                      </dl>

                      <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                        <Link
                          to={`/order/${order._id}`}
                          className="w-full inline-flex justify-center rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-700"
                        >
                          View details
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

export default OrderHistory;
