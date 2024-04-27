import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { logInFailure, logInStart, logInSuccess } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(logInStart());
    try {
      const res = await axios.post("http://localhost:3000/api/login", { email, password }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.data;
      if (data.success === false) {
        dispatch(logInFailure(data.message));
        return;
      }
      dispatch(logInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(logInFailure(error.message))
    }
  } 
  console.log({ email, password });
  return (
    <div className="flex items-center justify-center mt-12">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-8 rounded-lg shadow-sm"
      >
        <h2 className="text-2xl font-bold mb-4">
          Login
        </h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="flex flex-col items-center gap-y-4 mb-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
          <p className="text-gray-600 text-xs">
            Need an account?
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-blue-500 focus:outline-none"
            >
              Sign Up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
