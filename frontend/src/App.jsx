import React, { useState } from "react";
import axios from "axios";

function App() {
    const [to, setTo] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");

    const sendSMS = async (e) => {
        e.preventDefault();
        setStatus("Sending...");

        try {
            const response = await axios.post("http://localhost:5000/send-sms", {
                to,
                message
            });

            if (response.data.success) {
                setStatus("✅ SMS sent successfully!");
            } else {
                setStatus("❌ Error: " + response.data.error);
            }
        } catch (error) {
            setStatus("❌ Failed to connect to server");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-semibold text-center mb-6">Send SMS via Twilio</h2>
                <form onSubmit={sendSMS}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Recipient Number:</label>
                        <input
                            type="text"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            placeholder="+1234567890"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Message:</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                    >
                        Send SMS
                    </button>
                </form>

                <p className="text-center mt-4 font-semibold text-sm text-gray-600">{status}</p>
            </div>
        </div>
    );
}

export default App;
