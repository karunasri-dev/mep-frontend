import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Phone, Lock, ArrowRight, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { validateLogin } from "../../utils/validation";
import { loginAPI } from "../../services/auth";

export default function Login() {
  //  LOCAL FORM STATE
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid, errors } = validateLogin({ mobileNumber, password });
    setErrors(errors);
    if (!isValid) return;

    try {
      setLoading(true);

      const res = await loginAPI({ mobileNumber, password });
      const user = res.data.data.user;

      if (!user) {
        throw new Error("Malformed login response");
      }

      toast.success("Login successful");
      navigate("/bulls");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Invalid mobile number or password";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, x: 100, rotateY: -90 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        exit={{ opacity: 0, x: -100, rotateY: 90 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="
      w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl
          bg-linear-to-br from-amber-950/90 to-orange-950/90
          backdrop-blur-xl
          rounded-3xl
        p-4 sm:p-6 md:p-8 mt-6 sm:mt-10
          shadow-2xl
          border border-amber-700/50
        "
      >
        {/* HEADER */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6 sm:mb-8"
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

          <motion.h2
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-100 mb-2"
          >
            MANAEDLAPANDALU
          </motion.h2>
          <p className="text-sm sm:text-base text-amber-300/80 mt-1">
            Login to continue your journey
          </p>
        </motion.div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* MOBILE */}
          <div>
            <label className="text-sm text-amber-200">Mobile Number</label>
            <div className="relative mt-1">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 w-4 h-4" />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="tel"
                maxLength={10}
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="
                  w-full
                  pl-11
                  py-3
                  rounded-xl
                  bg-amber-900/50
                  border border-amber-700/50
                  text-amber-100
                  text-sm sm:text-base
                  focus:outline-none focus:ring-2 focus:ring-amber-500
                "
              />
            </div>
            {errors.mobileNumber && (
              <p className="text-red-400 text-sm mt-1">{errors.mobileNumber}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-amber-200">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 w-4 h-4" />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full
                  pl-11
                  py-3
                  rounded-xl
                  bg-amber-900/50
                  border border-amber-700/50
                  text-amber-100
                  text-sm sm:text-base
                  focus:outline-none focus:ring-2 focus:ring-amber-500
                "
              />
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* SUBMIT */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-3 pt-2"
          >
            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(251,191,36,0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="
                w-full
                flex items-center justify-center gap-2
                bg-linear-to-r from-amber-600 to-orange-600
                text-white
                py-3 sm:py-4
                rounded-xl
                border border-amber-500
                hover:opacity-90
                transition
              "
            >
              {loading ? "Logging in..." : "Login"}{" "}
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <button
              type="button"
              onClick={() => navigate("/auth")}
              className="w-full text-sm text-amber-300/70 hover:text-amber-200"
            >
              Back to Home
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
