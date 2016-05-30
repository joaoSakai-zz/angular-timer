(function(){
  'use strict'

  angular
    .module('app.cron')
    .controller('Cron', Cron);

    Cron.$inject = ['$interval'];

  function Cron($interval) {

      var INIT = 'vai',
          END = 'foi',
          REINIT = 'novo';

      var cron = this;
      cron.title = 'Angular JS Timer';
      cron.time = 15;
      cron.counter = cron.time;
      cron.start = start;
      cron.reset = reset;
      cron.stop = stop;
      cron.startSpeech = startSpeech;
      cron.listening = false;
      var recognition = undefined;

      function start() {
          cron.counter = parseInt(cron.time);
          cron.intervalInfo = $interval(function () {
            cron.counter > 0 ? cron.counter-- : cron.counter = 0;
          }, 1000);
      };

      function reset() {
        stop();
        cron.counter = cron.time;
      }

      function stop(){
        if(cron.intervalInfo){
          clearInterval(cron.intervalInfo.$$intervalId);
          delete cron.intervalInfo;
        }else{
          console.log('Timer is not running!');
        }
      }

      function constructorSpeech(){
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = function() {
          cron.listening = true;
        };

        recognition.onend = function() {
          cron.listening = false;
        };

        recognition.onresult = function (event) {
          for (var i = event.resultIndex; i < event.results.length; i++) {
        			if(event.results[i].isFinal){
        				var voiceCommand = event.results[i][0].transcript;
                switch (voiceCommand.trim()) {
                  case INIT:
                    start();
                    break;
                  case END:
                    stop();
                    break;
                  case REINIT:
                    reset();
                    break;
                  default:
                    console.log(event.results);
                }
        			}
        	}
        }
        recognition.onerror = function(event) {
          console.log(event.error);
        };
      }

      constructorSpeech();

      function startSpeech(){
        var teste = recognition.start();
        console.log(teste);

      }
  }

})();
