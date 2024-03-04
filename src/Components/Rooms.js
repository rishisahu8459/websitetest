import React, { useEffect, useState } from 'react';
import { LocalStorageService } from '../utils';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Cardr } from './Cardr';
import ControlPanel from './ControlPanel';

const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState(1); // Default room ID
  const [selectedCard, setSelectedCard] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const AUTH_TOKEN = LocalStorageService.getItem('token');

  useEffect(() => {
    // Fetch devices from API and update state
    const fetchDevicesByRoom = async (room) => {
      try {
        const devicesUrl = `https://iotapi.mobiiot.in/msapp/v1/device/device-by-room/${room}/${LocalStorageService.getItem('id')}`;
        const response = await fetch(devicesUrl, {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        });
        const data = await response.json();
        setDevices(data.response || []);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevicesByRoom(selectedRoom);
  }, [selectedRoom]);

  const handleRoomChange = (roomId) => {
    setSelectedRoom(roomId);
    setSelectedCard(null);
    
    handleMenuClose();
  };

  const handleCardClick = (index) => {
    setSelectedCard(index);
    const selectedDevice = devices[index]; // Assuming devices array contains device information directly
    setSelectedDevice(selectedDevice);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='rooms'>
      <div className='header'>
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>User's Home</Typography>
        <div className='dropdown'>
          <Typography variant="h7" style={{ marginRight: '8px' }}>
            {getRoomName(selectedRoom)}
          </Typography>
          <IconButton onClick={handleMenuOpen}>
            <ArrowDropDownIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {Object.keys(ROOMS).map((room) => (
              <MenuItem key={room} onClick={() => handleRoomChange(room)}>
                {ROOMS[room]}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
      <div className='scrollable-section'>
        {devices.length > 0 ? (
          devices.map((device, index) => (
            <Cardr
              key={index}
              device={device}
              isSelected={selectedCard === index}
              onClick={() => handleCardClick(index)}
            />
          ))
        ) : (
          <Typography variant="h4" style={{ textAlign: 'center', padding: '16px' }}>
            No Devices In This Room
          </Typography>
        )}
      </div>
      {/* Pass the selected device to ControlPanel */}
      <ControlPanel selectedDevice={selectedDevice} roomName={getRoomName(selectedRoom)} />
    </div>
  );
};

// Room names mapping to room numbers
const ROOMS = {
  1: 'Living Room',
  2: 'Bedroom 1',
  3: 'Bedroom 2',
  4: 'Bedroom 3',
  5: 'Kitchen',
  6: 'Washroom 1',
  7: 'Office',
  8: 'Washroom 2',
  9: 'Other',
};

// Utility function to get room name by ID
const getRoomName = (roomId) => {
  return ROOMS[roomId] || `Room ${roomId}`;
};

export default Rooms;
