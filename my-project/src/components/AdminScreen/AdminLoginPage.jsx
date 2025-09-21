// Login.js
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let inactivityTimer;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        signOut(auth);
        alert("You were logged out due to inactivity.");
      }, 15 * 60 * 1000); // 15 minutes
    };

    const activityEvents = ["mousemove", "keydown", "scroll", "click"];
    activityEvents.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        resetTimer(); // start inactivity timer on login
        navigate("/admin"); // redirect to admin/dashboard
      }
    });

    return () => {
      clearTimeout(inactivityTimer);
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
      unsubscribe();
    };
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-md lg:max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            className="w-36 sm:w-48 h-20 sm:h-24 object-contain"
            src="/images/logo.png"
            alt="Logo"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl text-primary font-extrabold text-gray-800 text-center mb-2">
          Admin Login
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
          Welcome back! Please enter your credentials
        </p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Email */}
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm sm:text-base"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm sm:text-base"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white p-3 sm:p-3 rounded-lg text-sm sm:text-base hover:bg-blue-600 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm sm:text-base text-gray-500 text-center mt-6">
          &copy; {new Date().getFullYear()} AquaCare Plus Pools. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
