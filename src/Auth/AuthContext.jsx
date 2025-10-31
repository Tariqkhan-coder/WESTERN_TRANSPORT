import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axiosInstance from "@/services/axiosInstance";
import { adminService } from "@/services/fetchData";
const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clearError = () => setError(null);

  const checkAuth = () => {
    setLoading(true);

    const savedToken = Cookies.get("auth_token");
    if (!savedToken && token === undefined) {
      setToken(null);
      setUser(null);
      setLoading(false);
      return;
    }

    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${savedToken}`;
    setToken(savedToken);
    setLoading(false);
  };

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    console.log("Logging in with credentials:", credentials);
    try {
      const response = await adminService.loginAdmin(credentials);
      const { token, username } = response.data;
      console.log("Login response:", response.data);

      Cookies.set("auth_token", token, { expires: 7, sameSite: "strict" });
      setToken(token);
      setUser(username);

      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("auth_token");
    setUser(null);
    setToken(null);
    setError(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    token,
    loading,
    error,
    login,
    logout,
    checkAuth,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
