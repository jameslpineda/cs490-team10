import { UserInterface } from '../interfaces/user';
import UserModel from '../models/userModel';

// Function to get a user based on the query
export const getUser = async (query: Record<string, any>) => {
  try {
    return await UserModel.findOne(query).lean();
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Function to update a user based on the query and data
export const updateUser = async (
  query: Record<string, any>,
  data: Partial<UserInterface>
) => {
  try {
    return await UserModel.findOneAndUpdate(
      query,
      { $set: data },
      { new: true }
    ).lean();
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Function to create a new user
export const createUser = async (data: UserInterface) => {
  try {
    return await UserModel.create(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};
