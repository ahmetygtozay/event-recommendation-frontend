// src/pages/RegisterPage.jsx
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register as apiRegister } from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { userId, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) navigate("/recommend");
  }, [userId, navigate]);

  const handleRegister = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await apiRegister(username, password);
      login(data.user_id); // login after registration
      navigate("/recommend");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create a new account</h2>

        {error && <div className="mb-4 bg-red-100 text-red-700 p-3 rounded">{error}</div>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleRegister}
          disabled={loading}
          className={`w-full py-3 text-white rounded ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </div>
  );
}
