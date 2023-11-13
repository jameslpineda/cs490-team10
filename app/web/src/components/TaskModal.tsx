import React, { useState } from 'react';

interface ModalProps {
  onClose: () => void;
}

const TaskModal: React.FC<ModalProps> = ({ onClose }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    pomodoroCount: 1,
    note: '',
    priority: 'Other',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to save the task data (e.g., send to the server, update state, etc.)
    onClose(); // Close the modal after submitting the form
  };

  const handleCancel = () => {
    onClose(); // Close the modal without saving the task
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Add Task</h2>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={taskData.title}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          {/* Pomodoro Count */}
          <div className="mb-4">
            <label
              htmlFor="pomodoroCount"
              className="block text-sm font-medium text-gray-600"
            >
              Pomodoro Count
            </label>
            <input
              type="number"
              id="pomodoroCount"
              name="pomodoroCount"
              value={taskData.pomodoroCount}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              min="1"
              required
            />
          </div>

          {/* Note/Description */}
          <div className="mb-4">
            <label
              htmlFor="note"
              className="block text-sm font-medium text-gray-600"
            >
              Note/Description
            </label>
            <textarea
              id="note"
              name="note"
              value={taskData.note}
              onChange={handleInputChange}
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
              value={taskData.priority}
              onChange={handleSelectChange}
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
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
