import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Dashboard_Header from "./Dashboard_Header";

import { Pie, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

export default function Dashboard() {
    const { username } = useParams();

    const [showBalance, setShowBalance] = useState(false);
    const [showCreditCard, setShowCreditCard] = useState(false);
    const [showLoan, setShowLoan] = useState(false);
    const [showInsurance, setShowInsurance] = useState(false);

    const [modalType, setModalType] = useState(null);
    const [modalStep, setModalStep] = useState(""); // pin, dob, sport
    const [inputValue, setInputValue] = useState("");
    const [modalError, setModalError] = useState("");

    const [questions, setQuestions] = useState([]); // for code 7
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [answers, setAnswers] = useState([]);

    const [showTimeoutPopup, setShowTimeoutPopup] = useState(false);


    const correctAnswers = {
        pin: "1234",
        dob: "2000-01-01",
        sport: "cricket"
    };

    const pieData = {
        labels: ["Shopping", "Fuel", "Subscriptions"],
        datasets: [
            {
                label: "Monthly Expenses",
                data: [300, 120, 90],
                backgroundColor: ["#6366f1", "#f97316", "#10b981"],
                borderWidth: 1
            }
        ]
    };

    const lineData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Account Balance",
                data: [9000, 9500, 8900, 10000, 11000, 12340],
                fill: false,
                borderColor: "#4f46e5",
                tension: 0.4
            }
        ]
    };

    const handleSecureClick = async (type) => {
        const res = await fetch("http://localhost:5000/api/currentCode");
        const data = await res.json();

        const code = data["code"];

        if (code === 0) {
            showSection(type);
        } else if (code === 1) {
            setModalStep("pin");
            setModalType(type);
        } else if (code === 2) {
            setModalStep("dob");
            setModalType(type);
        } else if (code === 3) {
            setModalStep("sport");
            setModalType(type);
        } else if (code === 7) {
            console.log(data)
            setQuestions(data["questions"] || []);
            setModalStep("multiq");
            setModalType(type);
            setCurrentQIndex(0);
            setAnswers([]);
        }
    };

    React.useEffect(() => {
        setTimeout(() => {
            setShowTimeoutPopup(true);
        }, 120000);

        // Cleanup function to clear the timeout if the component unmounts
        return () => {
            setShowTimeoutPopup(false);
        };


    }, []);


    const showSection = (type) => {
        if (type === "balance") setShowBalance(true);
        else if (type === "credit") setShowCreditCard(true);
        else if (type === "loan") setShowLoan(true);
        else if (type === "insurance") setShowInsurance(true);
    };

    const handleVerify = () => {
        const expected = correctAnswers[modalStep];
        if (inputValue.trim().toLowerCase() === expected) {
            showSection(modalType);
            closeModal();
        } else {
            setModalError("Incorrect input.");
        }
    };

    const closeModal = () => {
        setModalType(null);
        setInputValue("");
        setModalError("");
        setModalStep("");
    };

    const handleMultiQuestionNext = () => {
        const newAnswers = [...answers, inputValue.trim().toLowerCase()];
        setAnswers(newAnswers);
        setInputValue("");
        setModalError("");

        if (currentQIndex + 1 < questions.length) {
            setCurrentQIndex(currentQIndex + 1);
        } else {
            // final question answered, validate all
            validateMultiAnswers(newAnswers);
        }
    };

    const validateMultiAnswers = (userAnswers) => {
        // This should be done securely via backend ideally.
        const expectedAnswers = ["peacock", "delhi", "math"]; // Example

        const isCorrect = userAnswers.every((ans, i) => ans === expectedAnswers[i]);
        if (isCorrect) {
            showSection(modalType);
            closeModal();
        } else {
            setModalError("One or more answers are incorrect.");
            setCurrentQIndex(0);
            setAnswers([]);
            setInputValue("");
        }
    };


    return (
        <>
            <Dashboard_Header username={username} />
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-2xl font-bold mb-6">Welcome, {username} 👋</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    <Tile title="Quick Transfer">
                        <input className="border p-2 w-full mb-2 rounded" type="text" placeholder="Recipient" />
                        <input className="border p-2 w-full mb-2 rounded" type="number" placeholder="Amount" />
                        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Send Money</button>
                    </Tile>

                    {/* <Tile title="Expenses">
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span>Monthly: $510.00</span>
                            <span className="text-gray-500">Weekly: $105.00</span>
                        </div>
                        <p className="text-center text-sm mt-2">Total: $8,490</p>
                    </Tile> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Tile title="Expenses Breakdown">
                            <Pie data={pieData} />
                        </Tile>

                        <Tile title="Balance Trend">
                            <Line data={lineData} />
                        </Tile>
                    </div>

                    <div className="flex flex-col gap-6">

                        <Tile title="Account Balance">
                            <p className="text-2xl font-bold text-green-600">
                                {showBalance ? "$12,340.50" : "xxxxxxxx"}
                            </p>
                            <ToggleButton
                                isVisible={showBalance}
                                onShow={() => handleSecureClick("balance")}
                                onHide={() => setShowBalance(false)}
                                label="Balance"
                            />
                        </Tile>


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

                    </div>

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
                                <button onClick={() => handleSecureClick("credit")} className="text-blue-600 text-sm mt-2">
                                    View Credit Details
                                </button>
                            </>
                        )}
                    </Tile>

                    <Tile title="Loan Summary">
                        {showLoan ? (
                            <>
                                <p>Personal Loan: $5,000</p>
                                <p>EMI Due: <span className="text-orange-500 font-semibold">$300/month</span></p>
                            </>
                        ) : (
                            <>
                                <p>••••••••••</p>
                                <button onClick={() => handleSecureClick("loan")} className="text-blue-600 text-sm mt-2">
                                    View Loan Details
                                </button>
                            </>
                        )}
                    </Tile>

                    <Tile title="Insurance">
                        {showInsurance ? (
                            <p>Health Insurance - Active<br />Life Insurance - Expiring Soon</p>
                        ) : (
                            <>
                                <p>••••••••••</p>
                                <button onClick={() => handleSecureClick("insurance")} className="text-blue-600 text-sm mt-2">
                                    View Insurance
                                </button>
                            </>
                        )}
                    </Tile>
                </div>



                {modalStep === "multiq" && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded shadow-md w-80">
                            <h2 className="text-xl font-semibold mb-4">
                                Security Question {currentQIndex + 1} of {questions.length}
                            </h2>
                            <p className="mb-2">{questions[currentQIndex]}</p>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type your answer..."
                                className="border p-2 w-full mb-3"
                            />
                            {modalError && <p className="text-red-500 text-sm mb-2">{modalError}</p>}
                            <div className="flex justify-between">
                                <button onClick={handleMultiQuestionNext} className="bg-green-600 text-white px-4 py-2 rounded">
                                    {currentQIndex + 1 === questions.length ? "Submit" : "Next"}
                                </button>
                                <button onClick={closeModal} className="text-gray-600 px-4 py-2 rounded">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showTimeoutPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded shadow-md w-80 text-center">
                            <h2 className="text-xl font-semibold mb-2">Heads up! 👋</h2>
                            <p className="text-gray-700 mb-4">Your ip is leaked Need any help?</p>
                            <button onClick={() => setShowTimeoutPopup(false)} className="bg-blue-600 text-white px-4 py-2 rounded">
                                Dismiss
                            </button>
                        </div>
                    </div>
                )}



                {/* Modal */}
                {modalType && modalStep != "multiq" && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded shadow-md w-80">
                            <h2 className="text-xl font-semibold mb-4">
                                {modalStep === "pin" && "Enter PIN"}
                                {modalStep === "dob" && "Enter Date of Birth"}
                                {modalStep === "sport" && "Your Favourite Sport"}
                            </h2>
                            <input
                                type={modalStep === "dob" ? "date" : "text"}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type here..."
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
        <div className="bg-white shadow-sm rounded-xl p-6 flex flex-col justify-start">
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
