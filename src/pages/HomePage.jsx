import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white"
    >
      <center><h1 className="text-4xl font-bold mb-4">Welcome to Virtual Card Platform</h1></center>
      <motion.div whileHover={{ scale: 1.1 }}>
        <Link to="/login">
         <center> <button className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
            Get Started
          </button></center>
        </Link>
      </motion.div>
      
    </motion.div>
  );
}

export default HomePage;
