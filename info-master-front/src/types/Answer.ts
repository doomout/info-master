// 서버에서 내려오는 답안 DTO
export interface Answer {
  id?: number;          // 새로 생성 시 undefined
  questionId: number;   // 어떤 문제의 답안인지
  answerText: string;

  // 선택 메타 (나중에 쓰고 싶으면)
  score?: number | null;
  comment?: string | null;

  createdAt?: string;
  updatedAt?: string;
}
