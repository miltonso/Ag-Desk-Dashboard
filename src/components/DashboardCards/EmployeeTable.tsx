import React from 'react';
import User17 from "../../images/user/user-17.png"
import User18 from '../../images/user/user-18.png';
import User19 from '../../images/user/user-19.png';
import User20 from '../../images/user/user-20.png';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import './employeetable.css';

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

const EmployeeTable: React.FC = () => {
  return (
    <TableContainer component={Paper} className="col-span-12">
      <h2 className="table-heading">Employee Details</h2>
      <Table
        className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
        aria-label="employee table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Contact Number</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>Shift Schedule</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Skills</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeData.map((employee) => (
            <TableRow key={employee.id} className="table-row">
              <TableCell>
                <img
                  src={employee.image}
                  alt={employee.name}
                  className="employee-image"
                />
              </TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.contactNumber}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.startDate}</TableCell>
              <TableCell>{employee.shiftSchedule}</TableCell>
              <TableCell>{employee.salary}</TableCell>
              <TableCell>{employee.skills}</TableCell>
              <TableCell>{employee.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
