import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";
import { motion } from "motion/react";
import { User, Phone, Lock, ArrowRight, Zap } from "lucide-react";
import toast from "react-hot-toast";

export default function Register() {
  const {
    name,
    setName,
    mobile,
    setMobile,
    password,
    setPassword,
    setIsLogin,
  } = useAuth();

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    password: "",
  });

  const validate = () => {
    let temp = { name: "", mobile: "", password: "" };
    let isValid = true;

    // Name
    if (!name.trim()) {
      temp.name = "Name cannot be empty.";
      isValid = false;
    } else if (name.trim().length < 3) {
      temp.name = "Name must be at least 3 characters.";
      isValid = false;
    }

    // Mobile
    if (!mobile.trim()) {
      temp.mobile = "Mobile number is required.";
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(mobile)) {
      temp.mobile = "Enter a valid 10-digit number.";
      isValid = false;
    }

    // Password
    if (!password) {
      temp.password = "Password is required.";
      isValid = false;
    } else if (password.length < 6) {
      temp.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(temp);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;
    // Save to localStorage
    localStorage.setItem("reg_name", name.trim());
    localStorage.setItem("reg_mobile", mobile.trim());
    localStorage.setItem("reg_password", password);

    setIsLogin(false);
    toast.success("Registration successful! Redirecting...");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
      <motion.div
        key="register"
        initial={{ opacity: 0, x: 100, rotateY: -90 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        exit={{ opacity: 0, x: -100, rotateY: 90 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-linear-to-br from-amber-950/90 to-orange-950/90 
        backdrop-blur-xl rounded-3xl  w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl
      p-4 sm:p-6 md:p-8 mt-6 sm:mt-10
 shadow-2xl border-2 border-amber-700/50 
       mx-auto flex flex-col"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-3 text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <Zap className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-amber-400 rounded-full blur-lg sm:blur-xl
"
              />
            </div>
          </motion.div>

          <motion.h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-100 mb-2">
            MANAEDLAPANDALU
          </motion.h1>
          <h2 className="text-amber-100">Register</h2>
        </motion.div>
        <button
          type="button"
          className="w-full text-left  text-amber-300/70 hover:text-amber-200 transition-colors mb-3"
        >
          <Link to="/"> Back to Home</Link>
        </button>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Full Name */}
          <InputField
            label="Full Name"
            icon={<User />}
            value={name}
            onChange={setName}
            error={errors.name}
          />

          {/* Mobile Number */}
          <InputField
            label="Mobile Number"
            icon={<Phone />}
            value={mobile}
            onChange={setMobile}
            maxLength={10}
            type="tel"
            error={errors.mobile}
          />

          {/* Password */}
          <InputField
            label="Password"
            icon={<Lock />}
            type="password"
            value={password}
            onChange={setPassword}
            error={errors.password}
          />

          {/* Submit */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-3 pt-2"
          >
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full bg-linear-to-r from-red-700 to-orange-700 
              text-white rounded-2xl py-3 px-4 sm:py-4 sm:px-6
text-sm sm:text-base
 flex items-center justify-center gap-3 
              border-2 border-red-600 
              focus:outline-none focus:ring-2 focus:ring-red-500`}
            >
              Sign Up <ArrowRight className="w-5 h-5" />
            </motion.button>

            <button
              type="button"
              className="w-full text-amber-300/70 hover:text-amber-200 transition-colors"
            >
              <Link to="/login"> Have a account?Login.</Link>
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}

/* Reusable Input Component */
function InputField({
  label,
  icon,
  value,
  onChange,
  type = "text",
  autoComplete = "off",
  maxLength,
  error,
}) {
  return (
    <motion.div
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <label className="text-amber-200">{label}</label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400">
          {icon}
        </span>
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type={type}
          value={value}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-amber-900/50 border-2 rounded-2xl pl-12 py-2 text-amber-100 focus:outline-none focus:ring-1 focus:ring-amber-500 text-sm sm:text-base
          ${error ? "border-red-500" : "border-amber-600"}`}
        />
      </div>

      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </motion.div>
  );
}
