import axios from 'axios';
import { useAuthStore } from './store';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data: { username: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
};

// Projects API
export const projectsAPI = {
  getProjects: (search?: string) =>
    api.get('/projects', { params: { search } }),
  getProject: (id: string) =>
    api.get(`/projects/${id}`),
  createProject: (data: { title: string; description?: string; content: string }) =>
    api.post('/projects', data),
  updateProject: (id: string, data: { title: string; description?: string; content: string }) =>
    api.put(`/projects/${id}`, data),
  deleteProject: (id: string) =>
    api.delete(`/projects/${id}`),
};