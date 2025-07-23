import { useState, useEffect } from "react";
import {
  getCategories,
  getSubcategories,
} from "../api/categories"; // Make sure these are correctly named in api/categories.js

const ProductModal = ({ isOpen, onClose, onSubmit, initialData }) => {

  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock_quantity: "",
    desc: "",
    image: null,
    category_id: "",
    subcategory_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // Load categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  // Load subcategories when category changes
  useEffect(() => {
    if (formData.category_id) {
      loadSubcategories(formData.category_id);
    } else {
      setSubcategories([]);
    }
  }, [formData.category_id]);

  // When editing an existing product
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        price: initialData.price || "",
        stock_quantity: initialData.stock_quantity || "",
        desc: initialData.desc || "",
        image: null,
        category_id: initialData.category_id || "",
        subcategory_id: initialData.subcategory_id || "",
      });

      if (initialData.category_id) {
        loadSubcategories(initialData.category_id);
      }
    }
  }, [initialData]);

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      console.log("Categories loaded:", res);
      setCategories(res.data.categories); 
    } catch (err) {
      console.error("Error loading categories", err);
    }
  };

  const loadSubcategories = async (categoryId) => {
    try {
      const res = await getSubcategories(categoryId);
      setSubcategories(res.data.subcategories); // updated to match backend response
    } catch (err) {
      console.error("Error loading subcategories", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("stock_quantity", formData.stock_quantity);
    data.append("desc", formData.desc);
    data.append("category_id", formData.category_id);
    data.append("subcategory_id", formData.subcategory_id);
    if (formData.image) {
      data.append("image", formData.image);
    }

    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Product" : "Add Product"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            name="stock_quantity"
            placeholder="Stock Quantity"
            value={formData.stock_quantity}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            name="desc"
            placeholder="Description"
            value={formData.desc}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          {/* Category */}
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Subcategory */}
          <select
            name="subcategory_id"
            value={formData.subcategory_id}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            disabled={!formData.category_id}
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />

          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {initialData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
