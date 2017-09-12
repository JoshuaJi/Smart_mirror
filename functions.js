var speech = require('watson-speech');
var global_token = "";

function fetch_token(){
  
}

function rec_speech(){
    if (global_token == ""){
      fetch('https://radiant-crag-76774.herokuapp.com/api/speech-to-text/token')
      .then(function(response, err) {
        return response.text();
      }).then(function (token) {
          console.log("token: "+token);
          global_token = token;
          var stream = speech.SpeechToText.recognizeMicrophone({
            token: global_token,
            outputElement: '#output' // CSS selector or DOM Element
          });
      
          stream.on('data', function(data) {
            if(data.results[0] && data.results[0].final) {
              stream.stop();
              console.log('stop listening.');
              handleData(data);
            }
          });
      
          stream.on('error', function(err) {
            console.log(err);
          });
      }).catch(function(error) {
        console.log(error);
      });
    }else{
    var stream = speech.SpeechToText.recognizeMicrophone({
      token: global_token,
      outputElement: '#output' // CSS selector or DOM Element
    });

    stream.on('data', function(data) {
      if(data.results[0] && data.results[0].final) {
        stream.stop();
        console.log('stop listening.');
        // handleData(data);
      }
    });

    stream.on('error', function(err) {
      console.log(err);
    });
  }
    
    
}

function handleData(data){

    var text = "You are amazing";

    var speak = speech.TextToSpeech.synthesize({
      token: global_token,
      text: text
    })
}