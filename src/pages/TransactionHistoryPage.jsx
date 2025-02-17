import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function TransactionHistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/wallet/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(response.data);
    } catch (err) {
      setError("Failed to load transactions.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen flex flex-col items-center justify-center bg-gray-100"
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-[500px]">
        <h2 className="text-2xl font-bold text-center mb-4">Transaction History</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="overflow-y-auto max-h-96">
          {transactions.length === 0 ? (
            <p className="text-gray-600 text-center">No transactions found.</p>
          ) : (
            transactions.map((tx, index) => (
              <div key={index} className="border-b py-2 flex justify-between">
                <span className="text-gray-600">{tx.type.toUpperCase()}</span>
                <span className={tx.amount > 0 ? "text-green-500" : "text-red-500"}>
                  {tx.amount > 0 ? `+ $${tx.amount}` : `- $${Math.abs(tx.amount)}`}
                </span>
                <span className="text-gray-500 text-sm">{new Date(tx.date).toLocaleDateString()}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default TransactionHistoryPage;
