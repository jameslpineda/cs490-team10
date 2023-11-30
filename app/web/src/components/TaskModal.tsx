import React, { useState } from 'react';
import { taskModalProps, TaskProps } from '../interfaces/taskInterface';
import { defaultTaskPropsValues } from '../interfaces/taskInterface';

import { useCreateTaskMutation } from '../features/tasks/tasksApiSlice';

const TaskModal: React.FC<taskModalProps> = (props) => {
  const [taskData, setTaskData] = useState<TaskProps>(defaultTaskPropsValues);

  const [createTask] = useCreateTaskMutation();

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
    createTask({
      name: taskData.name,
      notes: taskData.notes,
      status: taskData.status,
      priority: taskData.priority,
      timers: taskData.timers,
      date: props?.date?.format('YYYY-MM-DD'),
    });
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
              value={taskData.name}
              onChange={handleInputChange}
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
              value={taskData.timers}
              onChange={handleInputChange}
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
              value={taskData.notes}
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
