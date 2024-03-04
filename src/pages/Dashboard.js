import React, { useEffect, useRef, useState } from 'react';
import { DeviceDetail } from './DeviceDetail';
import device from '../assets/img/device.png';
import humidity from '../assets/img/humidity.png';
import temp from '../assets/img/temperature.png';
import { LocalStorageService, parseState } from '../utils';
import logo from '../assets/img/logo.png';
import { useNavigate } from 'react-router-dom';
import HomeContainer from '../Components/HomeContainer';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import "../App.css"
import { Box } from '@mui/material';

import MyDevices from '../Components/MyDevices'; // Import MyDevices from its file location

const DeviceTile = ({ ...props }) => {
  const { name, state } = props;
  const { temperature, humidity: humid } = parseState(state);

  return (
    <div className='device-tile' role='button' onClick={props.onClick}>
      <img src={device} alt="device" width="24px" />
      <p className='device-name'>{name}</p>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <div className='temp-details'>
          <img src={temp} alt="" />
          <p>{temperature}</p>
        </div>
        {humid && <div className='temp-details'>
          <img src={humidity} alt="" />
          <p>{humid}</p>
        </div>}
      </div>
    </div>
  );
}

export const Dashboard = () => {
  const AUTH_TOKEN = LocalStorageService.getItem('token');
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  async function fetchDevices() {
    try {
      const devicesUrl = `https://iotapi.mobiiot.in/msapp/v1/device/devices/${LocalStorageService.getItem('id')}`;
      const response = await fetch(devicesUrl, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorised');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
  
      const { response: devicesData } = await response.json();
      setDevices(devicesData.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)) || []);
    } catch (error) {
      if (error.message === 'Unauthorised') {
        localStorage.clear();
        alert('Logging Out, please login again!');
        navigate('/');
      } else {
        console.error('An error occurred while fetching devices:', error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      await fetchDevices();
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <Box display={'flex'} justifyContent={'center'}>
       
        <Sidebar />
        <div className='main-content'>
          <div className='nav-bar'>
            <Navbar />
          </div>
          <HomeContainer />
        </div>
        <Box className='right-section'>
          {/* Render loader while data is being fetched */}
         
          
          {/* Render MyDevices only when data is fetched */}
           <MyDevices devices={devices} />
        </Box>
      </Box>
    </>
  );
};
