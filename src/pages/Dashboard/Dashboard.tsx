import React from 'react';
import TaskCardDashboard from '../../components/DashboardCards/TaskCard';

import EquipmentMaintenanceCard from '../../components/DashboardCards/MaintenanceCard';
import DefaultLayout from '../../layout/DefaultLayout';
import DataStatsThree from '../../components/DashboardCards/TopLayerCard';
import EmployeeTable from '../../components/DashboardCards/EmployeeTable';
import SatelliteMapCard from '../../components/DashboardCards/Map';

const Dashboard: React.FC = () => {
  return (
    <DefaultLayout>
      <DataStatsThree />
      <div className="mt-7.5 grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-7">
          <EquipmentMaintenanceCard />
        </div>
        <div className="col-span-12 xl:col-span-5">
          <TaskCardDashboard />
        </div>
        <EmployeeTable />
        <div className="col-span-12 xl:col-span-5">
          <SatelliteMapCard />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;

{
  /*<div className="mt-7.5 grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-7">
          <ChartSeven />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <ChartEight />
        </div>

        <LeadsReport />

        <div className="col-span-12 xl:col-span-5">
          <ChartNine />
        </div>

        <ToDoList />
      </div> */
}
