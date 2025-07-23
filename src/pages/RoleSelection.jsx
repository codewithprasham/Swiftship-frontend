import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    navigate(`/auth/${role}`);
  };

  return (
    <div
      className="h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1581091012184-7ab8dcf39c6b?auto=format&fit=crop&w=1950&q=80')", 
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60 z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 bg-white rounded-xl p-10 shadow-lg text-center max-w-md w-full"
      >
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Welcome to Swift Ship 🚚
        </h1>
        <p className="mb-8 text-gray-600">Choose your role to continue</p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleSelect("vendor")}
            className="bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-medium"
          >
            Vendor Login / Register
          </button>
          <button
            onClick={() => handleSelect("customer")}
            className="bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-lg font-medium"
          >
            Customer Login / Register
          </button>
          <button
            onClick={() => handleSelect("admin")}
            className="bg-gray-800 hover:bg-gray-900 transition text-white py-3 rounded-lg font-medium"
          >
            Admin Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleSelection;
