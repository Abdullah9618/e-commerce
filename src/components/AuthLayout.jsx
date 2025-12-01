import React from "react";

function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
