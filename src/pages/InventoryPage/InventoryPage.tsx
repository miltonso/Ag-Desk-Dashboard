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
import { DataGrid, GridPaginationModel } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './inventorypage.css';

// Dummy data for the table
const initialRows = [
  {
    id: 1,
    name: 'Wheat Seeds',
    type: 'seeds',
    quantity: '200kg',
    status: 'Operational',
    lastService: '-',
    serviceDetails: '-',
    nextService: '-',
  },
  {
    id: 2,
    name: 'Tractor',
    type: 'machinery',
    quantity: '1',
    status: 'Needs repair',
    lastService: '2021-10-12',
    serviceDetails: 'Engine oil change',
    nextService: '2022-10-12',
  },
  {
    id: 3,
    name: 'Fertilizer',
    type: 'fertilizers',
    quantity: '50kg',
    status: 'Operational',
    lastService: '-',
    serviceDetails: '-',
    nextService: '-',
  },
  {
    id: 4,
    name: 'Hoe',
    type: 'tools',
    quantity: '5',
    status: 'Operational',
    lastService: '-',
    serviceDetails: '-',
    nextService: '-',
  },
  {
    id: 5,
    name: 'Truck',
    type: 'vehicles',
    quantity: '1',
    status: 'Operational',
    lastService: '-',
    serviceDetails: '-',
    nextService: '-',
  },
  // ... more rows
];
const inventoryTypes = [
  'seeds',
  'fertilizers',
  'feed',
  'tools',
  'machinery',
  'vehicles',
];
const statusOptions = ['operational', 'needs repair', 'service due'];

const InventoryPage = () => {
  const [pagination, setPagination] = useState<GridPaginationModel>({
    page: 1,
    pageSize: 5,
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [editMode, setEditMode] = useState(false); // new state to track if we're in edit mode
  const [editingRow, setEditingRow] = useState(null); // state to keep track of the row being edited
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(initialRows);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    quantity: '',
    status: '',
    lastService: '',
    serviceDetails: '',
    nextService: '',
  });

  const handleEditOpen = (row) => {
    setEditMode(true);
    setEditingRow(row);
    setFormData(row); // Pre-fill the form with the data from the row to be edited
    setOpen(true);
  };

  const handleEditClose = () => {
    setEditMode(false);
    setEditingRow(null);
    setFormData({
      name: '',
      type: '',
      quantity: '',
      status: '',
      lastService: '',
      serviceDetails: '',
      nextService: '',
    });
    setOpen(false);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const updatedRows = rows.map((row) => {
      if (row.id === editingRow.id) {
        return { ...row, ...formData };
      }
      return row;
    });
    setRows(updatedRows);
    handleEditClose(); // Close the edit dialog and reset edit mode
  };

  const handleDelete = (id) => {
    // Filter out the row to delete and update state
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlePaginationModelChange = (newModel: GridPaginationModel) => {
    setPagination(newModel);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let quantityWithUnit = formData.quantity;
    if (formData.type === 'seeds' || formData.type === 'feed') {
      quantityWithUnit += ' kg';
    }

    const newRow = {
      id: rows.length + 1,
      name: formData.name,
      type: formData.type,
      quantity: quantityWithUnit,
      status: formData.status,
      lastService: formData.lastService || '-',
      serviceDetails: formData.serviceDetails || '-',
      nextService: formData.nextService || '-',
    };

    setRows([...rows, newRow]);
    setFormData({
      name: '',
      type: '',
      quantity: '',
      status: '',
      lastService: '',
      serviceDetails: '',
      nextService: '',
    });
    handleClose();
  };

  const columns = [
    { field: 'name', headerName: 'Inventory Name', width: 150 },
    { field: 'type', headerName: 'Inventory Type', width: 130 },
    { field: 'quantity', headerName: 'Quantity', width: 100 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'lastService', headerName: 'Last Service Date', width: 150 },
    { field: 'serviceDetails', headerName: 'Service Details', width: 150 },
    { field: 'nextService', headerName: 'Next Service Due', width: 150 },
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
          <Paper style={{ height: 400, width: '100%' }} className="data-grid-container">
            <DataGrid
              rows={rows}
              columns={columns}
              autoPageSize
              pagination // Enable pagination
              paginationMode="client" // Set pagination mode to client or server
              checkboxSelection
            />
          </Paper>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={editMode ? handleEditClose : handleClose}
            aria-labelledby="inventory-dialog"
            className="dialog-content"
          >
            <DialogTitle id="inventory-dialog">
            {editMode ? 'Edit Inventory Item' : 'Add Inventory Item'}
            </DialogTitle>
            <DialogContent>
              <Box
                component="form"
                onSubmit={editMode ? handleUpdate : handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
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
                    label="Inventory Type"
                    value={formData.type}
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
                  helperText={
                    formData.type === 'seeds' || formData.type === 'feed'
                      ? 'Quantity in kilograms'
                      : 'Quantity'
                  }
                />
                <FormControl fullWidth margin="dense">
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    name="status"
                    label="Status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    {statusOptions.map((status, index) => (
                      <MenuItem key={index} value={status}>
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
                <Button onClick={editMode ? handleEditClose : handleClose} color="primary">
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
