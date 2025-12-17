import api from "./axios";
import type { Tag } from "../types/Tag";

// ===============================
// Tag CRUD
// ===============================
export const TagApi = {
  getAll: () => api.get<Tag[]>("/api/tags"),
  get: (id: number) => api.get<Tag>(`/api/tags/${id}`),
  create: (data: { name: string }) => api.post("/api/tags", data),
  update: (id: number, data: { name: string }) => api.put(`/api/tags/${id}`, data),
  delete: (id: number) => api.delete(`/api/tags/${id}`),
};