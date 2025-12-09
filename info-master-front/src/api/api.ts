// Axios 기본 인스턴스 설정
import axios from "axios";
import type { Question } from "../types/Question";
import type { Tag } from "../types/Tag";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// -------------------------------
// Question CRUD
// -------------------------------
export const QuestionApi = {
  list: () => api.get("/api/questions"),
  get: (id: number) => api.get(`/api/questions/${id}`),
  create: (data: Question) => api.post("/api/questions", data),
  update: (id: number, data: Question) => api.put(`/api/questions/${id}`, data),
  remove: (id: number) => api.delete(`/api/questions/${id}`),
};

// -------------------------------
// Tag CRUD
// -------------------------------
export const TagApi = {
  getAll: () => api.get<Tag[]>("/api/tags"),
  get: (id: number) => api.get<Tag>(`/api/tags/${id}`),
  create: (data: { name: string }) => api.post("/api/tags", data),
  update: (id: number, data: { name: string }) => api.put(`/api/tags/${id}`, data),
  delete: (id: number) => api.delete(`/api/tags/${id}`),
};

export default api;
