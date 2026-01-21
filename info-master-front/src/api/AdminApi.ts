import axios from "./axios";

axios.defaults.headers.common["Content-Type"] = "application/json";

const BASE_URL = "/admin";

export const AdminApi = {
  login(data: { username: string; password: string }) {
    return axios.post(`${BASE_URL}/login`, data);
  },

  me() {
    return axios.get(`${BASE_URL}/me`);
  },

  logout() {
    localStorage.removeItem("adminToken");
    return Promise.resolve();
  },
};
