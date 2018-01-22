/**
 * @name      GlobalFunctions.js
 * @author    Joseph Evans <joe-evs196@hotmail.co.uk>
 * @version   0.0.1
 * @license   MIT-license
 * @copyright Joseph Evans 2018
 * @file      the purpose of this file is to allow for a bunch of useful, but small
 *            functions so this way you can use your won libs/tools/frameworks in addition
 *            to this script, the design is highly deliberate, one could argue that 
 *            it could all be wrapped into one large object, however, I think it's 
 *            possibly a better idea to do it like this, just to save dev time, i.e.
 *            I personally find it annoying using jQuery, to use something exclusive to 
 *            jQuery, you have to do $(something) or jQuery(something), so I say just 
 *            assign highyl generic functions to the global name space, BUT with that said
 *            some bugs or errors COULD occur if function/variable names clash at all
 */


/**
 * @global
 * @function
 * @name        log
 * @param       {*} args this is the data that you want to log
 * @description the purpose of this function is to save typing console.log, 
 *              with this function it is as simple as going log(something); 
 */
window.log = function (args) {
    try {
        console.log(args);
    } catch (e) {
        alert(args);
    }
};


/**
 * @global 
 * @function 
 * @name        addEventHandler
 * @param       {Object}   obj       this is the object you're trying 
 *                                   to target
 * @param       {String}   eventType this is the event which you wish to 
 *                                   fire the callback function on 
 * @param       {Function} callback  this is the function you wish to run 
 *                                   once a certain event has occured
 * @description the prupose of this function is to add an event 
 *              handler to some object, whether it's the document 
 *              or just some dom object
 */
window.addEventHandler = function (obj, eventType, callback) {
    if (!isDefined(obj)) { return; }
    if (obj.addEventListener) {
        obj.addEventListener(eventType, callback, false);
    } else if (obj.attachEvent) {
        obj.attachEvent('on' + eventType, callback);
    } else {
        obj["on"+eventType] = callback;
    }
};


/**
 * @global
 * @function
 * @name        removeEventHandler
 * @param       {Object}   obj       this is the object that you wish to 
 *                                   remove the given event from 
 * @param       {String}   eventType this is the event that you want to 
 *                                   stop listening for
 * @param       {Function} callback  this is the function that you wish 
 *                                   to stop running 
 * @description the purpose of this function is to remove an event 
 *              handler, this should in theory help clear up some
 *              memory 
 */
window.removeEventHandler = function (obj, eventType, callback) {
    if (!isDefined(obj)) { return; }
    if (obj.removeEventListener) { 
		obj.removeEventListener(eventType, callback, false); 
	} else { obj[eventType + callback] = null; }
};


/**
 * @global
 * @function
 * @name        ready
 * @param       {Function} callback this is the function you wish to run 
 *                                  once the dom is ready
 * @description the purpose of this function is to run some js once the 
 *              dom has been loaded
 */
window.ready = function (callback) {
    try {
      setTimeout(addEventHandler(document, "DOMContentLoaded", callback), 20);
    } catch (e) {
        addEventHandler(document, "DOMContentLoaded", callback);
        log(e.message);
    }
};


/**
 * @global
 * @function
 * @name        isDefined
 * @param       {*}      obj this is the variable that you want to check 
 *                          if it's defiend or not
 * @return      {Boolean}
 * @description the purpose of this function is to see whether or not 
 *              a given variable is defined or not
 */
window.isDefined = function (obj) {
    if (obj != null && typeof obj != 'undefined' && obj != '') { return true; }
    else { return false; }
};

/**
 * @global
 * @function
 * @name        isDOM
 * @param       {*}      obj this is the data that you want to 
 *                           test against
 * @return      {Boolean}
 * @description the purpose of this function is to test if 
 *              the given variable is a html element or not 
 */
window.isDOM = function (obj) {
  // this works for newer browsers
  try { return obj instanceof HTMLElement; }
  
  // this works for older browsers
  catch (e) {
    return (typeof obj==="object") &&
      (obj.nodeType===1) && (typeof obj.style === "object") &&
      (typeof obj.ownerDocument ==="object");
  }
};


/**
 * @global
 * @function
 * @name        isList
 * @param       {*}      obj this is the variable that you want to check 
 *                           whether it's a list or not
 * @return      {Boolean}
 * @description the purpose of this function is to check if the given 
 *              variable is a list or not
 */
window.isList = function (obj) {
    if (   obj instanceof HTMLCollection
        || obj instanceof Array
        || (isDefined(obj.length) && obj.length > 1)
        && !isDOM(obj)
    ) { return true; }
    else { return false; }
};


/**
 * @global
 * @function
 * @name        isIE
 * @return      {Boolean}
 * @description the purpose of this function is to do a basic test as to whether 
 *              or not the user is using IE or not, because we all know how annyoing 
 *              IE can be
 */
window.isIE = function () {
	try { return navigator.userAgent.match(/Trident/g) 
			|| navigator.userAgent.match(/MSIE/g); 
	} catch (e) { log(e); return false; }
};


/**
 * @global
 * @function
 * @name        byID
 * @param       {String} ID this is the id of the element that you're 
 *                          trying to target
 * @return      {Object}
 * @description the purpose of this function is to save typing the full 
 *              "document.getElementById"
 */
window.byID = function (ID) { return document.getElementById(ID); };


/**
 * @global
 * @function
 * @name        byTag
 * @param       {String}        tag this is the tag that you're lookign for 
 * @return      {HTMLCollection}
 * @description the purpose of this function is to save typing the full 
 *              "document.getElementByTagName"
 */
window.byTag = function(tag) { return document.getElementsByTagName(tag); };


/**
 * @global
 * @function
 * @name        byClass
 * @param       {String}       className this is the class that you're
 *                                       searching for
 * @return      {HTMLCollection}
 * @description the purpose of this function is to get all elements in the dom 
 *              that have the given class name
 */
window.byClass = function (className) { 
    return document.getElementsByClassName(className); 
};


/** 
 * @global
 * @function
 * @name        getType
 * @param       {*}     obj this is the variable that you want to get the data 
 *                          type of
 * @return      {String}
 * @description the purpose of this function is to discover what data type 
 *              the given variable is
 */
window.getType = function (obj) { return typeof obj; };


/** 
 * @global
 * @function
 * @name
 * @param       {*}      obj  this is the variable that you're 
 *                            testing
 * @param       {String} type this is the type that you're testing the 
 *                            given variable against
 * @return      {Boolean}
 * @description the purpose of this function is to discover 
 *              if the given variable maches the given type
 */
window.isType = function (obj, type) { 
    if (typeof obj === type) { return true; } else { return false; }
};


/** 
 * @global
 * @function
 * @name        trim
 * @return      {String}
 * @description the purpose of this function is to provide a trim function 
 */
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}


/** 
 * @global
 * @function
 * @name        contains
 * @param       {*}       item this is the item that you're 
 *                             searching for
 * @return      {Boolean} 
 * @description the prupose of this function is to test if 
 *              the given array contains teh given item
 */
Array.prototype.contains = function (item) {
    if (this.indexOf(item) > -1) { return true; } else { return false; } 
};


/**
 * @global
 * @function
 * @name        remove
 * @param       {*}    item this is the item that you want to 
 *                          remove
 * @return      {Array}
 * @description the purpose of this funciton is to remove 
 *              one element from the array 
 */
Array.prototype.remove = function (item) { 
    if(!this.contains(item)) { return this; }
	return this.splice(this.indexOf(item), 1); 
};


/**
 * @global
 * @function
 * @name         empty
 * @return      {Array}
 * @description the prupose of this function is to empty an array
 */
Array.prototype.empty = function() {
    for (var i = 0, s = this.length; i < s; i++) { this.pop(); }
    return this;
};


/**
 * @global
 * @function
 * @name        removeAll
 * @param       {*}       item this is the item that you want to 
 *                             completely remove from the given array 
 * @return      {Array}
 * @description the purpose of this function is to remove all 
 *              instances of a given element from the given array
 */
Array.prototype.removeAll = function(item) {
    var result = [];    

    for (var i = 0, j = 0, s = this.length; i < s; i++) { 
        if (this[i] != item) { result[j++] = this[i]; }
    }
    
    this.empty();
    for (var i = 0, s = result.length; i < s;) { this.push(result[i++]); }
};


/**
 * @global
 * @function
 * @name        parent
 * @return      {Object}
 * @description the purpose fo this function is to find the given 
 *              html elements parent 
 */
Element.prototype.parent = function () {
    return this.parentNode;
};


/**
 * @global
 * @function
 * @name        children
 * @return      {HTMLCollection}
 * @description the purpose of this function is to find all of the 
 *              children of the given html element
 */
Element.prototype.children = function () {
    return this.childNodes;
};


/**
 * @global
 * @function
 * @name        addClass
 * @param       {String} className this is the class name that you want to
 *                                 give to the current html element 
 * @description the purpose of this function is to add a class 
 *              to the given html element
 */
Element.prototype.addClass = function (className) {
    try { this.classList.add(className); }
    catch (e) { this.className += " " + className; }
};


/**
 * @global
 * @function
 * @name        removeClass
 * @param       {String} className this is the class taht you want to remove
 * @description the purpose of this function is to remove a class
 *              from a given html element
 */
Element.prototype.removeClass = function (className) {
    try { this.classList.remove(className); }
    catch (e) { this.className.replace(className, ""); }
};


/**
 * @global
 * @function
 * @name        hasClass
 * @param       {String} className this is the class that you want to look for
 * @return      {Boolean}
 * @description the purpose of this funciton is to discover if the given 
 *              html element has teh given class
 */
Element.prototype.hasClass = function (className) {
    try { return this.classList.contains(className); }
    catch (e) { return this.className.indexOf(className) > -1; }
};


/**
 * @global
 * @function
 * @name        toggleClass
 * @param       {String} className this is the class that you want to 
 *                                 toggle
 * @description the purpose of this funciton is to simply switch 
 *              the given element class, if it has it, then remove, 
 *              if not, then add it to the given element
 */
Element.prototype.toggleClass = function (className) {
    try { this.classList.toggle(className); }
    catch (e) {
        if (this.hasClass(className)) { this.addClass(className); } 
        else { this.removeClass(className); }
    }
};


/**
 * @global
 * @function
 * @name        byClass
 * @param       {String}        className this is the class that you're
 *                                        searching for
 * @return      {HTMLCollection}
 * @description the purpose of this function is to find all 
 *              elements that can be foudn within the given html 
 *              element
 */
Element.prototype.byClass = function (className) {
    return this.getElementsByClassName(calssName);
};


/**
 * @global
 * @function
 * @name        find
 * @param       {String}         query this is the query string 
 * @return      {HTMLCollection}
 * @description the prupose of this function is to find 
 *              certain html elements that match a query string that 
 *              can be found within the given html element
 */
Element.prototype.find = function (query) {
    return this.querySelectorAll(query);
};
