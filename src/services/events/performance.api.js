import api from "../auth/index";

// Public
export const getApprovedTeams = (eventId) => {
  return api.get(`/api/performance/${eventId}/approved-teams`);
};

export const getLeaderboard = (eventId) => {
  return api.get(`/api/performance/${eventId}/leaderboard`);
};

// Admin
export const recordTeamPerformance = (eventId, data) => {
  return api.post(`/api/performance/${eventId}/team-performance`, data);
};

export const recordBullPerformance = (eventId, data) => {
  return api.post(`/api/performance/${eventId}/bull-performance`, data);
};
