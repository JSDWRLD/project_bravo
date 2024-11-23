import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import CartItems from "../../components/CartItems";
import { saveShippingAddressAction, resetShippingAddressAction } from "../../redux/Actions/Cart";
import { useGiftCard, checkGiftCardBalance, resetGiftCardBalance } from "../../redux/Actions/GiftCards";
import { orderAction, orderPaymentAction, orderGiftCardPaymentAction } from "../../redux/Actions/Order";
import { updateStockAction } from "../../redux/Actions/Product";
import { ORDER_RESET } from "../../redux/Constants/Order";
import { BASE_URL } from "../../redux/Constants/BASE_URL";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";



let giftCardUsageAmount = 0;

const PlaceOrder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cartReducer);
    const { cartItems, shippingAddress } = cart;

    const [isShippingAddressSaved, setIsShippingAddressSaved] = useState(false);
    const [isPaymentOptionSelected, setIsPaymentOptionSelected] = useState(false);

    const [giftCardCode, setGiftCardCode] = useState('');
    const [giftCardBalance, setGiftCardBalance] = useState(null);
    const [isGiftCardApplied, setIsGiftCardApplied] = useState(false);

    useEffect(() => {
        dispatch(resetGiftCardBalance());
    }, [dispatch]);

    // Get gift card info from Redux
    const giftCardReducer = useSelector((state) => state.giftCardCheckReducer);
    const { balance } = giftCardReducer;
    // Check gift card balance
    const checkGiftCardBalanceHandler = () => {
        if (giftCardCode) {
            dispatch(checkGiftCardBalance(giftCardCode));
        }
    };
    // Subtotal calculation
    const addDecimal = (num) => {
        return parseFloat(num.toFixed(2));  // Ensures two decimal places and avoids string representation errors
    };

    const subtotal = addDecimal(
        cartItems.reduce((total, item) => total + addDecimal(item.qty * item.price), 0)
    );

    // Actual Total
    const taxPrice = addDecimal(0.15 * subtotal);
    const shippingPrice = addDecimal(cartItems.length === 0 ? 0 : subtotal > 100 ? 0 : 7.99);
    const total = addDecimal(Number(subtotal) + Number(taxPrice) + Number(shippingPrice));


    // Apply gift card
    const applyGiftCardHandler = () => {
        if (balance && !isGiftCardApplied) {
            giftCardUsageAmount = Math.min(balance, total);
            setGiftCardBalance(giftCardUsageAmount); // Store the used amount
            setIsGiftCardApplied(true);
        }
    };

    const adjustedTotalDisplay = isGiftCardApplied
        ? addDecimal(total - addDecimal(giftCardBalance))
        : addDecimal(total);

    // Shipping address form data
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("paypal");

    const saveShippingAddress = () => {
        if (!address || !city || !postalCode || !country) {
            alert("Please fill out all the fields to continue.");
            return; // Stop the function if any field is empty
        }

        dispatch(
            saveShippingAddressAction({
                address,
                city,
                postalCode,
                country,
            })
        );
        setIsShippingAddressSaved(true);
    };

    const [clientID, setClientID] = useState(null);

    const orderReducer = useSelector((state) => state.orderReducer);
    const { order, success } = orderReducer;
    const [paymentResult, setPaymentResult] = useState({});

    useEffect(() => {
        getPaypalClientID();
    }, []); // Fetch PayPal client ID only once

    useEffect(() => {
        if (success) {
            // Order reset
            dispatch({ type: ORDER_RESET });

            if (selectedPaymentMethod === "paypal") {
                dispatch(orderPaymentAction(order._id, paymentResult));
                navigate(`/order-confirmation/${order._id}`, {});
            } else if (selectedPaymentMethod === "gift" && giftCardCode) {
                // Apply gift card payment first
                dispatch(orderGiftCardPaymentAction(order._id, giftCardCode));
                dispatch(useGiftCard(giftCardCode, giftCardUsageAmount));
                navigate(`/order-confirmation/${order._id}`, {});
            }

            dispatch(resetShippingAddressAction());
        }
    }, [success, paymentResult, navigate, dispatch, selectedPaymentMethod, giftCardCode, total, giftCardBalance]);

    const getPaypalClientID = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/config/paypal`);
            setClientID(response.data); // Set the client ID in state
        } catch (error) {
            console.error("Error fetching PayPal Client ID:", error);
        }
    };

    const successPaymentHandler = (details) => {
        try {
            setPaymentResult(details);

            dispatch(orderAction({
                orderItems: cart.cartItems.map(item => ({
                    itemName: item.name,
                    itemQuantity: item.qty,
                    displayImage: item.image,
                    itemPrice: item.price,
                    product: item.product
                })),
                shippingAddress: cart.shippingAddress,
                totalPrice: total,
                paymentMethod: selectedPaymentMethod,
                price: subtotal,
                taxPrice: taxPrice,
                shippingPrice: shippingPrice
            }));
        } catch (err) {
            console.log("Error in successPaymentHandler:", err);
        }
    };

    // Gift cards
    const placeOrderHandler = () => {
        try {
            // Precompute total prices
            const orderItems = cartItems.map(item => ({
                itemName: item.name,
                itemQuantity: item.qty,
                displayImage: item.image,
                itemPrice: item.price,
                product: item.product
            }));

            const orderData = {
                orderItems,
                shippingAddress,
                totalPrice: total, // Precomputed total
                paymentMethod: selectedPaymentMethod,
                price: subtotal,
                taxPrice: taxPrice,
                shippingPrice: shippingPrice
            };

            dispatch(orderAction(orderData)); // Pass all data in one action

            // Update stock after order placement
            cartItems.forEach(item => {
                const updatedStock = item.countInStock - item.qty;
                dispatch(updateStockAction(item.product, updatedStock));
            });

        } catch (err) {
            console.error("Error in placeOrderHandler:", err);
        }
    };


    return (
        <>
            <section className="text-gray-300 body-font overflow-hidden bg-black">
                <div className="container px-6 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            <h2 className="text-sm title-font text-gray-400 tracking-widest">Order Summary</h2>
                            <p className="leading-relaxed mb-4">
                                <CartItems cartItems={cartItems} />
                            </p>
                            <div className="flex border-t border-gray-700 py-2">
                                <span className="text-gray-300">Subtotal</span>
                                <span className="ml-auto text-gray-300">$ {subtotal}</span>
                            </div>
                            <div className="flex border-t border-gray-700 py-2">
                                <span className="text-gray-300">Tax</span>
                                <span className="ml-auto text-gray-300">$ {taxPrice}</span>
                            </div>
                            <div className="flex border-t border-b mb-6 border-gray-700 py-2">
                                <span className="text-gray-300">Shipping Price</span>
                                <span className="ml-auto text-gray-300">$ {shippingPrice}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="title-font font-medium text-2xl text-indigo-500">$ {adjustedTotalDisplay}</span>
                            </div>
                        </div>
                        <div className="lg:w-1/3 md:w-1/2 p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 bg-gray-800 rounded-lg shadow-lg">
                            {!isShippingAddressSaved ? (
                                <>
                                    <h2 className="text-gray-300 text-lg mb-1 font-medium title-font">Shipping Address</h2>

                                    <div className="relative mb-4">
                                        <label htmlFor="address" className="leading-7 text-sm text-gray-400">Address</label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="w-full bg-gray-700 rounded border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-base outline-none text-gray-300 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                    </div>

                                    <div className="relative mb-4">
                                        <label htmlFor="city" className="leading-7 text-sm text-gray-400">City</label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            className="w-full bg-gray-700 rounded border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-base outline-none text-gray-300 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                    </div>

                                    <div className="relative mb-4">
                                        <label htmlFor="postalcode" className="leading-7 text-sm text-gray-400">Postal Code</label>
                                        <input
                                            type="text"
                                            id="postalcode"
                                            name="postalcode"
                                            value={postalCode}
                                            onChange={(e) => setPostalCode(e.target.value)}
                                            className="w-full bg-gray-700 rounded border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-base outline-none text-gray-300 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                    </div>

                                    <div className="relative mb-4">
                                        <label htmlFor="country" className="leading-7 text-sm text-gray-400">Country</label>
                                        <input
                                            type="text"
                                            id="country"
                                            name="country"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            className="w-full bg-gray-700 rounded border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-base outline-none text-gray-300 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                    </div>

                                    <button
                                        onClick={saveShippingAddress}
                                        className="mb-10 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500 transition duration-200"
                                    >
                                        Continue to Payment
                                    </button>
                                </>
                            ) : (
                                <>
                                    {/* Payment Method Selection */}
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
                                        <div>
                                            <h2 className="text-gray-300 text-lg mt-2 mb-2 font-medium title-font">Enter Gift Card Details</h2>

                                            <input
                                                type="text"
                                                value={giftCardCode}
                                                onChange={(e) => setGiftCardCode(e.target.value)}
                                                placeholder="Gift Card Code"
                                                className="mb-2 w-full bg-gray-700 text-gray-300 py-4 px-4 rounded border border-gray-600"
                                            />

                                            <div className="flex space-x-2 mb-4">
                                                <button
                                                    onClick={checkGiftCardBalanceHandler}
                                                    className="bg-gray-600 text-white py-2 px-4 rounded"
                                                >
                                                    Check Balance
                                                </button>

                                                <button
                                                    onClick={applyGiftCardHandler}
                                                    className="bg-indigo-600 text-white py-2 px-4 rounded"
                                                    disabled={!balance || isGiftCardApplied}
                                                >
                                                    Apply Gift Card
                                                </button>
                                            </div>

                                            <div className="mt-2 text-gray-300">
                                                Gift Card Balance: ${balance ? balance.toFixed(2) : "0.00"}
                                            </div>

                                            {isGiftCardApplied && (
                                                <div className="mt-2 text-gray-300">
                                                    Applied Gift Card Balance: ${giftCardBalance?.toFixed(2)}
                                                </div>
                                            )}

                                            {isGiftCardApplied && adjustedTotalDisplay > 0 ? (
                                                <p className="text-gray-400 mb-4">
                                                    Remaining balance (${adjustedTotalDisplay.toFixed(2)}) must be paid with PayPal.
                                                </p>
                                            ) : null}


                                            {isGiftCardApplied && adjustedTotalDisplay > 0 ? (
                                                <div className="mt-6">
                                                    <p className="text-gray-400 mb-4">
                                                        Remaining balance (${adjustedTotalDisplay}) must be paid with PayPal.
                                                    </p>
                                                    {clientID && (
                                                        <PayPalScriptProvider options={{ clientId: clientID }}>
                                                            <PayPalButtons
                                                                createOrder={(data, actions) => {
                                                                    return actions.order.create({
                                                                        purchase_units: [
                                                                            {
                                                                                amount: {
                                                                                    currency_code: "USD",
                                                                                    value: adjustedTotalDisplay,
                                                                                },
                                                                            },
                                                                        ],
                                                                    });
                                                                }}
                                                                onApprove={(data, actions) => {
                                                                    return actions.order.capture().then(function (details) {
                                                                        successPaymentHandler(details);
                                                                    });
                                                                }}
                                                            />
                                                        </PayPalScriptProvider>
                                                    )}
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={placeOrderHandler}
                                                    className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500 transition duration-200"
                                                    disabled={!isGiftCardApplied}
                                                >
                                                    Place Order
                                                </button>
                                            )}
                                        </div>
                                    ) : clientID && (
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
                                                    return actions.order.capture().then(function (details) {
                                                        successPaymentHandler(details);
                                                    });
                                                }}
                                            />
                                        </PayPalScriptProvider>
                                    )}


                                    <button
                                        onClick={() => setIsShippingAddressSaved(false)}
                                        className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-gray-500 transition duration-200"
                                    >
                                        Back to Shipping Address
                                    </button>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

export default PlaceOrder;
