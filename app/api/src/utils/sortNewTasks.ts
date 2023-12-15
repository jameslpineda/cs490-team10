import { TaskInterface } from '../interfaces/taskInterface';
import { updateTask } from '../services/taskService';

export const sortNewTasks = async (todayTasks: TaskInterface[]) => {
  try {
    // Updated priorities logic
    if (todayTasks != null) {
      const sortedTasks = todayTasks.sort((a, b) => {
        // Sort tasks by priority (custom order: Top Priority > Important > Other)
        const priorityOrder: { [key: string]: number } = {
          'Top Priority': 0,
          Important: 1,
          Other: 2,
        };

        return (
          priorityOrder[a.priority as string] -
          priorityOrder[b.priority as string]
        );
      });
      // Select the top three tasks as "Top Priority"
      const topPriorityTasks = sortedTasks.slice(0, 3);

      // Select remaining important tasks
      const importantTasks = sortedTasks
        .slice(3)
        .filter((task) => task.priority === 'Important');

      // If there are no important tasks, move all remaining other items to important
      if (importantTasks.length === 0) {
        const remainingTasks = sortedTasks.slice(3);
        for (const task of remainingTasks) {
          await updateTask({ _id: task._id }, { priority: 'Important' });
        }
      } else {
        // If there were important items, leave other items as other
        const remainingOtherTasks = sortedTasks
          .slice(3)
          .filter((task) => task.priority === 'Other');
        for (const task of remainingOtherTasks) {
          await updateTask({ _id: task._id }, { priority: 'Other' });
        }
      }

      // Update priority for tasks in Top Priority
      for (const task of topPriorityTasks) {
        await updateTask({ _id: task._id }, { priority: 'Top Priority' });
      }

      // Update priority for tasks in remaining important tasks
      for (const task of importantTasks) {
        await updateTask({ _id: task._id }, { priority: 'Important' });
      }
    }
    return true;
  } catch (err) {
    return null;
  }
};
