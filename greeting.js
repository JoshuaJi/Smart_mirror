import * as React from 'react';

export default class Greeting extends React.Component {

    // componentWillMount(){
    //     document.getElementById("output").onclick = window.test;
        
    // }

    render() {
        return (
            <div style={{display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <h1 id="output" style={{color: 'white'}}>Hey, Joshua !</h1>
                <button onClick={window.rec_speech}>watson</button>
            </div>
        );
    }
}