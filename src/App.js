import React, { useState } from 'react';
import './App.css';

function App () {
  const [query, setQuery] = useState('');
  const [wheater, setWheater] = useState({});

const api ={
    key: "3d6facdf5bb37411d95393fae9854a4e",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
        .then(res => res.json())
        .then(result => {
          setWheater(result);
          setQuery('');
          console.log(result);
        });
    }
  }

const dataBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'Mai', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof wheater.main != "undefined") ? ((wheater.main.temp > 16) ? 'app warm': 'app') : 'app'}>
      <div className='search'>
          <input
          type = "text"
          className = "searching"
          placeholder = "Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
      </div>
      {(typeof wheater.main != "undefined") ? (
      <div>
    <div className='location-box'>
      <div className='location'>{wheater.name}, {wheater.sys.country}</div>
      <div className='date'>{dataBuilder(new Date())}</div>
      </div>
      <div className="weather-box">
          <div className="temp">
              {Math.round(wheater.main.temp)}°c
          </div>
          <div className="weather">{wheater.weather[0].main}</div>
          </div>
          </div>
      ) : ('')}
      </div>
    )
  };



  


export default App;
