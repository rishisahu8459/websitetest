import { GoogleLogin } from "@react-oauth/google";
import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router";
import logo from '../assets/img/logo.png'
import robo from '../assets/img/robo.png'
import jwt from 'jwt-decode'
import { LocalStorageService, WEB_AUTH_TOKEN } from "../utils";
import '../App.css'
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import Typography from '@mui/material/Typography';



import CarouselComponent from "../Components/CarouselComponent";
import { Box } from "@mui/material";

export const Login = () => {


  useEffect(() => {
    document.title = 'Login - Dashboard';
  }, []);
  const navigate = useNavigate();
  const [isLogging, setIsLogging] = useState(false)
  const onSuccess = async ({ ...props }) => {
    const { credential } = props;
    const { sub, email, name } = jwt(credential)
    fetch('https://iotapi.mobiiot.in/msapp/web', {
      method: 'POST',
      headers: {
        // 'X-ID-TOKEN': credential
        'X-WEB-TOKEN': WEB_AUTH_TOKEN,
        'X-WEB-ID': sub,
        'X-WEB-EMAIL': email,
        'X-WEB-NAME': name
      }
    }).then(res => res.json()).then(res => {
      const { Authorization } = JSON.parse(res);
      const [_, token]=  Authorization.split('Bearer ')
      LocalStorageService.setItem('id', sub)
      LocalStorageService.setItem('email', email)
      LocalStorageService.setItem('token', token)
      setIsLogging(false)
      navigate("/dashboard");
    })


  };
  return (
    <div className="login-page">
    <div className="login-nav">
      <div className="login-nav-logo">
        <img src={robo} alt="Robo" />
        <img src={logo} alt="Logo" />
      </div>
    </div>
    <div className="center-area">
      {/* <Carousel /> Replace 'Carousel' with the actual component for your image carousel */}
      <Box display={"flex"} flexDirection={'row'}  >

      <CarouselComponent/>
      {/* <div> */}
        <div className="login-wrapper-big">
        <div className="login-logo-big">
          <img src={robo} alt="Robo" />
          <img src={logo} alt="Logo" />
        </div>
        
         <Typography margin={2} variant="h5" className="sign-text">Sign In With Google</Typography>
          {isLogging ? (
          <button disabled>Signing in...</button>
          ) : ( 
           <GoogleLogin
           width={300}
            height={80}
           
            type="standard"
            onSuccess={onSuccess}
            click_listener={() => setIsLogging(true)}
            onError={() => setIsLogging(false)}
           />
        )}

        <Typography marginTop={2} variant="h6">Connect us on:</Typography>
        <div>
        <IconButton onClick={() => window.open('https://www.facebook.com/mobiiot.in/', '_blank')}>
  <FacebookIcon style={{ color: '#3b5998', fontSize: '40'}} /> {/* Facebook's color */}
</IconButton>
<IconButton onClick={() => window.open('https://www.instagram.com/mobiiot.in/', '_blank')}>
  <InstagramIcon style={{ color: '#C13584', fontSize: '40' }} /> {/* Instagram's color */}
</IconButton>
<IconButton onClick={() => window.open('https://www.Mobiiot.in', '_blank')}>
  <LanguageIcon style={{ color: '#0e76a8', fontSize: '40' }} /> {/* A color for a generic website */}
</IconButton>

        </div>
        
        </div>
        {/* </div> */}
        </Box>
      </div>
    
  </div>
  );
};
