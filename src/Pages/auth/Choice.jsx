import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";
import { motion } from "motion/react";
import { ArrowRight, Zap } from "lucide-react";
import { useEffect } from "react";

export default function Choice() {
  const navigate = useNavigate();
  const { reset } = useAuth();

  // Clear old data when entering home
  // reset();
  useEffect(() => {
    reset();
  }, []);

  return (
    <motion.div
      key="choice"
      initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.8, rotateX: -90 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-linear-to-br from-amber-950/90 to-orange-950/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-amber-700/50 w-[80%] sm:w-[60%] md:w-[50%] lg:w-[50%] mx-auto d-flex justify-center items-center flex-col mt-10"
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center mb-12"
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
            <Zap className="w-20 h-20 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-amber-400 rounded-full blur-xl"
            />
          </div>
        </motion.div>
        <motion.h1
          className="text-amber-100 mb-2"
          animate={{ x: [0, -2, 2, 0] }}
          transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
        >
          MANAEDLAPANDALU
        </motion.h1>
        <p className="text-amber-300/80">Bull Rock Pulling Championship</p>
      </motion.div>

      <div className="space-y-4">
        <motion.button
          whileHover={{ scale: 1.03, x: 5 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            navigate("/login");
          }}
          className="w-full bg-amber-600 text-white rounded-2xl p-5 flex justify-between"
        >
          Login{" "}
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <ArrowRight className="w-6 h-6" />
          </motion.div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03, x: 5 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/register")}
          className="w-full bg-red-700 text-white rounded-2xl p-5 flex justify-between"
        >
          Register{" "}
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <ArrowRight className="w-6 h-6" />
          </motion.div>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03, x: 5 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/2")}
          type="button"
          className="text-amber-300 w-full"
        >
          Back
        </motion.button>
      </div>
    </motion.div>
  );
}
