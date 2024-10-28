import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productListAction } from '../redux/Actions/Product';
import { useNavigate } from 'react-router-dom';

const Spinner = () => (
    <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
    </div>
);

const ProductListPage = ({ category }) => {
    const dispatch = useDispatch();
    const productListReducer = useSelector((state) => state.productListReducer);
    const { loading, error, products } = productListReducer;

    useEffect(() => {
        dispatch(productListAction());
    }, [dispatch]);

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = Array.isArray(products)
        ? products.filter(
            (product) =>
                product.productCategory === category &&
                product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const handleViewDetails = (productId) => {
        navigate(`/shop/${category}/product/${productId}`);
    };

    if (loading) return <Spinner />;
    if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

    return (
        <div className="pt-20 lg:pt-24 bg-black min-h-screen text-white">
            <div className="py-4 text-center border-b-2 border-indigo-600 transform hover:-translate-y-1 hover:shadow-xl transition duration-300 ease-in-out bg-gray-900 rounded-md mx-4">
                <h1 className="text-2xl font-retro font-bold text-indigo-600 capitalize">{category.replace(/-/g, ' ')}</h1>
            </div>





            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center mb-8">
                    <input
                        type="text"
                        placeholder={`Search ${category}`}
                        className="w-full max-w-md p-3 rounded-lg bg-gray-800 text-gray-300 placeholder-gray-500 border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                                onClick={() => handleViewDetails(product._id)}
                            >
                                <img src={product.productImage[0]} alt={product.productName} className="w-full h-48 object-cover rounded-md mb-4" />
                                <h2 className="text-2xl font-semibold text-indigo-400 mb-2">{product.productName}</h2>
                                <p className="text-gray-300 mb-4">${product.productPrice.toFixed(2)}</p>
                                <button
                                    className="bg-indigo-600 text-black py-2 px-4 rounded-lg hover:bg-indigo-500 transition"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleViewDetails(product._id);
                                    }}
                                >
                                    View Details
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center col-span-full">No products found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductListPage;
