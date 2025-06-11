import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api'
});

export const saveAvailability = (data) => API.post('/availability', data);
export const getAvailabilityByLink = (linkId) => API.get(`/availability/${linkId}`);
export const getBookedSlots = (linkId, date) => API.get(`/bookings/${linkId}/${date}`);
export const bookSlot = (data) => API.post('/book', data);
