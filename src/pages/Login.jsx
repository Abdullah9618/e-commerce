// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthInput from "../components/AuthInput";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";
import { sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth";
import { auth } from "../firebase";

function Login({ isModal = false, closeModal, switchToRegister, redirectAfterLogin }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const oobCode = searchParams.get("oobCode");

  /* -------------------------------------------
      🔥 1️⃣ If mode = resetPassword → Show Reset UI
  ------------------------------------------- */
  if (mode === "resetPassword" && oobCode) {
    return (
      <AuthLayout title="Reset Password">
        <ResetPasswordForm oobCode={oobCode} />
      </AuthLayout>
    );
  }

  /* -------------------------------------------
      Normal Login Page
  ------------------------------------------- */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setResetMessage("");

    try {
      await login(email, password);

      if (isModal && closeModal) closeModal();

      if (redirectAfterLogin) navigate(redirectAfterLogin);
      else if (!isModal) navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password.");
    }
  };

  const handleResetPassword = async () => {
    setResetMessage("");
    setError("");

    if (!email) {
      setResetMessage("Please enter your email above.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email, {
        url: window.location.origin + "/login",
      });
      setResetMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      console.error("Reset password error:", err);
      setError(err.message);
    }
  };

  const FormContent = (
    <form onSubmit={handleLogin} className="space-y-4">
      {isModal && <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>}

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {resetMessage && <p className="text-green-600 text-sm">{resetMessage}</p>}

      <AuthInput
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <AuthInput
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <p className="text-sm text-right">
        <button
          type="button"
          className="text-blue-600 hover:underline"
          onClick={handleResetPassword}
        >
          Forgot Password?
        </button>
      </p>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Login
      </button>

      {switchToRegister && (
        <p className="mt-3 text-sm text-center">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={switchToRegister}
            className="text-green-600 hover:underline"
          >
            Register
          </button>
        </p>
      )}
    </form>
  );

  return isModal ? (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center p-4">
      <div className="bg-white text-black w-full max-w-md rounded-lg p-6 relative">
        {FormContent}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  ) : (
    <AuthLayout title="Login">{FormContent}</AuthLayout>
  );
}

export default Login;

/* -------------------------------------------
    🔥 Reset Password Component
------------------------------------------- */
function ResetPasswordForm({ oobCode }) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    setMessage("");
    setError("");

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setMessage("Password reset successful! Redirecting...");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Reset error:", err);
      setError("Invalid or expired reset link.");
    }
  };

  return (
    <div className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-600">{message}</p>}

      <AuthInput
        label="New Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleReset}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Reset Password
      </button>
    </div>
  );
}
