import axios from "axios";
import configEnv from "./config";
import Decrypt from "./Decrypt";
const ClientAxios = axios.create({
  // baseURL: "https://back.procformas.site"  
  baseURL: configEnv.backendUrl
});

ClientAxios.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "multipart/form-data";
    let token = localStorage.getItem("token")
    if (token) {
      token=Decrypt(token);
    }
    
    if (token) {
      config.headers.Authorization = `${token}`
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

export default ClientAxios;
