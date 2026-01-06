import React, { useEffect, useState } from "react";

const HeaderTop = () => {
  const [time, setTime] = useState(new Date());

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
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white text-sm p-3 flex justify-between items-center">
      <div className="text-blue-100">
        Welcome to Subhan Arts - Premium Clothing Collection
      </div>
      <div className="text-blue-100">
        {formattedTime}
      </div>
    </div>
  );
};

export default HeaderTop;
