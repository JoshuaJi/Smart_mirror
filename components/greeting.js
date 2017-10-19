import * as React from 'react';

export default class Greeting extends React.Component {

  render() {
    return (
      <div className='middle-center'>
        <h1 id="output" style={{ color: 'white' }}>{ this.props.message }</h1>
      </div>
    );
  }
}