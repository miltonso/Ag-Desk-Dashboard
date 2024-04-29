import React from 'react';
import DropdownDefault from '../Dropdowns/DropdownDefault';

interface Subtask {
  description: string;
  completed: boolean;
}

interface TaskCardProps {
  title: string;
  subtasks: Subtask[];
  severity: string;
  image?: string; // Assuming image is a URL string
  taskIndex: number;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  subtasks,
  severity,
  image,
  taskIndex,
}) => {
  const getSeverityClass = (severity: string) => {
    switch (severity.toLowerCase()) { // Use `toLowerCase` to handle any case discrepancies
      case 'high':
        return 'bg-rose-700 animate-pulse'; // Blinking effect for high severity
      case 'medium':
        return 'bg-orange-500';
      case 'low':
        return 'bg-green-500';
      default:
        return '';
    }
  };

  return (
    <div
      draggable="true"
      className="task relative flex cursor-move justify-between rounded-xl border border-stroke bg-white p-7 shadow-default dark:border-strokedark dark:bg-boxdark"
    >
      <div>
        <h5 className="mb-4 text-lg font-medium text-black dark:text-white">
          {title}
          <span
            className={`ml-2 rounded-full px-3 py-1 text-sm text-white ${getSeverityClass(severity)}`}
          >
            {severity}
          </span>
        </h5>
        {image && (
          <div className="my-4">
            <img src={image} alt="Task" style={{ width: '268px', height: '155px' }} />
          </div>
        )}
        <div className="flex flex-col gap-2">
          {subtasks.map((subtask, index) => (
            <div className="flex w-full items-center justify-between" key={index}>
              <label htmlFor={`taskCheckbox-${taskIndex}-${index}`} className="flex-grow cursor-pointer">
                <div className="relative flex items-center pt-0.5">
                  <input
                    type="checkbox"
                    id={`taskCheckbox-${taskIndex}-${index}`}
                    className="taskCheckbox sr-only"
                    defaultChecked={subtask.completed}
                  />
                  <div className="box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark dark:bg-boxdark-2"></div>
                  <span className="text-black dark:text-white">{subtask.description}</span>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute right-4 top-4">
        <DropdownDefault />
      </div>
    </div>
  );
};

export default TaskCard;
