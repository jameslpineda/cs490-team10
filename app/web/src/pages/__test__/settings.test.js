import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Settings from '../settings';
import { Provider } from 'react-redux';
import store from '../../features/auth/store';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockedUsedNavigate,
}));

describe('Settings Component', () => {
  test('renders the component with initial values', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <Settings />
      </Provider>,
    );

    expect(getByLabelText('First Name').value).toBe('');
    expect(getByLabelText('Last Name').value).toBe('');
    expect(getByLabelText('Pomodoro').value).toBe('25');
    expect(getByLabelText('Short Break').value).toBe('5');
    expect(getByLabelText('Long Break').value).toBe('15');
  });

  test('changes the first name input value', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <Settings />
      </Provider>,
    );
    const firstNameInput = getByLabelText('First Name');

    fireEvent.change(firstNameInput, { target: { value: 'Alice' } });

    expect(firstNameInput.value).toBe('Alice');
  });

  test('changes the last name input value', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <Settings />
      </Provider>,
    );
    const lastNameInput = getByLabelText('Last Name');

    fireEvent.change(lastNameInput, { target: { value: 'Smith' } });

    expect(lastNameInput.value).toBe('Smith');
  });

  test('changes the Pomodoro input value', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <Settings />
      </Provider>,
    );
    const pomodoroInput = getByLabelText('Pomodoro');

    fireEvent.change(pomodoroInput, { target: { value: '30' } });

    expect(pomodoroInput.value).toBe('30');
  });

  test('changes the Short Break input value', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <Settings />
      </Provider>,
    );
    const shortBreakInput = getByLabelText('Short Break');

    fireEvent.change(shortBreakInput, { target: { value: '10' } });

    expect(shortBreakInput.value).toBe('10');
  });

  test('changes the Long Break input value', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <Settings />
      </Provider>,
    );
    const longBreakInput = getByLabelText('Long Break');

    fireEvent.change(longBreakInput, { target: { value: '20' } });

    expect(longBreakInput.value).toBe('20');
  });
});
