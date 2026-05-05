import api from "./axios";
import type { Tag } from "../types/Tag";

// ===============================
// Tag CRUD
// ===============================
export const TagApi = {
  getAll: () => api.get<Tag[]>("/tags"),
  get: (id: number) => api.get<Tag>(`/tags/${id}`),
  create: (data: { name: string }) => api.post("/tags", data),
  update: (id: number, data: { name: string }) => api.put(`/tags/${id}`, data),
  delete: (id: number) => api.delete(`/tags/${id}`),
};