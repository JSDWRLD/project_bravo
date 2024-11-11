import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaymentOptions = ({ clientID, total, successPaymentHandler, placeOrderHandler, setSelectedPaymentMethod, selectedPaymentMethod, isGiftCardApplied }) => {
    return (
        <div className="lg:w-1/3 md:w-1/2 p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-gray-300 text-lg mb-1 font-medium title-font">Select Payment Method</h2>
            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setSelectedPaymentMethod("gift")}
                    className={`py-2 px-4 rounded ${selectedPaymentMethod === "gift" ? "bg-indigo-600" : "bg-gray-600"} text-white`}>
                    Gift Card
                </button>
                <button
                    onClick={() => setSelectedPaymentMethod("paypal")}
                    className={`py-2 px-4 rounded ${selectedPaymentMethod === "paypal" ? "bg-indigo-600" : "bg-gray-600"} text-white`}>
                    PayPal
                </button>
            </div>

            {selectedPaymentMethod === "gift" ? (
                // Render Gift Card Payment Details
                <div>
                    {/* Gift Card Payment UI */}
                    <button onClick={placeOrderHandler} className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500 transition duration-200">
                        Place Order with Gift Card
                    </button>
                </div>
            ) : (
                clientID && (
                    <PayPalScriptProvider options={{ clientId: clientID }}>
                        <PayPalButtons
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                currency_code: "USD",
                                                value: total,
                                            },
                                        },
                                    ],
                                });
                            }}
                            onApprove={(data, actions) => {
                                return actions.order.capture().then((details) => {
                                    successPaymentHandler(details);
                                });
                            }}
                        />
                    </PayPalScriptProvider>
                )
            )}
        </div>
    );
};

export default PaymentOptions;
