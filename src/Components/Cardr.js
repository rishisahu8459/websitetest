import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import "../App.css";

// Import icons
import AcUnitIcon from '../icons/air-conditioner.png';
import FanIcon from '../icons/ceiling-fan.png';
import CoffeeMakerIcon from '@mui/icons-material/Coffee';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import RefrigeratorIcon from '../icons/refrigerator.png';
import LightsIcon from '../icons/hang-lamp.png';
import WashingMachineIcon from '../icons/washing-machine.png';
import LampIcon from '../icons/floor-lamp.png';
import AirPurifierIcon from '../icons/air-purifier.png';
import AlarmClockIcon from '../icons/alarm-clock.png';
import ToasterIcon from '../icons/toaster.png';
import CeilingLampIcon from '../icons/led-bulb.png';
import TvIcon from '@mui/icons-material/Tv';
import DevicesIcon from '@mui/icons-material/Devices';
import { colors } from '@mui/material';

// Device icons mapping
export const deviceIcons = {
  'Smart AC': <img src={AcUnitIcon} alt="Air Purifier" />,
  'TV': <TvIcon />,
  'TEST FAN': <img src={FanIcon} alt="Ceiling Fan" />,
  'Coffee Maker': <CoffeeMakerIcon />,
  'Microwave': <MicrowaveIcon />,
  'Water Purifier': <WaterDropIcon />,
  'Refrigerator': <img src={RefrigeratorIcon} alt="Refrigerator" />,
  'Lights': <img src={LightsIcon} alt="Lights" />,
  'Washing machine': <img src={WashingMachineIcon} alt="Washing machine" />,
  'Lamp': <img src={LampIcon} alt="Lamp" />,
  'Air Purifier': <img src={AirPurifierIcon} alt="Air Purifier" />,
  'Alarm Clock': <img src={AlarmClockIcon} alt="Alarm Clock" />,
  'Toaster': <img src={ToasterIcon} alt="Toaster" />,
  'Ceiling Lamp': <img src={CeilingLampIcon} alt="Ceiling Lamp" />,
  // Add more mappings as needed
};

export const Cardr = ({ device, isSelected, onClick }) => {
  const [isSwitchOn, setSwitchOn] = useState(false);

  useEffect(() => {
    const switchState = device.state.charAt(1) === '1';
    setSwitchOn(switchState);
  }, [device.state]);

  const handleSwitchChange = () => {
    setSwitchOn(!isSwitchOn);
    // Update the device state on the server (You need to implement this part)
    // updateDeviceState(device.id, isSwitchOn ? '00' : '01'); // Assuming '00' is OFF and '01' is ON
  };

  // Map device names to background colors
  const deviceNameColors = {
    'TEST FAN': '#f0ecfa',
    'TEST STRIP': '#fde9ea',
    "TEST 2GANG": '#f0ecfa',
    'TEST SOCKET': '#fef8e8',
    'TEST SWITCH': '#ffc9c2',
    // Add more mappings as needed
  };

  const backgroundColor = deviceNameColors[device.name] || '#fde9ea';

  return (
    <div className={`card ${isSelected ? 'selected-card' : ''}`} onClick={onClick} style={{ backgroundColor, border: isSelected ? '2px solid #2565e6' : 'none' }}>
   
      <div className='status-text' style={{ color: isSwitchOn ? 'green' : 'red' }}>
        {isSwitchOn ? 'ON' : 'OFF'}
      </div>
      <div className='card-content'>
        <Typography variant="body2" className={`device-name ${isSelected ? 'selected-text' : ''}`}>
          {device.name}
        </Typography>
        <div className='device-icon'>
          <IconButton>
            {/* Use the imported deviceIcons mapping */}
            {deviceIcons[device.name] || (
              // Fallback to DevicesIcon if the specific icon is not found
              <DevicesIcon className={`device-icon ${isSelected ? 'selected-icon' : ''}` } />
            )}
          </IconButton>
        </div>
      </div>
      <div className='switch-container'>
        <Switch checked={isSwitchOn} onChange={handleSwitchChange} />
      </div>
    </div>
  );
};
