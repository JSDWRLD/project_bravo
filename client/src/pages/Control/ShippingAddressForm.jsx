import { useState } from "react";

const ShippingAddressForm = ({ address, setAddress, city, setCity, postalCode, setPostalCode, country, setCountry, saveShippingAddress, shippingAddress }) => {
    return (
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
                className={`mb-10 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500 transition duration-200 ${!address || !city || !postalCode || !country ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!address || !city || !postalCode || !country}
            >
                {shippingAddress ? "Continue to Payment" : "Save Shipping Address"}
            </button>
        </div>
    );
};

export default ShippingAddressForm;
