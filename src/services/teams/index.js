import api from "../auth/index";

// ADMIN: fetch pending teams
export const fetchPendingTeamsAPI = async () => {
  const res = await api.get("/api/teams/pending");
  return res.data.data; // assuming { status, data }
};

// ADMIN: approve / reject team
export const decideTeamAPI = async (teamId, decision, rejectionReason) => {
  const res = await api.patch(`/api/teams/${teamId}/decision`, {
    decision,
    rejectionReason,
  });
  return res.data.data;
};

// ADMIN :fetch all by status
export const fetechTeamsByStatus = async (status) => {
  const res = await api.get(`/api/teams/${status}`);
  return res.data;
};

// User :create team

export const createTeamAPI = async (teamData) => {
  const res = await api.post("/api/teams", teamData);
  return res.data.data;
};

// public

export const getActiveTeamsAPI = async () => {
  const res = await api.get("/api/teams/active");
  return res.data.data;
};

// check them lateer
export const getAllTeamsApi = (filters = {}) =>
  api.get("/api/teams", { params: filters });

export const getTeamByIdApi = (teamId) => api.get(`/api/teams/${teamId}`);

export const updateTeamStatusApi = (teamId, status) =>
  api.patch(`/api/teams/${teamId}/status`, { status });

export const deleteTeamApi = (teamId) => api.delete(`/api/teams/${teamId}`);

export const getMyTeam = async () => {
  console.log("get my team api called");
  const res = await api.get("/api/teams/my-team");
  console.log("Response of get my teams", res);
  return res.data;
};

export const updateTeamApi = (teamId, teamData) =>
  api.put(`/api/teams/${teamId}`, teamData);
