// import { UserInterface } from '../interfaces/userInterface';
import UserModel from '../models/userModel';
import { UserInterface } from '../interfaces/userInterface';

// Function to get a user based on the query
export const getUser = async (query: UserInterface) => {
  try {
    return await UserModel.findOne(query).lean();
  } catch (error) {
    return null;
  }
};

// Function to update a user based on the query and data
export const updateUser = async (
  query: UserInterface,
  data: Partial<UserInterface>,
) => {
  try {
    return await UserModel.findOneAndUpdate(
      query,
      { $set: data },
      { new: true },
    ).lean();
  } catch (error) {
    return null;
  }
};

// Function to create a new user
export const createUser = async (data: UserInterface) => {
  try {
    return await UserModel.create(data);
  } catch (error) {
    return null;
  }
};
