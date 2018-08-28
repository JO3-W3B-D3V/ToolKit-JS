/**
 * @author   Joseph Evans
 * @since     25/08/2018
 * @desc      A major purpose behind this code is to simply allow a developer
 *            to have a pretty useful ToolKit at hand, due to the modular design,
 *            you should be able to cut out bits and piecees that you like or
 *            dislike to use for your specific project. , keep in mind
 *            that natively this will support IE11+.
 *
 *            Be warned, if you decide to support older browsers,
 *            changne the keywords 'let' and 'const to 'var',
 *            that should instantly add support for IE9+.
 * @file      The purpose of the utils file is to essentially contain a bunch of
 *            general, yet useful functions and tools.
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
 * @todo      add documentation
 * @todo      general code tidy up
 * @todo      add some more features
 * @todo      etc.
 */



// rather than implementing a class, here you can see that
// i have decided to go with a traditional object literal approach,
// this should reduce the need to use a constructor, it's also a much
// easier way to implement a singleton design pattern
var ToolKit = ToolKit || {};



// this is just an easy way to access some development values
// if necessary, the name 'globals' is just to imply how this code can
// be accessed from anywhere within the code.
ToolKit.GLOBALS = {
  DEV_MODE: true
};



/**
 * @public
 * @function toggleDevMode
 * @param    {Boolean} Boolean
 * @desc     the purpose of this method is to allow a developer to set the
 *           dev mode feature to true or false
 */
ToolKit.toggleDevMode = function (boolean) {
  var devMode = ToolKit.GLOBALS.DEV_MODE;
  if (typeof boolean == "boolean") {
    devMode = boolean;
  } else {
    devMode =! devMode;
  }
};



/**
 * @public
 * @function
 * @return  {Boolean}
 * @desc    the purpose of this method is to state whether or not the
 *          dev mode feature is on or off, by default it is on
 */
ToolKit.isDevMode = function () {
  return ToolKit.GLOBALS.DEV_MODE;
};


/**
 * @public
 * @function executeSafe
 * @param    {Object} options
 * @return   {Error||Null}
 * @desc     the purpose of this code is to allow you to test out some code with
 *           may try catch implementations around the code, if it works
 */
ToolKit.executeSafe = function (options) {
  let errors = [], usererror = 0;
  const code = options.code || null, recovery = options.recovery || null;

  try {
    if (typeof code == "function") {
      code();
    } else if (typeof code == "string") {
      try {
        eval(code);
      } catch (UnkownException) {
        usererror = -2;
        errors.push(UnkownException);
      }
    } else { usererror = -1; }
  }

  catch (UnkownException) {
    errors .push(UnkownException);
    try { console.error(UnkownException); }

    catch (NoAccessToConsoleError) {
      errors.push(NoAccessToConsoleError);
      try { console.log(e); }

      catch (NoAccessToConsoleLog) {
        errors.push(NoAccessToConsoleLog);
      }
    }

    if (ToolKit.GLOBALS.DEV_MODE) {
      if (usererror < 0) {
        if (usererror == -1) {
          throw new Error("You must provide a function in order to test the code.");
        } else if (usererror == -2) {
          throw new Error("You must provide a self invoked function," +
                          " considering you're providing it as a string.");
        }
      }
    }

    if (typeof recovery == "function") {
      recovery(errors);
    }
  }
};



/**
 * @public
 * @function cloneArray
 * @param    {Array} array
 * @return   {Array}
 * @desc     the purpose of this method is to essentially allow a developer to
 *           clone an array, regardless of what type or size
 */
ToolKit.cloneArray = function (array) {
  let success = null;

  ToolKit.executeSafe({
    code: function () {
      success = array.slice();
    }, recovery: function () {
      success = [];
    }
  });

  return success;
};



/**
 * @public
 * @function Storage
 * @param    {*}
 * @return   {Object}
 * @desc     the purpose of this method is to simply allow the developer to
 *           not have to do any form of implementation or any form of wrapper
 *           around the storage facilities
 */
ToolKit.Storage = function (argument) {
  if (ToolKit.Storage.instance != null) {
    return ToolKit.Storage.instance;
  }

  var s;

  if (argument != null) {
    s = sessionStorage;
  } else {
    s = localStorage;
  }

  var validateKey = function (key) {
    if (typeof key != "string") {
      throw new Error("Invalid data type provided.");
    } else if (key.length == null || key.length < 1) {
      throw new Error("You must provide a string with a length of at least 1.");
    }
  };

  var publicObject = {
    get : function (key, value) {
      validateKey(key);
      var data = s.getItem(key);

      if (typeof data == "string") {
        try {
          data = JSON.parse(data);
        } catch (JSONParseException) {
          // no need to do anything
        }
      }

      return data;
    },
    set : function (key, value) {
      try {
        value = JSON.stringify(value);
      } catch (JSONStringifyException) {
        // no need to do anything
      }

      validateKey(key);
      s.setItem(key, value);
    }
  };

  ToolKit.Storage.instance = publicObject;
  return ToolKit.Storage.instance;
};



/**
 * @public
 * @function timeout
 * @param    {Object} options
 * @desc     the purpose of this method is to just simply add a wrapper
 *           around the set time out method
 */
ToolKit.timeout = function (options) {
  if (ToolKit.timeout.count == null) {
    ToolKit.timeout.count = 0;
  } else {
    ToolKit.timeout.count ++;
  }

  var time = options.time || 0;
  var name = options.name || ToolKit.timeout.count;
  var timeouts = {};
  var exe;

  var publicObject = {
    execute : function () {
      timeouts[name] = setTimeout(function() {
        options.code();
      });
    }, clear : function (name) {
      clearTimeout(timeouts[name]);
    }
  };
};
