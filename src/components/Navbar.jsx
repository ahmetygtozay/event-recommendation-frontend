import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { userId, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold">
          <Link to="/">EventMate</Link>
        </h1>

        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>

          {userId && (
            <Link to="/recommend" className="hover:underline">
              Recommendations
            </Link>
          )}

          {userId && (
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
          )}

          {userId ? (
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
