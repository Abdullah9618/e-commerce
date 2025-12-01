import React from "react";
import { useLocation, Link } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();
  const products = location.state?.products || [];

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-2xl font-bold text-green-600">Order Placed Successfully 🎉</h1>

      {products.length > 0 && (
        <div className="mt-5 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-3">Your Ordered Items:</h2>

          {products.map((item) => (
            <div
              key={item.id}
              className="border p-3 rounded mb-3 shadow bg-white"
            >
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-600">Price: Rs {item.price}</p>
            </div>
          ))}
        </div>
      )}

      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default OrderSuccess;
