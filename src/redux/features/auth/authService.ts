import newAxiosConfig from "../../utils/newAxiosConfig";
import { LoginType, RegisterType } from "../../../misc/authType";

// Register
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

    if (userToken) {
      localStorage.setItem("userIdDemo", JSON.stringify(1));
    }

    return userToken;
  } catch (error) {
    console.error("Error during login request:", error);
    throw error;
  }
};

const getUser = async (userId: number) => {
  const response = await newAxiosConfig.get(`users/${userId}`);

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
