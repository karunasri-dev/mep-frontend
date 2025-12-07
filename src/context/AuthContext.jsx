import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const reset = () => {
    setName("");
    setMobile("");
    setOtp(["", "", "", "", "", ""]);
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        name,
        setName,
        mobile,
        setMobile,
        isLogin,
        setIsLogin,
        otp,
        setOtp,
        reset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
