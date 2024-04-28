import axios from "axios";
import { urlAPI } from "./config";

const httpAxios = axios.create({
  baseURL: urlAPI,
  headers: {
    "X-Custom-Header": "foobar"
  },
});
httpAxios.interceptors.request.use(config => {
  const UserAdmin = sessionStorage.getItem('useradmin');
  if (UserAdmin) {
    const token = JSON.parse(UserAdmin).token;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpAxios.interceptors.response.use((response) => {
  return response.data;
});

export default httpAxios;