import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import Home from '../home';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const store = mockStore({
  yourReducer: {
    user: {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
    },
  },
});

test('Testing decrement button', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>,
  );

  const decrementMonthButton = getByTestId('decrement-month-button');
  const decrementDayButton = getByTestId('decrement-day-button');
  const decrementYearButton = getByTestId('decrement-year-button');

  const initialMonth = getByTestId('monthID').textContent;
  const initialDay = getByTestId('dayID').textContent;
  const initialYear = getByTestId('yearID').textContent;

  fireEvent.click(decrementMonthButton);
  fireEvent.click(decrementDayButton);
  fireEvent.click(decrementYearButton);

  const updatedMonth = getByTestId('monthID').textContent;
  const updatedDay = getByTestId('dayID').textContent;
  const updatedYear = getByTestId('yearID').textContent;

  expect(initialMonth).not.toEqual(updatedMonth);
  expect(initialDay).not.toEqual(updatedDay);
  expect(initialYear).not.toEqual(updatedYear);
});

test('Testing increment button', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>,
  );

  const incrementMonthButton = getByTestId('increment-month-button');
  const incrementDayButton = getByTestId('increment-day-button');
  const incrementYearButton = getByTestId('increment-year-button');

  const initialMonth = getByTestId('monthID').textContent;
  const initialDay = getByTestId('dayID').textContent;
  const initialYear = getByTestId('yearID').textContent;

  fireEvent.click(incrementMonthButton);
  fireEvent.click(incrementDayButton);
  fireEvent.click(incrementYearButton);

  const updatedMonth = getByTestId('monthID').textContent;
  const updatedDay = getByTestId('dayID').textContent;
  const updatedYear = getByTestId('yearID').textContent;

  expect(initialMonth).not.toEqual(updatedMonth);
  expect(initialDay).not.toEqual(updatedDay);
  expect(initialYear).not.toEqual(updatedYear);
});

test('Crossing the max days threshold changes the month', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>,
  );

  const initialMonth = getByTestId('monthID').textContent;
  const incrementDayButton = getByTestId('increment-day-button');
  const maxDays = 31;

  for (let i = 1; i <= maxDays; i++) {
    fireEvent.click(incrementDayButton);
  }

  const updatedMonth = getByTestId('monthID').textContent;

  expect(initialMonth).not.toEqual(updatedMonth);
});

test('Crossing the max month threshold changes the year', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>,
  );

  const initialYear = getByTestId('yearID').textContent;
  const incrementMonthButton = getByTestId('increment-month-button');
  const maxDays = 12;

  for (let i = 1; i <= maxDays; i++) {
    fireEvent.click(incrementMonthButton);
  }

  const updatedYear = getByTestId('yearID').textContent;

  expect(initialYear).not.toEqual(updatedYear);
});
