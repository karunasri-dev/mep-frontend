import { useAuth } from "./../../context/AuthContext";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const { isLogin, name, reset } = useAuth();
  const navigate = useNavigate();

  // Optionally reset after 3 seconds...
  useEffect(() => {
    setTimeout(() => {
      reset();
    }, 3000);
  }, []);

  setTimeout(() => {
    navigate("/dashboard");
  }, 3000);

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.3, rotateZ: -180 }}
      animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
      exit={{ opacity: 0, scale: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-linear-to-br from-amber-950/90 to-orange-950/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-amber-700/50 w-[80%] sm:w-[60%] md:w-[50%] lg:w-[50%] mx-auto d-flex justify-center items-center flex-col mt-10"
    >
      <motion.div
        className="text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            delay: 0.4,
            duration: 0.6,
            times: [0, 0.5, 1],
          }}
          className="inline-block mb-6 relative"
        >
          <CheckCircle2 className="w-28 h-28 text-green-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.5)]" />
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-green-400 rounded-full blur-2xl"
          />
        </motion.div>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-amber-100 mb-4"
        >
          {isLogin ? "Welcome Back, Champion!" : "Victory is Yours!"}
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-amber-300/80"
        >
          {isLogin
            ? "Ready to witness the power"
            : `Welcome to the arena, ${name}!`}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
