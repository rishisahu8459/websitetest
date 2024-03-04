// SingleButton.js
import React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
 // Pump icon
import '../styles/SingleButton.css';

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import OpacityIcon from '@mui/icons-material/Opacity'; // Pump icon
import '../styles/SingleButton.css';
import Pumpbig from '../icons/pumpbig.png';
import Switch from '@mui/material/Switch';
import socket from '../icons/socket1.png';
import cardImage from '@mui/icons-material/Devices';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ShareIcon from '@mui/icons-material/Share';
import UpdateIcon from '@mui/icons-material/Update';
import RestartIcon from '@mui/icons-material/RestartAlt';
import RenameIcon from '@mui/icons-material/DriveFileRenameOutline';
import MoveToIcon from '@mui/icons-material/FlipToFront';
import VersionIcon from '@mui/icons-material/SecurityUpdate';

import FanIcon from '../icons/socket64.png';
import { Options } from './Options';




export const SingleButton = ({ roomName, deviceName }) => {
  const [isSwitchOn, setSwitchOn] = useState(false);

  const handleSwitchChange = () => {
    setSwitchOn(!isSwitchOn);
  };

  return (
    <div className="SingleButton">
      
      <Typography variant="h5" style={{ fontWeight: 'bold', textTransform: 'uppercase' }} marginLeft={2} marginTop={1} >{roomName}</Typography>
      <Typography variant="h8" style={{ fontWeight: 'bold', textTransform: 'uppercase' }} marginLeft={2} marginTop={1} >{deviceName}</Typography>
    <div className="room-info">
    <IconButton>
          <img src={FanIcon} />
        </IconButton>
      {/* <Typography variant="h5" style={{ fontWeight: 'bold', textTransform: 'uppercase' }} marginLeft={2} marginTop={1} >{roomName}</Typography>
      <Typography variant="h5" style={{ fontWeight: 'bold', textTransform: 'uppercase' }} marginLeft={2} marginTop={1} >{deviceName}</Typography> */}
    </div>
    <div className="switch-container">
      {/* <Typography variant="h6" color={isSwitchOn ? 'green' : 'red'}>
        {isSwitchOn ? 'ON' : 'OFF'}
      </Typography> */}
     
    </div>
    <div className="big-device-icon">
      <img src={socket} alt="Socket" />
      
    </div>
    <IconButton onClick={handleSwitchChange}>
        <PowerSettingsNewIcon color={isSwitchOn ? 'success' : 'error'} />
      </IconButton>
    <Options />
  </div>
  );
};

export default SingleButton;


