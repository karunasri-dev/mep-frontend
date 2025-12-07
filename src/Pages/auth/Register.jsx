import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";
import { motion } from "motion/react";
import { User, Phone, ArrowRight } from "lucide-react";

export default function Register() {
  const { name, setName, mobile, setMobile, setIsLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && mobile.length === 10) {
      setIsLogin(false);
      navigate("/auth/otp");
    }
  };

  return (
    <motion.div
      key="register"
      initial={{ opacity: 0, x: 100, rotateY: -90 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      exit={{ opacity: 0, x: -100, rotateY: 90 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-linear-to-br from-amber-950/90 to-orange-950/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-amber-700/50 w-[80%] sm:w-[60%] md:w-[50%] lg:w-[50%] mx-auto d-flex justify-center items-center flex-col mt-10"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <motion.div
          animate={{ rotate: [0, 3, -3, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        >
          <h2 className="text-amber-100 mb-2">Join the Challenge</h2>
        </motion.div>
        <p className="text-amber-300/80">Register to become a champion</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
        >
          <label className="text-amber-200">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-amber-900/50 border-2 rounded-2xl pl-12 py-4 text-amber-100"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
        >
          <label className="text-amber-200">Mobile Number</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="tel"
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full bg-amber-900/50 border-2 rounded-2xl pl-12 py-4 text-amber-100"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-3 pt-2"
        >
          <motion.button
            type="submit"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 30px rgba(239,68,68,0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-linear-to-r from-red-700 to-orange-700 text-white rounded-2xl p-5 flex items-center justify-center gap-3 transition-all border-2 border-red-600"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <button
            type="button"
            onClick={() => navigate("/auth")}
            className="w-full text-amber-300/70 hover:text-amber-200 transition-colors"
          >
            Back to Home
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
}
