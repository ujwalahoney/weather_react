import React from 'react';
class Forecast extends React.Component
{
    constructor(props)
    {
        super(props);
        this.come = this.come.bind(this);
    }
    come()
    {
        this.props.get(this.props.dayInfo.maxTemp);
    }
  
    render()
    {
        return(
            <div>
            <button className="btn btn-primary" onClick={this.come}>
            <div className="row">
  <div className="col-sm-4">{this.props.dayInfo.day}</div>
  <div className="col-sm-4"> {this.props.dayInfo.maxTemp} </div>
  <div className="col-sm-4">{this.props.dayInfo.minTemp}</div>
  
</div>

            </button>
            </div>
  /* { <h4 onClick={this.props.come}>{this.props.dayInfo.day}{this.props.dayInfo.maxTemp}</h4> */

        );
    }
}


export default Forecast;