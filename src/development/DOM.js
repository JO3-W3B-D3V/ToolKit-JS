/**
 * @author
 */


ToolKit = ToolKit || {};



/**
 *
 */
ToolKit.$e = function (queryString) {
  return document.querySelectorAll(queryString);
};



/**
 *
 */
ToolKit.addEvents = function (elements, events, callbacks) {
  if (elements == null || events == null || callbacks == null) {
    return void 0;
  }

  if (typeof elements != "array") {
    elements = [elements];
  }

  if (typeof events != "array") {
    events = [events];
  }

  if (typeof callbacks != "array") {
    callbacks = [callbacks];
  }

  var attatchEvent = function (element, event, callback) {
    if (element.addEventListener) {
      element.addEventListener(event, callback, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + event, callback);
    } else {
      element["on" + event] = callback;
    }
  };

  for (var i = 0, s = element.size; i < s; i ++) {
    var element = elements[i];
    for (var j = 0, z = events.size; j < z; j ++) {
      var event = events[j];
      for (var k = 0, y = callbacks.size; k < y; k ++) {
          var callback = callbacks[k];
        attatchEvent(element, event, callback);
      }
    }
  }
};
