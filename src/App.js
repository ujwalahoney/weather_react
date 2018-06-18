import React, { Component } from 'react';
import './App.css';
import CityDetails from './Components/CityDetails/CityDetails';
import Temperature from './Components/Temperature/Temperature';
import Twd from './Components/Twd/Twd';
import Forecast from './Components/Forecast/Forecast';
import * as moment from 'moment';
import * as _ from 'lodash';

class App extends Component {
  constructor (){
    super();
    this.dayWiseMap = {};
  // this.dayWiseMap={}
    this.state={

      cityInfo:{
        cityName:'',
        day:'',
        weather:'',
      },
      unit:'F',
      temperature:{
        imgUrl:'',
        temperatureInKelvin:100
       
      },
      twd:
      {
        pressure:'80%',
        humidity:'69%',
        precipitation:'5mph'
      },
      forecastInfo:[]

    }

    this.updateCityName = this.updateCityName.bind(this);
    this.getTemp = this.getTemp.bind(this);
    this.changeUnit = this.changeUnit.bind(this);
  }
  updateCityName(value)
  {
    
   this.setState(
     {
    cityInfo:{
      cityName:value
    }
     }
   );
   this.fetchData(value);
  }

  fetchData(cityName)
  {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=27d43832d2a4adcb97fcbfa23db130aa`;
      fetch(url)
      .then(res => res.json())
      .then((data)=>
    {
      console.log(data);
      this.setState({
       cityInfo:{
         cityName:data.city.name,
         day:moment(data.list[0].dt*1000).format("dddd"),
         weather:data.list[0].weather[0].description
       }
      })

  // Build day wise map
  data.list.forEach(date => {
    // console.log(date);
    const dateValue = new Date(date.dt * 1000);
    const dayNum = dateValue.getDay();
    if (dayNum in this.dayWiseMap) {
      this.dayWiseMap[dayNum].push(date);
    } else {
      this.dayWiseMap[dayNum] = [date];
    }
  });
  //console.log(this.dayWiseMap);

      
  const sortedMap = _.sortBy(this.dayWiseMap, (value) => {
    let dayOfWeek = new Date(value[0].dt * 1000).getDay();
    let today = new Date().getDay();
    const diff = dayOfWeek - today;
    return diff < 0 ? diff + 7 : diff;
  });

  //console.log(sortedMap);

  const forecastInfo = _.map(sortedMap, (obj) => {
    const minTemp = _.reduce(obj.map(interval => interval.main.temp_min), (a, b) => a + b) / obj.length;
    return {
      day: moment(obj[0].dt * 1000).format("ddd"),
      minTemp: _.round(minTemp - 270, 2),
      maxTemp: _.round(obj[0].main.temp_max - 270, 2),
      dayNum: new Date(obj[0].dt * 1000).getDay()
    }
  });

  this.setState({
    forecastInfo
  })

    });

     
  }
  getTemp(e)
  {
  this.setState({
    temperature:{
      temperatureInKelvin:e
    }
  });
  }

  changeUnit(e)
  {

//     let temp = Object.assign({}, this.state.temperature);    //creating copy of object
//       temp.unit = e;          //updating value
// this.setState(temp);

  this.setState({
      unit:e
    }
  );
  console.log(this.state.temperature.unit);
  }
  render() {
    return (
      <div >
 
        <CityDetails update = {this.updateCityName} CityDetailsInfo={this.state.cityInfo}/>
         <Temperature unitChange = {this.changeUnit} temperatureInfo={this.state.temperature} units={this.state.unit}/>
    
       <Twd TwdInfo={this.state.twd}/>
       <div className="row">
              {
                this.state.forecastInfo.map(forecastEle => {
                  return (
                    <Forecast dayInfo={forecastEle} get = {this.getTemp}/>
                  )
                })
              }
      </div>
      </div>
    );
  }
}

export default App;
