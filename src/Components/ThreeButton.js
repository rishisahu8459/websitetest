// ThreeButton.js
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import '../styles/ThreeButton.css'; // You can create a new CSS file for this component
import Pumpbig from '../icons/pumpbig.png';
import strip from '../icons/strips_index.png';
import Options from './Options';
import FanIcon from '../icons/ceiling-fan.png';
import IconButton from '@mui/material/IconButton';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const ThreeButton = ({ roomName, deviceName, deviceId}) => {
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(false);
  const [switch3, setSwitch3] = useState(false);
  const [switch4, setSwitch4] = useState(false);

  const handleSwitchChange = (switchNumber) => {
    switch (switchNumber) {
      case 1:
        setSwitch1(!switch1);
        break;
      case 2:
        setSwitch2(!switch2);
        break;
      case 3:
        setSwitch3(!switch3);
        break;
      case 4:
        setSwitch4(!switch4);
        break;
      default:
        break;
    }
  };

  return (
    <div className="ThreeButton">
      <div className="room-info">
        <IconButton>
          <img src={FanIcon} />
        </IconButton>
        <Typography variant="h5" style={{ fontWeight: 'bold', textTransform: 'uppercase' }} marginLeft={2} marginTop={1} >
          {roomName}
        </Typography>
        <Typography variant="h5" style={{ fontWeight: 'bold' }} marginLeft={2} marginTop={1}>
          {deviceName}
        </Typography>
      </div>
      <div className="big-device-icon">
          <img src={strip} color='#2565e6' />
          </div>
          <div className="switches-container">

        <div className="switch-main">
          <Typography variant="body2">Power</Typography>
          <IconButton onClick={() => handleSwitchChange(4)}>
            <PowerSettingsNewIcon color={switch4 ? 'success' : 'error'} />
          </IconButton>
        </div>



            
          <div className="switch-item">
            <Typography variant="body2">Switch 1</Typography>
            <IconButton onClick={() => handleSwitchChange(1)}>
              <PowerSettingsNewIcon color={switch1 ? 'success' : 'error'} />
            </IconButton>
          </div>
          <div className="switch-item">
            <Typography variant="body2">Switch 2</Typography>
            <IconButton onClick={() => handleSwitchChange(2)}>
              <PowerSettingsNewIcon color={switch2 ? 'success' : 'error'} />
            </IconButton>
          </div>
          <div className="switch-item">
            <Typography variant="body2">Switch 3</Typography>
            <IconButton onClick={() => handleSwitchChange(3)}>
              <PowerSettingsNewIcon color={switch3 ? 'success' : 'error'} />
            </IconButton>
        </div>
        <div className="switch-item">
            <Typography variant="body2">USB</Typography>
            <IconButton onClick={() => handleSwitchChange(2)}>
              <PowerSettingsNewIcon color={switch2 ? 'success' : 'error'} />
            </IconButton>
          </div>
      </div>
      <Options deviceId={deviceId}/>
    </div>
  );
};

export default ThreeButton;
