import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function SendMoneyPage() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendMoney = async () => {
    try {
      setError("");
      setSuccess("");
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/wallet/transfer",
        { recipient, amount: parseFloat(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess("Money sent successfully!");
      setRecipient("");
      setAmount("");
    } catch (err) {
      setError("Transaction failed. Check recipient ID or balance.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen flex flex-col items-center justify-center bg-gray-100"
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Send Money</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <input
          type="text"
          placeholder="Recipient User ID"
          className="w-full p-2 border rounded-md mb-2"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter amount"
          className="w-full p-2 border rounded-md mb-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          onClick={handleSendMoney}
        >
          Send Money
        </button>
      </div>
    </motion.div>
  );
}

export default SendMoneyPage;
