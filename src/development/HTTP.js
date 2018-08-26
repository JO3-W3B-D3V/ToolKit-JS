/**
 *
 */

var ToolKit = ToolKit || {};



/**
 *
 */
ToolKit.$_GET = function (key) {
  var url = window.location.search.substr(1).split("&");
  var GET = {};

  url.forEach(function(pair) {
    var keyAndValue = pair.split("=");
    var key = decodeURIComponent(keyAndValue[0]);
    var value = decodeURIComponent(keyAndValue[1]);
    GET[key] = value;
  });


  if (key == null) {
    return GET;
  } else {
    try { return GET[key]; }
    catch (Exception) { return undefined; }
  }
};



/**
 *
 */
ToolKit.$_POST = function (key) {
  var forms = document.querySelector("form");

  forms.forEach(function(form) {
    addEvents(form, "submit", function() {

    });
  });
};
