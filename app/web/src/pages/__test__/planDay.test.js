import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SideBar from '../../components/SideBar';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter for routing
import moment from 'moment';

jest.mock('../../features/auth/authApiSlice', () => ({
  ...jest.requireActual('../../features/auth/authApiSlice'),
  useSendSignOutMutation: () => [
    jest.fn(),
    { isLoading: false, isSuccess: false, isError: false },
  ],
}));

jest.mock('../../features/tasks/tasksApiSlice', () => ({
  ...jest.requireActual('../../features/tasks/tasksApiSlice'),
  usePlanTasksMutation: () => [jest.fn(), {}],
}));

describe('SideBar Component', () => {
  it('handles planning tasks when "Plan Day" button is clicked', async () => {
    const mockDate = moment('2023-01-01');
    const mockNavigate = jest.fn(); // Mock the navigate function

    // Mock the useNavigate hook to return the mockNavigate function
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
      useLocation: () => ({ pathname: '/home' }), // Mock useLocation to provide a pathname
      useContext: jest.fn(() => ({ basename: '' })), // Mock the context value
    }));

    render(
      <Router>
        <SideBar date={mockDate} />
      </Router>,
    );

    // Trigger the "Plan Day" button click
    fireEvent.click(screen.getByText('Plan Day'));

    // Assert that the navigation function is called for '/home'
    expect(mockNavigate).toHaveBeenCalled;
  });

  it('calls onSignOutClick when "Log Out" button is clicked', () => {
    const onSignOutClickMock = jest.fn();

    render(
      <Router>
        <SideBar
          date={moment()}
          onSignOutClick={onSignOutClickMock}
        />
      </Router>,
    );

    const logOutButton = screen.getByText('Log Out');

    // Trigger the "Log Out" button click
    fireEvent.click(logOutButton);
  });
});
