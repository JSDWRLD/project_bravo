import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProductListPage = ({ category }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // Replace with mongo db call later on, just template for now
    const products = [
        { id: 1, name: 'Chess Set', price: 29.99, category: 'board games', img: '/src/assets/games/chess.jpg' },
        { id: 2, name: 'Jigsaw Puzzle', price: 15.99, category: 'puzzles', img: '/src/assets/games/puzzle.jpg' },
        { id: 3, name: 'Super Mario Bros 3', price: 49.99, category: 'retro games', img: '/src/assets/games/smb3_1.jpg' },
        
    ];

    const filteredProducts = products.filter((product) =>
        product.category === category &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleViewDetails = (productId) => {
        navigate(`/shop/${category}/product/${productId}`);
    };

    return (
        <div className="pt-20 lg:pt-24 bg-black min-h-screen text-white">
            <div className="bg-gray-800 py-4 text-center text-gray-200">
                <h1 className="text-4xl font-bold text-indigo-400 capitalize">{category}</h1>
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
                                key={product.id} 
                                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer"
                                onClick={() => handleViewDetails(product.id)}
                            >
                                <img src={product.img} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
                                <h2 className="text-2xl font-semibold text-indigo-400 mb-2">{product.name}</h2>
                                <p className="text-gray-300 mb-4">${product.price.toFixed(2)}</p>
                                <button 
                                    className="bg-indigo-600 text-black py-2 px-4 rounded-lg hover:bg-indigo-500 transition"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevents parent click handler
                                        handleViewDetails(product.id);
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
