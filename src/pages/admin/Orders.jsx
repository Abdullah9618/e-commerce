import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Chip,
  Stack,
  Paper,
} from "@mui/material";

const headerColor = "#1e40af";
const borderColor = "#e0e0e0";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);

  // Fetch orders from Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(list);

      const pending = list.filter(o => o.status !== "completed").length;
      setPendingCount(pending);
    };

    fetchOrders();
  }, []);

  // Mark completed (UI only)
  const markCompleted = (orderId) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: "completed" } : o))
    );

    const pending = orders.filter(o => o.id !== orderId && o.status !== "completed").length;
    setPendingCount(pending);
  };

  return (
    <Box p={3} fontFamily="Roboto">
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <Typography variant="h4" fontWeight={700} color={headerColor}>
          Orders
        </Typography>
        <Chip label={`${pendingCount} Pending`} color="error" />
      </Stack>

      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <Stack spacing={3}>
          {orders.map(order => (
            <Paper key={order.id} elevation={3}>
              <Box
                p={3}
                borderRadius={2}
                bgcolor={order.status === "completed" ? "#d1fae5" : "#ffffff"}
                position="relative"
              >
                <Typography variant="h6" mb={1} fontWeight={600} color={headerColor}>
                  Order ID: {order.id}
                </Typography>

                <Box mb={2}>
                  <Typography variant="subtitle1" fontWeight={600}>User Info:</Typography>
                  <Typography>Name: {order.userInfo?.name}</Typography>
                  <Typography>Email: {order.userInfo?.email}</Typography>
                  <Typography>Contact: {order.userInfo?.contact}</Typography>
                  <Typography>Address: {order.userInfo?.address}</Typography>
                </Box>

                <Box mb={2}>
                  <Typography variant="subtitle1" fontWeight={600}>Products:</Typography>

                  {order.products && order.products.length > 0 ? (
                    <Table size="small">
                      <TableHead sx={{ backgroundColor: "#f3f4f6" }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600, borderColor }}>Product</TableCell>
                          <TableCell sx={{ fontWeight: 600, borderColor }}>Qty × Price</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {order.products.map((prod, idx) => (
                          <TableRow key={idx} sx={{ "&:hover": { backgroundColor: "#f9fafb" } }}>
                            <TableCell
                              sx={{
                                borderColor,
                                display: "flex",
                                gap: 1,
                                alignItems: "center",
                              }}
                            >
                              {prod.name}

                              {/* Rounded category chip */}
                              {prod.category && (
                                <Chip
                                  label={prod.category}
                                  size="small"
                                  sx={{
                                    backgroundColor: "#e0e7ff",
                                    color: "#1e3a8a",
                                    fontWeight: 600,
                                    borderRadius: "16px",
                                    height: "22px",
                                  }}
                                />
                              )}
                            </TableCell>

                            <TableCell sx={{ borderColor }}>
                              {prod.quantity} × Rs {prod.price}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <Typography>No products found.</Typography>
                  )}
                </Box>

                <Stack direction="row" justifyContent="space-between" fontWeight="bold" mb={1}>
                  <Typography>Total:</Typography>
                  <Typography>Rs {order.total}</Typography>
                </Stack>

                <Typography variant="caption" color="text.secondary">
                  Ordered on:{" "}
                  {order.createdAt?.toDate
                    ? order.createdAt.toDate().toLocaleString()
                    : "N/A"}
                </Typography>

                {/* MARK COMPLETED BUTTON */}
                {order.status !== "completed" ? (
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ position: "absolute", top: 16, right: 16 }}
                    onClick={() => markCompleted(order.id)}
                  >
                    Mark as Completed
                  </Button>
                ) : (
                  <Chip
                    label="Completed"
                    size="small"
                    color="success"
                    sx={{ position: "absolute", top: 16, right: 16 }}
                  />
                )}
              </Box>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default Orders;
