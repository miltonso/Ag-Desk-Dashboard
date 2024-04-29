import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Dashboard from './pages/Dashboard/Dashboard';
import Calendar from './pages/Calendar/Calendar';
import TaskKanban from './pages/Task/TaskKanban';
import InventoryPage from './pages/InventoryPage/InventoryPage';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import EmployeePage from './pages/EmployeePage/EmployeePage';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Ag-Desk| Farm management Dashboard" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/tasks/task-kanban"
          element={
            <>
              <PageTitle title="Task Kanban" />
              <TaskKanban />
            </>
          }
        />
        <Route
          path="/InventoryPage"
          element={
            <>
              <PageTitle title="Inventory Management | Ag-Desk" />
              <InventoryPage />
            </>
          }
        />
        <Route
          path="/EmployeePage"
          element={
            <>
              <PageTitle title="Employee Management | Ag-Desk" />
              <EmployeePage />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
