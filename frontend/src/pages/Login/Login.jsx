import { useNavigate } from "react-router-dom";
import useLoginForm from "../../hooks/useLoginForm";

export default function Login({ setRender }) {
  const navigate = useNavigate()
  const {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLoginForm(setRender);

  return (
    <div className="flex-1 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-4 flex flex-col gap-2 w-96 border bg-gray-100 rounded-lg border-gray-300"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
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
            onChange={handleEmailChange}
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
            onChange={handlePasswordChange}
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
          <div className="flex justify-between items-center w-full">
            <p className="text-gray-600 text-sm">Need an account?</p>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-blue-500 focus:outline-none text-sm"
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
