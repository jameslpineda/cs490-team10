import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskModal from '../../components/TaskModal';
import { Provider } from 'react-redux';
import mockStore from './mockStore';

describe('TaskModal', () => {
  it('should render the modal with default values', () => {
    render(
      <Provider store={mockStore}>
        <TaskModal
          onClose={() => {}}
          onSubmit={() => {}}
        />
      </Provider>,
    );

    expect(screen.getByText('Add Task')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Pomodoro Count')).toBeInTheDocument();
    expect(screen.getByLabelText('Note/Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Priority')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();

    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(screen.getByLabelText('Pomodoro Count')).toHaveValue(1);
    expect(screen.getByLabelText('Note/Description')).toHaveValue('');
    expect(screen.getByLabelText('Priority')).toHaveValue('Other');
  });

  it('should call onClose and onSubmit when Save is clicked', () => {
    const onCloseMock = jest.fn();
    const onSubmitMock = jest.fn();

    render(
      <Provider store={mockStore}>
        <TaskModal
          onClose={onCloseMock}
          onSubmit={onSubmitMock}
        />
      </Provider>,
    );

    fireEvent.change(screen.getByLabelText('Note/Description'), {
      target: { value: 'Test Note' },
    });
    fireEvent.change(screen.getByLabelText('Priority'), {
      target: { value: 'Important' },
    });

    fireEvent.click(screen.getByText('Save'));

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should call onClose when Cancel is clicked', () => {
    const onCloseMock = jest.fn();

    render(
      <Provider store={mockStore}>
        <TaskModal onClose={onCloseMock} />
      </Provider>,
    );

    fireEvent.click(screen.getByText('Cancel'));

    expect(onCloseMock).toHaveBeenCalled();
  });
});
