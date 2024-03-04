import React, { useEffect, useMemo, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import "../App.css"
import { Typography } from "@material-ui/core";
import { Box } from '@mui/material';





const QUERY_URL = "https://api.openweathermap.org/data/2.5/onecall?";
const LAT = "lat=21.146633&";
const LON = "lon=79.088860&";
const API_OPTIONS = "units=metric&exclude=minutely,alerts&";
const API_KEY = "appid=dbb76c5d98d5dbafcb94441c6a10236e";
const FILE = QUERY_URL + LAT + LON + API_OPTIONS + API_KEY;
const NAME = "Nagpur";
const TIME_NOW = new Date().getHours();

// Icons
let iconBaseUrl = "http://openweathermap.org/img/wn/";
let iconFormat = ".png";
export default function Weathercard() {
    const [data, setData] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [temp, setTemp] = useState(undefined);
    const [pressure, setPressure] = useState(undefined);
    const [humidity, setHumidity] = useState(undefined);
    const [bgGif, setBGGif] = useState(undefined);
  
    const iconsFullyUrl = useMemo(
        () => ({
          today: iconBaseUrl + data?.current.weather[0]?.icon + iconFormat,
          tomorrow: iconBaseUrl + data?.daily?.[0]?.weather[0]?.icon + iconFormat,
          dAT: iconBaseUrl + data?.daily?.[1]?.weather[0]?.icon + iconFormat,
          now: iconBaseUrl + data?.daily?.[1]?.weather[0]?.icon + iconFormat,
          plus1: iconBaseUrl + data?.hourly?.[1]?.weather[0]?.icon + iconFormat,
          plus2: iconBaseUrl + data?.hourly?.[2]?.weather[0]?.icon + iconFormat,
          plus3: iconBaseUrl + data?.hourly?.[3]?.weather[0]?.icon + iconFormat,
          plus4: iconBaseUrl + data?.hourly?.[4]?.weather[0]?.icon + iconFormat,
          plus5: iconBaseUrl + data?.hourly?.[5]?.weather[0]?.icon + iconFormat,
        }),
        [data]
      );
  
    useEffect(() => {
      fetch(FILE)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setDescription(data.current.weather[0].description);
          setTemp(Math.round(data.current.temp));
          setPressure(data.current.pressure);
          setHumidity(data.current.humidity);
  
          const main = data.current.weather[0].main;
  
          switch (main) {
            case "Snow":
              setBGGif(
                "url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')"
              );
              break;
            case "Clouds":
              setBGGif(
                "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')"
              );
              break;
            case "Fog":
              setBGGif(
                "url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')"
              );
              break;
            case "Rain":
              setBGGif(
                "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')"
              );
              break;
            case "Clear":
              setBGGif(
                "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')"
              );
              break;
            case "Thunderstorm":
              setBGGif(
                "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')"
              );
              break;
            default:
              setBGGif(
                "url('https://i.ibb.co/LQd783W/istockphoto-512218646-612x612.jpg')"
              );
              break;
          }
        });
    }, []);
    
  return (
    
    <MDBContainer className="weater-section">
      <MDBRow className=" align-items-center h-100">
        <MDBCol md="9" lg="7" xl="5">
        <MDBCard
  className="text-white bg-image shadow-4-strong"
  style={{
    width: "800px",
    height: "140px",
    backgroundImage: bgGif ?? "url(https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif)",
    backgroundSize: "cover", // Set background size to cover the entire container
  }}
>
  <MDBCardHeader className="p-4 border-0">
    <Box color={'white'}>
      <Typography variant="h4" className="mb-1 text-white">{NAME}</Typography>
      <Typography variant="h5" className="mb-1 text-white">{description}</Typography>
      <Typography variant="h5" className="temp text-white">{temp}°C</Typography>
      
    </Box>
  </MDBCardHeader>
</MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  
    
  )
}
