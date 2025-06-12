import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Dashboard_Header from "./Dashboard_Header";

import { Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Register Chart.js modules
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);


export default function Dashboard() {
    const { username } = useParams();

    const [showBalance, setShowBalance] = useState(false);
    const [showCreditCard, setShowCreditCard] = useState(false);
    const [showLoan, setShowLoan] = useState(false);
    const [showInsurance, setShowInsurance] = useState(false);

    const [modalType, setModalType] = useState(null);
    const [passwordInput, setPasswordInput] = useState("");
    const [modalError, setModalError] = useState("");

    const correctPassword = "1234";

    const handleVerify = () => {
        if (passwordInput === correctPassword) {
            if (modalType === "balance") setShowBalance(true);
            else if (modalType === "credit") setShowCreditCard(true);
            else if (modalType === "loan") setShowLoan(true);
            else if (modalType === "insurance") setShowInsurance(true);
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


    const pieData = {
        labels: ["Shopping", "Fuel", "Subscriptions"],
        datasets: [
            {
                label: "Monthly Expenses",
                data: [300, 120, 90],
                backgroundColor: ["#6366f1", "#f97316", "#10b981"],
                borderWidth: 1,
            },
        ],
    };

    const lineData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Account Balance",
                data: [9000, 9500, 8900, 10000, 11000, 12340],
                fill: false,
                borderColor: "#4f46e5",
                tension: 0.4,
            },
        ],
    };

    return (
        <>
            <Dashboard_Header username={username} />
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-2xl font-bold mb-6">Welcome, {username} 👋</h1>



                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* My Cards */}
                    <Tile title="My Cards">
                        <p className="text-sm mb-2">You have 2 cards</p>
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-4 mb-3 shadow-md">
                            <p>Card xxxx xxxx 2214</p>
                            <p className="text-xs">Balance: $5,600</p>
                        </div>
                        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg p-4 shadow-md">
                            <p>Card xxxx xxxx 7185</p>
                            <p className="text-xs">Balance: $3,400</p>
                        </div>
                    </Tile>

                    {/* Quick Transfer */}
                    <Tile title="Quick Transfer">
                        <input className="border p-2 w-full mb-2 rounded" type="text" placeholder="Recipient" />
                        <input className="border p-2 w-full mb-2 rounded" type="number" placeholder="Amount" />
                        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Send Money</button>
                    </Tile>


                    <div className="grid grid-rows-1 md:grid-rows-2 gap-6">

                        {/* Expenses with chart */}
                        <Tile title="Expenses">
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span>Monthly: $510.00</span>
                                <span className="text-gray-500">Weekly: $105.00</span>
                            </div>
                            {/* <div className="flex justify-center">
                                <svg width="100" height="100" viewBox="0 0 36 36" className="donut">
                                    <circle className="text-gray-200" strokeWidth="3.8" fill="none" r="15.9155" cx="18" cy="18" />
                                    <circle className="text-blue-600" strokeWidth="3.8" strokeDasharray="70 30" strokeLinecap="round" fill="none" r="15.9155" cx="18" cy="18" />
                                </svg>
                            </div> */}
                            <p className="text-center text-sm mt-2">Total: $8,490</p>
                        </Tile>

                        {/* Balance */}
                        <Tile title="Account Balance">
                            <p className="text-2xl font-bold text-green-600">
                                {showBalance ? "$12,340.50" : "xxxxxxxx"}
                            </p>
                            <ToggleButton
                                isVisible={showBalance}
                                onShow={() => openModal("balance")}
                                onHide={() => setShowBalance(false)}
                                label="Balance"
                            />
                        </Tile>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Expenses Pie Chart */}
                        <Tile title="Expenses Breakdown">
                            <Pie data={pieData} />
                        </Tile>

                        {/* Balance Trend Line Chart */}
                        <Tile title="Balance Trend">
                            <Line data={lineData} />
                        </Tile>
                    </div>

                    {/* My Transactions */}
                    <Tile title="My Transactions">
                        <ul className="text-sm space-y-2">
                            <li className="flex justify-between">
                                <span>Investment</span><span className="text-red-500">- $465</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Shopping</span><span className="text-red-400">- $58.85</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Food</span><span className="text-green-600">- $25.00</span>
                            </li>
                        </ul>
                    </Tile>



                    {/* Credit Card */}
                    <Tile title="Credit Card">
                        {showCreditCard ? (
                            <>
                                <p>Card Ending: **** 1234</p>
                                <p>Due: <span className="text-red-500 font-bold">$350.00</span></p>
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
                    </Tile>

                    {/* Loan Summary */}
                    <Tile title="Loan Summary">
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
                    </Tile>

                    {/* Insurance */}
                    <Tile title="Insurance">
                        {showInsurance ? (
                            <p>Health Insurance - Active<br />Life Insurance - Expiring Soon</p>
                        ) : (
                            <>
                                <p>••••••••••</p>
                                <button onClick={() => openModal("insurance")} className="text-blue-600 text-sm mt-2">
                                    View Insurance
                                </button>
                            </>
                        )}
                    </Tile>
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
                                <button onClick={handleVerify} className="bg-green-600 text-white px-4 py-2 rounded">Confirm</button>
                                <button onClick={closeModal} className="text-gray-600 px-4 py-2 rounded">Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

function Tile({ title, children }) {
    return (
        <div className="bg-white shadow-sm rounded-xl p-6 flex flex-col justify-start ">
            <h2 className="text-lg font-semibold mb-3">{title}</h2>
            {children}
        </div>
    );
}

function ToggleButton({ isVisible, onShow, onHide, label }) {
    return isVisible ? (
        <button onClick={onHide} className="text-blue-600 text-sm mt-2">Hide {label}</button>
    ) : (
        <button onClick={onShow} className="text-blue-600 text-sm mt-2">View {label}</button>
    );
}
