import React, { useState } from 'react';
import { taskModalProps } from '../interfaces/taskInterface';
// import { defaultTaskPropsValues } from '../interfaces/taskInterface';

import { useCreateTaskMutation } from '../features/tasks/tasksApiSlice';

const TaskModal: React.FC<taskModalProps> = (props) => {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [priority, setPriority] = useState('Other');
  const [timers, setTimers] = useState(1);

  const [createTask] = useCreateTaskMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Client side validation

    const taskData = {
      name,
      notes,
      priority,
      timers,
      date: props.date.format('YYYY-MM-DD'),
    };
    createTask(taskData);
    props.onClose();
  };

  const handleCancel = () => {
    props.onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-1/3 p-8 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Add Task</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          {/* Pomodoro Count */}
          <div className="mb-4">
            <label
              htmlFor="timers"
              className="block text-sm font-medium text-gray-600"
            >
              Pomodoro Count
            </label>
            <input
              type="number"
              id="timers"
              name="timers"
              value={timers}
              onChange={(e) => setTimers(parseInt(e.target.value))}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              min="1"
              required
            />
          </div>

          {/* Note/Description */}
          <div className="mb-4">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-600"
            >
              Note/Description
            </label>
            <textarea
              id="notes"
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              rows={4}
            />
          </div>

          {/* Priority */}
          <div className="mb-4">
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-600"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="Top Priority">Top Priority</option>
              <option value="Important">Important</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Save and Cancel Buttons */}
          <div className="flex justify-end">
            <button
              type="button"
              className="btn-secondary px-4 py-2 rounded mr-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
