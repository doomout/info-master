// API 타입 정의
export interface Member {
  id: number;
  name: string;
  email: string;
  password?: string;   // 서버에서 내려오지 않음
  createdAt?: string;
  updatedAt?: string;
}
