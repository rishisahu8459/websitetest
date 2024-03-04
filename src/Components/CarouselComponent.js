import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    head:'Login', 
    label: 'One Time login to the Swyam Smart Home Application and Convert your Home to Smart Home',
    imgPath:
      'https://i.ibb.co/bKC6Zqt/onboard-login.png',
  },
  { 
    head:'Scan QR Code',
    label: 'Add your Smart Home Devices by Scanning QR Code and everythings would be taken Care',
    imgPath:
      'https://i.ibb.co/th90xPY/onboard-scan-qr.png',
  },
  {
    head:'Secure Cloud',
    label: 'Your Swayam smart home Devices cloud connection is secure and non hackable, use Without wories',
    imgPath:
      'https://i.ibb.co/qBJqmmx/onboard-secure-cloud.png',
  },
  {
    head:'Voice Control',
    label: 'Device supports Voice Control with Amazon Alexa and Google Home, Control your Smart Home Devices with your Voice',
    imgPath:
      'https://i.ibb.co/m6WXQPv/onboard-alexa.png',
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: 600, flexGrow: 1, }}>
      <Typography marginTop={2} textAlign={'center'} variant='h5' top={2}>{images[activeStep].head}</Typography>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                 margin: 5,
                  display: 'block',
                  alignItems: 'center',
                  WebkitJustifyContent: 'center',
                  height: 500,
                  
                  overflow: 'hidden',
                  
                  bgcolor: 'background.paper',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <Paper className='onboard-paper'
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          height: 100,
          pl: 2,
          textAlign: 'center',
          bgcolor: 'white',
        }}
      >
        
        <Typography variant='h6' >{images[activeStep].label}</Typography>
      </Paper>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default SwipeableTextMobileStepper;
