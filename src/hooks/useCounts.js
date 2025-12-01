import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export function useCounts() {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const prodSnap = await getDocs(collection(db, "products"));
        setProductCount(prodSnap.size);

        const userSnap = await getDocs(collection(db, "users"));
        setUserCount(userSnap.size);

        const orderSnap = await getDocs(collection(db, "orders"));
        setOrderCount(orderSnap.size);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCounts();
  }, []);

  return { productCount, userCount, orderCount };
}
