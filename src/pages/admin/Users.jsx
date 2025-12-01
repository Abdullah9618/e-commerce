import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// Apply Roboto font globally (in index.css or App theme)
const headerColor = "#1e40af"; // Deep blue for headings
const borderColor = "#e0e0e0";  // Light gray border

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchUsers();
  }, []);

  return (
    <Box p={3} fontFamily="Roboto">
      <Typography variant="h4" mb={3} fontWeight={700} color={headerColor}>
        Registered Users
      </Typography>

      <Paper elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f3f4f6" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, borderColor }}>{/* Name Header */}
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: 600, borderColor }}>
                Email
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id} sx={{ "&:hover": { backgroundColor: "#f9fafb" } }}>
                <TableCell sx={{ borderColor }}>{user.name}</TableCell>
                <TableCell sx={{ borderColor }}>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default Users;
