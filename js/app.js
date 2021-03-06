/**
 * Lissa Juice: Online audio visualization
 *
 * Copyright (c) 2013
 * Under MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 */

lissa.BUFFER_SIZE = 1024;
var synth_processor;

lissa.init = function($) {
  var context = null;
  if (typeof AudioContext !== 'undefined')
    context = new AudioContext();
  else if (typeof webkitAudioContext !== 'undefined')
    context = new webkitAudioContext();
  else {
    alert("Lissa Juice uses the Web Audio API, and your browser doesn't have it. :(");
    return;
  }

  lissa.templates.init();
  lissa.figure.init();
  lissa.synth.init(lissa.BUFFER_SIZE);

  synth_processor = context.createScriptProcessor(lissa.BUFFER_SIZE, 0, 2);
  synth_processor.onaudioprocess = lissa.process;

  synth_processor.connect(context.destination);
  lissa.figure.draw();

  lissa.controls.init($('.controls-container'));

  $(window).focus(function() { lissa.active = true; });
  $(window).blur(function() { lissa.active = false; });

  lissa.active = document.hasFocus;
  if (lissa.active)
    window.focus();
};

(function($){
  $(document).ready(function(){
    if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
      //not mobile, start automatically
      start();
    }
  });
})(jQuery);
