import React, { useState } from "react";
import AuthInput from "../components/AuthInput";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Register({ isModal = false, closeModal, switchToLogin }) {
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // FIXED: correct argument order
      await register(name, email, password);

      if (switchToLogin) switchToLogin();
      if (closeModal) closeModal();

      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Failed to register. Email may already be used.");
    }
  };

  const FormContent = (
    <form onSubmit={handleRegister}>
      {isModal && <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <AuthInput label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
      <AuthInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <AuthInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-2" type="submit">
        Register
      </button>

      {switchToLogin && (
        <p className="mt-3 text-sm text-center">
          Already have an account?{" "}
          <button type="button" onClick={switchToLogin} className="text-green-600 hover:underline">
            Login
          </button>
        </p>
      )}
    </form>
  );

  return isModal ? (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center p-4">
      <div className="bg-white text-black w-full max-w-md rounded-lg p-6 relative">
        {FormContent}

        <button className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 font-bold" onClick={closeModal}>
          ✕
        </button>
      </div>
    </div>
  ) : (
    <AuthLayout title="Register">{FormContent}</AuthLayout>
  );
}

export default Register;
