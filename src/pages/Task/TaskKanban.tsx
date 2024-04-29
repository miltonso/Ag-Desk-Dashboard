import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.js';
import DefaultLayout from '../../layout/DefaultLayout';
import TaskCard from '../../components/KanbanTaskCard/TaskCard.js';
import Drag from '../../js/drag.js';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './taskkanban.css';

interface TaskDetails {
  type: string;
  title: string;
  severity: string;
  image: File | null;
  subtasks: { description: string }[];
}

interface FormErrors {
  type: string;
  title: string;
  severity: string;
}

const initialKanbanData = {
  todo: {
    title: "To Do's",
    count: 3,
    tasks: [
      {
        title: 'Task One',
        severity: 'High' as 'High' | 'Medium' | 'Low',
        tasks: [
          { description: 'Subtask 1', checked: false },
          { description: 'Subtask 2', checked: true },
          { description: 'Subtask 3', checked: false },
        ],
      },
      {
        title: 'Task Two',
        severity: 'Medium' as 'High' | 'Medium' | 'Low',
        tasks: [
          { description: 'Subtask 4', checked: false },
          { description: 'Subtask 5', checked: true },
        ],
      },
      // More tasks can be added here
    ],
  },
  inProgress: {
    title: 'In Progress',
    count: 1,
    tasks: [
      {
        title: 'Task in progress',
        severity: 'Low' as 'High' | 'Medium' | 'Low',
        tasks: [{ description: 'Subtask 6', checked: true }],
      },
    ],
  },
  onHold: {
    title: 'On Hold',
    count: 2,
    tasks: [
      {
        title: 'This is a big task name for tasks on hold',
        severity: 'High' as 'High' | 'Medium' | 'Low',
        imageSrc: '/images/task/task-01.jpg',
        tasks: [{ description: 'Subtask 7', checked: false }],
      },
      {
        title: 'Task',
        severity: 'Medium' as 'High' | 'Medium' | 'Low',
        imageSrc: '/images/task/task-01.jpg',
        tasks: [{ description: 'Subtask 8', checked: false }],
      },
    ],
  },
  completed: {
    title: 'Completed',
    count: 1,
    tasks: [
      {
        title: 'Completed Task',
        severity: 'Low' as 'High' | 'Medium' | 'Low',
        tasks: [{ description: 'Final Subtask', checked: true }],
      },
    ],
  },
};

const TaskKanban: React.FC = () => {
  const [formErrors, setFormErrors] = useState<FormErrors>({
    type: '',
    title: '',
    severity: '',
  });
  const [kanbanData, setKanbanData] = useState(initialKanbanData);
  const [open, setOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState<TaskDetails>({
    type: 'todo', // Set default type to 'todo' or any valid type
    title: '',
    severity: '',
    image: null,
    subtasks: [{ description: '' }],
  });

  const validateForm = () => {
    let errors: FormErrors = {
      type: '',
      title: '',
      severity: '',
    };
    if (!taskDetails.type) {
      errors.type = 'Task type is required.';
    }
  
    if (!taskDetails.title.trim()) {
      errors.title = 'Task title is required.';
    }
  
    if (!taskDetails.severity) {
      errors.severity = 'Severity is required.';
    }
  
    if (Object.values(errors).some(error => error !== '')) {
      setFormErrors(errors);
    } else {
      // If no errors, clear any existing errors
      setFormErrors({
        type: '',
        title: '',
        severity: '',
      });
    }

    return Object.values(errors).every(error => error === '');
  };
  useEffect(() => {
    console.log('Component mounted. Initial kanban data:', kanbanData);
    Drag();
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubtaskChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSubtasks = taskDetails.subtasks.map((subtask, subIndex) => {
      if (index === subIndex) {
        return { ...subtask, description: event.target.value };
      }
      return subtask;
    });
    setTaskDetails({ ...taskDetails, subtasks: newSubtasks });
  };

  const handleAddSubtask = () => {
    setTaskDetails({
      ...taskDetails,
      subtasks: [...taskDetails.subtasks, { description: '' }],
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setTaskDetails({
        ...taskDetails,
        image: event.target.files[0], // Set the selected file
      });
    }
  };

  const handleAddTaskSubmit = () => {
    console.log('Submitting task. Task details:', taskDetails);
    if (!validateForm()) return;

    if (!kanbanData[taskDetails.type]) {
      console.error('Invalid task type:', taskDetails.type);
      return; // Prevent the function from proceeding further
    }
    const updatedKanbanData = {
      ...kanbanData,
      [taskDetails.type]: {
        ...kanbanData[taskDetails.type],
        count: kanbanData[taskDetails.type].count + 1,
        tasks: [
          ...kanbanData[taskDetails.type].tasks,
          {
            title: taskDetails.title,
            severity: taskDetails.severity,
            imageSrc: taskDetails.image
              ? URL.createObjectURL(taskDetails.image)
              : undefined,
            tasks: taskDetails.subtasks.map((subtask) => ({
              description: subtask.description,
              checked: false,
            })),
          },
        ],
      },
    };

    console.log('Updated kanban data:', updatedKanbanData);

    setKanbanData(updatedKanbanData);
    handleClose();
    setTaskDetails({
      type: '',
      title: '',
      severity: '',
      image: null,
      subtasks: [{ description: '' }],
    });
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-5xl">
        <Breadcrumb pageName="TaskManager" />
        <div className="flex flex-col gap-y-4 rounded-xl border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="pl-2 text-title-lg font-semibold text-black dark:text-white">
              Manage your Tasks
            </h3>
          </div>
          <div className="flex flex-col gap-4 2xsm:flex-row 2xsm:items-center">
            <div>
              <Button
                variant="contained"
                className="button button-primary"
                color="primary"
                startIcon={<AddCircleOutlineIcon className="plus-icon" />}
                onClick={handleClickOpen}
              >
                Add Task
              </Button>

              {/* Material-UI Dialog for Add Task Form */}
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogContent>
                  <FormControl
                    fullWidth
                    margin="normal"
                    error={Boolean(formErrors.type)}
                  >
                    <InputLabel id="task-type-label">Task Type</InputLabel>
                    <Select
                      labelId="task-type-label"
                      id="task-type"
                      value={taskDetails.type}
                      onChange={(event) => {
                        setTaskDetails({
                          ...taskDetails,
                          type: event.target.value,
                        });
                        setFormErrors({ ...formErrors, type: '' });
                      }}
                      label="Task Type"
                    >
                      <MenuItem value={'todo'}>To Do</MenuItem>
                      <MenuItem value={'inProgress'}>In Progress</MenuItem>
                      <MenuItem value={'onHold'}>On Hold</MenuItem>
                      <MenuItem value={'completed'}>Completed</MenuItem>
                    </Select>
                    <FormHelperText>{formErrors.type}</FormHelperText>
                  </FormControl>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Task Title" /* Bind value & onChange */
                    value={taskDetails.title}
                    onChange={(event) => {
                      setTaskDetails({
                        ...taskDetails,
                        title: event.target.value,
                      });
                      setFormErrors({ ...formErrors, title: '' });
                    }}
                    error={Boolean(formErrors.title)}
                    helperText={formErrors.title}
                  />
                  {taskDetails.subtasks.map((subtask, index) => (
                    <TextField
                      key={index}
                      fullWidth
                      margin="normal"
                      label="Subtask Description"
                      value={subtask.description}
                      // Ensure the event type matches the expected input type
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleSubtaskChange(index, event)
                      }
                    />
                  ))}
                  <IconButton onClick={handleAddSubtask} color="primary">
                    <AddCircleOutlineIcon />
                  </IconButton>
                  {/* Dynamically add subtasks fields */}
                  <FormControl
                    component="fieldset"
                    fullWidth
                    margin="normal"
                    error={Boolean(formErrors.severity)}
                  >
                    <RadioGroup
                      value={taskDetails.severity}
                      onChange={(event) => {
                        setTaskDetails({
                          ...taskDetails,
                          severity: event.target.value,
                        });
                        setFormErrors({ ...formErrors, severity: '' });
                      }}
                    >
                      <FormControlLabel
                        value="high"
                        control={<Radio />}
                        label="High"
                      />
                      <FormControlLabel
                        value="medium"
                        control={<Radio />}
                        label="Medium"
                      />
                      <FormControlLabel
                        value="low"
                        control={<Radio />}
                        label="Low"
                      />
                    </RadioGroup>
                    <FormHelperText>{formErrors.severity}</FormHelperText>
                  </FormControl>
                  {/* Image upload input */}
                  <Button
                    variant="contained"
                    component="label" // Only valid HTML label props can be passed along with Button's own props.
                    color="primary"
                    fullWidth
                    className="button button-upload"
                    startIcon={<AddCircleOutlineIcon className="plus-icon" />}
                  >
                    Upload Image
                    <input
                      type="file"
                      hidden
                      onChange={handleImageChange}
                      className="input-file"
                    />
                  </Button>
                  {/* Submit button */}
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="button button-primary"
                    onClick={handleAddTaskSubmit} // You should replace this with your actual submission logic
                  >
                    Add Task
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-7.5 sm:grid-cols-2 xl:grid-cols-4">
          {Object.entries(kanbanData).map(([key, column], taskIndex) => (
            <div key={key} className="swim-lane flex flex-col gap-5.5">
              <h4 className="text-xl font-semibold text-black dark:text-white">
                {column.title} ({column.count})
              </h4>
              {column.tasks.map((task, index) => (
                <TaskCard
                  key={index}
                  taskIndex={taskIndex * 100 + index}
                  {...task}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TaskKanban;
