import { toast } from 'react-toastify';

export const validateEmail = (value: string) => {
  // Regex pattern for a valid email
  const regex = /^[\w+-]+@[\w-]+\.[\w-]+$/;
  return regex.test(value);
};
export const validateName = (value: string) => {
  // Regex pattern for a valid name (alpha)
  const regex = /^[a-zA-Z ]*$/;
  return regex.test(value);
};
export const validatePassword = (value: string) => {
  // Regex pattern for a valid timer (numeric 1+)
  const regex =
    /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$/;
  return regex.test(value);
};
export const validateTimer = (value: string) => {
  // Regex pattern for a valid timer (numeric 1+)
  const regex = /^[1-9]\d*$/;
  return regex.test(value);
};
export const displayValidationError = (message: string) => {
  toast.error(message, {
    autoClose: 5000,
  });
};
