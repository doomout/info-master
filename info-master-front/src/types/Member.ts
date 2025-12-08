// API 타입 정의
export interface Member {
  id: number;          
  name: string;
  email: string;
  password?: string;   
  createdAt?: string;
  updatedAt?: string;
}

// 멤버 생성용 타입 정의
export interface CreateMember {
  name: string;
  email: string;
  password: string;
}