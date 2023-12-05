import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, Active, Over } from '@dnd-kit/core';
import { TaskProps, TaskCardProps } from '../interfaces/taskInterface';
import { useUpdateTaskMutation } from '../features/tasks/tasksApiSlice';
import TopPriority from './priorityCards/TopPriority';
import Important from './priorityCards/Important';
import Other from './priorityCards/Other';

const TaskList: React.FC<TaskCardProps> = ({ tasks }) => {
  const [topPriority, setTopPriority] = useState<TaskProps[]>([]);
  const [important, setImportant] = useState<TaskProps[]>([]);
  const [other, setOther] = useState<TaskProps[]>([]);

  const [updateTask] = useUpdateTaskMutation();

  const handleDragEnd = async ({
    active,
    over,
  }: {
    active: Active | null;
    over: Over | null;
  }) => {
    if (active && over) {
      console.log(
        `Move task ${active.id} from ${active.data.current?.priority} to ${over.id}`,
      );
      const updateParams = {
        priority: over.id.toString(),
      };
      updateTask({ id: active.data.current?._id, taskPayload: updateParams });
    }
  };

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
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={(event) => handleDragEnd(event)}
      >
        <div className="h-full pb-16 flex-1 flex-col flex-grow">
          <div className="h-full overflow-y-auto flex-grow bg-white rounded-lg shadow-md">
            <div className="flex flex-col p-4">
              <TopPriority tasks={topPriority} />
              <Important tasks={important} />
              <Other tasks={other} />
            </div>
          </div>
        </div>
      </DndContext>
    </>
  );
};

export default TaskList;
