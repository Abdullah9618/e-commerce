import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";

import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { Delete, Edit } from "@mui/icons-material";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "categories"), (snapshot) => {
      setCategories(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    await addDoc(collection(db, "categories"), {
      name: newCategory,
    });

    setNewCategory("");
  };

  const handleDeleteDialog = (cat) => {
    setSelectedCategory(cat);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (selectedCategory) {
      await deleteDoc(doc(db, "categories", selectedCategory.id));
      setOpenDeleteDialog(false);
      setSelectedCategory(null);
    }
  };

  // --------------------
  // EDIT FUNCTIONALITY
  // --------------------
  const handleOpenEdit = (cat) => {
    setSelectedCategory(cat);
    setEditName(cat.name);
    setOpenEditDialog(true);
  };

  const handleSaveEdit = async () => {
    if (!editName.trim()) return;

    const categoryRef = doc(db, "categories", selectedCategory.id);

    await updateDoc(categoryRef, {
      name: editName,
    });

    setOpenEditDialog(false);
    setSelectedCategory(null);
  };

  return (
    <Box p={3} fontFamily="Roboto">
      <Typography variant="h4" fontWeight={700} mb={3} color="#1e40af">
        Manage Categories
      </Typography>

      {/* Add New Category */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button variant="contained" color="success" onClick={handleAddCategory}>
          Add Category
        </Button>
      </Box>

      {/* Categories Table */}
      <Paper sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f3f4f6" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Category Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell>{cat.name}</TableCell>

                <TableCell>
                  <IconButton
                    onClick={() => handleOpenEdit(cat)}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>

                  <IconButton
                    onClick={() => handleDeleteDialog(cat)}
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

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        PaperProps={{ sx: { borderRadius: 3, padding: 2 } }}
      >
        <DialogTitle fontWeight={600}>Confirm Delete</DialogTitle>

        <DialogContent>
          Are you sure you want to delete the category{" "}
          <strong>{selectedCategory?.name}</strong>?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>

          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
            sx={{ borderRadius: 2 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* EDIT CATEGORY DIALOG */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 3, padding: 2 } }}
      >
        <DialogTitle>Edit Category</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Category Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>

          <Button
            variant="contained"
            onClick={handleSaveEdit}
            sx={{
              background: "#1e40af",
              borderRadius: 2,
              "&:hover": { background: "#1e3a8a" },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Categories;
