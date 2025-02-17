import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function CardApplication() {
  const [cardType, setCardType] = useState("Visa");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleApply = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/card/apply",
        { cardType },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStatus(response.data.message);
    } catch (err) {
      setStatus("Failed to apply for card.");
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen flex flex-col items-center justify-center bg-gray-100"
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-4">Apply for a Virtual Card</h2>

        <label className="block text-gray-700 font-semibold mb-2">Choose Card Type</label>
        <select
          value={cardType}
          onChange={(e) => setCardType(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
        >
          <option value="Visa">Visa</option>
          <option value="Mastercard">Mastercard</option>
        </select>

        <button
          onClick={handleApply}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
        >
          {loading ? "Processing..." : "Apply Now"}
        </button>

        {status && <p className="text-center mt-4 text-gray-600">{status}</p>}
      </div>
    </motion.div>
  );
}

export default CardApplication;
