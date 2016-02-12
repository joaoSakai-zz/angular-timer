(function(){
  'use strict'

  angular
    .module('app.cron')
    .controller('Cron', Cron);

    Cron.$inject = ['$interval'];

  function Cron($interval) {

      var cron = this;
      cron.title = 'Angular JS Timer';
      cron.time = 60;
      cron.counter = cron.time;
      cron.start = start;
      cron.reset = reset;
      cron.stop = stop;

      function start() {
          cron.counter = parseInt(cron.time);
          cron.intervalInfo = $interval(function () {
            cron.counter > 0 ? cron.counter-- : cron.counter = parseInt(cron.time);
          }, 1000);
          console.log(cron.intervalInfo.$$intervalId);
      };

      function reset() {
        stop();
        cron.counter = cron.time;
      }

      function stop(){
        if(cron.intervalInfo){
          clearInterval(cron.intervalInfo.$$intervalId);
          delete cron.intervalInfo;
          cron.time = 60;
        }else{
          alert('Cron is not running!');
        }
      }

  }

})();
