import React from 'react';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { coreConfig } from '../utils/config';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const email = document.getElementById('email') as HTMLInputElement;
    const r = /^[\w-]+@[\w-]+\.[\w-]+$/;

    if (!r.test(email.value)) {
      toast.error('Invalid Email', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 7000,
      });
    } else {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${coreConfig.apiBaseUrl}/api/auth/forgot-password`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          },
        );

        const responseData = await response.json();
        if (responseData?.data) {
          toast.success(responseData?.data?.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 7000,
          });
          setEmail('');
          setMessage(true);
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          toast.error(responseData?.error || 'Invalid User', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 7000,
          });
        }
      } catch (error) {
        console.log(error);
        toast.error('Invalid Request', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 7000,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-gray-700 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg md:w-96 w-3/5 mx-4">
        <h1 className="text-2xl font-semibold text-center mb-4 text-gray-700">
          Forgot Password
        </h1>
        {message && (
          <p className="text-green-600 font-semibold text-center mb-4">
            Password reset link sent successfully to your email.
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Enter email for reset password link
            </label>
            <input
              value={email}
              onChange={handleEmailChange}
              name="email"
              id="email"
              placeholder="Enter Your Email Address"
              className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
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
              className=" shadow-lg w-full bg-gray-700 text-white p-2 rounded-[10px] hover:bg-gray-600"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
