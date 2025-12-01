import React from "react";

function AuthInput({ label, type = "text", value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium text-gray-800">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
        placeholder={label}
      />
    </div>
  );
}

export default AuthInput;
