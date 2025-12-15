import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const reset = () => {
    setName("");
    setMobile("");
    setPassword("");
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        name,
        setName,

        mobile,
        setMobile,

        password,
        setPassword,

        isLogin,
        setIsLogin,

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
