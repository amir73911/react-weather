import React, { Component } from 'react';
import moment from 'moment';

import SunnyImg from '../images/sunny.png';
import SnowyImg from '../images/snowy.png';
import RainyImg from '../images/rainy.png';
import CloudyImg from '../images/cloudy.png';

class WeatherCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weather: {
        type: this.props.day.weather[0].main,
        day: moment(this.props.day.dt_txt).format('ddd'),
        temp: {
          min: this.props.day.main.temp_min.toFixed(1),
          max: this.props.day.main.temp_max.toFixed(1)
        }
      }
    };
  }

  render() {
    let { weather } = this.state;
    let today = moment(this.props.day.dt_txt).isSame(moment(), 'day');

    return (
      <div className={(today) ? 'current weather-card' : 'weather-card'}>
        <div className="weather-card__day">{ weather.day }</div>
        <div className="weather-card__icon">
          {weather.type === 'Clear' && <img src={SunnyImg} alt={weather.type}/>}
          {weather.type === 'Snow' && <img src={SnowyImg} alt={weather.type}/>}
          {weather.type === 'Rain' && <img src={RainyImg} alt={weather.type}/>}
          {weather.type === 'Clouds' && <img src={CloudyImg} alt={weather.type}/>}
        </div>
        <div className="weather-card__temp">
          <span className="min">{ weather.temp.min }°</span>
          <span className="max">{ weather.temp.max }°</span>
        </div>
      </div>
    );
  }
}

export default WeatherCard;
