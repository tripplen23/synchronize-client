import axios from "axios";
const newAxiosConfig = axios.create({
  baseURL: "http://localhost:5227/api/v1/",
});

export default newAxiosConfig;