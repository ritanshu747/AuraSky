import React, { useState } from "react";
import "./callToAction.css";
import MobileMockup from "../../images/calltoaction/Mobile-Mockup.svg";
import Ellipse from "../../images/calltoaction/Ellipse.svg";
import { getSunrise, getSunset } from 'sunrise-sunset-js';

const CallToAction = () => {
  const [city, setCity] = useState(""); // State to store user input for city
  const [sunriseTime, setSunriseTime] = useState(null);
  const [sunsetTime, setSunsetTime] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchSolarTimes = () => {
    setIsFetching(true);
    const currentDate = new Date();

    if (city) {
      // If user has entered a city, get sunrise and sunset times for that city
      fetchSunriseSunsetForCity(city, currentDate);
    } else {
      // Otherwise, use geolocation to get user's coordinates and fetch sunrise and sunset times
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchSunriseSunsetForCoordinates(latitude, longitude, currentDate);
        },
        (error) => {
          console.error("Error getting user's location:", error);
          setIsFetching(false);
        }
      );
    }
  };

  const fetchSunriseSunsetForCity = (city, date) => {
    // Fetch sunrise and sunset times for the given city
    const sunrise = getSunrise(city, date);
    const sunset = getSunset(city, date);

    setSunriseTime(sunrise);
    setSunsetTime(sunset);
    setIsFetching(false);
  };

  const fetchSunriseSunsetForCoordinates = (latitude, longitude, date) => {
    // Fetch sunrise and sunset times for the given coordinates
    const sunrise = getSunrise(latitude, longitude, date);
    const sunset = getSunset(latitude, longitude, date);

    setSunriseTime(sunrise);
    setSunsetTime(sunset);
    setIsFetching(false);
  };

  return (
    <>
      <section className="section-calltoaction">
        <div className="principal-container">
          <div className="container-image-phone">
            <img className="Ellipse" src={Ellipse} alt="Ellipse" />
            <img
              className="MobileMockup"
              src={MobileMockup}
              alt="mobilemockup"
            />
          </div>
          <div className="container-description-phone">
            <h1>Get SunSet & Sunrise Today!</h1>
            <p> Be prepared for any weather event with our alerts.</p>
            
            <button className="button" onClick={fetchSolarTimes} disabled={isFetching}>
              {isFetching ? 'Fetching...' : 'GET SUNRISE/SUNSET'}
            </button>
            <div className="solar-times">
              {sunriseTime && (
                <div className="sunrise-time text-lg font-bold">
                  <p className="text-gray-800">Sunrise: {sunriseTime.toLocaleTimeString()}</p>
                </div>
              )}
              {sunsetTime && (
                <div className="sunset-time text-lg font-bold">
                  <p className="text-gray-800 border-collapse">Sunset: {sunsetTime.toLocaleTimeString()}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CallToAction;
