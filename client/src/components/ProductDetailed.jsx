import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const ProductDetailed = () => {
    const { id } = useParams();
    const [activeImg, setActiveImage] = useState('');
    const [amount, setAmount] = useState(1);

    const productList = useSelector((state) => state.productListReducer.products);
    const product = productList.find((p) => p._id === id);

    useEffect(() => {
        if (product) {
            setActiveImage(product.productImage[0]);
        }
    }, [product]);

    if (!product) return <p className="text-center text-white">Loading product...</p>;

    const renderStars = () => {
        const stars = [];
        const rating = Math.round(product.productRating * 2) / 2; // Round to nearest half

        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-yellow-400 text-xl" />);
            } else if (i - 0.5 === rating) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 text-xl" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-gray-500 text-xl" />);
            }
        }
        return stars;
    };

    return (
        <div className="pt-20 lg:pt-24">
            <div className="bg-black py-4 text-center" />
            <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center bg-black text-white p-8 rounded-lg shadow-lg mt-4">
                <div className="flex flex-col gap-6 lg:w-2/4">
                    <div className="relative rounded-xl overflow-hidden shadow-lg border-4 border-indigo-600">
                        <img src={activeImg} alt="Product" className="w-full h-full aspect-square object-cover" />
                    </div>
                    <div className="flex flex-row justify-between h-24">
                        {product.productImage.map((img, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-24 h-24 rounded-md cursor-pointer transition-transform transform hover:scale-105"
                                    onClick={() => {
                                        console.log('Thumbnail clicked:', img); // Check if the correct image is logged
                                        setActiveImage(img); // Update active image
                                    }}
                                />
                                <div className="absolute inset-0 border-2 border-indigo-500 rounded-md pointer-events-none"></div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4 lg:w-2/4">
                    <div>
                        <span className="text-indigo-400 font-retro text-l capitalize">{product.productCategory.replace(/-/g, ' ')}</span>
                        <h1 className="text-4xl font-bold text-white mt-2">{product.productName}</h1>
                    </div>
                    <p className="text-gray-400 mb-4">{product.productDescription}</p>
                    <h6 className="text-3xl font-semibold text-indigo-400">${product.productPrice.toFixed(2)}</h6>
                    <p className="text-gray-400">In stock: {product.stockQuantity}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex">{renderStars()}</div>
                        <span className="text-gray-400 ml-2">({product.reviewCount} reviews)</span>
                    </div>
                    <div className="flex flex-row items-center gap-12 mt-4">
                        <div className="flex flex-row items-center space-x-2">
                            <button
                                className="bg-gray-800 py-2 px-5 rounded-lg text-indigo-400 text-3xl hover:bg-indigo-600 transition"
                                onClick={() => setAmount((prev) => Math.max(1, prev - 1))}
                            >
                                -
                            </button>
                            <span className="py-4 px-6 rounded-lg bg-gray-800 text-xl font-bold text-white">{amount}</span>
                            <button
                                className="bg-gray-800 py-2 px-5 rounded-lg text-indigo-400 text-3xl hover:bg-indigo-600 transition"
                                onClick={() => setAmount((prev) => prev + 1)}
                            >
                                +
                            </button>
                        </div>
                        <button className="bg-indigo-600 text-black font-semibold py-3 px-16 rounded-xl hover:bg-indigo-500 transition">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailed;
