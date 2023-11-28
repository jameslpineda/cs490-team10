import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home } from './pages/home';
import Settings from './pages/settings';
import SignInPage from './pages/signIn';
import SignUpPage from './pages/signUp';
import RequireAuth from './features/auth/RequireAuth';

function App() {
  return (
    <>
      <Routes>
        {/* public routes */}
        <Route
          path="/signUp"
          element={<SignUpPage />}
        />
        <Route
          path="/"
          element={<SignInPage />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="/reset-password/:id/:token"
          element={<ResetPassword />}
        />

        {/* private routes */}
        <Route element={<RequireAuth />}>
          <Route
            path="/home"
            element={<Home />}
          />
          <Route
            path="/settings"
            element={<Settings />}
          />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </>
  );
}
export default App;
