import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productListAction, updateProduct } from '../../redux/Actions/Product';

const UpdateProduct = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.productListReducer);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(productListAction());
    }, [dispatch]);

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productName', selectedProduct.productName);
        formData.append('productCategory', selectedProduct.productCategory);
        formData.append('productDescription', selectedProduct.productDescription);
        formData.append('productPrice', selectedProduct.productPrice);
        formData.append('stockQuantity', selectedProduct.stockQuantity);

        dispatch(updateProduct(selectedProduct._id, formData)).then(() => setShowModal(false));
    };

    const filteredProducts = Array.isArray(products)
        ? products.filter((product) =>
            product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    return (
        <div className="p-6 bg-gray-900 rounded-lg shadow-lg min-h-screen">
            <h2 className="text-2xl font-retro font-semibold text-indigo-600 mb-4 text-center">
                Update Product
            </h2>
            <input
                type="text"
                placeholder="Search for a product"
                className="w-full p-3 mb-6 bg-gray-800 text-gray-300 border border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {loading ? (
                <p className="text-gray-300 text-center">Loading...</p>
            ) : error ? (
                <p className="text-red-500 text-center">Error: {error}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg"
                        >
                            <img
                                src={product.productImage[0]}
                                alt={product.productName}
                                className="w-32 h-32 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-lg text-indigo-400 font-semibold mb-2 text-center">
                                {product.productName}
                            </h3>
                            <p className="text-gray-300 mb-4">${product.productPrice.toFixed(2)}</p>
                            <button
                                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 transition"
                                onClick={() => handleEdit(product)}
                            >
                                Edit
                            </button>
                        </div>
                    ))}
                    {filteredProducts.length === 0 && (
                        <p className="text-gray-500 text-center col-span-full">No products found</p>
                    )}
                </div>
            )}

            {/* Modal for editing product details */}
            {showModal && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-lg font-semibold text-indigo-600 mb-4">Edit Product</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 mb-1">Product Name</label>
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    value={selectedProduct.productName}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, productName: e.target.value })}
                                    className="w-full p-2 bg-gray-700 text-gray-300 border border-gray-600 rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-1">Price</label>
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={selectedProduct.productPrice}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, productPrice: e.target.value })}
                                    className="w-full p-2 bg-gray-700 text-gray-300 border border-gray-600 rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-1">Stock Quantity</label>
                                <input
                                    type="number"
                                    placeholder="Stock Quantity"
                                    value={selectedProduct.stockQuantity}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, stockQuantity: e.target.value })}
                                    className="w-full p-2 bg-gray-700 text-gray-300 border border-gray-600 rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-1">Description</label>
                                <textarea
                                    placeholder="Description"
                                    value={selectedProduct.productDescription}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, productDescription: e.target.value })}
                                    className="w-full p-2 bg-gray-700 text-gray-300 border border-gray-600 rounded"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-500 transition"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                className="w-full mt-2 bg-red-600 text-white p-2 rounded hover:bg-red-500 transition"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>

            )}
        </div>
    );
};

export default UpdateProduct;
