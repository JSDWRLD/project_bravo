import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    listGiftCards,
    createGiftCard,
    deleteGiftCard,
    updateGiftCardBalance,
    clearGiftCardSuccess, // Import the new action
} from '../../redux/Actions/GiftCards';

const GiftCardManager = () => {
    const dispatch = useDispatch();
    const { giftCards = [], loading = false, error = null, success } = useSelector(
        state => state.adminGiftCardListReducer || {}
    );

    const [newGiftCardCode, setNewGiftCardCode] = useState('');
    const [newGiftCardBalance, setNewGiftCardBalance] = useState(0);
    const [balanceAmounts, setBalanceAmounts] = useState({});

    useEffect(() => {
        dispatch(listGiftCards());
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            dispatch(listGiftCards()); // Reload the list after a successful action
            dispatch(clearGiftCardSuccess()); // Clear success state to prevent endless reload
        }
    }, [dispatch, success]);

    const handleCreateGiftCard = () => {
        if (newGiftCardCode && newGiftCardBalance >= 0) {
            dispatch(createGiftCard({ code: newGiftCardCode, balance: newGiftCardBalance }));
            setNewGiftCardCode('');
            setNewGiftCardBalance(0);
        }
    };

    const handleDeleteGiftCard = (id) => {
        if (window.confirm('Are you sure you want to delete this gift card?')) {
            dispatch(deleteGiftCard(id));
        }
    };

    const handleAddBalance = (id) => {
        if (balanceAmounts[id] > 0) {
            dispatch(updateGiftCardBalance(id, balanceAmounts[id]));
            setBalanceAmounts({ ...balanceAmounts, [id]: 0 });
        }
    };

    return (
        <div className="p-6 bg-gray-900 rounded-lg shadow-lg min-h-screen">
            <h2 className="text-2xl font-retro font-semibold text-indigo-600 mb-4 text-center">
                Manage Gift Cards
            </h2>

            {success && <p className="text-green-500 text-center">Action completed successfully!</p>}
            {error && <p className="text-red-500 text-center">Error: {error}</p>}

            {/* Create Gift Card Section */}
            <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-indigo-500 mb-4 text-center">Create New Gift Card</h3>
                <input
                    type="text"
                    placeholder="Gift Card Code"
                    className="w-full p-3 mb-2 bg-gray-700 text-gray-300 border border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    value={newGiftCardCode}
                    onChange={(e) => setNewGiftCardCode(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Initial Balance"
                    className="w-full p-3 mb-4 bg-gray-700 text-gray-300 border border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    value={newGiftCardBalance}
                    onChange={(e) => setNewGiftCardBalance(Number(e.target.value))}
                />
                <button
                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500 transition"
                    onClick={handleCreateGiftCard}
                >
                    Create Gift Card
                </button>
            </div>

            {/* Gift Cards List */}
            {loading ? (
                <p className="text-gray-300 text-center">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {giftCards.length > 0 ? (
                        giftCards.map(giftCard => (
                            <div
                                key={giftCard._id}
                                className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg"
                            >
                                <h3 className="text-lg text-indigo-400 font-semibold mb-2 text-center">
                                    Code: {giftCard.code}
                                </h3>
                                <p className="text-gray-300 mb-2">Balance: ${giftCard.balance.toFixed(2)}</p>

                                <input
                                    type="number"
                                    placeholder="Add Balance"
                                    className="w-full p-2 mb-2 bg-gray-700 text-gray-300 border border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                    value={balanceAmounts[giftCard._id] || ''}
                                    onChange={(e) => setBalanceAmounts({ ...balanceAmounts, [giftCard._id]: Number(e.target.value) })}
                                />
                                <button
                                    className="bg-indigo-600 text-white px-4 py-2 rounded mb-2 hover:bg-green-500 transition"
                                    onClick={() => handleAddBalance(giftCard._id)}
                                >
                                    Add Balance
                                </button>
                                <button
                                    className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-500 transition"
                                    onClick={() => handleDeleteGiftCard(giftCard._id)}
                                >
                                    Delete Gift Card
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center col-span-full">No gift cards available</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default GiftCardManager;
