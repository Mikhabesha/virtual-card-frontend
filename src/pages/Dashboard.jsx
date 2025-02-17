import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const balanceRes = await axios.get("http://localhost:5000/api/wallet/balance", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const transactionsRes = await axios.get("http://localhost:5000/api/wallet/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBalance(balanceRes.data.balance);
      setTransactions(transactionsRes.data);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-100 min-h-screen"
    >
      <h2 className="text-3xl font-bold text-center mb-6">Dashboard</h2>

      {/* Wallet Balance Card */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-700">Current Balance</h3>
        <p className="text-3xl font-bold text-green-500">${balance.toFixed(2)}</p>
      </div>

      {/* Transaction Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Transaction Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={transactions}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default Dashboard;
