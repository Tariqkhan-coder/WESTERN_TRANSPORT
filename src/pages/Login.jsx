import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/Auth/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [adminData, setAdminData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { login, loading, error, token, clearError, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if ((token, user)) navigate("/dashboard");
  }, [token, user, navigate]);

  useEffect(() => {
    clearError();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(adminData);
      if (res?.responseMessage) {
        toast.success(res.responseMessage || "Login successful!");
      } else if (res?.errorMessage) {
        toast.error(res.errorMessage);
      }
    } catch (err) {
      console.error("Admin Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div
        className="relative z-10 w-full max-w-md p-8 rounded-3xl shadow-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-[1.02]"
        style={{
          border: "1.5px solid rgba(255,255,255,0.6)",
        }}
      >
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold mb-2 tracking-wide"
            style={{ color: "var(--color-white)" }}
          >
            Welcome Back
          </h1>
          <div
            className="w-[90%] h-[1px] mx-auto mb-6"
            style={{ backgroundColor: "var(--color-bright-blue1)" }}
          ></div>
          <p className="text-sm" style={{ color: "var(--color-text2)" }}>
            We’re happy to see you again! Please log in to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-text2)" }}
            >
              Username
            </label>
            <Input
              type="text"
              name="username"
              value={adminData.username}
              onChange={handleChange}
              placeholder="Enter Your Username"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--color-text2)" }}
            >
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={adminData.password}
                onChange={handleChange}
                placeholder="Enter Your password"
                className="pr-16"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium transition-all"
                style={{ color: "var(--color-bright-blue1)" }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <p
              className="text-xs mt-2 text-center italic"
              style={{ color: "var(--color-text2)" }}
            >
              💡 Hint: Try using{" "}
              <span style={{ color: "var(--color-orange)", fontWeight: "600" }}>
                Admin
              </span>{" "}
              as your password
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="text-sm mt-2 text-center font-medium"
              style={{ color: "var(--color-red-accent1)" }}
            >
              {error}
            </div>
          )}

          {/* Submit Button */}

          <Button type="submit" className="w-full !h-13 text-md">
            {loading ? "Loading... " : " Sign In"}
          </Button>

          <p
            className="text-center text-sm mt-4"
            style={{ color: "var(--color-text2)" }}
          >
            Don’t have an account yet?{" "}
            <span
              className="cursor-pointer font-medium hover:underline"
              style={{ color: "var(--color-bright-blue1)" }}
              onClick={() => alert("Signup functionality coming soon!")}
            >
              Create one now
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
