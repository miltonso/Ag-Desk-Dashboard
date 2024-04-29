import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import './maintenancecard.css';

const EquipmentMaintenanceCard: React.FC = () => {
  const [equipment, setEquipment] = useState({
    upcomingServices: [],
    maintenanceHistory: [],
  });

  useEffect(() => {
    // Replace with your actual fetch call
    setEquipment({
      upcomingServices: [
        { name: 'Tractor', date: '2024-05-01' },
        { name: 'Combine Harvester', date: '2024-05-15' },
      ],
      maintenanceHistory: [
        { name: 'Tractor', date: '2024-01-20', details: 'Oil change' },
        { name: 'Plow', date: '2024-01-22', details: 'Replaced blades' },
      ],
    });
  }, []);

  return (
    <Card className="equipment-maintenance-card">
      <CardContent>
        <Typography
          variant="h6"
          component="h2"
          className="equipment-maintenance-header"
        >
          Equipment Maintenance
        </Typography>
        <Typography
          sx={{ mt: 2 }}
          color="text.secondary"
          className="upcoming-services-header"
        >
          Upcoming Service Dates
        </Typography>
        <List className="service-list">
          {equipment.upcomingServices.map((service, index) => (
            <ListItem key={index} className="service-list-item">
              <ListItemText
                primary={service.name}
                secondary={`Service due: ${service.date}`}
                primaryTypographyProps={{ className: 'service-item-primary' }}
                secondaryTypographyProps={{
                  className: 'service-item-secondary',
                }}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography
          sx={{ mt: 2 }}
          color="text.secondary"
          className="maintenance-history-header"
        >
          Maintenance History
        </Typography>
        <List
          sx={{ maxHeight: 200, overflow: 'auto' }}
          className="history-list"
        >
          {equipment.maintenanceHistory.map((history, index) => (
            <ListItem key={index} className="history-list-item">
              <ListItemText
                primary={history.name}
                secondary={`${history.details} on ${history.date}`}
                primaryTypographyProps={{ className: 'history-item-primary' }}
                secondaryTypographyProps={{
                  className: 'history-item-secondary',
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default EquipmentMaintenanceCard;
