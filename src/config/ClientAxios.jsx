import axios from "axios";
import config from "./config";

const ClientAxios = axios.create({
  baseURL: `${config.backendUrl}`,
});

ClientAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
      
    }
    config.headers["Content-Type"] = "multipart/form-data";
    return config;
  },
  (error) => Promise.reject(error)
);

export default ClientAxios;
