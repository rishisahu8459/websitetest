import React, { useState, useEffect } from 'react';
import { Switch, FormControlLabel, Button, TextField, Typography } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalStorageService } from '../utils';
import '../styles/Schedule.css';
import { Tabs, Tab } from '@material-ui/core'; // Import the 'Tabs' and 'Tab' components from the '@material-ui/core' package
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import dayjs from 'dayjs'; // Replace 'package-name' with the actual package name that provides the TimePicker component
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
const theme = createTheme({
  palette: {
    primary: {
      main: '#2565e6', // Set the primary color to #2565e6
    },
  },
});

const Schedule = ({ deviceName = "TEST Strip", deviceId }) => {
  const [schedules, setSchedules] = useState([]);
  const [label, setLabel] = useState('');
  const [status, setStatus] = useState('');
  const [deviceOption, setDeviceOptions] = useState('');
  const [time, setTime] = useState('');
  const [isDaily, setIsDaily] = useState(false);
  const [isOn, setIsOn] = useState(false); // Switch state
  const [labelError, setLabelError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const AUTH_TOKEN = LocalStorageService.getItem('token');

  useEffect(() => {
    async function fetchSchedules() {
      try {
        // const deviceId = LocalStorageService.getItem('id');
        const response = await fetch(`https://iotapi.mobiiot.in/msapp/v1/scheduler/get/${deviceId}`, {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setSchedules(data.response);
        } else {
          console.error('Failed to fetch schedules:', data.message);
        }
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    }
    fetchSchedules();
  }, []); // Run only once on component mount

  const handleSaveSchedule = () => {
    if (!label.trim()) {
      setLabelError(true);
      return;
    } else {
      setLabelError(false);
    }

    if (!time) {
      setTimeError(true);
      return;
    } else {
      setTimeError(false);
    }

    const newSchedule = { label, time, isDaily, isOn };
    // Logic to save the schedule
    console.log('Label:', label);
    console.log('Time:', time);
    console.log('Is Daily:', isDaily);
    console.log('Is On:', isOn);
  };

  const [selectedTab, setSelectedTab] = useState('saved');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className="schedule-container">
      {/* Your existing UI code */}
      <div className="tab-container">
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Saved Schedules" value="saved" />
          <Tab label="Create Schedule" value="create" />
        </Tabs>
      </div>
      {selectedTab === 'saved' ? (
        <div className="saved-schedules">
          {schedules && schedules.length > 0 ? (
            schedules.map((schedule, index) => (
              <div className="saved-schedule-item" key={index}>
                <div className="schedule-info">
                  <div className="schedule-label">{schedule.name}</div>
                  <div className="schedule-status">{schedule.status === 1 ? 'Active' : 'Pending'}</div>
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </div>
                <div className="schedule-details">
                  <div className="schedule-turn">Turn {schedule.deviceName}</div>
                  <div className="schedule-on-off">{schedule.switchState ? 'ON' : 'OFF'}</div>
                  <div className="schedule-time">{schedule.jobTime}</div>
                </div>
              </div>
            ))
          ) : (
            <>
              <Typography marginBottom={2} variant="h6">
                No Schedules found for this device
              </Typography>
              <Button variant="contained" color="primary" fullWidth>
                Create Schedule
              </Button>
            </>
          )}
        </div>
            ) : (
              <div className="create-schedule">
                <Typography variant="h6">Create Schedule</Typography>

                <div className="create-schedule">
                  

                  <TextField
                    required
                    id="outlined-required"
                    label="Label"
                    variant="filled"
                    
                  />

                  

                  <FormControlLabel
                    control={<Checkbox />}
                    label="Daily"
                    className='daily-checkbox'
                  />

                  <FormControlLabel
                    control={<Switch />}
                    label={isOn ? "On" : "Off"}
                  />

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticTimePicker
                      defaultValue={dayjs('2022-04-17T15:30')}
                      renderInput={(props) => (
                        <TextField {...props} variant="standard" InputProps={{ disableUnderline: true }} />
                      )}
                    />
                  </LocalizationProvider>
                </div>              </div>
            )}
    </div>
  );
};

export default Schedule;
