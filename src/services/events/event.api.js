import api from "../auth/index";

export const getAllEvents = () => api.get("/api/admin/events");

export const createEvent = (data) => api.post("/api/admin/events", data);

export const updateEventDetails = (id, data) =>
  api.put(`/api/admin/events/${id}`, data);

export const deleteEvent = (id) => api.delete(`/api/admin/events/${id}`);

export const updateEventState = (id, state) =>
  api.patch(`/api/admin/events/${id}/state`, { state });
