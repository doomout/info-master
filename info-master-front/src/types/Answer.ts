export interface Answer {
  id?: number;           // 새로 생성할 때는 없음
  questionId: number;
  memberId?: number;     // 로그인 운영되면 필요, 지금은 optional 처리
  answerText: string;
  score?: number | null;
  comment?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
