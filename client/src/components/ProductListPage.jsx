import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productListAction } from '../redux/Actions/Product';
import { useNavigate } from 'react-router-dom';

const ProductListPage = ({ category }) => {
    const dispatch = useDispatch();
    const productListReducer = useSelector((state) => state.productListReducer);
    const { loading, error, products } = productListReducer;

    useEffect(() => {
        dispatch(productListAction());
    }, [dispatch]);

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // Filter products based on category and search term
    const filteredProducts = Array.isArray(products)
        ? products.filter(
            (product) =>
                product.productCategory === category && // Use productCategory here
                product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const handleViewDetails = (productId) => {
        navigate(`/shop/${category}/product/${productId}`);
    };

    if (loading) return <p>Loading...</p>; // Optional loading state
    if (error) return <p>Error: {error}</p>; // Optional error handling

    return (
        <div className="pt-20 lg:pt-24 bg-black min-h-screen text-white">
            <div className="bg-gray-800 py-4 text-center text-gray-200">
                <h1 className="text-2xl font-retro font-bold text-indigo-400 capitalize">{category}</h1>
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
                                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer"
                                onClick={() => handleViewDetails(product._id)}
                            >
                                <img src={product.productImage[0]} alt={product.productName} className="w-full h-48 object-cover rounded-md mb-4" />
                                <h2 className="text-2xl font-semibold text-indigo-400 mb-2">{product.productName}</h2>
                                <p className="text-gray-300 mb-4">${product.productPrice.toFixed(2)}</p>
                                <button 
                                    className="bg-indigo-600 text-black py-2 px-4 rounded-lg hover:bg-indigo-500 transition"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevents parent click handler
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
