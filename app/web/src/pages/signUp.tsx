import React from 'react';
import SignUpForm from '../components/SignUpForm';
import crushItLogo from '../images/crush_it_logo.png';

const SignUpPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-2 bg-gray-900 w-3/5 rounded-r-lg p-8">
        <div className="text-white text-6xl font-bold mt-16 mb-4 text-center">
          <h2>Crush It</h2>
          <div className="flex justify-center">
            <img
              src={crushItLogo}
              alt="Crush It Logo"
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-y-12 right-11 w-5/12 bg-white rounded-lg p-2 drop-shadow-xl">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
