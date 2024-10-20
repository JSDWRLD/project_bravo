import { useState } from 'react';

// Test images, will source from when user clicks on image, reusable component
import smb3_1 from '/src/assets/images/smb3_1.jpg';
import smb3_2 from '/src/assets/images/smb3_2.png';
import smb3_3 from '/src/assets/images/smb3_3.png';
import smb3_4 from '/src/assets/images/smb3_4.png';

const ProductDetailed = () => {
    const images = [smb3_1, smb3_2, smb3_3, smb3_4];

    const [activeImg, setActiveImage] = useState(images[0]);
    const [amount, setAmount] = useState(1);

    return (
        <div className="pt-20 lg:pt-24">
            <div className="bg-black py-4 text-center text-gray-200" />
            <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center bg-black text-white p-8 rounded-lg shadow-lg mt-4">
                <div className="flex flex-col gap-6 lg:w-2/4">
                    <img src={activeImg} alt="Product" className="w-full h-full aspect-square object-cover rounded-xl shadow-md" />
                    <div className="flex flex-row justify-between h-24">
                        {Object.values(images).map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-24 h-24 rounded-md cursor-pointer border-2 border-transparent hover:border-indigo-500 transition"
                                onClick={() => setActiveImage(img)}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4 lg:w-2/4">
                    <div>
                        <span className="text-indigo-400 font-semibold text-xl">Retro Game</span>
                        <h1 className="text-4xl font-bold text-white mt-2">Super Mario Bros 3</h1>
                    </div>
                    <p className="text-gray-400">
                        Super Mario Bros. 3 is a 2D action-adventure platform game for the Family Computer and Nintendo Entertainment System and is the fourth installment in the Super Mario series.
                    </p>
                    <h6 className="text-3xl font-semibold text-indigo-400">$ 49.00</h6>
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
                                className="bg-gray-800 paddin py-2 px-5 rounded-lg text-indigo-400 text-3xl hover:bg-indigo-600 transition"
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
