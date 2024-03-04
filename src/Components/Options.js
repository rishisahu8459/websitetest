import React, { useState, useEffect } from 'react';
import {
    Box,
    IconButton,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Select,
    MenuItem
} from '@mui/material';
import Alert from '@mui/material/Alert';
import { CircularProgress } from '@mui/material';
import SecurityUpdateGoodIcon from '@mui/icons-material/SecurityUpdateGood';
import DeleteIcon from '@mui/icons-material/Delete';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ShareIcon from '@mui/icons-material/Share';
import UpdateIcon from '@mui/icons-material/Update';
import SecurityUpdateIcon from '@mui/icons-material/SecurityUpdate';
import RestartIcon from '@mui/icons-material/RestartAlt';
import RenameIcon from '@mui/icons-material/DriveFileRenameOutline';
import MoveToIcon from '@mui/icons-material/FlipToFront';
import VersionIcon from '@mui/icons-material/SecurityUpdate';
import Schedule from './Schedule';
import { LocalStorageService } from '../utils';


const AUTH_TOKEN = LocalStorageService.getItem('token');

export const Options = ({  deviceId , qrCodeUrl='https://support.thinkific.com/hc/article_attachments/360042081334/5d37325ea1ff6.png' , version='5.6' }) => {
        const [dialogOpen, setDialogOpen] = useState(false);
        const [selectedOption, setSelectedOption] = useState('');
        const [alertOpen, setAlertOpen] = useState(false);
        const [deviceName, setDeviceName] = useState('TEST SOCKET');
        const [room, setRoom] = useState('');

        // useEffect(() => {
        //     fetchDevices();
        //     const intervalId = setInterval(fetchDevices, 5000);

        //     return () => {
        //         clearInterval(intervalId);
        //     };
        // }, []);

        // const fetchDevices = async () => {
        //     try {
        //         const devicesUrl = `https://iotapi.mobiiot.in/msapp/v1/device/devices/${localStorage.getItem('id')}`;
        //         const response = await fetch(devicesUrl, {
        //             headers: {
        //                 Authorization: `Bearer ${AUTH_TOKEN}`,
        //             },
        //         });
        //         const data = await response.json();
        //         setDevices(data.response || []);
        //     } catch (error) {
        //         console.error('Error fetching devices:', error);
        //     }
        // };

        // const [devices, setDevices] = useState([]);
       



        const handleRoomChange = (event) => {
          setRoom(event.target.value);
        };

        const handleOptionClick = (option) => {
            setSelectedOption(option);
            setDialogOpen(true);
        };
    
        const handleCloseDialog = () => {
            setDialogOpen(false);
        };
    
        const handleOkClick = () => {
            switch (selectedOption) {
            case 'Delete':
                deleteDevice();
                setAlertOpen(false);
                setTimeout(function() {
                setAlertOpen(false);
                }, 100);
                break;
            case 'Rename':
                console.log(deviceName);
                console.log(deviceId);
                renameDevice();
                break;
            case 'Move To':
                updateRoom();
                console.log(room);
                console.log(deviceId);
                break;
            default:
                break;
            }
            setDialogOpen(false);
        };
        const handleCloseAlert = () => {
            setAlertOpen(false);
        };

        setTimeout(function() {
            handleCloseAlert();
        }, 5000); 
        
        const handleDeviceNameChange = (event) => {
            setDeviceName(event.target.value);
            console.log(deviceName);
        };

        const deleteDevice = async () => {
            try {
                const response = await fetch(`https://iotapi.mobiiot.in/msapp/v1/device/delete/${deviceId}/${LocalStorageService.getItem('id')}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${AUTH_TOKEN}`,
                    },
                });
                if (response.ok) {
                    console.log('Device deleted successfully');
                } else {
                    console.error('Failed to delete device');
                }
            } catch (error) {
                console.error('Error deleting device:', error);
            }
        };
       

        const renameDevice = async () => {
            try {
                console.log(deviceName);
                console.log(deviceId);  
                const response = await fetch(`https://iotapi.mobiiot.in/msapp/v1/device/rename/${deviceId}/${deviceName}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${AUTH_TOKEN}`,
                    },
                });
                if (response.ok) {
                    console.log('Device renamed successfully');
                } else {
                    console.error('Failed to rename device');
                }
            } catch (error) {
                console.error('Error renaming device:', error);
            }
        };

        const updateRoom = async () => {
            try {
                const response = await fetch(`https://iotapi.mobiiot.in/msapp/v1/device/update-room/${deviceId}/${room}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${AUTH_TOKEN}`,
                    },
                });
                if (response.ok) {
                    console.log('Room updated successfully');

                    
                } else {
                    console.error('Failed to update room');
                }
            } catch (error) {
                console.error('Error updating room:', error);
            }
        };

    return (
        
        <Box display={'flex'} flexDirection={'row'} justifyContent={'stretch'}>
            <div className='options' onClick={() => handleOptionClick('Delete')}>
                <IconButton>
                    <DeleteIcon />
                </IconButton>
                <Typography variant="body1">Delete</Typography>
            </div>

            <div className='options' onClick={() => handleOptionClick('Schedule')}>
                <IconButton>
                    <ScheduleIcon />
                </IconButton>
                <Typography variant="body1">Schedule</Typography>
            </div>

            <div className='options' onClick={() => handleOptionClick('Share')}>
                <IconButton>
                    <ShareIcon />
                </IconButton>
                <Typography variant="body1">Share</Typography>
            </div>

            <div className='options' onClick={() => handleOptionClick('Update')}>
                <IconButton>
                    <SecurityUpdateIcon />
                </IconButton>
                <Typography variant="body1">Update</Typography>
            </div>

            <div className='options' onClick={() => handleOptionClick('Restart')}>
                <IconButton>
                    <RestartIcon />
                </IconButton>
                <Typography variant="body1">Restart</Typography>
            </div>

            <div className='options' onClick={() => handleOptionClick('Rename')}>
                <IconButton>
                    <RenameIcon />
                </IconButton>
                <Typography variant="body1">Rename</Typography>
            </div>

            <div className='options' onClick={() => handleOptionClick('Move To')}>
                <IconButton>
                    <MoveToIcon />
                </IconButton>
                <Typography variant="body1">Move To</Typography>
            </div>

            <div className='options' onClick={() => handleOptionClick('Version')}>
                <IconButton>
                    <SecurityUpdateGoodIcon />
                </IconButton>
                <Typography variant="body1">Version</Typography>
            </div>

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>{selectedOption}</DialogTitle>
                <DialogContent>
                {selectedOption === 'Delete' && (
          <Typography variant="body1">Do you really want to delete this device?</Typography>
        )}
        {selectedOption === 'Restart' && (
          <Typography variant="body1">Are you sure you want to restart this device?</Typography>
        )}
        {selectedOption === 'Rename' && (
          <>
            <Typography variant="body1">Please enter the name for this device</Typography>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Device Name"
              type="text"
              fullWidth
              value={deviceName}
              onChange={handleDeviceNameChange}
            />
          </>
        )}
        {selectedOption === 'Move To' && (
          <>
            <Typography variant="body1">Choose a room to move your device to</Typography>
            <Select
              value={room}
              onChange={handleRoomChange}
              fullWidth
            >
                {/* LIVING ROOM=1, BEDROOM1=2, BEDROOM2=3, BEDROOM3=4,
                 KITCHEN=5, WASHROOM1=6,OFFICE=7,WASHROOM2=8, OTHER9 */}
              <MenuItem value={1}>Living Room</MenuItem>
              <MenuItem value={2}>Bed Room 1</MenuItem>
              <MenuItem value={3}>Bed Room 2</MenuItem>
              <MenuItem value={4}>Bed Room 3</MenuItem>
              <MenuItem value={5}>Kitchen</MenuItem>
              <MenuItem value={6}>Washroom 1</MenuItem>
              <MenuItem value={8}>Washroom 2</MenuItem>
              <MenuItem value={7}>Office</MenuItem>
              <MenuItem value={9}>Others</MenuItem>
            </Select>
          </>
        )}
         {selectedOption === 'Share' && (
          <>
            <img src={qrCodeUrl} alt="QR Code" />
            <Typography variant="h6">Scan this QR code to share this Device with your Family members</Typography>
          </>
        )}


          {selectedOption === 'Schedule' && (
          <Schedule deviceId={deviceId}/>
        )}

        {selectedOption === 'Update' && (
            <>
            <Typography variant="body1">Checking for update...</Typography>
            <CircularProgress />
            </>
        )}
        {selectedOption === 'Version' && (
            <>
            <Typography variant="h4">{version}</Typography>
            
            </>
        )}

        {/* Add content specific to each option */}
        {/* For example, you can describe the action related to the option */}

                </DialogContent>
                <DialogActions>
                    {selectedOption !== 'Share'&& (
                        <>
                            <Button onClick={handleCloseDialog} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleOkClick} color="primary" autoFocus>
                                OK
                            </Button>
                        </>
                    )}
                    
                    {selectedOption === 'Share' && (
                        <Button onClick={handleCloseDialog} color="primary">
                            Done
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
            {/* Alert component */}
            {/* <Alert open={alertOpen} onClose={handleCloseAlert} severity="success">
                Device deleted
            </Alert> */}
        </Box>
    );
};

export default Options;
