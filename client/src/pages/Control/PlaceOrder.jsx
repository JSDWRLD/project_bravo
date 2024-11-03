import { useSelector } from "react-redux";
import CartItems from "../../components/CartItems";


const PlaceOrder = () => {

    const cart = useSelector((state) => state.cartReducer);
    const { cartItems } = cart;

    // Subtotal
    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    }
    const subtotal = addDecimal(
        cartItems.reduce((total, item) => total + item.qty * item.price, 0)
    );

    // Actual Total
    const taxPrice = addDecimal(Number(0.15 * subtotal).toFixed(2));
    const shippingPrice = addDecimal(subtotal > 100 ? 0 : 20);
    const total = (
        Number(subtotal) +
        Number(taxPrice) +
        Number(shippingPrice)
    ).toFixed(2);

    return (
        <>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            <h2 className="text-sm title-font text-gray-300 tracking-widest">Order Summary</h2>

                            <p className="leading-relaxed mb-4">
                                <CartItems cartItems={cartItems} />
                            </p>
                            <div className="flex border-t border-gray-200 py-2">
                                <span className="text-gray-300">Subtotal</span>
                                <span className="ml-auto text-gray-300">$ {subtotal}</span>
                            </div>
                            <div className="flex border-t border-gray-200 py-2">
                                <span className="text-gray-300">Tax</span>
                                <span className="ml-auto text-gray-300">$ {taxPrice}</span>
                            </div>
                            <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                                <span className="text-gray-300">Shipping Price</span>
                                <span className="ml-auto text-gray-300">
                                    $ {shippingPrice}
                                </span>
                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-400">
                                    $ {total}
                                </span>
                            </div>
                        </div>


                        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default PlaceOrder;