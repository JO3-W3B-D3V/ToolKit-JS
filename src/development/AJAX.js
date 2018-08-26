
/**
 * @author    Joseph Evans <joe-evs196@hotmail.co.uk>
 * @version   0.0.1
 * @since     26/08/2018
 *
 * @file      the contents of this file simply consists of a fairly basic implementation of
 *            the ever so famous jquery ajax method
 *
 * @copyright (c) 2018 copyright holder all Rights Reserved.
 *            Permission is hereby granted, free of charge, to any person obtaining a copy
 *            of this software and associated documentation files (the "Software"), to deal
 *            in the Software without restriction, including without limitation the rights
 *            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *            copies of the Software, and to permit persons to whom the Software is
 *            furnished to do so, subject to the following conditions:
 *
 *            The above copyright notice and this permission notice shall be included in all
 *            copies or substantial portions of the Software.
 *
 *            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *            SOFTWARE.
 */



 // rather than implementing a class, here you can see that
 // i have decided to go with a traditional object literal approach,
 // this should reduce the need to use a constructor, it's also a much
 // easier way to implement a singleton design pattern
 var ToolKit = ToolKit || {};



/**
 * @public
 * @function AJAX
 * @param   {Object}
 * @desc    the purpose of this method is to include an ajax
 *          implementation
 * @see     https://github.com/JO3-W3B-D3V/HTTP-JS/edit/master/HTTP.js
 */
ToolKit.AJAX = function (options) {



  /**
   * @ignore
   * @private
   * @function addEvent
   * @param    {Object}   obj
   * @param    {String}   eventType
   * @param    {Function} callback
   * @desc     this is just here to assign events to the xhr object
   */
  var addEvent = function (obj, eventType, callback) {
    if (obj == null || typeof obj != 'object') {
      throw new Error("Cannot bind an event to null.");
    } else if ('length' in obj || obj instanceof HTMLCollection || Array.isArray(obj)) {
      for (var i = 0, s = obj.length; i < s; i ++) {
        var objIndex = obj[i];
        addEvent(objIndex, eventType, callback);
      }
    } else if (obj.addEventListener) {
      obj.addEventListener(eventType, callback, false);
    } else if (obj.attachEvent) {
      obj.attachEvent('on' + eventType, callback);
    } else {
      obj["on"+eventType] = callback;
    }
  };



  /**
   * @ignore
   * @public
   * @function trimWhiteSpace
   * @return   {String}
   * @desc     the purpose of this function is to simply remove all
   *           white spaces from a string
   */
  var trimWhiteSpace = function (string) {
    return string.replace(/\ /g, "");
  };



  var required = ["success", "url", "method"];
  var reqtypes = ["function", "string", "string"];
  var reqErrMsg = "Please provide an object with the required keys [success, fail, url, data]";
  var httpMethods = ["POST", "GET", "PUT", "DELETE", "HEAD", "OPTIONS"];
  var headers = [{name: "X-Content-Type-Options", value: "nosniff"}];
  var xhr = new XMLHttpRequest();
  var password = null;
  var username = null;



  // check that all of the required parameters have been
  // provided if not, then simply throw some errors, this will inform the
	// developer that they're doing somethign wrong
  if (options == null) {
    throw new Error("You must provide an object containsing at least "
      + "the following arguments.[success, method, url]");
  } else if (typeof options != "object") {
      throw new Error(reqErrMsg);
  } else {
    var counter = 0;
    required.forEach(function(r){
      if (!r in options) { throw new Error(reqErrMsg); }
      var type = reqtypes[counter];
      var actualType = typeof options[r];
      if (actualType != type || options[r] == null) {
        console.log(type);
        console.log(r);
        console.log(actualType);
        throw new Error("Invalid data type provided.");
      }
      counter ++;
    });


  // check that there's a valid http method provided
  options.method = trimWhiteSpace(options.method.toUpperCase());
  if (httpMethods.indexOf(options.method) < 0) {
    throw new Error("This is meant to implement a CRUD API, therefore "
			+ "the http method "
			+ options.method + " is not allowed.");
  }


  // force it to be a secure connection
  // don't even bother trying a http connection, don't
  // even allow that as an option, there's no point
  // unless for some reason the user demands it
  var demandNoSSL = false;
  if ('forceNoSSL' in options) {
    if (options.forceNoSSL == true) {
      demandNoSSL = true;
      try {
        console.info("Insecure connetion!");
      } catch (NoConsoleInfoException) {
        // do nothing
      }
    }
  }


	// this will force allow us to connect to a back end that has
	// no form of security, by default we want to make sure that we
	// connect to a secure connection
  if (!demandNoSSL) {
    if (options.url.indexOf("http://") >= 0) {
      options.url.replace("http://", "https://");
    }
  }


  // check is a username and password has been provided
  var validNonEmptyString = function (str) {
    return str != "" && str != null && typeof str == "string";
  };


	// update the username local variable if necessary
  if ('username' in options) {
    if (validNonEmptyString(options.username)) {
      username = options.username;
    } else {
      throw new Error("You've provided an invalid username.");
    }
  }


	// update the password local variable if necessary
  if ('password' in options) {
    if (validNonEmptyString(options.password)) {
      password = options.password;
    } else {
      throw new Error("You've provided an invalid password.");
    }
  }

  // open the connection so this way we can now set the headers
  // without having to worry about anything it doesn't
	//  matter if the user name and password are null,
	//  the xml http request object will just
	// diregard them
    xhr.open(options.method, options.url, true, username, password);



  // try to prevent mime sniffing both ends, just for the simple sake of that
  // added layer of security, whilst the client side can be manipulated,
  // it's nice to at least try to add some security on the client side too
  // but ultimetely your back end should be bullet proof
  //
  // NOTE this may be unecessary as by default no sniff has been put into
  //      the headers array be defualt, may consider removing this or possibly
  //      removing the above alternative
  xhr.setRequestHeader("X-Content-Type-Options", "nosniff");



  // force over ride the content type header, it doesn't matter so much as
  // the back end is concerned as looking at test data, the back end will only
  // process the most recently provided content type header it's best to place
  // this code here as it will run prior to processing the provided form
  if ('consumes' in options) {
    xhr.setRequestHeader("Content-Type", options.consumes);
  }


  // now to take a look at the headers, this is an optional
  // field to implement keep in mind, this needs to take place
	// after the connection has been opened
  if ("headers" in options) {



    /**
     * @ignore
     * @private
     * @function validateHeader
     * @param   {Object}
     * @return  {Boolean}
     * @desc    the purpose of this method is to ensure that a header is valid
     */
    var validateHeader = function (header) {
      header = header || {};
      if ('name' in header && 'value' in header) {
        if (header.name != "" && header.name != null && header.value != "" && header.value != null) {
          return true;
        }
        return false;
      }
      return false;
    };



  	/**
     * @ignore
     * @private
     * @function headerError
     * @return   {Error}
     * @desc     the purpose of this function is to simply allow
     *           the error to be thrown in multiple places
     */
    var headerError = function () {
      throw new Error("You must provide a single header, or an array of headers."
        + "\nA header must contain a 'name' property and a 'value' property.");
    };



  	// now we want to validate the headers, as we already know that they
  	// exist, the headers property can either be an array of object, or an
  	// object, the header must contains a name property and a value property
    if (Array.isArray(options.headers)) {
      headers.forEach(function(header) {
        if (validateHeader(header)) {
          xhr.setRequestHeader(header.name, header.value);
        } else {
          headerError();
        }
      });
    } else if (typeof options.headers == "object") {
      if (validateHeader(options.headers)) {
        xhr.setRequestHeader(options.headers.name, options.headers.value);
      } else {
        headerError();
      }
    } else {
      headerError();
    }
  } // end of headers in options


  // now to check and process the form property as we know that the form
	// obviosuly should be a form element, it's safe to check that it's an
	// instance of a html form element plus having done research with cross
	// browser compatability, this is meant to work even in ie8, so it's fine
	// and safe to use
  if ('form' in options) {
    if (!options.form instanceof HTMLFormElement) {
      throw new Error("The form parameter must be a HTML form element.");
    }

		// as child nodes will provide a html collection, it's safer to
		// make sure that we manually convert this inot an array
    var inputs = Array.prototype.slice.call(options.form.childNodes);
    var toSend = "";


		/**
     * @ignore
     * @private
     * @function isValidInput
     * @param    {Element}
     * @return   {Boolean}
     * @desc     the purpose of this function is to make sure that the provided
     *           html input field is valid
     */
    var isValidInput = function (input) {
      var test = false;
      if (input.getAttribute("name") != "" && input.getAttribute("value") != ""
        && input.getAttribute("name") != null && input.getAttribute("value") != null) {
        return true;
      } else {
        return false;
      }
    };



    /**
     * @ignore
     * @private
     * @function encodeInput
     * @param    {Element}
     * @return   {String}
     * @desc     this will simply encode a html input field in such a way that
     */
    var encodeInput = function (input) {
    	return encodeURIComponent(input.getAttribute("name")) + '='
      	+ encodeURIComponent(input.getAttribute("value"));
    };



  // now to simply send the data on through to the back end, let's see
	// if we're to submit form data, raw data or nothing, if the http method is
	// a get method, then it shouldn't try to send anything anyway
  if ((!'data' in options) && (!'form' in options)) {
    xhr.send();
  } else {
    if ('form' in options) {
      options.data = options.form;
    } else if ('data' in options) {
      xhr.send(options.data);
    } else if ('data' in options && 'form' in options) {
      try {
        console.info("Data and form supplied, selecting data by default...");
      } catch (NoConsoleInfoException) {
        try {
          console.log("Data and form supplied, selecting data by default...");
        } catch (NoConsolelOGException) {
          // do nothing
        }
      }
    }
    xhr.send(options.form);
  }


  /**
   * @ignore
   * @private
   * @function invalidFunctionProvided
   * @return   {Error}
   * @desc     the prupose of this function is to simply state when an invalid
   *           function has been provided
   */
  var invalidFunctionProvided = function () {
		throw new Error("Invalid function provided.");
	};



  // on load start will run if it exists within the options object
  // if not, then next check
  if ('start' in options) {
    if (typeof options.start != "function") { invalidFunctionProvided(); }
    addEvent(xhr, "loadstart", function () { options.start(xhr); });
  }


  // on progress will run if it exists within the options object
	// if not, then next check
  if ('loading' in options) {
		if (typeof options.loading != "function") { invalidFunctionProvided(); }
    addEvent(xhr, "progress", function (loadEvent) { options.loading(loadEvent); });
  }


  // on success will now run, the succcess method should run anyway
	// as it's a required parameter/argument for this function
  addEvent(xhr, "load", function () {
    var data = xhr.responseText;
    try { data = JSON.parse(data); }
    catch (Exception) { /* do nothing */ }
    options.success(data);
  });


  // on finished will run  if it exists within the options object
	// if not, then next check, keep in mind this code will be executed
	// whether or not the request was a success or a fail
  if ('finished' in options) {
		if (typeof options.finished != "function") { invalidFunctionProvided(); }
    addEvent(xhr, "loadend", function () { options.finished(xhr); });
  }


	// now we want to check if there's an abort or a fail method
	// if not then just return from this function
  if ('fail' in options || 'abort' in options) {



		// this will run anf check the error handling methods (abort, fail),
		// either way if abort is provided, then abort will be run instead of
		// fail, provided fail has been provided
    addEvent(xhr, "abort", function () {
      if (!'abort' in options) {
        if (typeof options.fail != "function") { invalidFunctionProvided(); }
        options.fail(xhr);
      } else {
        if (typeof options.abort != "function") { invalidFunctionProvided(); }
        options.abort(xhr);
      }
    });



	  // this will run the on fail method provided that it exists within the
  	// options object
  	if ('fail' in options) {
      addEvent(xhr, "error", function () {
  	    if (typeof options.fail != "function") { invalidFunctionProvided(); }
        options.fail(xhr);
      });
  	}
  }
}
