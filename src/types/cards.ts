// interfaces/TaskCardProps.ts

export interface Task {
  description: string;
  checked: boolean;
  
}

export interface TaskCardProps {
  title: string;
  description?: string;
  imageSrc?: string;
  tasks: Task[];
  taskIndex: number; // Index to uniquely identify each card for checkbox IDs
  severity: 'High' | 'Medium' | 'Low'; 
}
