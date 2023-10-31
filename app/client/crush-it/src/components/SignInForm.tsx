import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignInForm: React.FC = () => {
  // Your sign-in form goes here
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<boolean>(false);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(true);
};
  return (
    //bg-white rounded-lg shadow-lg p-6 w-full md:w-2/3
    <div className="bg-white rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-left">Sign In</h2>
        {message && (
            <p className="text-green-600 font-semibold text-center mb-4">
                Will be added later.
            </p>
        )}
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">
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
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className='flex justify-center'>
                <button className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 w-1/2">
                    Sign In
                </button>
            </div>

        </form>
        <div className="mt-4 text-sm text-blue-500">
            <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <div className="flex w-full justify-center">
            <div className="flex w-96 bg-gray-300 justify-center rounded-xl p-3 mt-40">
                Need an account?&nbsp;<Link to="/signUp" className="text-sky-700">Sign up here!</Link>
            </div>
        </div>
    </div>
  );
};

export default SignInForm;
