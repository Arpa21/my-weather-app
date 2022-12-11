import { useState } from "react";
import "./Weather.scss";

const Weather = () => {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const api = {
    url: "http://api.openweathermap.org/data/2.5/",
    key: process.env.REACT_APP_OPENWEATHER,
  };
  const iconURL = "http://openweathermap.org/img/w/";

  const getInput = (e) => {
    setInput(e.target.value);
  };

  const getWeatherData = (e) => {
    if (e.key === "Enter" && input === "") {
      setErrorMsg("Input cannot be empty");
      setError(true);
    }
    if (e.key === "Enter" && input !== "") {
      setIsLoading(true);
      setError(true);
      fetch(`${api.url}weather?q=${input}&units=metric&APPID=${api.key}`)
        .then((res) => {
          if (!res.ok) {
            throw Error("Failed to Fetch Data");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setWeather(data);
          setInput("");
          setError(false);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setError(true);
          setErrorMsg(err.message);
          setIsLoading(false);
        });
    }
  };

  return (
    <section className="--100vh --center-all">
      <div className="container weather --flex-center">
        <div className="weather-app --text-light">
          <h1 data-testid="heading">Weather App</h1>
          <div className="--form-control --my2">
            <input
              type="text"
              placeholder="Search city name"
              onChange={getInput}
              value={input}
              onKeyPress={getWeatherData}
              data-testid="city-input"
            />
          </div>
          {error ? (
            <p data-testid="error" className={errorMsg !== "" ? "error" : ""}>
              {errorMsg}
            </p>
          ) : (
            <div className="result --card --my2">
              <h2>
                {weather.name}, {weather.sys.country}
              </h2>
              <div className="icon">
                <img
                  src={iconURL + weather.weather[0].icon + ".png"}
                  alt={weather.weather[0].main}
                />
              </div>
              <p>Temp: {Math.round(weather.main.temp)}°C</p>
              <p>Weather: {weather.weather[0].description}</p>
            </div>
          )}
          {isLoading && <h3>Loading...</h3>}
        </div>
      </div>
    </section>
  );
};

export default Weather;
