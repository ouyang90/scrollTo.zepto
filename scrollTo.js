// Usage: $(element).scrollToTop([position] [, callback])
// @params:
// [number] position = the ending position
// [function] callback = a callback function (will be called when the scroll will end)
;(function ($) {
  'use strict';
  // only allow one scroll to top operation to be in progress at a time,
  // which is probably what you want
  var scrollToTopInProgress = false
      // use requestAnimationFrame or polyfill
    , frame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) { 
          //  make a timeStamp to callback,otherwise the arguments(now) will be undefined in ios4,5
          var currTime = new Date().getTime(),
            timeToCall = Math.max(0, 16 - (currTime - lastTime)),
            timeOutId = setTimeout(function () {
                callback(currTime + timeToCall)
            }, timeToCall);
          lastTime = currTime + timeToCall
          return timeOutId
      };
 
<<<<<<< HEAD
  $.fn.scrollToTop = function(position, onEndCallback){
    var $this = this,
      targetY = position || 0,
      initialY = $this.scrollTop(),
      lastY = initialY,
      delta = targetY - initialY,
=======
  $.fn.scrollToTop = function (position, onEndCallback) {
    var $this = this
      , targetY = position || 0
      , initialY = $this.scrollTop()
      , lastY = initialY
      , delta = targetY - initialY
>>>>>>> ce10fadd7095d1c88a4b041e11876bfeaa5c8494
      // duration in ms, make it a bit shorter for short distances
      // this is not scientific and you might want to adjust this for
      // your preferences
      , speed = Math.min(750, Math.min(1500, Math.abs(initialY-targetY)))
      // temp variables (t will be a position between 0 and 1, y is the calculated scrollTop)
<<<<<<< HEAD
      start, t, y,
      // use requestAnimationFrame or polyfill
      frame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback){
            // make a timeStamp to callback,otherwise the arguments(now) will be undefined in ios4,5
            var currTime = new Date().getTime(),
                timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                timeOutId = setTimeout(function() {
                    callback(currTime + timeToCall)
                }, timeToCall);
            lastTime = currTime + timeToCall
            return timeOutId
      },
      cancelScroll = function(){ abort() }
 
    // abort if already in progress or nothing to scroll
    if (scrollToTopInProgress) return
    if (delta == 0) return
=======
      , start
      , t
      , y
      , cancelScroll = function () { 
          abort() 
        };
 
    // abort if already in progress or nothing to scroll 
    if (scrollToTopInProgress || delta == 0) return;
>>>>>>> ce10fadd7095d1c88a4b041e11876bfeaa5c8494
 
    // quint ease-in-out smoothing, from
    // https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/penner.js#L127-L136
    function smooth (pos) {
      if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,5);
      return 0.5 * (Math.pow((pos-2),5) + 2);
    }
 
<<<<<<< HEAD
    function abort(){
      $this.off('touchstart', cancelScroll)
      scrollToTopInProgress = false
      if (typeof onEndCallback == 'function')
        onEndCallback.call(this, targetY)
=======
    function abort () {
      $this.off('touchstart', cancelScroll);
      scrollToTopInProgress = false;
      if (typeof onEndCallback === 'function') {
        onEndCallback.call(this, targetY);
      }
>>>>>>> ce10fadd7095d1c88a4b041e11876bfeaa5c8494
    }
 
    // when there's a touch detected while scrolling is in progress, abort
    // the scrolling (emulates native scrolling behavior)
    $this.on('touchstart', cancelScroll)
    scrollToTopInProgress = true
 
    // start rendering away! note the function given to frame
    // is named "render" so we can reference it again further down
    frame(function render (now) {
      if (!scrollToTopInProgress) return;
      if (!start) start = now;
      // calculate t, position of animation in [0..1]
      t = Math.min(1, Math.max((now - start)/speed, 0));
      // calculate the new scrollTop position (don't forget to smooth)
      y = Math.round(initialY + delta * smooth(t));
      // bracket scrollTop so we're never over-scrolling
      if (delta > 0 && y > targetY) y = targetY;
      if (delta < 0 && y < targetY) y = targetY;
      // only actually set scrollTop if there was a change fromt he last frame
      if (lastY != y) $this.scrollTop(y);
      lastY = y;
      // if we're not done yet, queue up an other frame to render,
      // or clean up
      if (y !== targetY) frame(render)
        else abort();
    })
  }
})(Zepto)
