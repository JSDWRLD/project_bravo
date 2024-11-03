import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = ({ order }) => {
    const navigate = useNavigate();

    return (
        <section className="bg-white py-8 dark:bg-gray-900 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                        Order Summary
                    </h2>

                    <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Billing & Delivery Information
                        </h4>

                        <dl>
                            <dt className="text-base font-medium text-gray-900 dark:text-white">
                                Individual
                            </dt>
                            <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                                {order.customerName} - {order.phone}, {order.address.city}, {order.address.country}, {order.address.postalCode}
                            </dd>
                        </dl>
                    </div>

                    <div className="gap-4 mt-6 sm:flex sm:items-center">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="w-full rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Return to Shopping
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate(`/order/${order.id}`)}
                            className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none dark:bg-primary-600 dark:hover:bg-primary-700 sm:mt-0"
                        >
                            View Order Details
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderSuccess;
