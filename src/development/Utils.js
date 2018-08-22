/**
 * @author   Joseph Evans
 * @since
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
 * @copyright 2018
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
 * @desc the purpose of this code is to allow you to test out some code with
 *       may try catch implementations around the code, if it works
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

    if (typeof recovery == "function") { recovery(errors); }
  }
};


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
