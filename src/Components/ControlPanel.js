// ControlPanel.js
import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import DevicesIcon from '@mui/icons-material/Devices';
import { IconButton } from '@mui/material';
import { CircleSlider } from 'react-circle-slider';
import RoundSlider from './RoundSlider'; // Import the appropriate file for RoundSlider
import '../App.css';
import '../styles/ControlPanel.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArcSlider from './ArcSlider';
import SingleButton from './SingleButton';
import ThreeButton from './ThreeButton';
import Thermostat from './Thermostat';


const ControlPanel = ({ selectedDevice, roomName }) => {
  const [isSwitchOn, setSwitchOn] = useState(false);
  const [temperature, setTemperature] = useState(20);

  const handleSwitchChange = () => {
    setSwitchOn(!isSwitchOn);
  };

  const handleTemperatureChange = (value) => {
    setTemperature(value);
  };

  const increaseTemperature = () => {
    setTemperature((prevTemperature) => Math.min(prevTemperature + 1, 30));
  };

  const decreaseTemperature = () => {
    setTemperature((prevTemperature) => Math.max(prevTemperature - 1, 0));
  };

  // Render different sections based on the selected device type
  const renderDeviceComponent = () => {
    switch (selectedDevice?.deviceType) {
      case 1:
        return <ArcSlider roomName={roomName} deviceName={selectedDevice?.name}/>;
      case 5:
        return <SingleButton roomName={roomName} deviceName={selectedDevice?.name} />;
      case 31:
        return <SingleButton  roomName={roomName} deviceName={selectedDevice?.name}/>;

         // Device type as 1 = Fan, 2 = Switch, 21 = MiniSwitch, 3 = Socket, 31 = New Socket,
        //  4 = Cooler, 5 = Pump, 6 = Valve, 61 = Valve, 7 = Power Strip, 8 = Light, 9 = Temp
      // Add more cases for other device types and components
      default:
        return <ThreeButton roomName={roomName} deviceName={selectedDevice?.name} deviceId={selectedDevice?.deviceId} />;
    }
  };

  return (
    <div className="control-panel">
      
      <div className='control-panel-section'>
        {renderDeviceComponent()}
      </div>
    </div>
  );
};

export default ControlPanel;
