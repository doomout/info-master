import axios from "axios";

const BASE_URL = "/admin"; // proxy 기준

export const AdminApi = {
  login(data: { username: string; password: string }) {
    return axios.post(`${BASE_URL}/login`, data, {
      withCredentials: true, // ⭐ 세션 기반 로그인 대비
    });
  },

  logout() {
    return axios.post(`${BASE_URL}/logout`, {}, {
      withCredentials: true,
    });
  },
};
