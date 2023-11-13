import React from 'react';

interface TaskProps {
  title: string;
  pomodoroCount: number;
  note: string;
  priority: string;
}

const Task: React.FC<TaskProps> = ({
  title,
  pomodoroCount,
  note,
  priority,
}) => {
  return (
    <div className="border p-3 mb-3 rounded-md">
      <h3 className="text-lg font-bold">{title}</h3>
      <p>Pomodoro Count: {pomodoroCount}</p>
      <p>Note: {note}</p>
      <p>Priority: {priority}</p>
    </div>
  );
};

export default Task;
