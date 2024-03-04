// CardComponent.js
import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import DevicesIcon from '@mui/icons-material/Devices';
import "../styles/Card.css";
import { Card, IconButton } from '@mui/material';

const colors = ['#7c41f5', '#f5c525', '#ff9062', '#3acbe8'];

const CardComponent = ({ title, state, icon }) => {
  
  const [cardState, setCardState] = useState(state.charAt(1) === '1');

  const handleSwitchChange = () => {
    // Update the state locally and send a request to update the server
    setCardState(!cardState);
    // Add logic here to update the state on the server/API
  };

  return (
    <Card className={`Card ${cardState ? 'on' : 'off'}`} style={{  borderRadius: '20px' }}>
      <IconButton className='devices-icon'>
        {icon || <DevicesIcon style={{ fontSize: '32px', margin: '10px', color: 'black' }} />}
      </IconButton>
      <p className="CardTitle">{title}</p>
      <div className="SwitchContainer">
        <Switch checked={cardState} onChange={handleSwitchChange} className="Switch" />
      </div>
    </Card>
  );
};

export default CardComponent;