// 서버에서 내려오는 도메인 객체로써 확장될 가능성이 있어서 인터페이스로 정의
// 실제 API 요청 시에는 QuestionCreate 타입을 사용
export interface Question {
  id: number;
  year: number;
  round: number;
  subject: string;
  number: number;
  questionText: string;
  difficulty?: string;
  createdAt?: string;
  updatedAt?: string;
}


// API 요청 전용 DTO 타입
// 질문 생성 및 수정 시에 사용
export type QuestionCreate = {
  year: number;
  round: number;
  subject: string;
  number: number;
  questionText: string;
  tagIds?: number[];
};
