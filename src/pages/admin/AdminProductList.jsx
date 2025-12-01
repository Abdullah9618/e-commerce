import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const headerColor = "#1e40af";

function AdminProductList() {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snapshot) => {
      setProducts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      await deleteDoc(doc(db, "products", deleteId));
      setDeleteId(null);
      setOpenDialog(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
    setOpenDialog(false);
  };

  return (
    <Box fontFamily="Roboto" p={3}>
      <Typography variant="h4" fontWeight={700} mb={3} color={headerColor}>
        Manage Products
      </Typography>

      <Button
        component={Link}
        to="/admin/add-product"
        variant="contained"
        color="success"
        sx={{ mb: 3 }}
      >
        + Add New Product
      </Button>

      <Paper>
        <Table>
          <TableHead sx={{ backgroundColor: "#f3f4f6" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Image</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>

              {/* ⭐ CATEGORY COLUMN ADDED */}
              <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>

              <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((p) => (
              <TableRow
                key={p.id}
                sx={{ "&:hover": { backgroundColor: "#f9fafb" } }}
              >
                <TableCell>
                  <img src={p.image} alt={p.name} width={60} height={60} />
                </TableCell>

                <TableCell>{p.name}</TableCell>

                {/* ⭐ CATEGORY DISPLAY */}
                <TableCell>
                  <Chip
                    label={p.category || "N/A"}
                    color="primary"
                    size="small"
                    sx={{ borderRadius: "6px" }}
                  />
                </TableCell>

                <TableCell>Rs {p.price}</TableCell>

                <TableCell>
                  <IconButton
                    component={Link}
                    to={`/admin/edit-product/${p.id}`}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>

                  <IconButton
                    onClick={() => handleDeleteClick(p.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* ⭐ Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCancelDelete}
        PaperProps={{
          sx: { borderRadius: 3, padding: 2 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product? This action cannot be
          undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminProductList;
