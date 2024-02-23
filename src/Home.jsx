import { useState } from "react";
import axios from "axios";

function WeatherEmoji({ weather }) {
  return (
    <>
      <img className="text-4xl text-center" src={`https://openweathermap.org/img/wn/${weather}@2x.png`} />
    </>
  );
}

export function Home() {
  const apiKey = import.meta.env.VITE_WEATHER_API;
  const [weatherData, setWeatherData] = useState([]);
  const [searchData, setSearchData] = useState("");

  const handleWeatherShow = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${searchData}&appid=${apiKey}&units=imperial`)
      .then((response) => {
        setWeatherData(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleWeatherShow();
  };

  const handleInputChange = (event) => {
    setSearchData(event.target.value);
  };

  return (
    <div className="min-h-screen w-auto bg-gray-900 text-white">
      <p className="text-center pt-5 text-xl font-black text-blue-600">WEATHERIA</p>
      <div className=" pt-[4rem] w-1/2 mx-auto">
        <form onSubmit={handleSubmit}>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-left"
              placeholder="Search Locations"
              value={searchData}
              onChange={handleInputChange}
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        <div className="pt-[10rem]">
          {weatherData == "" ? (
            <></>
          ) : (
            <>
              <WeatherEmoji weather={weatherData.weather[0].icon} />

              <p className="text-4xl text-center">{weatherData.name}</p>
              <div className="grid grid-cols-2 pt-10">
                <p className="text-2xl text-left">{Math.round(weatherData.main.temp)}°F</p>
                <p className="text-2xl text-right">{weatherData.weather[0].main}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
