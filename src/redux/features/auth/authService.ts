import newAxiosConfig from "../../utils/newAxiosConfig";
import { LoginType, RegisterType } from "../../../misc/authType";

const register = async (userData: RegisterType) => {
  try {
    const response = await newAxiosConfig.post("users", userData);
    return response.data;
  } catch (error) {
    console.error("Error during registration request:", error);
    throw error;
  }
};
const login = async (userData: LoginType) => {
  try {
    const response = await newAxiosConfig.post("auth/login", userData);
    var userToken = response.data;
    return userToken;
  } catch (error) {
    console.error("Error during login request:", error);
    throw error;
  }
};

const getAuthProfile = async () => {
  try {
    const response = await newAxiosConfig.get("auth/profile");
    return response.data;
  } catch (error) {
    console.error("Error during getAuthProfile request:", error);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem("loginToken");
  localStorage.removeItem("authDetails");
  localStorage.removeItem("userIdDemo");
};

const authService = {
  login,
  register,
  getAuthProfile,
  logout,
};

export default authService;
