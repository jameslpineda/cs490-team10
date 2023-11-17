import React, { useState } from 'react';
import { taskModalProps, TaskProps } from '../interfaces/taskInterface';
import { defaultTaskPropsValues } from '../interfaces/taskInterface';

const TaskModal: React.FC<taskModalProps> = (props) => {
  const [taskData, setTaskData] = useState<TaskProps>(defaultTaskPropsValues);

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
    props.onSubmit(taskData);
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
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
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
