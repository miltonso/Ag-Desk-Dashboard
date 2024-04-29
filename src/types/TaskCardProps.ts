export interface TaskCardProps {
    title: string;
    tasks: Task[];
    taskIndex: number;
    severity: 'high' | 'medium' | 'low';
    toggleTaskCompletion: (taskId: string) => void; 
    description?: string;
    checked?: boolean;
  }
  
  export interface Task {
    id: string;
    title: string;
    completed: boolean;
    subtasks: string[];
    severity: 'high' | 'medium' | 'low';
  }