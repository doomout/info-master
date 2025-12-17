import api from "./axios";
import type { Question, QuestionCreate } from "../types/Question";

// ===============================
// Question CRUD
// ===============================
export const QuestionApi = {
  list: () => api.get("/api/questions"),
  get: (id: number) => api.get<Question>(`/api/questions/${id}`),
  create: (data: QuestionCreate) => api.post("/api/questions", data),
  update: (id: number, data: QuestionCreate) => api.put(`/api/questions/${id}`, data),
  delete: (id: number) => api.delete(`/api/questions/${id}`),
};
