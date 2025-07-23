import axios from "axios";

const API = "http://localhost:5000/api/cart";
const getToken = () => localStorage.getItem("token");

export const getCart = () =>
  axios.get(API, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

export const addToCart = (product_id, quantity) =>
  axios.post(
    API,
    { product_id, quantity },
    { headers: { Authorization: `Bearer ${getToken()}` } }
  );

export const removeFromCart = (cart_id) =>
  axios.delete(`${API}/${cart_id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
