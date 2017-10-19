import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";


const Mapbox = ReactMapboxGl({
    accessToken: "pk.eyJ1Ijoiaml4dTIwNCIsImEiOiJjaW13NGs5OTIwMzBpdXBra2Q3eDFtdjhuIn0.fcURPXsVYm3kryDwvV5CCQ"
  });

export default class Map extends React.Component {

    constructor() {
        super();
        this.state = {
            center: {lat: 43.86, lng: -79.34},
            zoom: 12
        };
    }

  render() {
    return (
      <div className='middle-center'>
        {/* <GoogleMapReact
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}/> */}
        <Mapbox
  style="mapbox://styles/mapbox/light-v9"
  center={this.state.center}
  containerStyle={{
    height: "60%",
    width: "100%",
  }}/>
      </div>
    );
  }
}