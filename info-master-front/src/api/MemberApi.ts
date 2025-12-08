import api from "./api";
import type { Member, CreateMember } from "../types/Member";

export const MemberApi = {
  list: () => api.get("/api/members"),
  get: (id: number) => api.get(`/api/members/${id}`),
  create: (data: CreateMember) => api.post("/api/members", data),
  update: (id: number, data: Member) => api.put(`/api/members/${id}`, data),
  remove: (id: number) => api.delete(`/api/members/${id}`),
};

export default MemberApi;
