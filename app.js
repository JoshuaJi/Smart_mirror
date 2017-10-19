import * as React from 'react';
import * as ReactDOM from 'react-dom';
import speech from 'watson-speech';
import * as record from 'node-record-lpcm16';
import { Detector, Models } from 'snowboy';
import { Router, Route, Switch } from 'react-router'

import Greeting from "./components/greeting.js";
import Clock from "./components/clock.js";
import Weather from "./components/weather.js"
import Map from "./components/map.js"

const greeting_message = "Hey Joshua !";

class Layout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      message: greeting_message,
      st_token: null,
      ts_token: null,
      map_location: ""
    };
  }

  componentWillMount() {
    this.get_speech_to_text_token();
    this.get_text_to_speech_token();
    this.active_hotword_dec();
  }

  get_speech_to_text_token() {
    fetch('https://radiant-crag-76774.herokuapp.com/api/speech-to-text/token')
      .then((response, err) =>
        response.text()
      ).then(token =>
        this.setState({ st_token: token })
      ).catch(error =>
        console.log(error)
      );
  }

  get_text_to_speech_token() {
    fetch('https://radiant-crag-76774.herokuapp.com/api/text-to-speech/token')
      .then((response, err) =>
        response.text()
      ).then(token =>
        this.setState({ ts_token: token })
      ).catch(error =>
        console.log(error)
      );
  }

  rec_speech() {
    this.setState({ message: "Yes?" });
    var stream = speech.SpeechToText.recognizeMicrophone({
      token: this.state.st_token,
      outputElement: '#output' // CSS selector or DOM Element
    });

    stream.on('data', data => {
      if (data.results[0] && data.results[0].final) {
        stream.stop();
        console.log('stop listening.');
        console.log(data);
        this.handleData(data.results[0].alternatives[0].transcript);
      }
    });

    stream.on('error', function (err) {
      console.log(err);
    });
  }

  handleData(data) {

    console.log("data: " + data);


    // fetch('https://radiant-crag-76774.herokuapp.com/conversation/message', {
    fetch('http://localhost:3001/conversation/message', {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        userinput: data
      }),

    }).then(response => {
      return response.text()
    }).then(text => {
      var that = this;
      console.log("text: ", text);
      var newMessage = JSON.parse(text).output.text;
      var intent = JSON.parse(text).intents[0].intent;

      this.setState({ message: newMessage });
      console.log(newMessage);
      console.log(intent);
      this.handle_action(intent);
      speech.TextToSpeech.synthesize({
        token: that.state.ts_token,
        text: newMessage
      });
      setTimeout(function () {
        that.setState({ message: greeting_message });
      }, 5000);

    }).catch(error => {
      console.log(error.message) //=> String
    })
  }

  handle_action(action) {
    console.log("action: " + action);
    if (action == "turn_on") {
      console.log("turn on the lights");
      this.turn_on();
    } else if (action == "turn_off") {
      console.log("turn off the lights");
      this.turn_off();
    }
  }

  turn_on() {
    fetch('http://192.168.2.13/api/kX2kJTwMb0r3gn7lde24f9ZKqCbcSu9lkomLhBPr/groups/0/action', {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        'on': true
      })

    }).then((res, err) => {
      console.log("turn_on response: " + res);
    });
    fetch('http://localhost:3005/wemo', {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        'state': 'on'
      })

    }).then((res, err) => {
      console.log("turn_on response: " + res);
    })
  }

  turn_off() {
    fetch('http://192.168.2.13/api/kX2kJTwMb0r3gn7lde24f9ZKqCbcSu9lkomLhBPr/groups/0/action', {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        'on': false
      })

    }).then((res, err) => {
      console.log("turn_on response: " + res);
    });
    fetch('http://localhost:3005/wemo', {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        'state': 'off'
      })

    }).then((res, err) => {
      console.log("turn_on response: " + res);
    })
  }

  active_hotword_dec() {
    var that = this;
    const models = new Models();

    models.add({
      file: 'resources/Hey_Watson.pmdl',
      sensitivity: '0.5',
      hotwords: 'hey watson'
    });

    const detector = new Detector({
      resource: "resources/common.res",
      models: models,
      audioGain: 2.0
    });

    detector.on('silence', function () {
      // console.log('silence');
    });

    detector.on('sound', function (buffer) {
      // <buffer> contains the last chunk of the audio that triggers the "sound"
      // event. It could be written to a wav stream.
      // console.log('sound');
    });

    detector.on('error', function () {
      console.log('error');
    });

    detector.on('hotword', function (index, hotword, buffer) {
      // <buffer> contains the last chunk of the audio that triggers the "hotword"
      // event. It could be written to a wav stream. You will have to use it
      // together with the <buffer> in the "sound" event if you want to get audio
      // data after the hotword.
      console.log(buffer);
      console.log('hotword', index, hotword);
      that.rec_speech();
    });

    const mic = record.start({
      threshold: 0,
      verbose: true
    });

    mic.pipe(detector);

  }

  render() {
    var { st_token, ts_token } = this.state;
    return (
      <div>
        <Weather city="Toronto" country="ca" appid="450d5e8ca30dd9275d32cfdf424fa7c8" units='metric' />
        <Clock />
        <div className='container'>
          <Greeting message={this.state.message} />
          {<Map />}

        </div>
      </div>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Layout />, app);