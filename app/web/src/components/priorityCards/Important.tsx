import React from 'react';
import Task from '../Task';
import { useDroppable } from '@dnd-kit/core';
import { TaskCardProps, TaskProps } from '../../interfaces/taskInterface';

const Important: React.FC<TaskCardProps> = ({ tasks }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'Important',
  });
  return (
    <>
      <div ref={setNodeRef}>
        <div
          className="flex-1 bg-gray-100 rounded-md p-4 mb-4"
          style={{ border: isOver ? '2px solid gold' : '' }}
        >
          {' '}
          <h2 className="text-xl font-bold font-sans mb-3">Important</h2>
          {tasks.map((task: TaskProps) => (
            <Task
              key={task._id}
              {...task}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Important;
