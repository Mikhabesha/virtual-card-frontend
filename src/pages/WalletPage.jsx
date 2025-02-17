import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function WalletPage() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/wallet/balance", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBalance(response.data.balance);
    } catch (err) {
      setError("Failed to fetch balance.");
    }
  };

  const handleDeposit = async () => {
    try {
      setError("");
      setSuccess("");
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/wallet/deposit",
        { amount: parseFloat(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess("Deposit successful!");
      setBalance(response.data.newBalance);
      setAmount("");
    } catch (err) {
      setError("Deposit failed. Try again.");
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
        <h2 className="text-2xl font-bold text-center mb-4">Wallet</h2>
        <p className="text-gray-600 text-center mb-4">Current Balance: <strong>${balance.toFixed(2)}</strong></p>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <input
          type="number"
          placeholder="Enter amount"
          className="w-full p-2 border rounded-md mb-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          onClick={handleDeposit}
        >
          Deposit Funds
        </button>
      </div>
    </motion.div>
  );
}

export default WalletPage;
