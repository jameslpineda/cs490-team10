import React from 'react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { coreConfig } from '../utils/config';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${coreConfig.apiBaseUrl}/api/reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, token, password }),
        },
      );

      const responseData = await response.json();
      if (responseData?.data) {
        toast.success(responseData?.data?.message);
        setTimeout(() => {
          navigate('/signIn');
        }, 2000);
      } else {
        toast.error(responseData?.error || 'Invalid Token');
      }
    } catch (error) {
      console.log(error);
      toast.error('Invalid Request');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-700 min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-gray-600 p-8 rounded shadow-lg md:w-96 w-3/5 mx-4">
        <h1 className="text-2xl font-semibold text-center mb-4 dark:text-white">
          Reset Password
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              New Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleEmailChange}
              placeholder="Enter Your New Password"
              className="w-full mt-2 p-2 border border-gray-300 dark:border-gray-800 dark:bg-gray-800 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-opacity-75">
              <div className="animate-spin rounded-full border-t-2 border-b-2 border-blue-600 h-6 w-6"></div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full bg-gray-600 text-white p-2 rounded-[10px] hover:bg-gray-700"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
