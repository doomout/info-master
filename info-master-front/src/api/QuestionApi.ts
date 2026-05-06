import api from "./axios";
import type { Question, QuestionCreate } from "../types/Question";

// ===============================
// Question CRUD
// ===============================
export const QuestionApi = {
  list: () => api.get("/questions"),
  get: (id: number) => api.get<Question>(`/questions/${id}`),
  create: (data: QuestionCreate) => api.post("/questions", data),
  update: (id: number, data: QuestionCreate) => api.put(`/questions/${id}`, data),
  delete: (id: number) => api.delete(`/questions/${id}`),

  // Answer CRUD
  createAnswer: (questionId: number, data: { answerText: string }) =>
    api.put(`/questions/${questionId}/answer`, data),
  updateAnswer: (questionId: number, data: { answerText: string }) =>
    api.put(`/questions/${questionId}/answer`, data),
};
