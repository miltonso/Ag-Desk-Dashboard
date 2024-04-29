import React, { useState } from 'react';
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Chip,
} from '@mui/material';
import './taskcard.css';
import { TaskCardProps } from '../../types/TaskCardProps';  // Import the TaskCardProps type


const initialTasks = [
  { id: 1, title: 'Feed Chickens', subtasks: ['Morning Feed', 'Evening Feed'], severity: 'high', completed: false },
  { id: 2, title: 'Irrigation', subtasks: ['Check Pipes', 'Water Fields'], severity: 'medium', completed: false },
  { id: 3, title: 'Harvest Corn', subtasks: ['Harvest Corn', 'Store Corn'], severity: 'low', completed: false },
  { id: 4, title: 'Plant Wheat', subtasks: ['Prepare Soil', 'Plant Seeds'], severity: 'high', completed: false },
  // Add more initial tasks here
];

const TaskCardDashboard: React.FC= () => {
    const [tasks, setTasks] = useState(initialTasks);
  
    const toggleTaskCompletion = (taskId) => {
      // Map through tasks and toggle the `completed` status of the task with the matching id
      const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed }; // Toggle completed status
        }
        return task; // Return the task unmodified if it does not match the id
      });
  
      setTasks(updatedTasks); // Update the tasks state with the new array
    };
  return (
    <Card className="farm-tasks-card">
      <CardContent>
        <h2 className="card-title">Farm Tasks</h2>
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id} className="task-item">
              <Checkbox
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                color="primary"
                className="task-checkbox"
              />
              <ListItemText
                primary={task.title}
                secondary={task.subtasks.join(', ')}
                className={`task-text ${task.completed ? 'completed' : ''} ${
                  task.severity
                }`}
              />
              <Chip
                label={task.severity.toUpperCase()}
                size="small"
                className={`task-chip ${task.severity}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TaskCardDashboard;
