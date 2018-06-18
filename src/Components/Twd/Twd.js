import React from 'react';
class Twd extends React.Component
{
    constructor(props)
    {
        super(props);
      
    }
    render()
    {
        return(
         <div>
              <h4>Pressure:{this.props.TwdInfo.pressure}</h4>
               <h4>Humidity:{this.props.TwdInfo.humidity}</h4>
               <h4>Precipitation:{this.props.TwdInfo.precipitation}</h4>
             </div>  
        );
    }
}

export default Twd;