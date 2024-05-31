import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UbicationIconCard from "../../images/weathercard/UbicationIconCard";
import TemperatureIconCard from "../../images/weathercard/TemperatureIconCard";
import icons from "../../images/icons-weather/icons";
import "./weatherCardGeolocation.css";
import { Context } from "../../context/Context";

const WeatherCardGeolocation = () => {
  const today = new Date();
  const day = today.getDate();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeekString = daysOfWeek[today.getDay()];
  const monthName = today.toLocaleString("en-US", { month: "long" });

  const { location, setLocation, data, setData } = useContext(Context);

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = (pos) => {
      const crd = pos.coords;
      localStorage.setItem(
        "coordenadas",
        JSON.stringify({
          lat: crd.latitude,
          lon: crd.longitude,
        })
      );
      setLocation({
        lat: crd.latitude,
        lon: crd.longitude,
      });

      setData(location);

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${
            crd.latitude
          }&lon=${crd.longitude}&appid=7c45e8d32090f74362dd51426287216d`
        )
        .then((res) => {
          localStorage.setItem("weatherData", JSON.stringify(res.data));
          setData(
            res.data
              ? res.data
              : JSON.parse(localStorage.getItem("weatherData"))
          );
          // setData(res.data);
        })

        .catch((err) => console.log(err));
    };
    const error = (err) => {
      console.warn(`ERROR(${err.code}) : ${err.message}  `);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  return (
    <>
      <section
        id="section-card-geolocation"
        className="section-weathercard section-weather-geolocation"
      >
        <div className="weather-container">
          {data && data.name && data.sys && data.sys.country && (
            <>
              <div className="date-container">
                <div className="location-container">
                  <UbicationIconCard />
                  <p>
                    {data.name}, <span>{data.sys.country}</span>
                  </p>
                </div>
                <div className="day-container">
                  <h1>
                    {monthName}, {day}
                  </h1>
                  <p>{dayOfWeekString}</p>
                </div>
              </div>
              {data.weather && data.weather[0] && data.weather[0].icon && (
                <div className="section-icon-description">
                  <div className="icon-container">
                    <img
                      src={icons[data.weather[0].icon]}
                      alt="icono-weather"
                    />
                    {data.weather[0].description && (
                      <p>{data.weather[0].description.toUpperCase()}</p>
                    )}
                  </div>
                  {data.main && data.main.temp && (
                    <div className="description-container">
                      <div className="container-temperature">
                        <TemperatureIconCard />
                        <p>{parseInt(data.main.temp - 273.15).toFixed(1)} °C</p>
                      </div>
                      {data.main.temp_min &&
                        data.main.temp_max &&
                        data.main.humidity && (
                          <div className="container-min-max-humidity">
                            <p>
                              MIN:
                              <span>
                                {parseInt(data.main.temp_min - 273.15).toFixed(
                                  1
                                )}
                                °C
                              </span>
                            </p>
                            <p>
                              MAX:
                              <span>
                                {parseInt(data.main.temp_max - 273.15).toFixed(
                                  1
                                )}
                                °C
                              </span>
                            </p>
                            <p>
                              Humidity: <span>{data.main.humidity}%</span>
                            </p>
                          </div>
                        )}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
          {!data && (
            <div className="title-default">
              <h1>Enables your location 😄</h1>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default WeatherCardGeolocation;
