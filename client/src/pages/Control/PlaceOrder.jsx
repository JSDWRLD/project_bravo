import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import CartItems from "../../components/CartItems";
import { saveShippingAddressAction, resetShippingAddressAction } from "../../redux/Actions/Cart";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { orderAction, orderPaymentAction } from "../../redux/Actions/Order";
import { ORDER_RESET } from "../../redux/Constants/Order";
import { BASE_URL } from "../../redux/Constants/BASE_URL";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cartReducer);
    const { cartItems, shippingAddress } = cart;

    

    // Subtotal calculation
    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };
    const subtotal = addDecimal(
        cartItems.reduce((total, item) => total + item.qty * item.price, 0)
    );

    // Actual Total
    const taxPrice = addDecimal(Number(0.15 * subtotal).toFixed(2));
    const shippingPrice = addDecimal(subtotal > 100 ? 0 : 7.99);
    const total = (
        Number(subtotal) +
        Number(taxPrice) +
        Number(shippingPrice)
    ).toFixed(2);

    // Shipping address form data
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const saveShippingAddress = () => {
        dispatch(
            saveShippingAddressAction({
                address,
                city,
                postalCode,
                country,
            })
        );
    };

    const [clientID, setClientID] = useState(null);

    const orderReducer = useSelector((state) => state.orderReducer);
    const { order, success } = orderReducer;
    const [paymentResult, setPaymentResult] = useState({});

    // Fetch paypal cient id
    useEffect(() => {
        getPaypalClientID();
        if (success) {
            dispatch({ type: ORDER_RESET });
            dispatch(orderPaymentAction(order._id, paymentResult));
            navigate(`/order/${order._id}`, {});
        }
    });

    const getPaypalClientID = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/config/paypal`);
            const fetchedClientID = response.data;
            setClientID(fetchedClientID); // Set the client ID in state
        } catch (error) {
            console.error("Error fetching PayPal Client ID:", error);
        }
    };

    // On paypal success we can post the order
    const successPaymentHandler = async () => {
        try {
            setPaymentResult(paymentResult)
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
                paymentMethod: 'paypal',
                price: subtotal,
                taxPrice: taxPrice,
                shippingPrice: shippingPrice

            }))
        } catch (err) {
            console.log(err);
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
                                <span className="title-font font-medium text-2xl text-indigo-500">$ {total}</span>
                            </div>
                        </div>
                        <div className="lg:w-1/3 md:w-1/2 p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 bg-gray-800 rounded-lg shadow-lg">
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
                                Save Shipping Address
                            </button>

                            {clientID && (
                                <PayPalScriptProvider options={{ clientId: clientID }}>
                                    <PayPalButtons
                                        // Create our order from our cart items
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            currency_code: "USD",
                                                            value: total
                                                        },
                                                    }
                                                ]
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
                    </div>
                </div>
            </section>
        </>
    );
}

export default PlaceOrder;
