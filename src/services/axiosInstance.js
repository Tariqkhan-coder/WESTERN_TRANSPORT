import axios from "axios";

const env = import.meta.env;
const BASEURL = env.VITE_BASE_URL_LIVE;

const axiosInstance = axios.create({
  baseURL: BASEURL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default axiosInstance;
