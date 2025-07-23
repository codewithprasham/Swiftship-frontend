import { useEffect, useState } from "react";
import ProductModal from "../components/ProductModal";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/products";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();

      // Fixing the nested array issue:
      const flatProducts = Array.isArray(res.data.products)
        ? res.data.products.flat()
        : [];

      console.log("Products fetched:", flatProducts);
      setProducts(flatProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct.product_id, data); // using `product_id`
      } else {
        await createProduct(data);
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Product
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white">
        <table className="w-full text-sm text-left">
          <thead className="bg-blue-100 text-blue-900 uppercase text-sm font-semibold">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Subcategory</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.product_id}
                  className="border-t hover:bg-gray-50 transition duration-200"
                >
                  <td className="p-4 flex items-center gap-4">
                    <img
                      src={`http://localhost:5000/uploads/${product.image}`}
                      alt={product.product_name}
                      className="w-14 h-14 object-cover rounded border"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {product.product_name}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {product.product_description}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-800">
                    {product.category_name || "—"}
                  </td>
                  <td className="p-4 text-gray-800">
                    {product.subcategory_name || "—"}
                  </td>
                  <td className="p-4 font-semibold text-gray-700">
                    ₹{product.price}
                  </td>
                  <td className="p-4">{product.stock_quantity}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.product_id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedProduct}
      />
    </div>
  );
};

export default Products;
