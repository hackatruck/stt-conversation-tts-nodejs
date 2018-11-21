var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var ConversationV1 = require('watson-developer-cloud/conversation/v1');
var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var mic = require('mic');
var config = require("./config.js") // to get our credentials and the attention word from the config.js files
var fs = require('fs');
var os = require('os');
var exec = require('child_process').exec;

//conversation context object
var context ={};

//check what OS is running
var isWin = (os.platform() === 'win32');
var isMac = (os.platform() === 'darwin');
var isLinux = (os.platform() === 'linux');



var speech_to_text = new SpeechToTextV1({
  iam_apikey: config.stt.apikey,
  url: 'https://gateway-wdc.watsonplatform.net/speech-to-text/api'
});

// Set up Conversation service.
var conversation = new ConversationV1({
  username: config.conversation.username, // replace with username from service key
  password: config.conversation.password, // replace with password from service key
  path: { workspace_id: config.conversation.workspace_id }, // replace with workspace ID
  version_date: '2017-05-26'
});

var text_to_speech = new TextToSpeechV1({
  iam_apikey: config.tts.apikey,
    url: 'https://gateway-wdc.watsonplatform.net/text-to-speech/api'
});

// Initiate Microphone Instance to Get audio samples
console.log("Configurando microfone");
var micInstance = mic({ 'rate': '44100', 'channels': '2', 'debug': false, 'exitOnSilence': 6 });
var micInputStream = micInstance.getAudioStream();

micInputStream.on('data', function(data) {
  // console.log("Recieved Input Stream: " + data.length);
});

micInputStream.on('error', function(err) {
  console.log("Error in Input Stream: " + err);
});

micInputStream.on('silence', function() {
  // detect silence.
});

micInstance.start();
console.log("Microfone ligado");


function initTextStream(){
  console.log("init text stream")
  textStream = micInputStream.pipe(speech_to_text.createRecognizeStream({
    content_type: 'audio/l16; rate=44100; channels=2',
    model: config.stt.model,
    customization_id: config.stt.customizationid,
    interim_results: config.stt.interim_results,
    inactivity_timeout: config.stt.inactivity_timeout,
    profanity_filter: config.stt.profanity_filter,
    keywords: config.stt.keywords,
    smart_formatting: config.stt.smart_formatting
  }));

  textStream.setEncoding('utf8');

  var context = {} ; // Save information on conversation context/stage for continous conversation
  textStream.setEncoding('utf8');

  textStream.on('close', function(event) {
    console.log("Speech to Text Stream closed");
    console.log(JSON.stringify(event, null, 2));
    initTextStream();
  });

  textStream.on('data', function(message) {
    console.log(message); // print the text once received
    conversation.message({
      input: { text: message },
      // Send back the context to maintain state.
      context : context,
    }, processResponse)

  });

  textStream.on('error', function(err) {
    console.log(' === Watson Speech to Text : An Error has occurred =====') ; // handle errors
    console.log(err) ;
    console.log("Press <ctrl>+C to exit.") ;
  });
}
initTextStream();


function processResponse(err, response) {
  if (err) {
    console.error(err); // something went wrong
    return;
  }
  //save context
  context = response.context
  var message = "";
  // Check for action flags.
  if (response.output.action === 'display_time') {
    // User asked what time it is, so we output the local system time.
    message = 'São ' + new Date().toLocaleTimeString()
  }  else {
    // Display the output from dialog, if any.
    if (response.output.text.length != 0) {
      message = response.output.text[0]
    }
  }
  console.log(message);
  if(message && message != ""){
    speak(message);
  }
}

function speak(message){
  var params = {
    text: message,
    voice: config.tts.voice, // Optional voice
    accept: 'audio/wav'
  };
  // Pipe the synthesized text to a file
  text_to_speech.synthesize(params).pipe(fs.createWriteStream('output.wav'))
                .on('close', function() {

    //prepare audio exec command depending on OS running
    if(isMac){
      var command = 'play output.wav';
    } else if (isWin){
      var command = 'sox -t waveaudio -d output.wav';
    } else if (isLinux){
      var command = 'aplay output.wav';
    }

    //Execute/Play audio file output.wav
    var create_audio = exec(command, function (error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
  });
}
