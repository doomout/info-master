// Axios 기본 인스턴스 설정
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,            // 🔥 세션 필수
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;