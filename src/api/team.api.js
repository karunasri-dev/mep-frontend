import { api } from "./axios";

// HTTP-only functions

export const createTeamApi = (teamData) => api.post("/api/teams", teamData);

export const getAllTeamsApi = (filters = {}) =>
  api.get("/api/teams", { params: filters });

export const getTeamByIdApi = (teamId) => api.get(`/api/teams/${teamId}`);

export const updateTeamStatusApi = (teamId, status) =>
  api.patch(`/api/teams/${teamId}/status`, { status });

export const deleteTeamApi = (teamId) => api.delete(`/api/teams/${teamId}`);

export const getUserTeamsApi = () => api.get("/api/teams/my-teams");

export const updateTeamApi = (teamId, teamData) =>
  api.put(`/api/teams/${teamId}`, teamData);
