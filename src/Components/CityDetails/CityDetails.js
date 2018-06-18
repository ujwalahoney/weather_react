import React, { Component } from 'react';

class CityDetails extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            cityName:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
   handleChange(e)
    {
   this.setState(
       {
           cityName:e.target.value
       }
   );
  // console.log(this.state.cityName);
   
    }

    onSubmit()
    {
        //console.log(this.state.cityName);
         this.props.update(this.state.cityName);
    }
    render()
    {
        return(

            <div>
              
                <input type="text" onChange={this.handleChange}  />
                <button className="btn btn-success" onClick={this.onSubmit} >click</button>
                 <h4>Location : {this.props.CityDetailsInfo.cityName}</h4>
               <h4>  Today : {this.props.CityDetailsInfo.day}</h4>
                 <h4>Weather : {this.props.CityDetailsInfo.weather}</h4>
        
        </div>
        );
    }
}
export default CityDetails;