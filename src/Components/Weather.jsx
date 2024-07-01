import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clearicon from "../assets/clear.png";
import cloudicon from "../assets/cloud.png";
import drizzleicon from "../assets/drizzle.png";
import humidicon from "../assets/humidity.png";
import rainicon from "../assets/rain.png";
import snowicon from "../assets/snow.png";
import windicon from "../assets/wind.png";

const Weather = () => {
  const inpRef=useRef();
  const [WeatherData,setWeatherData]=useState(false);

  const allIcons={
    "01d":clearicon,
    "01n": clearicon,
    "02d":cloudicon,
    "03d":cloudicon,
    "03n":cloudicon,
    "04d":drizzleicon,
    "04n":drizzleicon,
    "09d":rainicon,
    "09n":rainicon,
    "10d":rainicon,
    "10n":rainicon,
    "13d":snowicon,
    "13n":snowicon
  }

  const search = async (city) => {
    if(city==""){
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&&appid=${import.meta.env.VITE_APP_ID}`;
      // const data=import.meta.env.VITE_APP_ID;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon=allIcons[data.weather[0].icon] || clearicon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed:data.wind.speed,
        temperature:Math.floor(data.main.temp),
        location:data.name,
        icon: icon
      })
    } catch (error) {}
  };

  useEffect(()=>{
    search("New York");
  },[])
  

  return (
    <div className="weather">
      <div className="searchbar">
        <input ref={inpRef} type="text" placeholder="Search"></input>
        <img src={search_icon} onClick={()=>search(inpRef.current.value )}></img>
      </div>
      <img src={clearicon} alt="" className="WeatherIcon" />
      <p className="Temperature">{WeatherData.temperature}°C</p>
      <p className="Location">{WeatherData.location }</p>
      <div className="WeatherData">
        <div className="Col">
          <img src={humidicon} alt="" />
          <div>
            <p>{WeatherData.humidity}</p>
            <span>Humidity</span>
          </div>

          <div className="Col">
            <img src={windicon} alt="" />
            <div>
              <p>{WeatherData.windSpeed}</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
