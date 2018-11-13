/**
 * @author    Joseph Evans <joeevs196@gmail.com>
 * @since     13/11/2018
 * @version   3.0.1
 * @file      The purpose of this framework is simple, to implement a small framework, including
 *            a few neat features, a few of the standard features includes the following:
 *
 *            - Component(s)
 *                - Model/State
 *                - Controllers
 *            - Template Engine (Ninja)
 *            - In-memory Database (OQS)
 *            - Services(AJAX)
 *            - Storage (encapsulated local-storage)
 *            - Session (encapsulates session-storage)
 *            - Utils
 *
 *            Unlike many current front end frameworks, this does not require an you to
 *            religiously follow a certain approach to how you develop and design your
 *            framework, but rather it's 'kinda' somewhere between a library & a framework.
 *            Due to making this framework modular, it's quite easy to over-ride any functionality,
 *            an example being the query feature, you could use something else, an example being
 *            LokiJS.
 *
 *            Another beauty of ToolKit-JS is that due to following the KISS principle quite
 *            religiously, to use ToolKit-JS, there's no need for using any form of CLI tool(s)
 *            to ensure that your code is compiled before you run it in the browser, etc. Thanks
 *            to the sheer simplicity of ToolKit, you should be able to use ToolKit with no
 *            hassle, it's a great place for beginners to learn about and how to use the
 *            JavaScript ecosystem, at least on the front end.
 *
 *            Please keep in mind, this framework was not created to replace anything, but more
 *            so to complement fellow front end technologies. I.E. as you can see within this
 *            source code, there's no form of shadow dom manipulation like what you'd get in
 *            React, etc.
 *
 * @todo      Implement some test(s) through the use of Mocha.
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



/**
 * @global
 * @function ToolKit
 * @return   {Object}
 * @desc     The reason for this specific implementation is simple, via this implementation,
 *           a developer can chose to use 'new' or a more procedural approach without having to
 *           make us of the keyword new.
 */
var ToolKit = function () {
  // Encapsulate properties into two separate objects, one public, the other private.
  var publicProps = {};
  var privateProps = {};

  // Simple boolean to state if dev mode is on or off.
  privateProps.devMode = false; // default ready for production.

  // Simple way to switch between local storage and session storage.
  privateProps.db = localStorage;

  // Define some life-span(s).
  privateProps.lifeSpan = 100; // default to 100 ms
  privateProps.minLifeSpan = 10; // 10 ms
  privateProps.maxLifeSpan = 10000; // 10,000 ms

  // List of templates.
  privateProps.templates = {};

  // List of components.
  privateProps.components = {};

  // Set up all of the query properties.
  privateProps.Query = {};
  privateProps.Query.table = [];
  privateProps.Query.results = [];
  privateProps.Query.cols = [];
  privateProps.Query.queryString = "";
  privateProps.Query.limit = privateProps.Query.table.length;
  privateProps.Query.limiter = 100;
  privateProps.Query.offset = 0;
  privateProps.Query.onCoolDown = function () {};
  privateProps.Query.onComplete = function () {};



  /**
   * @public
   * @namespace Utils
   * @desc      This is a namespace for a group of generic methods.
   */
  publicProps.Utils = {};


  /**
   * @public
   * @function isDefined
   * @param    {*} args
   * @return   {Boolean}
   * @desc     A simple method to see if 'x' is equal to null or not.
   */
  publicProps.Utils.isDefined = function (args) {
    return args != null;
  };



  /**
   * @public
   * @function isDevMode
   * @return   {Boolean}
   * @desc     A simple mechanism used to see if dev mode is on or off.
   */
  publicProps.Utils.isDevMode = function () {
    return privateProps.devMode;
  };



  /**
   * @public
   * @function toggleDevMode
   * @desc     Turn dev mode on/off.
   */
  publicProps.Utils.toggleDevMode = function () {
    privateProps.devMode = !privateProps.devMode;
  };



  /**
   * @public
   * @function log
   * @param    {*} args
   * @desc     Print data to console provided dev mode is on.
   */
  publicProps.log = function(args) {
    if (privateProps.devMode) {
      try {
        console.log(args);
      } catch (Exception) {
        // error recovery?
      }
    }
  };



  /**
   * @public
   * @function TemplateEngine
   * @return   {String}
   * @desc     This is clearly here so that people have the power to use an alternative template
   *           engine, i.e. Mustache.
   */
  publicProps.TemplateEngine = function (html, data) {
    var templates = /<%([^%>]+)?%>/g;
    var operations = /(^( )?(if|for|else|switch|case|break|var|let|const|this|try|catch|finally|console|self|{|}|;|:|[|]))(.*)?/g,
      code = 'var r=[];\nvar data = this;\n',
      cursor = 0,
      match;

    var add = function (line, js) {
      js ? (code += line.match(operations)
        ? line + '\n' : 'r.push(' + line + ');\n') :
        (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
      return add;
    };

    while (match = templates.exec(html)) {
      add(html.slice(cursor, match.index))(match[1], true);
      cursor = match.index + match[0].length;
    }

    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
  };



  /**
   * @public
   * @function $one
   * @param    {String} queryString
   * @return   {Element}
   * @desc     Simply implement jQuery's $('x'), only rather than returning an array of length
   *           1, return the first item to match the query string.
   */
  publicProps.Utils.$one = function (queryString) {
    return document.querySelector(queryString.toString());
  };



  /**
   * @public
   * @function $all
   * @param    {String} queryString
   * @return   {NodeList}
   * @desc     Simply implement jQuery's $('x'), also returning an array of HTML elements.
   */
  publicProps.Utils.$all = function (queryString) {
    return document.querySelectorAll(queryString.toString());
  };



  /**
   * @public
   * @function setLifeSpan
   * @param    {Number} lifeSpan
   * @desc     Set the life span property on the private object.
   */
  publicProps.Utils.setLifeSpan = function (lifeSpan) {
    try {
      lifeSpan = parseInt(lifeSpan.toString());
    } catch (Exception) {
      publicProps.log("\n\nError! Utils, parseInt, lifeSpan.toString");
      publicProps.log(Exception);
    }

    if (!isNaN(lifeSpan)
      && lifeSpan >= privateProps.minLifeSpan
      && lifeSpan <= privateProps.maxLifeSpan) {
      privateProps.lifeSpan = lifeSpan;
    }
  };



  /**
   * @public
   * @namespace Store
   * @desc      This is used to encapsulate local storage interactions.
   */
  publicProps.Store = {};



  /**
   * @public
   * @function get
   * @param    {String} key
   * @return   {*}
   * @desc     Implement a more simplistic approach to local storage, get item.
   */
  publicProps.Store.get = function (key) {
    var data = null;

    try {
      data = JSON.parse(privateProps.db.getItem(key.toString()));
    } catch (Exception) {
      try {
        data = privateProps.db.getItem(key.toString());
      } catch (NoLocalStorageException) {
        publicProps.log("\n\nError! Store, getItem, key.toString");
        publicProps.log(NoLocalStorageException);
      }
    }

    privateProps.db = localStorage;
    return data;
  };



  /**
   * @public
   * @function set
   * @param    {String} key
   * @param    {*}      value
   * @desc     Implement a more simplistic approach to local storage, set item.
   */
  publicProps.Store.set = function (key, value) {
    var data = value || null;

    try {
      data = JSON.stringify(data);
    } catch (Exception) {
      publicProps.log("\n\nError! Store, JSON.stringify, data");
      publicProps.log(Exception);
    }

    try {
      privateProps.db.setItem(key.toString(), data);
    } catch (NoLocalStorageException) {
      publicProps.log("\n\nError! Store, setItem, data");
      publicProps.log(NoLocalStorageException);
    }

    privateProps.db = localStorage;
  };



  /**
   * @public
   * @namespace Session
   * @desc      Use to implement & encapsulate interactions with session storage.
   */
  publicProps.Session = {};



  /**
   * @public
   * @function get
   * @param    {String} key
   * @return   {*}
   * @desc     Implement a more simplistic approach to session storage, get item.
   */
  publicProps.Session.get = function (key) {
    privateProps.db = sessionStorage;
    return publicProps.Store.get(key);
  };



  /**
   * @public
   * @function set
   * @param    {String} key
   * @param    {*}      value
   * @desc     Implement a more simplistic approach to session storage, set item.
   */
  publicProps.Session.set = function (key, value) {
    privateProps.db = sessionStorage;
    publicProps.Store.set(key, value);
  };



  /**
   * @public
   * @namespace Component
   * @desc      This namespace is used to simply encapsulate any form of component related
   *            functionality.
   */
  publicProps.Component = {}; // Todo - A lot of work.


  /**
   * @private
   * @class   Component
   * @desc    This class encapsulates all that's needed for the component(s) within an
   *          application, in this class, it's safe to use the keyword this, as will make use of
   *          the keyword new when calling this constructor.
   */
  privateProps.Component = function (props) {
    var self = this; // public
    var me = {}; // private
    var clone;
    var lifecycle;
    var args = props || {};



    // This is the core  template engine.
    me.render = publicProps.TemplateEngine;



    // Set up all of the component's properties.
    me.name = args.name; // String
    me.root = args.root; // Element
    me.template = args.template; // String
    me.onStateChange = args.onStateChange; // Function
    me.onRender = args.onRender; // Function
    me.lifeSpan = args.lifeSpan || privateProps.lifeSpan; // Int
    me.monitor = args.monitor || false; // Boolean
    me.state = args.state; // Object
    me.sync = args.sync || true; // Boolean
    me.persistance = args.persistance || false; // Boolean
    clone = JSON.parse(JSON.stringify(me.state));

    if (me.persistance === true) {
      var cached = publicProps.Store.get(me.name);
      me.state = cached;
      clone = JSON.parse(JSON.stringify(me.state));
    }


    // Now to start the lifecycle.
    self.startLifeCycle = function () {
      if (lifecycle != null) {
        self.endLifeCycle();
      }

      lifecycle = setInterval(function () {
        var stateString = JSON.stringify(me.state);
        var cloneString = JSON.stringify(clone);

        if (stateString !== cloneString) {
          if (typeof me.onStateChange === "function") {
            me.onStateChange();
          }

          if (me.persistance === true) {
            publicProps.Store.set(me.name, me.state);
          }

          if (me.sync === true) {
            me.root.innerHTML = me.render(me.template, me.state);

            if (typeof me.onRender === "function") {
              me.onRender(me.root);
            }
          }

          clone = JSON.parse(JSON.stringify(me.state));
        }
      }, me.lifeSpan);
    };



    // Now to end the life cycle.
    self.endLifeCycle = function () {
      if (lifecycle != null) {
        try {
          clearInterval(lifecycle);
        } catch (Exception) {
          publicProps.log("\n\nError! Component, clearInterval, lifecycle");
          publicProps.log(Exception);
        }
      }
    };




    // Run the rendering.
    if (me.sync === true) {
      me.root.innerHTML = me.render(me.template, me.state);
    }



    // Now to run the life cycle, at least once.
    self.startLifeCycle();
  };



  /**
   * @public
   * @function registerComponent
   * @param    {Object} props
   * @return   {*}
   * @desc     A simple mechanism used to register some component into the system, this method will
   *           carry out some basic validation, there's little/no point in registering a component
   *           if it's lacking any of the 'minimal requirements', these include:
   *
   *           - Name
   *           - Template
   *           - State
   *           - Root
   */
  publicProps.Component.registerComponent = function (props) {
    var args = {};
    var component;



    // Already invalid...
    if (props == null || typeof props !== "object") {
      return publicProps.log('Invalid properties for a component.');
    }



    // Force a minimal expectation.
    if (props.name == null || props.root == null || props.template == null || props.state == null) {
      return publicProps.log('Invalid properties for a component.');
    }



    // Check the types.
    if (typeof props.name !== 'string') {
      return publicProps.log('Invalid properties for a component.');
    } else if (!props.root instanceof Element) {
      return publicProps.log('Invalid properties for a component.');
    } else if (typeof props.template !== 'string') {
      return publicProps.log('Invalid properties for a component.');
    } else if (typeof props.state !== 'object') {
      return publicProps.log('Invalid properties for a component.');
    }


    // Now that it's safe to use the above properties, copy them over.
    args.name = props.name;
    args.root = props.root;
    args.template = props.template;
    args.state = props.state;



    // Keep the state separate for whatever reason.
    if (props.dereference != null && typeof props.dereference === "boolean") {
      if (props.dereference) {
        try {
          args.state = JSON.parse(JSON.stringify(props.state));
        } catch (Exception) {
          try {
            publicProps.log(Exception);
            publicProps.log("\n\nError! Component, JSON.parse/stringify, props.state");
            args.state = props.state.toString();
          } catch (Error) {
            publicProps.log("\n\nError! Component, JSON.parse/stringify, props.state.toString");
            publicProps.log(Error);
          }
        }
      }
    }



    // Check optional(s)
    if (props.onStateChange != null && typeof props.onStateChange === "function") {
      args.onStateChange = props.onStateChange;
    } if (props.onRender != null && typeof props.onRender === "function") {
      args.onRender = props.onRender;
    } if (props.lifeSpan != null
      && !isNaN(props.lifeSpan)
      && props.lifeSpan >= privateProps.minLifeSpan
      && props.lifeSpan <= privateProps.maxLifeSpan) {
      args.lifeSpan = props.lifeSpan;
    } if (props.monitor != null && typeof props.monitor === "boolean") {
      args.monitor = props.monitor;
    } if (props.sync != null && typeof props.sync === "boolean") {
      args.sync = props.sync;
    } if (props.presistance != null && typeof props.persistance === "boolean") {
      args.persistance = props.persistance;
    }



    // Create & register the new component.
    component = new privateProps.Component(args);
    privateProps.components[args.name] = component;
  };



  /**
   * @public
   * @function getComponentList
   * @return   {Object}
   * @desc     Get all of the current components.
   */
  publicProps.Component.getComponentList = function () {
    return privateProps.components;
  };



  /**
   * @public
   * @function getComponent
   * @param    {String} name
   * @return   {Object}
   * @desc     Get a specific component from the list of components.
   */
  publicProps.Component.getComponent = function (name) {
    var component = null;

    try {
      component = privateProps.components[name.toString()];
    } catch (Exception) {
      publicProps.log("\n\nError! Component, name.toString");
      publicProps.log(Exception);
    }

    return component;
  };



  /**
   * @public
   * @function Service
   * @param    {Object} props
   * @desc     This is a very minimal and simplistic implementation of ajax.
   */
  publicProps.Service = function (props) {
    var args = props || {};
    var password = args.password || '';
    var username = args.username || '';
    var xhr = new XMLHttpRequest();




    // Check the essentials.
    if (args.url == null
      || args.method == null
      || typeof args.url !== 'string'
      || typeof args.method !== 'string') {
      return publicProps.log('Invalid arguments for an AJAX call to occur.');
    }



    // Open the connection.
    xhr.open(args.method, args.url, true, username, password);
    xhr.setRequestHeader("X-Content-Type-Options", "nosniff");



    // Now set other headers.
    if (args.headers != null && typeof args.headers instanceof Array) {
      for (var i = 0, s = args.headers; i < s; i ++) {
        var header = args.headers[i];
        var key = header.key || header.name || '';
        var value = header.value || '';
        xhr.setRequestHeader(key, value);
      }
    }



    // Assume the back end accepts JSON.
    if (args.data != null && args.contentType == null) {
      try {
        args.data = JSON.stringify(args.data);
      } catch (Exception) {
        publicProps.log("\n\nError! Service, JSON.parse, args.data");
        publicProps.log(Exception);
      }
    } else if (args.contentType != null && typeof args.contentType === "string") {
      xhr.setRequestHeader("Content-Type", args.contentType);
    }



    // Now to add event handlers.
    if (args.fail != null && typeof args.fail === "function") {
      xhr.addEventListener('fail', function () { args.fail(xhr); });

      if (args.abort == null || typeof args.abort !== "function") {
        xhr.addEventListener('abort', function () { args.fail(xhr); });
      }
    } if (args.abort != null && typeof args.abort === "function") {
      xhr.addEventListener('abort', function () { args.abort(xhr); });
    } if (args.success != null && typeof args.success === "function") {
      xhr.addEventListener('load', function () {
        var data = xhr.response;

        try {
          data = JSON.parse(data);
        } catch (Exception) {
          publicProps.log("\n\nError! Service, JSON.parse, data");
          publicProps.log(Exception);
        }

        args.success(data);
      });
    }



    // Now to send the data, seeing as everything is ready.
    xhr.send(args.data);
  };



  /**
   * @public
   * @namespace Query
   * @desc      This is a lightweight implementation of OQS.
   */
  publicProps.Query = {}; // Todo - A lot of work.



  /**
   * @public
   * @function setTable
   * @param    {Array} table
   * @desc     Sets the table object on the query object/namespace.
   */
  publicProps.Query.setTable = function (table) {
    if (table instanceof Array) {
      privateProps.Query.table = table;
    }
  };



  /**
   * @public
   * @function setColumns
   * @param    {Array} columns
   * @desc     A simplistic way in which the query object can reference when a
   *           column name occurs within the query string, rather than guessing.
   */
  publicProps.Query.setColumns = function (columns) {
    if (columns instanceof Array) {
      privateProps.Query.cols = columns;
    }
  };



  /**
   * @public
   * @function getTable
   * @return   {Array}
   * @desc     Get the set table.
   */
  publicProps.Query.getTable = function () {
    return privateProps.Query.table;
  };



  /**
   * @public
   * @function getResults
   * @return   {Array}
   * @desc     Get the query results.
   */
  publicProps.Query.getResults = function () {
    return privateProps.Query.results;
  };



  /**
   * @public
   * @function onComplete
   * @param    {Function} callback
   * @desc     Set the function to run when complete.
   */
  publicProps.Query.onComplete = function (callback) {
    if (typeof callback === "function") {
      privateProps.Query.onComplete = callback;
    }
  };



  /**
   * @public
   * @function onCoolDown
   * @param    {Function} callback
   * @desc     Set the function to run when the query is on pause.
   */
  publicProps.Query.onCoolDown = function (callback) {
    if (typeof callback === "function") {
      privateProps.Query.onCoolDown = callback;
    }
  };



  /**
   * @public
   * @function limit
   * @param    {Number} limit
   * @desc     Set the max number of records to return within the results.
   */
  publicProps.Query.limit = function (limit) {
    var int = limit;

    try {
      int = parseInt(limit.toString());
    } catch (Exception) {
      publicProps.log("\n\nError! Query, parseInt, limit.toString");
      publicProps.log(Exception);
    }

    if (!isNaN(int) && int < privateProps.table.length && int > 0) {
      privateProps.Query.limit = limit;
    }
  };



  /**
   * @public
   * @function offset
   * @param    {Number} offset
   * @desc
   */
  publicProps.Query.offset = function (offset) {
    var max = privateProps.table.length - 1;

    try {
      offset = parseInt(offset.toString());
    } catch (Exception) {
      // todo
    }

    if (!isNaN(offset) && offset < max && offset > 0) {
      privateProps.Query.offset = offset;
    }
  };



  /**
   * @public
   * @function select
   * @param    {String} query
   * @desc     Set the query string.
   */
  publicProps.Query.select = function (query) {
    if (typeof query === "string") {
      var logic = query;
      var cols = privateProps.Query.cols;
      var syntaxes = [
        {txt: "AND", symbol: "&&"},
        {txt: "OR", symbol: "||"},
        {txt: "NOT", symbol: "!"},
        {txt: "EQ", symbol: "=="},
        {txt: "NEQ", symbol: "!="},
        {txt: "LT", symbol: "<"},
        {txt: "LTE", symbol: "<="},
        {txt: "GT", symbol: ">"},
        {txt: "GTE", symbol: ">="}
      ];



      // Replace the syntax sugar.
      for (var i = 0, s = syntaxes.length; i < s; i ++) {
        var syntax = syntaxes[i];
        var reg = new RegExp("\\b" + syntax.txt + "\\b", "g");
        var re = " " + syntax.symbol + " ";
        logic = logic.replace(reg, re);
      }



      // Replace the columns.
      for (var i = 0, s = cols.length; i < s; i ++) {
        var col = cols[i];
        var reg = new RegExp("\\b" + col + "\\b", "g");
        var re = 'record["' + col + '"]';
        logic = logic.replace(reg, re);
      }



      privateProps.Query.queryString = logic;
    }
  };



  /**
   * @public
   * @function exe
   * @desc     This method will simply
   */
  publicProps.Query.exe = function () {
    var records = privateProps.Query.table;
    var results = privateProps.Query.results;
    var onComplete = privateProps.Query.onComplete;
    var onCoolDown = privateProps.Query.onCoolDown;
    var limiter = privateProps.Query.limiter;
    var end = privateProps.Query.limit;
    var offset = privateProps.Query.offset;
    var whereClause = privateProps.Query.queryString;



    // Make sure it's at least 1.
    if (end <= 0) {
      end = privateProps.Query.limit = privateProps.Query.table.length;
    }



    // Simply return whether or not the limit has been reached.
    var isComplete = function () {
      return results.length >= (end - 1) || offset >= (end - 1);
    };



    // Encapsulated within a private function.
    var execution = function () {
      for (var i = offset; i < limiter; i ++) {
        var record = records[i];

        if (isComplete()) {
          return onComplete(results);
        }

        if (eval(whereClause)) {
          results.push(record);
        }

        // Sync the offset.
        offset = i;
      }

      onCoolDown(results);
      setTimeout(execution, privateProps.lifeSpan);
    };



    // The initial run
    execution();
  };



  /**
   * @public
   * @namespace DOM
   * @desc      A simple namespace for DOM feature(s).
   */
  publicProps.DOM = {};



  /**
   * @public
   * @function ready
   * @desc     This simply implements a similar method to jQuery's .ready method, only
   *           this code will run even if the ready state has already been fired, it will
   *           simply run code once the DOM is in a ready state.
   */
  publicProps.DOM.ready = function (callback) {
    var isDOMReady = function () {
      var state = document.readyState.toString();
      return (state === "complete" || state === "loaded" || state === "interactive");
    };

    var toRun = function () {
      if (typeof callback === "function") {
        return callback();
      }
    };

    if (!isDOMReady()) {
      document.addEventListener('DOMContentLoaded', toRun);
    } else {
      callback();
    }
  };



  // Just return the public properties.
  return publicProps;
}();
