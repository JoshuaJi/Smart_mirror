import * as React from 'react';

export default class Greeting extends React.Component {
    render() {
        return (
            <div style={{display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <h1 style={{color: 'white'}}>Hey, Joshua !</h1>
            </div>
        );
    }
}