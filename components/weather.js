import * as React from 'react';
import axios from 'axios';


export default class Weather extends React.Component {

    constructor() {
        super();
        this.state = {
            name: null,
            temp: null,
            description: null,
        };
    }

    componentDidMount() {

        this.updateWeather();
        setInterval(() => {
            this.updateWeather();
        }, 60000)
    }

    updateWeather() {
        const { city, country, appid, units } = this.props;

        axios.get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: `${city},${country}`,
                APPID: appid,
                units,
            },
        }).then((response) => {
            const { data } = response;
            this.setState({ name: data.name, temp: data.main.temp, description: data.weather[0].description });
        });
    }
    render() {
        const { name, temp, description } = this.state;
        return (
            <div style={{ position: 'absolute', left: '40px', top: '20px', textAlign: 'left', color: 'white' }}>
                <h1>{temp}°</h1>
                <p>{name}</p>
                <p>{description}</p>
            </div>
        );
    }
}
