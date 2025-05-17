import axios from "axios";

const API_URL = "http://localhost:5000/api/shipments";

export const getShipments = () => axios.get(API_URL);
export const createShipment = (data) => axios.post(API_URL, data);
export const getShipmentById = (id) => axios.get(`${API_URL}/${id}`);
export const updateShipmentStatus = (id, estado) =>
  axios.put(`${API_URL}/${id}`, { estado });
export const deleteShipment = (id) => axios.delete(`${API_URL}/${id}`);
