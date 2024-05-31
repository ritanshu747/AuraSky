import React, { useContext, useEffect } from "react";
import { Context } from "../../context/Context";
import "./WeatherCard.css";
import UbicationIconCard from "../../images/weathercard/UbicationIconCard";
import TemperatureIconCard from "../../images/weathercard/TemperatureIconCard";
import Spinner from "../Spinner/Spinner";
import icons from "../../images/icons-weather/icons";
import { CSSTransition, SwitchTransition } from "react-transition-group";

function WeatherCard({ city }) {
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

  const { loading, setLoading, setError, error, data, setData } =
    useContext(Context);

  const getWeather = () => {
    setData(null);
    setLoading(true);
    setError(null);
    
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7c45e8d32090f74362dd51426287216d`
      
    )
      .then((res) => {
        if (!res.ok) {
          console.log(error);
          throw new Error("City not found");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        localStorage.setItem("city", JSON.stringify(city));
      })
      .catch((error) => {
        setError(error);
        alert("Enter an available location.");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getWeather();
  }, [city]);

  return (
    <>
      <section className="section-weathercard">
        <SwitchTransition>
          <CSSTransition
            classNames="fade"
            key={data}
            addEndListener={(node, done) =>
              node.addEventListener("transitionend", done, false)
            }
          >
            <div className="weather-container">
              {loading && <Spinner />}
              {data && (
                <>
                  <div className="date-container">
                    <div className="location-container">
                      <UbicationIconCard />
                      <p>
                        {data.name},<span> {data.sys.country}</span>
                      </p>
                    </div>
                    <div className="day-container">
                      <h1>
                        {monthName}, {day}
                      </h1>
                      <p>{dayOfWeekString}</p>
                    </div>
                  </div>
                  <div className="section-icon-description">
                    <div className="icon-container">
                      <img
                        src={icons[data.weather[0].icon]}
                        alt="icono-weather"
                      />
                      <p>{data.weather[0].description.toUpperCase()}</p>
                    </div>
                    <div className="description-container">
                      <div className="container-temperature">
                        <TemperatureIconCard />
                        <p>{parseInt(data.main.temp - 273.15).toFixed(1)} °C</p>
                      </div>

                      <div className="container-min-max-humidity">
                        <p>
                          MIN:
                          <span>
                            {parseInt(data.main.temp_min - 273.15).toFixed(1)}°C
                          </span>
                        </p>
                        <p>
                          MAX:
                          <span>
                            {parseInt(data.main.temp_max - 273.15).toFixed(1)}°C
                          </span>
                        </p>
                        <p>
                          Humidity: <span>{data.main.humidity}%</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {!loading && !data && (
                <>
                  <div className="title-default">
                    <h1>Enter the city</h1>
                  </div>
                </>
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </section>
    </>
  );
}

export default WeatherCard;
