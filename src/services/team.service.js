import api from "../api/auth.api";

// ADMIN: fetch pending teams
export const fetchPendingTeams = async () => {
  const res = await api.get("/api/teams/pending");
  return res.data.data; // assuming { status, data }
};

// ADMIN: approve / reject team
export const decideTeam = async (teamId, decision, rejectionReason) => {
  const res = await api.patch(`/api/teams/${teamId}/decision`, {
    decision,
    rejectionReason,
  });
  return res.data.data;
};

// User :create team

export const createTeam = async (teamData) => {
  const res = await api.post("/api/teams", teamData);
  return res.data.data;
};
