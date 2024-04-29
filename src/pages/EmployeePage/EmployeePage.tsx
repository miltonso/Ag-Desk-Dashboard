import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  Dialog,
  TextField,
  IconButton,
  Avatar,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  useTheme,
  useMediaQuery,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik } from 'formik';
import * as yup from 'yup';
import User17 from '../../images/user/user-17.png';
import User18 from '../../images/user/user-18.png';
import User19 from '../../images/user/user-19.png';
import User20 from '../../images/user/user-20.png';

const employeeData = [
  {
    id: 1,
    image: User17,
    name: 'John Doe',
    position: 'Harvester',
    contactNumber: '123-456-7890',
    email: 'johndoe@example.com',
    startDate: '2020-01-10',
    shiftSchedule: 'Morning Shift',
    salary: '$15/hour',
    skills: 'Tractor Operation, First Aid',
    status: 'Active',
  },
  {
    id: 2,
    image: User18,
    name: 'Jane Doe',
    position: 'Irrigator',
    contactNumber: '123-456-7890',
    email: 'janedone@example.com',
    startDate: '2020-01-10',
    shiftSchedule: 'Evening Shift',
    salary: '$12/hour',
    skills: 'Irrigation Management',
    status: 'Active',
  },
  {
    id: 3,
    image: User19,
    name: 'Alice Smith',
    position: 'Supervisor',
    contactNumber: '123-456-7890',
    email: 'Alicesmith@asda.com',
    startDate: '2020-01-10',
    shiftSchedule: 'Morning Shift',
    salary: '$20/hour',
    skills: 'Leadership, Communication',
    status: 'Active',
  },
  {
    id: 4,
    image: User20,
    name: 'Bob Johnson',
    position: 'Tractor Operator',
    contactNumber: '123-456-7890',
    email: 'bobjonhson@aasd.com',
    startDate: '2020-01-10',
    shiftSchedule: 'Night Shift',
    salary: '$15/hour',
    skills: 'Tractor Operation, Maintenance',
    status: 'Active',
  },

  // More employees
];

const validationSchema = yup.object({
  name: yup.string().required('Employee name is required'),
  contactNumber: yup.string().required('Contact number is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  position: yup.string().required('Position is required'),
});

const EmployeePage = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [employees, setEmployees] = useState(employeeData);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const formik = useFormik({
    initialValues: {
      image: '',
      name: '',
      position: '',
      contactNumber: '',
      email: '',
      startDate: '',
      shiftSchedule: '',
      salary: '',
      skills: '',
      status: 'Active',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (editMode) {
        const updatedEmployees = employees.map((employee) =>
          employee.id === currentEmployee.id
            ? { ...employee, ...values }
            : employee
        );
        setEmployees(updatedEmployees);
      } else {
        const newEmployee = {
          id: employees.length + 1,
          ...values,
          image: User17, // Use a default image or handle file upload
        };
        setEmployees([...employees, newEmployee]);
      }
      setOpen(false);
      setEditMode(false);
      setCurrentEmployee(null);
    },
  });

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    formik.resetForm();
    setCurrentEmployee(null);
  };

  const handleEditOpen = (employee) => {
    setEditMode(true);
    setCurrentEmployee(employee);
    formik.setValues(employee);
    setOpen(true);
  };
  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };



  const columns = [
    {
      field: 'image',
      headerName: 'Photo',
      renderCell: (params) => (
        <Avatar src={params.value} alt={params.row.name} />
      ),
    },
    {
      field: 'name',
      headerName: 'Employee Name',
      width: 150,
      editable: true,
    },
    {
      field: 'position',
      headerName: 'Position',
      width: 130,
      editable: true,
    },
    {
      field: 'contactNumber',
      headerName: 'Contact Number',
      width: 130,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      editable: true,
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 130,
      editable: true,
    },
    {
      field: 'shiftSchedule',
      headerName: 'Shift Schedule',
      width: 150,
      editable: true,
    },
    {
      field: 'salary',
      headerName: 'Salary',
      width: 100,
      editable: true,
    },
    {
      field: 'skills',
      headerName: 'Skills',
      width: 150,
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <strong style={{ color: params.value === 'Active' ? 'green' : 'red' }}>
          {params.value}
        </strong>
      ),
      editable: true,
    },

    // ... other columns
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditOpen(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteEmployee(params.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Employee Management" />
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
        sx={{ mb: 2 }}
        className="custom-button"
      >
        Add Employee
      </Button>
      <div style={{ height: 400, width: '100%' }} className="data-grid-container">
        <DataGrid
          rows={employees}
          columns={columns}
          autoPageSize
          checkboxSelection
        />
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>{editMode ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
        <DialogContent>
          <form id="employee-form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              {/* Assume that each TextField takes up 6 grid columns */}
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="name"
                  label="Employee Name"
                  name="name"
                  autoComplete="name"
                  {...formik.getFieldProps('name')}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="contactNumber"
                  label="Contact Number"
                  name="contactNumber"
                  autoComplete="tel"
                  {...formik.getFieldProps('contactNumber')}
                  error={
                    formik.touched.contactNumber &&
                    Boolean(formik.errors.contactNumber)
                  }
                  helperText={
                    formik.touched.contactNumber && formik.errors.contactNumber
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...formik.getFieldProps('email')}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>

              {/* Position */}
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="position"
                  label="Position"
                  name="position"
                  {...formik.getFieldProps('position')}
                />
              </Grid>
              {/* Start Date */}
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="startDate"
                  label="Start Date"
                  name="startDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  {...formik.getFieldProps('startDate')}
                />
              </Grid>
              {/* Shift Schedule */}
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="shiftSchedule"
                  label="Shift Schedule"
                  name="shiftSchedule"
                  {...formik.getFieldProps('shiftSchedule')}
                />
              </Grid>
              {/* Salary */}
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="salary"
                  label="Salary"
                  name="salary"
                  {...formik.getFieldProps('salary')}
                />
              </Grid>
              {/* Skills */}
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="skills"
                  label="Skills"
                  name="skills"
                  {...formik.getFieldProps('skills')}
                />
              </Grid>
              {/* Status */}
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="status"
                  label="Status"
                  name="status"
                  select
                  {...formik.getFieldProps('status')}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </TextField>
              </Grid>
              {/* Optionally, if you're handling file uploads */}
              <Grid item xs={12} sm={6}>
                <input
                  id="file"
                  name="image"
                  type="file"
                  onChange={(event) => {
                    if (event.currentTarget.files) {
                      formik.setFieldValue(
                        'image',
                        event.currentTarget.files[0]
                      );
                    }
                  }}
                />
                {formik.errors.image && formik.touched.image && (
                  <p>{formik.errors.image}</p>
                )}
              </Grid>

              {/* Add more fields here */}
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="employee-form" color="primary">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </DefaultLayout>
  );
};

export default EmployeePage;
