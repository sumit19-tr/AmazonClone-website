import React, { useCallback, useEffect, useState } from "react";
import Nav2Display from "./Nav2Display";
import "./Nav2.css";

const curl = 'https://amazon-clone-restapi-production.up.railway.app/catagory';

const Nav2 = () => {
  const [catagory, setCatag] = useState('');
  const [weatherInfo, setWeatherInfo] = useState(null);

  const getWeatherInfo = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      setWeatherInfo('Geo Not Supported');
    }
  }, []);

  const showPosition = (data) => {
    let lat = data.coords.latitude;
    let lon = data.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
    fetch(url, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        setWeatherInfo({
          cityName: data.city.name,
          temp: data.list[0].temp.day,
        });
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  };

  useEffect(() => {
    fetch(curl, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        setCatag(data);
      })
      .catch((error) => {
        console.error('Error fetching category data:', error);
      });

    getWeatherInfo();
  }, [getWeatherInfo]);

  return (
    <>
      <Nav2Display catgData={catagory} weatherInfo={weatherInfo} />
    </>
  )
}

export default Nav2;
