import api from "./axios";

const BASE_URL = "/admin";

export const AdminApi = {
  login(data: { username: string; password: string }) {
    return api.post(`${BASE_URL}/login`, data);
  },

  me() {
    return api.get(`${BASE_URL}/me`);
  },

  logout() {
    localStorage.removeItem("adminToken");
    return Promise.resolve();
  },
};
