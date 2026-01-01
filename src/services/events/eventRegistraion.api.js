import api from "../auth/index";

// event registration

export const registerForEvent = (eventId, payload) =>
  api.post(`/api/events/${eventId}/register`, payload);

// admin

export const fetchEventRegistrations = (eventId) => {
  return api.get(`/api/admin/registrations`, {
    params: { eventId },
  });
};

export const updateRegistrationStatus = (registrationId, status, reason) => {
  return api.patch(`/api/admin/registrations/${registrationId}`, {
    status,
    reason,
  });
};
