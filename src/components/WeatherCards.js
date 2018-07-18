import React, { Component } from 'react';
import WeatherCard from './WeatherCard';
import axios from 'axios';
import moment from 'moment';

const openweathermapApiKey = '60f25986e9f2d837db67125bb0c61bdb';
const count = 40;

class WeatherCards extends Component {
  state = {
    weatherData: null,
    message: 'Loading...'
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(location => {
        let lat = location.coords.latitude;
        let lon = location.coords.longitude;
        let openweathermapApiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${count}&units=metric&appid=${openweathermapApiKey}`;

        axios.get(openweathermapApiUrl)
          .then(res => {
            this.setState({ weatherData: res.data});
            this.createContent();
          });
      });
    } else {
      this.message = 'Geolocation is not available';
    }
  }

  createContent() {
    let list = {};

    this.state.weatherData.list.map(item => {
      let index = moment(item.dt_txt).dayOfYear();
      if (list[index] === undefined) list[index] = [];
      list[index].push(item);
    });

    return (
      <React.Fragment>
        <h1>{this.state.weatherData.city.name}</h1>
        <div className="weather-cards">
          {Object.keys(list).map(key => {
            return <WeatherCard key={key} data={list[key]} day={list[key][0]}/>
          })}
        </div>
      </React.Fragment>
    )
  }

  render() {
    return (this.state.weatherData) ? this.createContent() : <div className="message">{this.state.message}</div>;
  }
}

export default WeatherCards;
