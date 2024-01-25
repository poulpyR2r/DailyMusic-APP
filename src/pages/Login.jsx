import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../services/authServices";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formRef = useRef(null);

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = { email, password };
    try {
      const response = await authServices.login(user);
      if (response && response.status === 200) {
        navigate("/home");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid email or password",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-800 to-primary-900">
      <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
        <h2 className="text-center text-3xl font-bold text-primary-50">
          Sign in to your account
        </h2>
        <form className="mt-8 space-y-6" ref={formRef} onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-primary-700 placeholder-primary-300 text-primary-50 bg-primary-800/30 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-primary-700 placeholder-primary-300 text-primary-50 bg-primary-800/30 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-50 bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Sign in
          </button>
          <div className="text-center text-sm text-primary-50">
            Or
            <button
              type="button"
              onClick={handleRegisterRedirect}
              className="ml-2 underline"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
