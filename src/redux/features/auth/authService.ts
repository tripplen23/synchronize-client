import newAxiosConfig from "../../utils/newAxiosConfig";
import {
  UserCredential,
  RegisterType,
  UserDetailsType,
} from "../../../misc/authType";

const register = async (userData: RegisterType): Promise<UserDetailsType> => {
  try {
    const response = await newAxiosConfig.post("/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error during registration request:", error);
    throw error;
  }
};

const login = async (userData: UserCredential): Promise<string> => {
  try {
    const response = await newAxiosConfig.post("/auth/login", userData);
    const userToken = response.data;
    return userToken;
  } catch (error) {
    console.error("Error during login request:", error);
    throw error;
  }
};

const getAuthProfile = async (): Promise<UserDetailsType> => {
  try {
    const response = await newAxiosConfig.get("/auth/profile");
    return response.data;
  } catch (error) {
    console.error("Error during getAuthProfile request:", error);
    throw error;
  }
};

const logout = (): void => {
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
