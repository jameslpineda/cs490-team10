import TaskModel from '../models/taskModel';
import { TaskInterface } from '../interfaces/taskInterface';

//Function to get a task based on the query
export const getTask = async (query: TaskInterface) => {
  try {
    return await TaskModel.findOne(query).lean();
  } catch (error) {
    return null;
  }
};

//Function to get a task based on the query
export const getTasksByDate = async (query: TaskInterface) => {
  try {
    return await TaskModel.find(query).lean();
  } catch (error) {
    return null;
  }
};

//Function to update a task based on the query and data
export const updateTask = async (
  query: TaskInterface,
  data: Partial<TaskInterface>,
) => {
  try {
    return await TaskModel.findOneAndUpdate(
      query,
      { $set: data },
      { new: true },
    ).lean();
  } catch (error) {
    return null;
  }
};

//Function to create a new task
export const createTask = async (data: TaskInterface) => {
  try {
    return await TaskModel.create(data);
  } catch (error) {
    return null;
  }
};
