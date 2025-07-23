import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  deleteCategory,
  createSubcategory,
  deleteSubcategory,
  getSubcategories,
} from "../api/categories";
import { toast } from "react-toastify";

const CategoryMaster = () => {
  const [categories, setCategories] = useState([]);
  const [subcategoriesMap, setSubcategoriesMap] = useState({});
  const [newCategory, setNewCategory] = useState("");
  const [subcatInputs, setSubcatInputs] = useState({});
  const [subcatDescInputs, setSubcatDescInputs] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data.categories);

      res.data.categories.forEach(async (cat) => {
        try {
          const subs = await getSubcategories(cat.id);
          setSubcategoriesMap((prev) => ({
            ...prev,
            [cat.id]: subs.data.subcategories,
          }));
        } catch {
          toast.error(`Failed to fetch subcategories for ${cat.name}`);
        }
      });
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await createCategory({ name: newCategory });
      setNewCategory("");
      fetchCategories();
      toast.success("Category added");
    } catch {
      toast.error("Error adding category");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      fetchCategories();
      toast.success("Category deleted");
    } catch {
      toast.error("Error deleting category");
    }
  };

  const handleAddSubcategory = async (name, category_id, desc) => {
    const trimmedName = name?.trim?.();
    const trimmedDesc = desc?.trim?.();
    if (!trimmedName) return;

    try {
      await createSubcategory({
        name: trimmedName,
        category_id,
        desc: trimmedDesc,
      });

      setSubcatInputs((prev) => ({ ...prev, [category_id]: "" }));
      setSubcatDescInputs((prev) => ({ ...prev, [category_id]: "" }));
      fetchCategories();
      toast.success("Subcategory added");
    } catch {
      toast.error("Error adding subcategory");
    }
  };

  const handleDeleteSubcategory = async (id) => {
    try {
      await deleteSubcategory(id);
      fetchCategories();
      toast.success("Subcategory deleted");
    } catch {
      toast.error("Error deleting subcategory");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">🗂️ Category Master</h1>

      {/* Add Category */}
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category Name"
          className="flex-1 border border-gray-300 p-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          + Add Category
        </button>
      </div>

      {/* List Categories */}
      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white border rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">{cat.name}</h2>
              <button
                onClick={() => handleDeleteCategory(cat.id)}
                className="text-red-500 hover:underline text-sm"
              >
                Delete Category
              </button>
            </div>

            {/* Subcategory Inputs */}
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <input
                type="text"
                value={subcatInputs[cat.id] || ""}
                onChange={(e) =>
                  setSubcatInputs((prev) => ({ ...prev, [cat.id]: e.target.value }))
                }
                placeholder="Subcategory Name"
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="text"
                value={subcatDescInputs[cat.id] || ""}
                onChange={(e) =>
                  setSubcatDescInputs((prev) => ({ ...prev, [cat.id]: e.target.value }))
                }
                placeholder="Subcategory Description"
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                onClick={() =>
                  handleAddSubcategory(
                    subcatInputs[cat.id],
                    cat.id,
                    subcatDescInputs[cat.id]
                  )
                }
                disabled={!subcatInputs[cat.id]?.trim?.()}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                + Add Subcategory
              </button>
            </div>

            {/* Subcategory List */}
            <div className="mt-2">
              {subcategoriesMap[cat.id]?.length > 0 ? (
                <table className="w-full text-left text-gray-700">
                  <thead>
                    <tr className="border-b text-sm text-gray-500">
                      <th className="py-2 pr-4">Name</th>
                      <th className="py-2 pr-4">Description</th>
                      <th className="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subcategoriesMap[cat.id].map((sub) => (
                      <tr key={sub.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 pr-4 font-medium">{sub.name}</td>
                        <td className="py-2 pr-4">{sub.desc || "—"}</td>
                        <td className="py-2">
                          <button
                            onClick={() => handleDeleteSubcategory(sub.id)}
                            className="text-red-500 hover:underline text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-sm text-gray-500">No subcategories yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryMaster;
