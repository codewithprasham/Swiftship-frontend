import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/categories",
});

// Automatically attach token to requests (if needed)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ----- Category APIs -----
export const getCategories = () => API.get("/");
export const createCategory = (data) => API.post("/", data);
export const updateCategory = (id, data) => API.put(`/${id}`, data);
export const deleteCategory = (id) => API.delete(`/${id}`);

// ----- Subcategory APIs -----
export const getSubcategories = (categoryId) =>
  API.get(`/subcategories/${categoryId}`);  
export const createSubcategory = (data) =>
  API.post("/subcategories", data); 
export const updateSubcategory = (id, data) =>
  API.put(`/subcategories/${id}`, data);
export const deleteSubcategory = (id) =>
  API.delete(`/subcategories/${id}`);
