import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/Actions/Product'; 

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [productRating, setProductRating] = useState(''); // New state for product rating
  const [reviewCount, setReviewCount] = useState(''); // New state for review count
  const [images, setImages] = useState([]);
  
  const dispatch = useDispatch();
  
  // Selector to get the product creation state
  const productAdd = useSelector((state) => state.productListReducer);
  const { loading, error } = productAdd;

  const onDrop = (acceptedFiles) => {
    const newImages = [...images, ...acceptedFiles].slice(0, 4); // Limit to 4 images
    setImages(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });
    formData.append('productName', productName);
    formData.append('productCategory', productCategory);
    formData.append('productDescription', productDescription);
    formData.append('productPrice', productPrice);
    formData.append('stockQuantity', stockQuantity);
    formData.append('productRating', productRating); // Include product rating
    formData.append('reviewCount', reviewCount); // Include review count

    // Log FormData entries for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  
    // Dispatch addProduct action
    dispatch(addProduct(formData));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 4,
  });

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-retro font-semibold text-indigo-600 mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-2 bg-gray-800 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          required
        />
        <select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          className="w-full p-2 bg-gray-800 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          required
        >
          <option value="">Select Category</option>
          <option value="retro-games">Retro Games</option>
          <option value="board-games">Board Games</option>
          <option value="puzzles">Puzzles</option>
          <option value="consoles">Consoles</option>
        </select>
        <textarea
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="w-full p-2 bg-gray-800 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          required
        ></textarea>
        <input
          type="number"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          className="w-full p-2 bg-gray-800 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          required
          min="0" // Minimum value to ensure a positive price
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
          className="w-full p-2 bg-gray-800 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          required
          min="0" // Minimum value to ensure non-negative stock quantity
        />
        <input
          type="number"
          placeholder="Product Rating (e.g., 4.5)"
          value={productRating}
          onChange={(e) => setProductRating(e.target.value)}
          className="w-full p-2 bg-gray-800 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          required
          min="0" // Minimum value to ensure a non-negative rating
          max="5" // Maximum value for rating
          step="0.1" // Allow decimal values for rating
        />
        <input
          type="number"
          placeholder="Review Count"
          value={reviewCount}
          onChange={(e) => setReviewCount(e.target.value)}
          className="w-full p-2 bg-gray-800 text-gray-300 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          required
          min="0" // Minimum value to ensure non-negative review count
        />

        <div {...getRootProps()} className="border-2 border-dashed border-gray-600 p-4 rounded cursor-pointer bg-gray-800">
          <input {...getInputProps()} />
          <p className="mb-2 text-center text-gray-300">Drag & drop images here (max 4 images)</p>
          <p className="text-center text-gray-500">or click to select files</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`preview ${index}`}
                className="w-full h-24 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-500 transition"
          disabled={loading} // Disable the button while loading
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>

        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
};

export default AddProduct;
