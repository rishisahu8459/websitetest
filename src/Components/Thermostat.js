import React, { useState } from 'react';
import CircleSlider from 'react-circle-slider';
import '../styles/Thermostat.css';

const Thermostat = () => {
  const [temperature, setTemperature] = useState(20);

  const handleChange = (value) => {
    setTemperature(value);
  };

  return (
    <div className="thermostat">
      <CircleSlider
        value={temperature}
        onChange={handleChange}
        size={150}
        circleWidth={12}
        progressWidth={12}
        knobRadius={10}
        showTooltip={true}
        knobColor="#7c41f5"
        progressColorFrom="#3498db"
        progressColorTo="#e74c3c"
        tooltipColor="#ecf0f1"
        tooltipTextColor="#2c3e50"
        max={30}
        min={0}
      />
      <p className="temperature-text">{temperature}°C</p>
    </div>
  );
};

export default Thermostat;
