import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useState } from 'react';
import {
  Button,
  Dialog,
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Paper,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './inventorypage.css';
import { useEffect } from 'react';
import {
  fetchInventoryItems,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from './api';

const inventoryTypes = ['seeds', 'fertilizers', 'feed', 'tools', 'machinery'];
const statusOptions = ['operational', 'needs repair', 'service due'];

const InventoryPage = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    quantity: '',
    status: '',
    lastService: '',
    serviceDetails: '',
    nextService: '',
  });

  useEffect(() => {
    fetchInventoryItems().then(setRows).catch(console.error);
  }, []);

  const handleOpen = () => {
    setEditMode(false);
    setFormData({
      name: '',
      type: '',
      quantity: '',
      status: '',
      lastService: '',
      serviceDetails: '',
      nextService: '',
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditOpen = (row) => {
    console.log('Editing Row Data:', row); // Check what data is actually in the row
    setEditMode(true);
    setEditingRow(row);

    // Ensure all fields are correctly set, consider using fallbacks for optional fields
    setFormData({
      name: row.name,
      type: row.item_type || '', // Make sure the property name matches the expected form state
      quantity: row.quantity.toString(), // Ensure quantity is a string if your TextField expects a string
      status: row.status,
      lastService: row.last_service_date || '', // Use fallback for dates
      serviceDetails: row.service_details || '',
      nextService: row.next_service_date || '',
    });

    setOpen(true);
  };

  const handleEditClose = () => {
    setEditMode(false);
    setEditingRow(null);
    handleClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form data:', formData);
    const data = {
      name: formData.name,
      item_type: formData.type, // Change to item_type to match the backend
      quantity: parseInt(formData.quantity), // Ensure quantity is an integer
      status: formData.status,
      last_service_date: formData.lastService, // Match the backend field name
      service_details: formData.serviceDetails, // Match the backend field name
      next_service_date: formData.nextService, // Match the backend field name
    };

    if (editMode) {
      await updateInventoryItem(editingRow.id, data);
      const updatedRows = rows.map((row) =>
        row.id === editingRow.id ? { ...row, ...data } : row
      );
      setRows(updatedRows);
    } else {
      const newItem = await createInventoryItem(data);
      setRows([...rows, newItem]);
    }
    handleClose();
  };

  const handleDelete = async (id) => {
    await deleteInventoryItem(id);
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns = [
    { field: 'name', headerName: 'Inventory Name', width: 150 },
    { field: 'item_type', headerName: 'Inventory Type', width: 130 },
    { field: 'quantity', headerName: 'Quantity', width: 100 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'last_service_date', headerName: 'Last Service Date', width: 150 },
    { field: 'service_details', headerName: 'Service Details', width: 150 },
    { field: 'next_service_date', headerName: 'Next Service Due', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <IconButton onClick={() => handleEditOpen(params.row)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(params.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Inventory Management" />
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpen}
            sx={{ mb: 2 }}
            className="add-button"
          >
            Add Inventory Item
          </Button>
          <Paper
            style={{ height: 400, width: '100%' }}
            className="data-grid-container"
          >
            <DataGrid
              rows={rows}
              columns={columns}
              autoPageSize
              pagination
              checkboxSelection
            />
          </Paper>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="inventory-dialog"
          >
            <DialogTitle id="inventory-dialog">
              {editMode ? 'Edit Inventory Item' : 'Add Inventory Item'}
            </DialogTitle>
            <DialogContent>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                {/* Form Fields */}
                <TextField
                  autoFocus
                  margin="dense"
                  name="name"
                  label="Inventory Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <FormControl fullWidth margin="dense">
                  <InputLabel id="type-label">Inventory Type</InputLabel>
                  <Select
                    labelId="type-label"
                    name="type"
                    value={formData.type || ''} // Fallback to an empty string if formData.type is undefined
                    onChange={handleChange}
                    required
                  >
                    {inventoryTypes.map((type, index) => (
                      <MenuItem key={index} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  margin="dense"
                  name="quantity"
                  label="Quantity"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formData.quantity}
                  onChange={handleChange}
                />
                <FormControl fullWidth margin="dense">
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  margin="dense"
                  name="lastService"
                  label="Last Service Date"
                  type="date"
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.lastService}
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  name="serviceDetails"
                  label="Service Details"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={formData.serviceDetails}
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  name="nextService"
                  label="Next Service Due Date"
                  type="date"
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.nextService}
                  onChange={handleChange}
                />
                <DialogActions>
                  <Button onClick={handleEditClose} color="primary">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    {editMode ? 'Update' : 'Add'}
                  </Button>
                </DialogActions>
              </Box>
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
    </DefaultLayout>
  );
};

export default InventoryPage;
