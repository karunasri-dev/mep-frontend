import { createContext, useContext, useEffect, useState } from "react";
import { verifyUser } from "../services/auth/index";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await verifyUser();

      if (!res?.user) {
        throw new Error("No user in session");
      }

      setUser(res.user);
    } catch (err) {
      if (err.response?.status === 401) {
        console.info("No active session");
      } else {
        console.error("Auth check failed:", err);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const handleAuthRefreshed = (e) => {
      const refreshedUser = e.detail?.user;
      if (refreshedUser) {
        setUser(refreshedUser);
      }
    };

    const handleAuthLogout = () => {
      setUser(null);
    };

    window.addEventListener("auth-refreshed", handleAuthRefreshed);
    window.addEventListener("auth-logout", handleAuthLogout);

    return () => {
      window.removeEventListener("auth-refreshed", handleAuthRefreshed);
      window.removeEventListener("auth-logout", handleAuthLogout);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogin: !!user,
        loading,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
