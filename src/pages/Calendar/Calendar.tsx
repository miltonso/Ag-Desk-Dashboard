import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Button,
  Modal,
  Box,
  TextField,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import EventData from '../../types/EventData';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [calevents, setCalEvents] = useState(EventData);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState('');
  const [slot, setSlot] = useState(null);
  const [color, setColor] = useState('default');
  const [update, setUpdate] = useState(null);

  const ColorVariation = [
    {
      id: 1,
      eColor: '#1a97f5',
      value: 'primary',
    },
    {
      id: 2,
      eColor: '#00ab55',
      value: 'success',
    },
    {
      id: 3,
      eColor: '#fc4b6c',
      value: 'danger',
    },
    {
      id: 4,
      eColor: '#1e4db7',
      value: 'info',
    },
    {
      id: 5,
      eColor: '#fdd43f',
      value: 'warning',
    },
  ];

  const addNewEventAlert = (slotInfo) => {
    setOpen(true);
    setSlot(slotInfo);
  };

  const editEvent = (event) => {
    setOpen(true);
    const newEditEvent = calevents.find((elem) => elem.title === event.title);
    setColor(event.color);
    setTitle(newEditEvent.title);
    setColor(newEditEvent.color);
    setUpdate(event);
  };

  const updateEvent = (e) => {
    e.preventDefault();
    if (!update) {
      console.error('No event selected for update.');
      return;
    }

    setCalEvents(
      calevents.map((elem) => {
        if (elem.title === update.title) {
          return { ...elem, title, color };
        }
        return elem;
      })
    );
    setOpen(false);
    setTitle('');
    setColor('');
    setUpdate(null);
  };

  const inputChangeHandler = (e) => setTitle(e.target.value);

  const selectinputChangeHandler = (id) => setColor(id);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!slot) {
      console.error('No time slot selected for the new event.');
      return;
    }

    const newEvents = calevents;
    newEvents.push({
      title,
      start: slot.start,
      end: slot.end,
      color,
    });
    setOpen(false);
    e.target.reset();

    setCalEvents(newEvents);
    setTitle('');
  };
  const deleteHandler = (event) => {
    const updatecalEvents = calevents.filter(
      (ind) => ind.title !== event.title
    );
    setCalEvents(updatecalEvents);
  };
  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setUpdate(null);
  };

  const eventColors = (event) => {
    if (event.color) {
      return { className: `event-${event.color}` };
    }
    return { className: `event-default` };
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Calendar" />

      {/* <!-- ====== Calendar Section Start ====== --> */}
      <Card className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <CardContent>
          <BigCalendar
            selectable
            events={calevents}
            defaultView="month"
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date()}
            localizer={localizer}
            style={{ height: 'calc(100vh - 350px' }}
            onSelectEvent={(event) => editEvent(event)}
            onSelectSlot={(slotInfo) => addNewEventAlert(slotInfo)}
            eventPropGetter={(event) => eventColors(event)}
            className="calendar-container"
          />
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
              }}
            >
              <h2>{update ? 'Update Event' : 'Add Event'}</h2>
              <Box
              className="modal-box"
                component="form"
                onSubmit={update ? updateEvent : submitHandler}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="event-title"
                  label="Event Title"
                  name="title"
                  autoComplete="title"
                  autoFocus
                  value={title}
                  onChange={inputChangeHandler}
                />
                <FormGroup>
                  {ColorVariation.map((colorbg) => (
                    <FormControlLabel
                      key={colorbg.eColor}
                      className='colorbg'
                      control={
                        <Button
                        className={`mui-btn btn-${colorbg.value}`} // Apply the corresponding class
                          key={colorbg.eColor}
                          variant={colorbg.value === color ? 'contained' : 'outlined'}
                          onClick={() =>
                            selectinputChangeHandler(colorbg.value)
                          }
                        >
                          {colorbg.value}
                        </Button>
                      }
                      label=""
                    />
                  ))}
                </FormGroup>
                <Button
                className="mui-btn"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {update ? 'Update' : 'Add'}
                </Button>
                {update && (
                  <Button
                  className="mui-btn"
                    variant="outlined"
                    color="error"
                    onClick={() => deleteHandler(update)}
                  >
                    Delete
                  </Button>
                )}
              </Box>
            </Box>
          </Modal>
        </CardContent>
      </Card>
      {/* <!-- ====== Calendar Section End ====== --> */}
    </DefaultLayout>
  );
};

export default Calendar;
