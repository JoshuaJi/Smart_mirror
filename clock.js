import * as React from 'react';
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
        () => this.tick(),
        1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        const date = this.state.date;
        const current_time_array = date.toTimeString().split(' ')[0].split(':');
        const current_time = current_time_array[0]+':'+current_time_array[1];
        const current_day = days[date.getDay()-1];
        const current_month = months[date.getMonth()];

        return (
            <div style={{position: 'absolute', right: '40px', top: '20px', textAlign: 'right', color: 'white'}}>
                <h1>{ current_time }</h1>
                <p>{ current_day }</p>
                <p>{ current_month } {date.getDate()}</p>

            </div>
        );
    }
}