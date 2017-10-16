import * as React from 'react';
import * as ReactDOM from 'react-dom';

// import { OpenWeatherMap } from 'react-weather';

import Voice_service from "./voice-service.js";
import Clock from "./clock.js";
import Weather from "./weather.js"
import styles from "./layout.css.js";

class Layout extends React.Component {
    render() {

        return (
            <div style={{backgroundColor: 'black', height: '100vh'}}>
                 <Weather city="Toronto" country="ca" appid="450d5e8ca30dd9275d32cfdf424fa7c8" units='metric'/> 
                {/* <OpenWeatherMap city="Montreal" country="ca" appid="450d5e8ca30dd9275d32cfdf424fa7c8" /> */}
                <Clock/>
                <Voice_service/>
            </div>
        );
    }
}

const app = document.getElementById('app');
ReactDOM.render(<Layout/>, app);