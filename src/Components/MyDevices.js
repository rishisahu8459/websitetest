import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress for the loader
import { LocalStorageService } from '../utils';
import { Cardr } from '../Components/Cardr';

const deviceIcons = {
  
  // ... (add other icons as needed)
};

const MyDevices = ({ devices }) => {
  const [selectedOption, setSelectedOption] = useState('all');
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(true); // Introduce a loading state

  const AUTH_TOKEN = LocalStorageService.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const devicesUrl = 'https://iotapi.mobiiot.in/msapp/v1/device/devices/107696710839302992413';
        const response = await fetch(devicesUrl, {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setApiResponse(data); // Update the apiResponse state with the fetched data
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        setLoading(false); // Set loading to false when the data fetching is complete
      }
    };

    fetchData();
  }, [AUTH_TOKEN]); // Fetch data on component mount and whenever AUTH_TOKEN changes

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const filteredDevices = selectedOption === 'all'
    ? apiResponse?.response || []
    : apiResponse?.response?.filter(device => {
      const isFirstCharacterOne = device.state.charAt(1) === '1';
      return (isFirstCharacterOne && selectedOption === 'on') || (!isFirstCharacterOne && selectedOption === 'off');
    }) || [];

  return (
    <div className="MyDevicesPaper">
      <div className="MyDevicesHeader">
        <Typography variant="h5" marginLeft={1}>
          My Devices
        </Typography>

        <FormControl>
          <Select
            value={selectedOption}
            onChange={handleChange}
            className="dropdown"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="on">ON</MenuItem>
            <MenuItem value="off">OFF</MenuItem>
          </Select>
        </FormControl>
      </div>

      {loading ? ( // Conditionally render the loader
        <CircularProgress style={{ margin: 'auto', display: 'block' }} />
      ) : (
        <>
          {filteredDevices.length === 0 ? (
            <Typography variant="h5" style={{ textAlign: 'center', marginTop: 20 }}>
              No Devices With {selectedOption.toUpperCase()} Filter Found
            </Typography>
          ) : (
            <div className="CardsContainer" style={{ overflowX: 'hidden' }}>
              <Grid container spacing={2} columnSpacing={{ xs: 2, sm: 4, md: 6 }}>
                {filteredDevices.map((device) => (
                  <Grid item key={device.id} xs={2} sm={2} md={5}>
                    <Cardr key={device.id} device={device} />
                  </Grid>
                ))}
              </Grid>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyDevices;