// src/api/AnswerApi.ts
import api from "./axios";

export type AnswerUpsertRequest = {
  answerText: string;
};

export const AnswerApi = {
  // ✅ 답안 생성 / 수정 (upsert)
  upsert: (questionId: number, data: AnswerUpsertRequest) =>
    api.put(`/api/questions/${questionId}/answer`, data),
};
