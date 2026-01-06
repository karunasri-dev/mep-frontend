import api from "../auth/index";

export const getBullPairStatsAPI = () => {
  return api.get("/api/stats/bullpairs");
};

export const getTeamStatsAPI = () => {
  return api.get("/api/stats/teams");
};

export const getDayLeaderboardAPI = (eventId, dayId) => {
  return api.get(`/api/stats/events/${eventId}/days/${dayId}/leaderboard`);
};
