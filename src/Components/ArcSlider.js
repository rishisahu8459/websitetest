import React from "react";
import { IconButton } from "@material-ui/core";
import { Remove, Add } from "@mui/icons-material/";
import CircularSlider from "react-circular-slider-svg";
import "../styles/ArcSlider.css";
import Typography from '@mui/material/Typography';
import FanIcon from '../icons/ceiling-fan.png';
import { Options } from './Options';

const Slider = ({ roomName, deviceName }) => {
  const [value1, setValue1] = React.useState(0);

  const increaseSpeed = () => {
    if (value1 < 4) {
      setValue1(value1 + 1);
    }
  };

  const decreaseSpeed = () => {
    if (value1 > 0) {
      setValue1(value1 - 1);
    }
  };

  return (
    <>
      <div className="slider-container">
      <IconButton className="iconss">
          <img src={FanIcon} />
      </IconButton>
      <Typography position={"absolute"} top={5} left={30} justifyContent={'center'} variant="h5" style={{ fontWeight: 'bold', textTransform: 'uppercase' }} marginLeft={2} marginTop={1} >{roomName}</Typography>
      <Typography position={"absolute"} top={5} left={120} justifyContent={'center'} variant="h5" style={{ fontWeight: 'bold', textTransform: 'uppercase' }} marginLeft={2} marginTop={1} >{deviceName}</Typography>      
      <div className="slider-content">
      <IconButton onClick={decreaseSpeed}>
          <Remove />
        </IconButton>
        
        
        <CircularSlider
          className="slider"
          trackWidth={15}
          size={250}
          minValue={0}
          step={1}
          maxValue={4}
          startAngle={130}
          endAngle={230}
          angleType={{
            direction: "cw",
            axis: "-y",
          }}
          handle1={{
            value: value1,
            onChange: (v) => setValue1(v),
          }}
          arcColor="#2565e6"
          arcBackgroundColor="grey"
          coerceToInt="true"
          arcWidth={20}
        />
        <IconButton onClick={increaseSpeed}>
          <Add />
        </IconButton>
        <div className="speed-status-container">
          <span className="speed-status">{value1}</span>
        </div>
        </div>
        <Options />
      </div>
    </>
  );
};

export default Slider;