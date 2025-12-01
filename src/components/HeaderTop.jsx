import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";
import Register from "../pages/Register";

const HeaderTop = () => {
  const { user, logout } = useAuth();
  const [time, setTime] = useState(new Date());
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);

  // Update clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="bg-gray-900 text-white text-sm p-2 flex justify-end items-center gap-6">
      {!user ? (
        <>
          <button
            onClick={() => {
              setRedirectAfterLogin(null);
              setIsLoginOpen(true);
            }}
            className="px-2 hover:underline"
          >
            Login
          </button>
          <button
            onClick={() => {
              setRedirectAfterLogin(null);
              setIsRegisterOpen(true);
            }}
            className="px-2 hover:underline"
          >
            Register
          </button>
        </>
      ) : (
        <>
          <span>Hello, {user.name || user.email}</span>
          <span>{formattedTime}</span>
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <Login
          isModal={true}
          closeModal={() => setIsLoginOpen(false)}
          switchToRegister={() => {
            setIsLoginOpen(false);
            setIsRegisterOpen(true);
          }}
          redirectAfterLogin={redirectAfterLogin}
        />
      )}

      {/* Register Modal */}
      {isRegisterOpen && (
        <Register
          isModal={true}
          closeModal={() => setIsRegisterOpen(false)}
          switchToLogin={() => {
            setIsRegisterOpen(false);
            setIsLoginOpen(true);
          }}
          redirectAfterRegister={redirectAfterLogin}
        />
      )}
    </div>
  );
};

export default HeaderTop;
