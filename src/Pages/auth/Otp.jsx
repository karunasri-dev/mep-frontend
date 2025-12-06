import { useAuth } from "./../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Lock } from "lucide-react";
import { useRef } from "react";

export default function Otp() {
  const { mobile, otp, setOtp, isLogin, name } = useAuth();
  const navigate = useNavigate();
  const inputsRef = useRef([]);

  const handleChange = (i, v) => {
    const value = v.replace(/\D/g, "");
    const newOtp = [...otp];
    newOtp[i] = value;
    setOtp(newOtp);

    if (value && i < 5) {
      inputsRef.current[i + 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.every((d) => d !== "")) {
      navigate("/auth/success");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-linear-to-br from-amber-950/90 to-orange-950/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-amber-700/50 w-[80%] sm:w-[60%] md:w-[50%] lg:w-[50%] mx-auto d-flex justify-center items-center flex-col mt-10"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-amber-600 to-orange-600 rounded-full mb-6 shadow-lg shadow-amber-900/50"
        >
          <Lock className="w-10 h-10 text-white" />
        </motion.div>
        <motion.div
          animate={{ x: [0, -1, 1, 0] }}
          transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 4 }}
        >
          <h2 className="text-amber-100 mb-3">Verify Your Entry</h2>
        </motion.div>
        <p className="text-amber-300/80">
          Enter the 6-digit code sent to
          <br />
          <span className="text-amber-200">+91 {mobile}</span>
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 justify-center"
        >
          {otp.map((digit, index) => (
            <motion.input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              // onKeyDown={(e) => handleOtpKeyDown(index, e)}
              initial={{ y: 30, opacity: 0, rotateX: -90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{
                delay: 0.4 + index * 0.08,
                type: "spring",
                stiffness: 200,
              }}
              whileFocus={{ scale: 1.1, borderColor: "#f59e0b" }}
              className="w-12 h-16 bg-amber-900/50 border-2 border-amber-700/50 rounded-xl text-amber-100 text-center focus:outline-none focus:border-amber-500 focus:shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all"
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          <motion.button
            type="submit"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 30px rgba(251,191,36,0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-linear-to-r from-amber-600 to-orange-600 text-white rounded-2xl p-5 transition-all border-2 border-amber-500"
          >
            Verify & Enter Arena
          </motion.button>

          <div className="text-center space-y-2">
            <button
              type="button"
              className="text-amber-300/70 hover:text-amber-200 transition-colors"
            >
              Resend Code
            </button>
            <br />
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-amber-300/70 hover:text-amber-200 transition-colors"
            >
              Don't have an account?{" "}
              <span className="hover:underline">Register</span>
            </button>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
}
