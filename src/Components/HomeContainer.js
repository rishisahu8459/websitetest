import React from 'react';
import "../App.css"
import Paper from '@mui/material/Paper';
import Weathercard from './Weathercard';
import Rooms from './Rooms';
import MyDevices from './MyDevices';
import ControlPanel from './ControlPanel';



const HomeContainer = () => {
    return (
      

<div className='left-section' elevation={1}>
        <div className='weather-section'>
       <Weathercard/>
        </div>
        
        <div>
         <Rooms/>
        </div>
        
      </div>
      


  );
};

export default HomeContainer;