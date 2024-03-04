import React from 'react';
// import '../styles/Knob.css'; // Adjust the path based on your file structure

const KnobControl = () => {
  // Your React component code here

  return (
    <div>
    <link rel="stylesheet" type="text/css" href="Knob.css" />
    <input
      className="knob"
      type="range"
      step="10"
      value="60"
      min="0"
      max="100"
    />
    {/* Other content or components */}
  </div>
  );
};

export default KnobControl;