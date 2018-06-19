import React, { Component } from 'react';

class  Temperature extends Component{

    constructor(props)
    {
        super(props);
      this.findTemp = this.findTemp.bind(this);
      this.findFah = this.findFah.bind(this);
    //   this.fah = parseInt(this.props.temperatureInfo.temperatureInKelvin)*18+32;
    }
    findTemp(e)
    {
        this.props.unitChange(e.target.id);
    }

    findFah(e)
    {
        this.props.unitChange(e.target.id);
    }
    
    render()
    {
        return(
            <div>
                <button id="F" className="btn btn-success" onClick={this.findTemp}>F</button>
                <button id="C" className="btn btn-danger" onClick={this.findFah}>C</button>
            <h1>{ 
                (this.props.units ==="C")?
            ( this.props.temperatureInfo.temperatureInKelvin+"°C"):
            (this.props.temperatureInfo.temperatureInKelvin*(9/5)+32).toFixed(2)+"°F"
                 }</h1>
        </div>
        );
    }
}
export default Temperature;