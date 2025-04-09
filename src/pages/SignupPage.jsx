import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    termsAccepted: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { termsAccepted, ...submitData } = data;
  
    try {
      const url = "http://localhost:5000/api/user";
      const { data: res } = await axios.post(url, submitData);
      console.log(res.message);
      navigate("/"); 
    } catch (error) {
      if (error.response && error.response.status >= 400) {
        setError(error.response.data.message);
      }
    }
  };
  

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-gray-900 text-gray-200">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-greenMedium to-greenLight p-8">
          <h2 className="text-3xl font-bold text-white">Your Wealth, Evolved</h2>
          <h2 className="text-3xl font-bold text-white"></h2>
          <p className="text-gray-300 mt-auto">A beautiful journey starts here.</p>
        </div>

        {/* Right Section */}
        <div className="p-8">
          <h1 className="text-2xl font-semibold text-center mb-6">Create an account</h1>
          <p className="text-center text-gray-400 mb-6">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 underline">
              Log in
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Inputs */}
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName" 
                placeholder="First name"
                value={data.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={data.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Email and Password */}
            <input
              type="email"
              name="email" 
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="password"
              name="password" 
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* Income Range */}
            {/* <div>
             
              <select
                className="w-full px-4 py-2 bg-gray-700 text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select your income range</option>
                <option value="0-25k">0 - 25k</option>
                <option value="25k-50k">25k - 50k</option>
                <option value="50k-100k">50k - 100k</option>
                <option value="100k+">100k+</option>
              </select>
            </div> */}

            {/* User Type */}
            
            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={data.termsAccepted}
                onChange={(e) => setData({ ...data, termsAccepted: e.target.checked })}
                id="terms"
                required
                className="mr-2 h-4 w-4 text-text bg-gray-700 rounded border-gray-600 focus:ring-2 focus:ring-purple-500"
              />
              <label htmlFor="terms" className="text-gray-400">
                I agree to the{" "}
                <Link to="#" className="text-blue-500 underline">
                  Terms & Conditions
                </Link>
              </label>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-greenLight text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              Create account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-between mt-4">
            <hr className="w-full border-gray-600" />
            <span className="px-4 text-gray-400">Or register with</span>
            <hr className="w-full border-gray-600" />
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4 mt-4">
            <button className="flex-1 flex items-center justify-center bg-gray-700 text-gray-200 py-2 rounded-md hover:bg-gray-600 transition">
              Google
            </button>
            <button className="flex-1 flex items-center justify-center bg-gray-700 text-gray-200 py-2 rounded-md hover:bg-gray-600 transition">
              Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
