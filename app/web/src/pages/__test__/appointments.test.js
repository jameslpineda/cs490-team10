import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import Appointments from '../../components/Appointments';
import { useGetEventsQuery } from '../../features/appointments/appointmentsApiSlice';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock('../../features/appointments/appointmentsApiSlice', () => ({
  useGetEventsQuery: jest.fn(),
}));

describe('Appointments Component', () => {
  it('renders appointments successfully with empty events', () => {
    useGetEventsQuery.mockReturnValueOnce({
      data: {
        events: [],
      },
      isSuccess: true,
      isError: false,
    });

    render(<Appointments date="2023-01-01" />);

    expect(screen.queryByText('Event 1')).not.toBeInTheDocument();
  });

  it('renders appointments successfully', () => {
    useGetEventsQuery.mockReturnValueOnce({
      data: {
        events: [
          {
            title: 'Event 1',
            description: 'Description 1',
            start: '2023-01-01T10:00:00Z',
            end: '2023-01-01T12:00:00Z',
          },
        ],
      },
      isSuccess: true,
      isError: false,
    });

    render(<Appointments date="2023-01-01" />);

    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('renders appointments successfully', async () => {
    useGetEventsQuery.mockReturnValueOnce({
      data: {
        events: [
          {
            title: 'Event 1',
            description: 'Description 1',
            start: '2023-01-01T10:00:00Z',
            end: '2023-01-01T12:00:00Z',
          },
        ],
      },
      isSuccess: true,
      isError: false,
    });

    render(<Appointments date="2023-01-01" />);

    await waitFor(() => {
      expect(screen.getByText('Event 1')).toBeInTheDocument();
    });
  });
});
