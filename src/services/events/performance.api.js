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

// BullPair-level APIs
export const getBullPairEntriesPublic = (eventId) => {
  return api.get(`/api/performance/${eventId}/bullpairs/public`);
};

export const getBullPairEntriesAdmin = (eventId) => {
  return api.get(`/api/performance/${eventId}/bullpairs`);
};

export const updateBullPairStatus = (eventId, entryId, status) => {
  return api.patch(`/api/performance/${eventId}/bullpairs/${entryId}/status`, {
    status,
  });
};

export const updateBullPairPerformance = (eventId, entryId, data) => {
  return api.patch(
    `/api/performance/${eventId}/bullpairs/${entryId}/performance`,
    data
  );
};

// Day-wise APIs
export const getEventDaysPublic = (eventId) => {
  return api.get(`/api/events/${eventId}/days`);
};

export const getEventDaysAdmin = (eventId) => {
  return api.get(`/api/admin/events/${eventId}/days`);
};

export const createEventDay = (eventId, data) => {
  return api.post(`/api/admin/events/${eventId}/days`, data);
};

export const updateEventDayStatus = (dayId, status) => {
  return api.patch(`/api/admin/event-days/${dayId}/status`, { status });
};

export const addBullPairsToDay = (dayId, entries) => {
  return api.post(`/api/admin/event-days/${dayId}/bullpairs`, { entries });
};

export const getDayBullPairsPublic = (dayId) => {
  return api.get(`/api/event-days/${dayId}/bullpairs`);
};

export const updateDayBullPairStatus = (entryId, status) => {
  return api.patch(`/api/admin/day-bullpairs/${entryId}/status`, { status });
};

export const updateDayBullPairPerformance = (entryId, data) => {
  return api.patch(`/api/admin/day-bullpairs/${entryId}/performance`, data);
};

export const setDayBullPairWinner = (entryId) => {
  return api.patch(`/api/admin/day-bullpairs/${entryId}/winner`);
};
