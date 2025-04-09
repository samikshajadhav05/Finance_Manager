import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/login";
      const res = await axios.post(url, data);
  
      if (res.data?.token && res.data?.user) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user)); 
        navigate("/Dashboard"); 
      } else {
        setError("Invalid response from server.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };
  

  return (
    <div 
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/src/assets/loginBg.jpg')" }} // Ensure the path is correct
    >
      <div className="bg-greenMedium bg-opacity-50 shadow-lg rounded-lg p-8 w-full max-w-md backdrop-blur-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Log in to your account</h1>
        <p className="text-sm mb-6 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-text hover:underline">Sign up</Link>
        </p>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full p-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              value={data.email}
              onChange={handleChange} // Added onChange
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full p-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              value={data.password}
              onChange={handleChange} // Added onChange
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
