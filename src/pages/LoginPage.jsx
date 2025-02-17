import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        setError("Invalid login credentials");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="p-6 bg-white rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-md mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            /> <br/>
                <br/>
            <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-md mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            /> <br/>
            <br/>
            <button
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            onClick={handleLogin}
            >
            Sign In
            </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
