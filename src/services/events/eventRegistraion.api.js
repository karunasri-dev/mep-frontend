import api from "../auth/index";

// event registration

export const registerForEvent = (eventId, payload) =>
  api.post(`/api/events/${eventId}/register`, payload);

// admin

export const fetchEventRegistrations = (eventId) =>
  api.get(`/api/admin/events/${eventId}/registrations`);

export const updateRegistrationStatus = (id, status, reason) =>
  api.patch(`/api/admin/registrations/${id}/status`, {
    status,
    reason,
  });
