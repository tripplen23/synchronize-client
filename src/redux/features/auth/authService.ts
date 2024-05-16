import axiosConfig from "../../utils/axiosConfig";
import { LoginType } from "../../../misc/authType";

// Register
const register = async (userData: LoginType) => {
  const response = await axiosConfig.post("users", userData);

  return response.data; // token
};

const login = async (userData: LoginType) => {
  const response = await axiosConfig.post("auth/login", userData);

  if (response.data) {
    localStorage.setItem("userIdDemo", JSON.stringify(1));
  }

  return response.data; // token
};

const getUser = async (userId: number) => {
  const response = await axiosConfig.get(`users/${userId}`);

  if (response.data) {
    localStorage.setItem("userDetails", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("loginToken");
  localStorage.removeItem("userDetails");
  localStorage.removeItem("userIdDemo");
};

const authService = {
  getUser,
  logout,
  login,
  register,
};

export default authService;
