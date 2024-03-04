import React from 'react';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import { CircleSlider } from 'react-circle-slider';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const RoundSlider = ({ isSwitchOn, handleSwitchChange, roomName, deviceName }) => {
  const [temperature, setTemperature] = React.useState(20);

  const handleTemperatureChange = (value) => {
    setTemperature(value);
  };

  const increaseTemperature = () => {
    setTemperature((prevTemperature) => Math.min(prevTemperature + 1, 30));
  };

  const decreaseTemperature = () => {
    setTemperature((prevTemperature) => Math.max(prevTemperature - 1, 0));
  };

  return (
    <div className="Slider">
       <div className="room-info">
        <Typography variant="h5" marginLeft={2}>
          {roomName}
        </Typography>
        <Typography variant="h5" marginLeft={2}>
          {deviceName}
        </Typography>
      </div>
      <div className="buttonContainer">
        <IconButton onClick={decreaseTemperature}><RemoveIcon/></IconButton>
      </div>
      <div className="textContainer">
        {temperature}°C
        <div className="minute">Temperature</div>
      </div>
      <CircleSlider
        value={temperature}
        stepSize={1}
        onChange={(value) => handleTemperatureChange(value)}
        size={250}
        max={30}
        gradientColorFrom="#89cff0"
        gradientColorTo="#ff7e5f"
        knobRadius={20}
        circleWidth={40}
      />
      <div className="buttonContainer">
        <IconButton onClick={increaseTemperature}><AddIcon/></IconButton>
      </div>
    </div>
  );
};

export default RoundSlider;
