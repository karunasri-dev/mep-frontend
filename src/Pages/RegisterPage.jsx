import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (form.name === "") {
      alert("Please enter your name");
      return false;
    }
    if (form.email === "") {
      alert("Please enter your email address");
      return false;
    }
    if (form.password === "") {
      alert("Please enter your password");
      return false;
    }
    return true;
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/login");
    }
    console.log(form);
  };

  return (
    <AuthLayout title="Create Account">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-gray-300 text-sm">Full Name</label>
          <input
            type="text"
            className="w-full mt-1 px-4 py-2 bg-white/10 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="text-gray-300 text-sm">Email</label>
          <input
            type="email"
            className="w-full mt-1 px-4 py-2 bg-white/10 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label className="text-gray-300 text-sm">Password</label>
          <input
            type="password"
            className="w-full mt-1 px-4 py-2 bg-white/10 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-white text-lg font-semibold shadow-md"
        >
          Register
        </button>

        <p className="text-center text-gray-300 text-sm mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
