import React from 'react';
import Task from '../Task';
import { useDroppable } from '@dnd-kit/core';
import { TaskCardProps, TaskProps } from '../../interfaces/taskInterface';

const Other: React.FC<TaskCardProps> = ({ tasks }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'Other',
  });
  return (
    <>
      <div ref={setNodeRef}>
        <div
          className="flex-1 bg-gray-100 dark:bg-zinc-700 rounded-md p-4 mb-4"
          style={{ border: isOver ? '2px solid grey' : '' }}
        >
          <h2 className="text-xl dark:text-white font-bold font-sans mb-3">
            Other
          </h2>
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

export default Other;
