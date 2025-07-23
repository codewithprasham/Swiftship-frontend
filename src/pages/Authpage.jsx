import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import logo from "../assets/swiftship-logo.png"; 


const AuthPage = () => {
  const { role } = useParams(); 
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const isRegister = location.pathname.includes("register");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isRegister
        ? "http://localhost:5000/api/auth/register"
        : "http://localhost:5000/api/auth/login";

      const data = isRegister
        ? { ...form, role }
        : { email: form.email, password: form.password };

      const res = await axios.post(url, data);
      const { token, user } = res.data;

      if (user.role !== role) {
        toast.error(
          `You're a ${user.role}, but trying to login as ${role}.`,
          { position: "top-center" }
        );
        setTimeout(() => navigate(`/auth/${user.role}`), 2000);
        return;
      }

      if (!isRegister) {
        login(token);
        toast.success(`Welcome, ${user.name}`, { position: "top-center" });
        navigate(user.role === "vendor" || user.role === "admin" ? "/dashboard" : "/shop");
      } else {
        toast.success("Registration successful. Please login.", {
          position: "top-center",
        });
        setTimeout(() => navigate(`/auth/${role}`), 2000);
      }
    } catch (err) {
      console.error("Auth error:", err);
      toast.error(err?.response?.data?.message || "Authentication failed", {
        position: "top-center",
      });
    }
  };

  const heading = `${isRegister ? "Register" : "Login"} as ${role}`;

  return (
   <>
  <div className="min-h-screen bg-[#0b1120] px-4 flex flex-col items-center justify-center relative">
    
    <div className="absolute top-4 left-4 flex items-center gap-2">
      <img src={logo} alt="Swift Ship" className="h-20" />
      {/* <span className="text-white font-bold text-xl">Swift Ship</span> */}
    </div>

    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#e6f0f8] rounded-xl shadow-2xl p-8 w-full max-w-md space-y-5 mt-12"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">{heading}</h2>

      {isRegister && (
        <>
          <input name="name" placeholder="Name" onChange={handleChange} className="input" required />
          <input name="phone" placeholder="Phone" onChange={handleChange} className="input" />
          <input name="address" placeholder="Address" onChange={handleChange} className="input" />
          <input name="pincode" placeholder="Pincode" onChange={handleChange} className="input" />
        </>
      )}

      <input name="email" type="email" placeholder="Email" onChange={handleChange} className="input" required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input" required />

      <button type="submit" className="w-full bg-[#1e293b] hover:bg-[#111827] text-white py-2 rounded transition font-semibold">
        {isRegister ? "Register" : "Login"}
      </button>

      <p
        onClick={() =>
          navigate(isRegister ? `/auth/${role}` : `/auth/${role}/register`)
        }
        className="text-sm text-center text-[#1e293b] hover:underline cursor-pointer"
      >
        {isRegister
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </p>
    </motion.form>
  </div>
</>
   
  );
};

export default AuthPage;
