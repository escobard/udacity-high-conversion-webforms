/*
	You can solve this quiz with vanilla JS or jQuery!
	 */


 
// outputHandles function start
/*source https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
  function startup() {
  	var el = square;
  	el.addEventListener("touchstart", handleStart, false);
  	el.addEventListener("touchend", handleEnd, false);
  	el.addEventListener("touchcancel", handleCancel, false);
  	el.addEventListener("touchmove", handleMove, false);
  	log("initialized.");*/

  	var square = document.querySelector('#square');
  	var output = document.querySelector('#output');
	square.addEventListener("touchend", touchState);
	function touchState() {
    output.innerHTML = "touchend";
	}
	
	/*
	FYI, this is the jQuery way of running a locally scoped function on
	document ready. Check out http://gregfranko.com/blog/jquery-best-practices/
	to learn more.
	 */
	$(function(){
	  var square = $('#square');
	  var output = $('#output');

	  /*
	  Don't delete this or the square won't be draggable!
	   */
	  square.draggable();
	  
	  /*
	  If you want to use jQuery, your code goes here!
	   */
	});