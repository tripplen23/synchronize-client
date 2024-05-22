import {
  UserCreateType,
  UserReadType,
  UserUpdateType,
} from "../../../misc/userType";
import newAxiosConfig from "../../utils/newAxiosConfig";

// Get All Users
const getAllUsers = async (): Promise<UserReadType[]> => {
  try {
    const response = await newAxiosConfig.get("users");
    return response.data;
  } catch (error) {
    console.error("Error getting all users:", error);
    throw error;
  }
};

// Get User By Id
const getUserById = async (userId: string): Promise<UserReadType> => {
  try {
    const response = await newAxiosConfig.get(`users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting user ${userId}:`, error);
    throw error;
  }
};

// Create User
const createUser = async (userData: UserCreateType): Promise<UserReadType> => {
  try {
    const response = await newAxiosConfig.post("users", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Update User
const updateUser = async (
  userId: string,
  userData: UserUpdateType
): Promise<UserReadType> => {
  try {
    const response = await newAxiosConfig.put(`users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user ${userId}:`, error);
    throw error;
  }
};

// Delete User
const deleteUser = async (userId: string): Promise<boolean> => {
  try {
    await newAxiosConfig.delete(`users/${userId}`);
    return true;
  } catch (error) {
    console.error(`Error deleting user ${userId}:`, error);
    throw error;
  }
};

const userService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

export default userService;
