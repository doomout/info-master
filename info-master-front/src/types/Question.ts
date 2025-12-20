// 서버에서 내려오는 도메인 객체로써 확장될 가능성이 있어서 인터페이스로 정의
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
