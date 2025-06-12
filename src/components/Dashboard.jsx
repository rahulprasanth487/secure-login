import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Dashboard_Header from './Dashboard_Header';

export default function Dashboard() {
    const { username } = useParams();

    const [showBalance, setShowBalance] = useState(false);
    const [showCreditCard, setShowCreditCard] = useState(false);
    const [showLoan, setShowLoan] = useState(false);

    const [modalType, setModalType] = useState(null); // "balance", "credit", "loan"
    const [passwordInput, setPasswordInput] = useState("");
    const [modalError, setModalError] = useState("");

    const correctPassword = "1234"; // replace with secure check or backend logic

    const handleVerify = () => {
        if (passwordInput === correctPassword) {
            if (modalType === "balance") setShowBalance(true);
            else if (modalType === "credit") setShowCreditCard(true);
            else if (modalType === "loan") setShowLoan(true);
            setModalType(null);
            setPasswordInput("");
            setModalError("");
        } else {
            setModalError("Incorrect password.");
        }
    };

    const openModal = (type) => {
        setModalType(type);
        setPasswordInput("");
        setModalError("");
    };

    const closeModal = () => {
        setModalType(null);
        setPasswordInput("");
        setModalError("");
    };

    return (
        <>
            <Dashboard_Header username={username} />
            <div className="min-h-screen bg-gray-100 p-6">

                <h1 className="text-2xl font-bold mb-6">Welcome, {username} 👋</h1>

                {/* Tiles */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Account Balance */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-2">Account Balance</h2>
                        <p className="text-2xl font-bold text-green-600">
                            {showBalance ? "$12,340.50" : "xxxxxxxx"}
                        </p>
                        {!showBalance && (
                            <button onClick={() => openModal("balance")} className="text-blue-600 text-sm mt-2">
                                View Balance
                            </button>
                        )}
                        {showBalance && (
                            <button onClick={() => setShowBalance(false)} className="text-blue-600 text-sm mt-2">
                                Hide Balance
                            </button>
                        )}
                    </div>

                    {/* Recent Transactions (no mask) */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
                        <ul className="text-sm">
                            <li>Amazon - $54.32</li>
                            <li>ATM Withdrawal - $200.00</li>
                            <li>Salary Credit - $5,000.00</li>
                        </ul>
                    </div>

                    {/* Quick Transfer */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-2">Quick Transfer</h2>
                        <input className="border p-2 w-full mb-2" type="text" placeholder="Recipient" />
                        <input className="border p-2 w-full mb-2" type="number" placeholder="Amount" />
                        <button className="bg-blue-600 text-white px-4 py-2 rounded">Transfer</button>
                    </div>

                    {/* Credit Card Info */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-2">Credit Card</h2>
                        {showCreditCard ? (
                            <>
                                <p>Card Ending: **** 1234</p>
                                <p>Due Amount: <span className="text-red-500 font-bold">$350.00</span></p>
                                <p>Next Due: July 15</p>
                            </>
                        ) : (
                            <>
                                <p>•••••••••••••</p>
                                <button onClick={() => openModal("credit")} className="text-blue-600 text-sm mt-2">
                                    View Credit Details
                                </button>
                            </>
                        )}
                    </div>

                    {/* Loan Summary */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-2">Loan Summary</h2>
                        {showLoan ? (
                            <>
                                <p>Personal Loan: $5,000</p>
                                <p>EMI Due: <span className="text-orange-500 font-semibold">$300/month</span></p>
                            </>
                        ) : (
                            <>
                                <p>••••••••••</p>
                                <button onClick={() => openModal("loan")} className="text-blue-600 text-sm mt-2">
                                    View Loan Details
                                </button>
                            </>
                        )}
                    </div>

                    {/* Offers */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-2">Offers for You</h2>
                        <p>🎉 Get 5% cashback on groceries with our new Platinum Card!</p>
                    </div>
                </div>

                {/* Modal */}
                {modalType && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded shadow-md w-80">
                            <h2 className="text-xl font-semibold mb-4">Verify Password</h2>
                            <input
                                type="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                placeholder="Enter your password"
                                className="border p-2 w-full mb-3"
                            />
                            {modalError && <p className="text-red-500 text-sm mb-2">{modalError}</p>}
                            <div className="flex justify-between">
                                <button onClick={handleVerify} className="bg-green-600 text-white px-4 py-2 rounded">
                                    Confirm
                                </button>
                                <button onClick={closeModal} className="text-gray-600 px-4 py-2 rounded">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
