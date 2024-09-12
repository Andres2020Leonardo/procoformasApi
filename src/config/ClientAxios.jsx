import axios from "axios";
import config from "./config";
import Decrypt from "./Decrypt";
const ClientAxios = axios.create({
  baseURL: `${config.backendUrl}`
});

ClientAxios.interceptors.request.use(
  (config) => {
    
    let token = localStorage.getItem("token")
    if (token) {
      token=Decrypt(token);
    }
    
    if (token) {
      config.headers.Authorization = `${token}`
    }
    config.headers["Content-Type"] = "multipart/form-data";
    return config;
  },
  (error) => Promise.reject(error)
);

export default ClientAxios;
