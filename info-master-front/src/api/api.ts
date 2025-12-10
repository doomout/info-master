// Axios 기본 인스턴스 설정
import axios from "axios";
import type { Question } from "../types/Question";
import type { Tag } from "../types/Tag";
import type { Answer } from "../types/Answer";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// ===============================
// Question CRUD
// ===============================
export const QuestionApi = {
  list: () => api.get("/api/questions"),
  get: (id: number) => api.get(`/api/questions/${id}`),
  create: (data: Question) => api.post("/api/questions", data),
  update: (id: number, data: Question) => api.put(`/api/questions/${id}`, data),
  remove: (id: number) => api.delete(`/api/questions/${id}`),
};

// ===============================
// Tag CRUD
// ===============================
export const TagApi = {
  getAll: () => api.get<Tag[]>("/api/tags"),
  get: (id: number) => api.get<Tag>(`/api/tags/${id}`),
  create: (data: { name: string }) => api.post("/api/tags", data),
  update: (id: number, data: { name: string }) => api.put(`/api/tags/${id}`, data),
  delete: (id: number) => api.delete(`/api/tags/${id}`),
};

// ===============================
// Answer Create/Update 타입 DTO
// ===============================
export type AnswerCreateRequest = {
  questionId: number;
  memberId: number;
  answerText: string;
  score?: number | null;
  comment?: string;
};

export type AnswerUpdateRequest = {
  answerText: string;
  score?: number | null;
  comment?: string;
};

// ===============================
// Answer CRUD
// ===============================
export const AnswerApi = {
  create: (data: AnswerCreateRequest) => api.post("/api/answers", data),

  get: (id: number) => api.get<Answer>(`/api/answers/${id}`),

  update: (id: number, data: AnswerUpdateRequest) =>
    api.put(`/api/answers/${id}`, data),

  delete: (id: number) => api.delete(`/api/answers/${id}`),

  // QuestionId 로 조회
  listByQuestion: (questionId: number) =>
    api.get<Answer[]>(`/api/answers/question/${questionId}`),
};

export default api;
