import { useDispatch } from 'react-redux'
import { addToCartAction, removeFromCartAction } from '../redux/Actions/Cart';

const CartItems = ({ cartItems }) => {
    const dispatch = useDispatch();

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCartAction(id));
      }
    
      const addToCartHandler = (id, qty) => {
        dispatch(addToCartAction(id, qty))
      }

    return (
        <>
            <div className="mt-8">
                <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-700">
                        {cartItems.map((product) => (
                            <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-700">
                                    <img
                                        alt={product.imageAlt}
                                        src={product.image}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-300">
                                            <h3>
                                                <a href={product.href} className="hover:text-indigo-400">{product.name}</a>
                                            </h3>
                                            <p className="ml-4">$ {product.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">

                                        <p className="text-gray-500">
                                            Qty
                                            <select
                                                value={product.qty}
                                                className='ml-3 px-3 py-1.5 rounded-lg border border-indigo-300 bg-gray-800 text-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-colors duration-200 ease-in-out'
                                                onChange={(e) =>
                                                    addToCartHandler(product.product, Number(e.target.value))
                                                }
                                            >
                                                {[
                                                    ...Array(product.countInStock).keys(),
                                                ].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </p>

                                        <div className="flex">
                                            <button onClick={() => removeFromCartHandler(product.product)} type="button" className="font-medium text-indigo-400 hover:text-indigo-300">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default CartItems