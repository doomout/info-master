import axios from "./axios";

/* 전역 설정 (한 번만) */
axios.defaults.baseURL = "http://localhost:8080";
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
    return axios.post(`${BASE_URL}/logout`);
  },
};
