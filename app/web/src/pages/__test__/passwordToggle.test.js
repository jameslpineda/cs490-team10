// SignUpForm.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUpForm from '../../components/SignUpForm';
import SignInForm from '../../components/SignInForm';
import { Provider } from 'react-redux';
import store from '../../features/auth/store';


describe('Show/Hide Password Functionality', () => {
  it('toggles password visibility when the icon button is clicked', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
      <BrowserRouter>
        <SignUpForm />
      </BrowserRouter>
      </Provider>,
    );

    const passwordInput = getByLabelText('Password');
    const toggleButton = document.querySelector('span.cursor-pointer'); // Update the selector as per your actual structure

    // Password is hidden by default
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Click the SVG icon button
    fireEvent.click(toggleButton);

    // Password should be visible
    expect(passwordInput).toHaveAttribute('type', 'text');

    // Click the SVG icon button again
    fireEvent.click(toggleButton);

    // Password should be hidden again
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('toggles password visibility when the icon button is clicked', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
      <BrowserRouter>
        <SignUpForm />
      </BrowserRouter>
      </Provider>,
    );

    const passwordInput = getByLabelText('Password');
    const toggleButton = document.querySelector('span.cursor-pointer'); // Update the selector as per your actual structure

    // Password is hidden by default
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Click the SVG icon button
    fireEvent.click(toggleButton);

    // Password should be visible
    expect(passwordInput).toHaveAttribute('type', 'text');

    // Click the SVG icon button again
    fireEvent.click(toggleButton);

    // Password should be hidden again
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
