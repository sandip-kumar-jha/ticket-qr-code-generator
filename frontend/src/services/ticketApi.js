import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const createTicket = async (ticketData) => {
  const response = await api.post("/tickets", ticketData);
  return response.data;
};

export const getTickets = async () => {
  const response = await api.get("/tickets");
  return response.data;
};

export const getTicketById = async (id) => {
  const response = await api.get(`/tickets/${id}`);
  return response.data;
};

export const updateTicket = async (id, ticketData) => {
  const response = await api.put(`/tickets/${id}`, ticketData);
  return response.data;
};

export const deleteTicket = async (id) => {
  const response = await api.delete(`/tickets/${id}`);
  return response.data;
};

export const getTicketQR = async (id) => {
  const response = await api.get(`/tickets/${id}/qr`);
  return response.data;
};