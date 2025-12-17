import api from "./axios";
import type { Answer } from "../types/Answer";

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
    api.get<Answer>(`/api/answers/question/${questionId}`),
};
