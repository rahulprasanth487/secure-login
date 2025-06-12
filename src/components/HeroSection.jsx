import React from "react";
import { useNavigate } from 'react-router-dom';


export default function HeroSection() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [loginSuccess, setLoginSuccess] = React.useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });


            const result = await response.json();
            setLoginSuccess(result.status);
            if (result.status == "error") {
                alert(result.message);
            }
            else
            {
                navigate(`/dashboard/${username}`);
            }

        } catch (error) {
            console.error('Login error:', error);
            setMessage('Server error');
        }
    };

    return (
        <section
            className="w-full bg-[#c8102e] text-white py-12"
            style={{
                backgroundImage: 'linear-gradient(to right,black,rgb(145, 11, 33), #c8102e, #7a0019)',
            }}
        >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between px-6">
                {/* LOGIN PANEL */}
                <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full md:w-[320px] mb-8 md:mb-0">
                    <h2 className="text-lg font-semibold mb-4">Good evening</h2>
                    <p className="text-sm mb-4">Sign on to manage your accounts.</p>
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full border rounded px-3 py-2 mb-3 text-sm"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="relative mb-3">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full border rounded px-3 py-2 text-sm"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="absolute right-2 top-2 text-xs text-blue-600 hover:underline" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    <div className="flex items-center mb-4 text-sm">
                        <input type="checkbox" id="save" className="mr-2" />
                        <label htmlFor="save">Save username</label>
                    </div>
                    <div className="flex space-x-2 mb-4">
                        <button className="bg-[#b40000] text-white w-full py-2 rounded hover:bg-red-700" onClick={handleLogin}>
                            Sign On
                        </button>
                        <button className="border border-[#b40000] text-[#b40000] py-2 px-4 rounded hover:bg-gray-100">
                            Enroll
                        </button>
                    </div>
                    <div className="text-xs text-blue-600 space-y-1">
                        <a href="#" className="block hover:underline">
                            Forgot username or password?
                        </a>
                        <a href="#" className="block hover:underline">
                            Security Center
                        </a>
                        <a href="#" className="block hover:underline">
                            Privacy, Cookies, and Legal
                        </a>
                    </div>
                </div>

                {/* PROMOTION TEXT */}
                <div className="flex-1 pl-0 md:pl-12 pt-2">
                    <h1 className="text-3xl font-bold mb-4">$325 checking bonus on us</h1>
                    <p className="mb-6 text-sm max-w-md">
                        New customers open an eligible checking account with qualifying direct deposits
                    </p>
                    <button className="border border-white px-6 py-2 rounded hover:bg-white hover:text-[#b40000] transition">
                        Get started &gt;&gt;
                    </button>
                </div>
            </div>
        </section>
    );
}
