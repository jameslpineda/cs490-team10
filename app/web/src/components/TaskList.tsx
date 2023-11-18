import React, { useState, useEffect } from 'react';
import { TaskProps, TaskCardProps } from '../interfaces/taskInterface';
import TopPriority from './priorityCards/TopPriority';
import Important from './priorityCards/Important';
import Other from './priorityCards/Other';

const TaskList: React.FC<TaskCardProps> = ({ tasks }) => {
  const [topPriority, setTopPriority] = useState<TaskProps[]>([]);
  const [important, setImportant] = useState<TaskProps[]>([]);
  const [other, setOther] = useState<TaskProps[]>([]);

  useEffect(() => {
    const topPriorityTasks = tasks.filter(
      (task) => task.priority === 'Top Priority',
    );
    const importantTasks = tasks.filter(
      (task) => task.priority === 'Important',
    );
    const otherTasks = tasks.filter((task) => task.priority === 'Other');

    setTopPriority(topPriorityTasks);
    setImportant(importantTasks);
    setOther(otherTasks);
  }, [tasks]);

  return (
    <>
      <div className="flex-1 flex-col flex-grow">
        <div className="flex-grow bg-white rounded-lg shadow-md">
          <div className="flex flex-col p-4">
            <TopPriority tasks={topPriority} />
            <Important tasks={important} />
            <Other tasks={other} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskList;
