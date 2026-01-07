import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Phone, Lock, ArrowRight, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { validateLogin } from "../../utils/validation";
import { loginAPI, forgotPasswordAPI } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  //  LOCAL FORM STATE
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotMobile, setForgotMobile] = useState("");

  const navigate = useNavigate();
  const { checkAuth } = useAuth();

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

      // Update auth context immediately after login
      await checkAuth();

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
          <motion.h2
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-100 my-3"
          >
            MANAEDLAPANDALU
          </motion.h2>
          <p className="text-sm sm:text-base text-amber-300/80 mt-1">
            Login to continue your journey
          </p>
        </motion.div>
        <button
          type="button"
          className="w-full text-left  text-amber-300/70 hover:text-amber-200 transition-colors mb-3"
        >
          <Link to="/"> Back to Home</Link>
        </button>

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
            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={() => setShowForgot((v) => !v)}
                className="w-full text-sm text-right text-amber-300/80 hover:text-amber-200"
              >
                {showForgot ? "Close Forgot Password" : "Forgot Password?"}
              </button>
              {showForgot && (
                <div className="mt-2 space-y-2">
                  <label className="text-sm text-amber-200">
                    Enter Mobile Number
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="tel"
                    maxLength={10}
                    value={forgotMobile}
                    onChange={(e) => setForgotMobile(e.target.value)}
                    className="w-full py-3 rounded-xl bg-amber-900/50 border border-amber-700/50 text-amber-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 px-3"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={async () => {
                      try {
                        if (!/^[6-9]\d{9}$/.test(forgotMobile)) {
                          toast.error("Enter a valid 10-digit mobile number");
                          return;
                        }
                        await forgotPasswordAPI(forgotMobile);
                        toast.success(
                          "Reset code sent to your mobile number. Please check your SMS and follow the instructions."
                        );
                        setShowForgot(false); // Close the forgot password form
                      } catch (err) {
                        const message =
                          err.response?.data?.message ||
                          err.message ||
                          "Failed to generate reset token";
                        toast.error(message);
                      }
                    }}
                    className="w-full bg-linear-to-r from-stone-700 to-stone-900 text-white py-3 rounded-xl border border-stone-600 transition"
                  >
                    Send Reset Request
                  </motion.button>
                </div>
              )}
            </div>
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
              onClick={() => navigate("/register")}
              className="w-full text-sm text-amber-300/70 hover:text-amber-200"
            >
              Don&apos;t have an account?
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
