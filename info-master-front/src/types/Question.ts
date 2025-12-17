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

export type QuestionCreate = Omit<Question, "id">;