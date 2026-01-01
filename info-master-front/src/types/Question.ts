import type  { Answer } from "./Answer";

// 서버에서 내려오는 응답 DTO
export interface Question {
  id: number;
  exam_year: number;
  round: number;
  number: number;
  questionText: string;
  difficulty?: string;

  tagId: number;
  tagName: string;

  // 🔥 추가: 답안 (없을 수도 있음)
  answer?: Answer | null;

  createdAt?: string;
  updatedAt?: string;
}


// API 요청 전용 DTO 타입
// 질문 생성 및 수정 시에 사용
export interface QuestionCreate {
  exam_year: number;
  round: number;
  number: number;
  questionText: string;
  tagId: number;
  difficulty?: string;
}
