import axios from "axios";
const newAxiosConfig = axios.create({
  baseURL: "http://localhost:5227/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});
newAxiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("loginToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default newAxiosConfig;
