import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { coreConfig } from '../utils/config';

const SignInForm: React.FC = () => {
  // Your sign-in form goes here
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const [message, setMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${coreConfig.restApiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        toast.success('Successful login');
        // TODO: Handle storing the jwt token or user data in frontend state or context

        // TODO: Redirect user to home page after successful login
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during login');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    //bg-white rounded-lg shadow-lg p-6 w-full md:w-2/3
    <div className="bg-white rounded-lg p-8">
      <h2 className="text-2xl font-semibold mb-4 text-left">Sign In</h2>
      {/* {message && (
            <p className={`text-${message.includes('successful') ? 'green' : 'red'}-600 font-semibold text-center mb-4`}>
            {message}
          </p>  
        )} */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-1 text-gray-700"
          >
            Email/username
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-1 text-gray-700"
          >
            Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute bottom-0 right-10 transform -translate-y-1/3 cursor-pointer -mr-8"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </span>
        </div>
        <div className="flex justify-center">
          <button className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 w-1/2">
            Sign In
          </button>
        </div>
      </form>
      <div className="flex justify-center mt-4 text-sm text-blue-500">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
      <div className="flex w-full justify-center">
        <div className="flex w-96 bg-gray-300 justify-center rounded-xl p-3 mt-52">
          Need an account?&nbsp;
          <Link
            to="/signUp"
            className="text-sky-700"
          >
            Sign up here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
