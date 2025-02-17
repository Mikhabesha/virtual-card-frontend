import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-500">Virtual Card App</h1>
      <div className="space-x-4">
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-500">Dashboard</Link>
        <Link to="/transactions" className="text-gray-700 hover:text-blue-500">Transactions</Link>
        <Link to="/apply-card" className="text-gray-700 hover:text-blue-500">Apply for Card</Link>
      </div>
    </nav>
  );
}

export default Navbar;
