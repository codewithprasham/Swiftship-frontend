import axios from "axios";

const API = "http://localhost:5000/api/orders";
const getToken = () => localStorage.getItem("token");

export const placeOrder = () =>
  axios.post(API, {}, { headers: { Authorization: `Bearer ${getToken()}` } });

export const getCustomerOrders = () =>
  axios.get(API, { headers: { Authorization: `Bearer ${getToken()}` } });

export const getVendorOrders = () =>
  axios.get(`${API}/vendor`, { headers: { Authorization: `Bearer ${getToken()}` } });
