/**
 * @file 
 * @name        ToolKit.js
 * @author      Joseph Evans <joe-evs196@hotmail.co.uk>
 * @version     0.0.2
 * @license     MIT-License
 * @copyright   Joseph Evans 2018
 * @description the purpose of this file is to allow for 
 *              some pretty useful developer tools, however 
 *              this file does rely on other files that have been 
 *              published in this project, version 0.0.2 has begun now, 
 *              which means that you should see added features and functions 
 *              to the file, keep note that all changes will be noted, 
 *              if you scroll to the bottom of the file, you'll see a few functions 
 *              using the '@since'.
 * @requires    GlobalFunctions.js
 * @todo        add documentation
 * @todo        carry out detailed testing 
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
 *                                   once a certain event has occurred
 * @description the purpose of this function is to add an event 
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
 * @param       {*}       obj this is the variable that you want to check 
 *                        if it's defined or not
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
 * @param       {*}       obj this is the data that you want to 
 *                        test against
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
 * @param       {*}       obj this is the variable that you want to check 
 *                        whether it's a list or not
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
 *              or not the user is using IE or not, because we all know how 
 *              annoying 
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
 *                       trying to target
 * @return      {Object}
 * @description the purpose of this function is to save typing the full 
 *              "document.getElementById"
 */
window.byID = function (ID) { return document.getElementById(ID); };


/**
 * @global
 * @function
 * @name        byTag
 * @param       {String}        tag this is the tag that you're looking for 
 * @return      {HTMLCollection}
 * @description the purpose of this function is to save typing the full 
 *              "document.getElementByTagName"
 */
window.byTag = function(tag) { return document.getElementsByTagName(tag); };


/**
 * @global
 * @function
 * @name        byClass
 * @param       {String}         className this is the class that you're
 *                               searching for
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
 * @param       {*}      obj this is the variable that you want to get the data 
 *                       type of
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
 *              if the given variable matches the given type
 */
window.isType = function (obj, type) { 
	if (typeof type !== "string") { type = type.toString(); }
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
 * @description the purpose of this function is to test if 
 *              the given array contains the given item
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
 * @description the purpose of this function is to remove 
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
 * @description the purpose of this function is to empty an array
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
 * @description the purpose of this function is to find the given 
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
 * @param       {String} className this is the class that you want to remove
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
 * @description the purpose of this function is to discover if the given 
 *              html element has the given class
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
 * @description the purpose of this function is to simply switch 
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
 *              elements that can be found within the given html 
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
 * @description the purpose of this function is to find 
 *              certain html elements that match a query string that 
 *              can be found within the given html element
 */
Element.prototype.find = function (query) {
    return this.querySelectorAll(query);
};


/**
 * @global
 * @function
 * @name 
 * @return
 * @description the purpose of this function is to get the version of IE 
 * @since       0.0.2
 */
window.getIEVersion = function () {
	if (!isIE()) { return undefined; }
	var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
	return match ? parseInt(match[1]) : undefined;
};


/**
 * @global
 * @function
 * @name        getBrowser
 * @return      {}
 * @description the purpose of this function is to get the browser that the
 *              current user is utilizing 
 * @since       0.0.2
 */
window.getBrowser = function () {
	var ua = navigator.userAgent; 
	var tem; 
	var regEx = new RegExp("/(opera|chrome|safari|firefox|msie|" 
	+ "trident(?=\/))\/?\s*(\d+)/i");
	var M = ua.match(regEx) || [];
	
	if (/trident/i.test(M[1])) {
		tem = /\brv[ :]+(\d+)/g.exec(ua) || []; 
		return 'IE';
	
	} else if (M[1] === 'Chrome') {
		tem = ua.match(/\bOPR\/(\d+)/); 
		if (tem != null) { return 'Opera'; }
	}
	
	M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
	if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
	return M[0];
};


/**
 * @global
 * @function
 * @name        getOS
 * @return      {Object}
 * @description the purpose of this function is to get the OS of the current 
 *              device
 * @since       0.0.2
 */
 window.getOS = function (testAgent) {
	var userAgent;
	var windowsReg = new RegExp("/win64|win32|win16|win95|win98|windows 2000|" 
	+ "windows xp|msie|windows nt 6.3; trident|windows nt|windows/i");

	if (!testAgent){
		userAgent = navigator.userAgent || navigator.vendor || window.opera;
	} else { userAgent = testAgent; }
	userAgent = userAgent.toLowerCase();
	
	if (/windows phone/i.test(userAgent)) {
		return { os:"windows phone", userAgent:userAgent };
	
	} else if (/samsungbrowser/i.test(userAgent)) {
		return { os:"android", userAgent:userAgent };
		
	} else if (/android/i.test(userAgent)) {
		return { os:"android", userAgent:userAgent };
	
	} else if (/ipad|iphone|ipod/i.test(userAgent)) {
		return { os:"ios", userAgent:userAgent };
	
	} else if (windowsReg.test(userAgent)) {
		return { os:"windows", userAgent:userAgent };
	
	} else if (/os x/i.test(userAgent)) {
		return { os:"osx", userAgent:userAgent };
	
	} else if (/macintosh|osx/i.test(userAgent)) {
		return { os:"osx", userAgent:userAgent };
	
	} else if (/openbsd/i.test(userAgent)) {
		return { os:"open bsd", userAgent:userAgent };
	
	} else if (/sunos/i.test(userAgent)) {
		return { os:"sunos", userAgent:userAgent };
	
	} else if (/crkey/i.test(userAgent)) {
		return { os:"chromecast", userAgent:userAgent };
	
	} else if (/appletv/i.test(userAgent)) {
		return { os:"apple tv", userAgent:userAgent };
	
	} else if (/wiiu/i.test(userAgent)) {
		return { os:"nintendo wiiu", userAgent:userAgent };
	
	} else if (/nintendo 3ds/i.test(userAgent)) {
		return { os:"nintendo 3ds", userAgent:userAgent };
		
	} else if (/playstation/i.test(userAgent)) {
		return { os:"playstation", userAgent:userAgent };
		
	} else if (/kindle/i.test(userAgent)) {
		return { os:"amazon kindle", userAgent:userAgent };
	
	} else if (/ cros /i.test(userAgent)) {
		return { os:"chrome os", userAgent:userAgent };
	
	} else if (/ubuntu/i.test(userAgent)) {
		return { os:"ubuntu", userAgent:userAgent};
	
	} else if (/googlebot/i.test(userAgent)) {
		return { os:"google bot", userAgent:userAgent };
	
	} else if (/bingbot/i.test(userAgent)) {
		return { os:"bing bot", userAgent:userAgent };
	
	} else if (/yahoo! slurp/i.test(userAgent)) {
		return { os:"yahoo bot", userAgent:userAgent };
	
	} else { return { os: false, userAgent:userAgent }; }
};


/**
 * @public 
 * @function 
 * @name        getDeviceDetails
 * @return      {Object}
 * @description the purpose of this function is to get all of the 
 *              details about the user's device
 */
window.getDeviceDetails = function () {
	try { return navigator; } 
	catch (e) { return log(e); }
};


/**
 * @global
 * @function
 * @name        validEmail
 * @return      {Boolean}
 * @description the purpose of this function is to get the OS of the current 
 *              device
 * @since       0.0.2
 */
window.validEmail = function (email) {
	var re = new RegExp('/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*' 
	+ ')|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(' 
	+ '([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');
	return re.test(email);
};


/**
 * @global
 * @function
 * @name        getDateTime
 * @return      {Object}
 * @description the purpose of this function is to get the OS of the current 
 *              device
 * @since       0.0.2
 */
window.getDateTime = function () {
	var date = new Date();
	var months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];
	
	var days = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday"
	];
	
	var dateTimeObject= {
		day: date.getDate(),
		month: date.getMonth() + 1,
		year: date.getFullYear(),
		
		dayString: days[date.getDate()],
		monthString: months[date.getMonth()]
	};
	
	return dateTimeObject;
};


/**
 * @global
 * @class
 * @constructor
 * @name        ToolKit
 * @classdesc   the purpose of this class is to allow a 
 *              developer to create an object of this class 
 *              then run any of the provided functions that 
 *              they wish to run
 */
function ToolKit () {
    this.urlstring = '';
    this.debugMode = false;
    this.mobile = this.isMobile();
    this.loadedImages = 0;
    this.toatlImages = 0;
}


/**
 * @public 
 * @function 
 * @name        inView
 * @param       {Object} obj the purpose of this parameter is to test
 *                           if it's currently in the users view
 * @return      {Boolean}
 * @description the purpose of this function is to accept some input, then 
 *              test if it's currently in the user's view, even if it's just 
 *              partial, it doesn't have to be dead center
 */
ToolKit.prototype.inView = function (obj) {
    var elm = obj.getBoundingClientRect();
    return elm.top <= window.innerHeight && elm.bottom >= 0;
};


/**
 * @public 
 * @function
 * @name        lazyLoad
 * @description the purpose of this function is to load images 
 *              dynamically, it's believed that features such as 
 *              this helps improve SEO, which makes sense, if someone
 *              is using a mobile device, and they have a poor 
 *              3G connection, then loading all of the data at once 
 *              will dramatically decrease the overall ui performance
 */
ToolKit.prototype.lazyLoad = function () {
    var images = byTag("img");
	this.toatlImages = images.length;
	
    var recurse = function() {
        for (var i = 0, s = images.length; i < s; i++) {
            var current = images[i];
			var tool = new ToolKit();
	
            // only load an image once it's in view    
            if (current.hasClass("lazy") && tool.inView(current)) {
                var src = current.getAttribute("data-src");
                current.src = src;
				current.onload = function () {
					this.loadedImages ++;
				};
            }

            // if all images have loaded, remove on scroll
            if (this.loadedImages >= this.toatlImages) {
				console.log("remove event");
                removeEventHandler(document, "scroll", recurse);
			}
        }
    };
	
    addEventHandler(document, "scroll", recurse);
	
	// IE has issues using the above event handler
	// so this is the back up solution, purely for IE
	if(isIE()) {
		ready(recurse);
	}
	
	recurse();
};


/**
 * @public 
 * @function 
 * @name        internal
 * @return      {Boolean}
 * @description the purpose of this function is to load features that
 *              may be undergoing a lot of work, if you have a certain
 *              url string setup, then this tests to see if the current
 *              url contains that string, if not, then the content won't
 *              load 
 */
ToolKit.prototype.internal = function () {
    if (!isDefined(this.urlstring)) { return false; } 
    if (window.location.href.indexOf(this.urlstring) == -1) {
        return false;
    } else { return true; }
};


/**
 * @public
 * @function 
 * @name        isMobile
 * @return      {Boolean}
 * @description the purpose of this function is to test whether or not the
 *              current device is a mobile device or not
 */
ToolKit.prototype.isMobile = function () {
    var check = false;
	var mobstr = new RegExp("/(android|bb\d+|meego).+mobile|avantgo|bada\/|"
	+ "blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|"
	+ "ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|"
	+ "netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|"
	+ "pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|"
	+ "wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)|" 
	+ "|/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|"
	+ "abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|"
	+ "ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)"
	+ "|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|"
	+ "cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|"
	+ "do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|"
	+ "ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|"
	+ "go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)"
	+ "|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|"
	+ "i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|"
	+ "jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|"
	+ "le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|"
	+ "ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|"
	+ "bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|"
	+ "n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|"
	+ "nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|"
	+ "phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|"
	+ "qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|"
	+ "s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|"
	+ "mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|"
	+ "so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|"
	+ "tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|"
	+ "up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|"
	+ "voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|"
	+ "wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i");
    (function(a){
        if(mobstr.test(a.substr(0,4)))
            check = true;
    })(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};


/**
 * @public 
 * @function 
 * @name        unitTest
 * @param       {*}        input    this is the data that
 *                                  you input into the  
 *                                  function
 * @param       {Function} tempFunc this is the function that
 *                                  you would like to test 
 * @param       {*}        expected this is the data you 
 *                                  expect to get back from 
 *                                  the provided function
 * @return      {Object}
 * @description the purpose of this function is to allow for some 
 *              basic unit testing
 */
ToolKit.prototype.unitTest = function (input, tempFunc, expected) {
    if (this.debugMode) { debugger; }
    var results = [];
    
    // if both inputs and results are lists execute this
    if (isList(input) && isList(expected)) {
        for (var i = 0, s = input.length; i < s; i++) {
            var tempdata = { title:"", text:"", result:"", in:"", out:"" };
            
            // i+1 because of index 0
            tempdata.title = "Test " + (i + 1);
            tempdata.in = input[i];
            tempdata.out = expected[i];

            try {
                var trial = tempFunc(input[i]);
                if (trial == expected[i]) {
                    tempdata.text = "Success";
                    tempdata.result = true;
                    results.push(tempdata);
                } 
                
                else {
                    tempdata.text = "Fail";
                    tempdata.result = false;
                    results.push(tempdata);
                }
            }

            // catch in case the function causes an error
            // or the input and expected params are a different 
            // length, etc 
            catch (e) {
                if (this.debugMode) { console.trace(e); }
                tempdata.text = "Error";
                tempdata.result = false;
                tempdata.report = e;
                results.push(tempdata);
            }
        }

        return results;
    } 
    
    else {
        if(isList(input)) { input = input[0]; }
        if (isList(expected)) { expected = expected[0]; }
        var data = {
            title:"Stand Alone Test",
            text:"",
            result:"",
            in:input,
            out:expected
        };

        try {
            var trial = tempFunc(input);
            if (trial == expected) {
                data.text = "Success";
                data.result = true;
                return data;
            } else {
                data.text = "Fail";
                data.result = false;
                return data;
            } 
        } 
        
        catch (e) {
            if (this.debugMode) { console.trace(e); }
            data.text = "Error";
            data.result = false;
            data.report = e;
            return data;
        }
    }
};


/**
 * @public 
 * @function 
 * @name        garbage
 * @return      {Undefined}
 * @todo        implement a more elegant solution for some form 
 *              of js garbage collection
 * @description the purpose of this function is to simply TRY to support the
 *              browser with memory management, as you can't formally do this, 
 *              I feel that this is the next best thing.
 */
ToolKit.prototype.garbage = function () { return undefined; };


/**
 * @public 
 * @function 
 * @name        isNum
 * @param       {Object} obj this van be any input, as the function will just 
 *                           state whether or not the provided input is a 
 *                           number or not  
 * @return      {Boolean}
 * @todo        test & debug
 * @description the purpose of this function is to decide whether or not the 
 *              provided param is a numeric value or not 
 * @since       0.0.2
 */
 ToolKit.prototype.isNum = function (obj) {
	if (!isNaN(obj)) { return true; }
	else { return false; }
 };
 

/**
 * @public 
 * @function 
 * @name        storageSize
 * @return      {Log}
 * @description the purpose of this function is simple, it gets the amount of 
 *              KB that's occupied with local storage
 * @since       0.0.2
 */
 ToolKit.prototype.storageSize = function () {
	var total = 0;
	
	for (var x in localStorage) {
		var len = ((localStorage[x].length + x.length) *2);
		if (this.isNum(len)) { total += len; } else { break; }
		log(x.substr(0, 50) + " = " + (len / 1024).toFixed(2) + " KB");
	}
	
	log("Total = " + (total / 1024).toFixed(2) + " KB");
 };
 
 
 /**
 * @public 
 * @function 
 * @name        clearStorage
 * @description the purpose of this function is simple, it clears the local
 *              storage
 * @since       0.0.2
 */
 ToolKit.prototype.clearStorage = function () { localStorage.clear(); };


/**
 * @public
 * @function 
 * @name        getLocation
 * @param       {Function} callBack this is the function that you wish to run
 *                         once the user has either allowed or denied permission
 *                         to track location information
 * @return      {Function}
 * @description the purpose of this function is simple, it's to get the 
 *              geolocation of the user, on another note it is 
 *              generally implied that you should only get the user's location 
 *              when they've interacted with the page, I would go against using
 *              this function like I have in the given example
 * @since       0.0.2
 */
 ToolKit.prototype.getLocation = function (callBack) {
	if (navigator.geolocation)  {
		var location;
		
		var success = function (position) {
			location = {
				lat: position.coords.latitude,
				lon: position.coords.longitude,
				alt: position.coords.altitude,
				dir: position.coords.heading,
				speed: position.coords.speed
			};
			return callBack(location);
		};
		
		var fail = function () {
			location = {
				lat: undefined,
				lon: undefined,
				alt: undefined,
				dir: undefined,
				speed: undefined
			};
			return callBack(location);
		};
		
		navigator.geolocation.getCurrentPosition(success, fail);
	} else { return log("This browser doesn't support geolocation"); }
};


/**
 * @public 
 * @function 
 * @name        respTables
 * @description the purpose of this function is to simply create responsive 
 *              html tables, I actually came up with this function far before 
 *              i even started writing this library, but it works so well that 
 *              i thought why not use it in this project
 * @since       0.0.2
 */
ToolKit.prototype.respTables = function () {
	var tbls = document.find("table .resp");
	
	for (var i = 0, s = tbls.length; i < s; i++) {
		var tbl = tbls[i];
		var ths = tbl.find('th');
		var tds = tbl.find('td');
		var headings = [];
		
		for (var j = 0, z = ths.length; j < z; j++) { headings.push(ths[j]); }
		for (var j = 0, k = 0, z = tds.length; j < z; j++) {
			var td = tds[j];
			var heading = headings[k++].textContent;
			if (k === headings.length) { k = 0; }
			td.setAttribute("data-heading", heading);
		}
	}
};


/**
 * @public 
 * @function
 * @name        benchmark
 * @param       {Function} callback this is the function that you want to
 *                                  benchmark
 * @param       {String} name       this is the name of the function 
 * @return      {Log}
 * @description the purpose of this function is to get the result of how well 
 *              the given function performs, the natural times units are in 
 *              seconds, however, this may change in later versions
 * @since       0.0.2
 */
ToolKit.prototype.benchmark = function (callBack, name, args) {
	name = name.trim();
	var start = new Date();
	if (!isType(callBack, "function")) {
		return log("It appears the provided function is not a function?");
	}
	
	if (isDefined(args)) {
		callBack(args);
	} else {
		callBack();
	}
	
	
	var end = new Date();
	var time = (end.getTime() - start.getTime()) / 1000;
	if (isDefined(name)) {
		return log("Performance of function " + name + ": " + time + "s");
	} else {
		return log("Performance of the provided function: " + time + "s");
	}
};


/**
 * @public 
 * @function 
 * @name        Queue
 * @param       {Int} len this is the size of the queue
 * @description the purpose of this function is to return a queue data
 *              structure
 * @since       0.0.2
 */
ToolKit.prototype.Queue = function (len) {
	var queue = {
		index: 0,
		size: len,
		data: [], 
		
		/**
		 * @public 
		 * @function 
		 * @name        enqueue
		 * @param       {*} data this is the data you want to add to the queue 
		 * @description this function adds data to the queue
		 */
		enqueue: function (data) {
			if (this.index == this.size) { return; }
			this.data.push(data);
			this.index ++;
		},
		
		
		/**
		 * @public 
		 * @function 
		 * @name        dequeue
		 * @return      {*} 
		 * @description this function removes data from the queue
		 */
		dequeue:function () {
			if (this.index > 0) { this.index --; return this.data.shift(); } 
			else { return null; }
		},
		
		
		/**
		 * @public 
		 * @function 
		 * @name        dequeue
		 * @return      {*} 
		 * @description this function removes data from the queue
		 */
		smartEnqueue: function (data) {
			if (this.index < this.size) { this.enqueue(data); } 
			else if (this.index == this.size) { 
				this.dequeue(); 
				this.enqueue(data); 
			}
		},
		
		
		/**
		 * @public 
		 * @function 
		 * @name        getSize
		 * @return      {Int} 
		 * @description the purpose of this function is to get the size of this 
		 *              queue
		 */
		getSize: function () { return this.index; }
	};
	
	return queue;
};


/**
 * @public 
 * @function 
 * @name        Stack
 * @param       {Int} len this is the size of the stack
 * @description the purpose of this function is to return a stack data
 *              structure
 * @since       0.0.2
 */
ToolKit.prototype.Stack = function (len) {
	var stack = {
		index: 0,
		size: len,
		data: [], 
		
		
		/**
		 * @public 
		 * @function 
		 * @name        push
		 * @param       {*} 
		 * @description the purpose of this function is to add data to the 
		 *              stack
		 */
		push: function (data) {
			if (this.index >= this.size) { return; }
			this.index ++;
			this.data.push(data);			
		},
		
		
		/**
		 * @public 
		 * @function 
		 * @name        pop
		 * @return      {*} 
		 * @description the purpose of this function is to remove data from the 
		 *              stack
		 */
		pop: function () {
			if (this.size <= 0) { return }
			var del = this.data[this.index];
			this.data.pop();
			this.index --;
			return del;		
		},
		
		
		/**
		 * @public 
		 * @function 
		 * @name        smartPush
		 * @param       {*} 
		 * @description the purpose of this function is to add data to the 
		 *              stack and remove data if it's about to overflow
		 */
		smartPush: function (data) {
			if (this.index < this.size) { this.push(data); }
			else if (this.index == this.size) { this.pop(); this.push(data); }
		},
		
		
		/**
		 * @public 
		 * @function 
		 * @name        getSize
		 * @return      {Int} 
		 * @description the purpose of this function is to get the size of this 
		 *              stack
		 */
		getSize: function () { return this.index; }
	};
	
	return stack;
};


/**
 * @public 
 * @function 
 * @name        Tree
 * @description the purpose of this function is to return a tree data
 *              structure
 * @since       0.0.2
 */
ToolKit.prototype.Tree = function () {
	
	/**
	 * @private
	 * @function
	 * @name        Node
	 * @description the purpose of this function is to return a simple node 
	 *              object for the tree data structure
	 */
	function Node (val) {
		this.value = val;
		this.left = null;
		this.right = null;
	}
		
	/**
	 * @public 
	 * @property 
	 * @name        tree
	 * @description the purpose of this property is to return a tree like
	 *              object, with all of the generic tree functions
	 *              encapsulated within this tree object 
	 * @todo        add objects to the tree rather than just ints, 
	 *              it could be sorted by keys (ints/ids) and then 
	 *              attach data to the given key 
	 */
	var tree = {
		root: null,
		
		/**
		 * @public 
		 * @function
		 * @name        isEmpty 
		 * @return      {Boolean}
		 * @description the purpose of this function is to state whether this 
		 *              tree is empty or not
		 */
		isEmpty: function () { return this.root === null; },
		
		/**
		 * @public 
		 * @function 
		 * @name        push 
		 * @param       {Int} this is the data that you want to add to the 
		 *                    tree
		 * @description the purpose of this function is to add data to this 
		 *              tree data structure
		 */
		push: function (value) {
			if (this.isEmpty()) {
				this.root = new Node(value);
				return;
			}
			
			var current = this.root;
			var added = false;
			
			while (!added) {
				if (value < current.value) {
					if (current.left == null) {
						current.left = new Node(value);
						added = true;
					} else { current = current.left; }   
				} else {
					if (current.right == null) {
						current.right = new Node(value);
						added = true;
					} else { current = current.right; }
				}
			}
		},
		
		/**
		 * @public 
		 * @function
		 * @name    
		 * @param       {Node} node    this is the node that you want to start
		 *                             from 
		 * @param       {String} order this is the order that you want to run
		 *                             the algorithm in 
		 * @return      {Array}
		 * @description the purpose is to carryout a bfs algorithm on the 
		 *               tree 
		 */
		bfs: function (node, order) {
			if (this.isEmpty()) { return; }
			var queue = [node];
			var results = [];
			
			var fnc = function () {
				while (queue.length > 0) {
					var current = queue.shift();
					if (current.left) { results.push(current.left); }
					if (current.right) { results.push(current.right); }
				}
			};
			
			if (isDefined(order)) {
				if (order.toUpperCase() == "RTL")  {
					fnc = function () {
						while (queue.length > 0) {
							var current = queue.shift();
							if (current.right) { results.push(current.right); }
							if (current.left) { results.push(current.left); }
						}
					};
				}
			}

			fnc();
			return results;
		},
		
		/**
		 * @public 
		 * @function
		 * @param       {Node}   node  this is the node that you want to start
		 *                             from
		 * @param       {String} order this is the order that you want the 
		 *                             dfs algorithm to run in 
		 * @return      {Array}
		 * @description the purpose of this function is to carryout a dfs 
		 *              algorithm on the tree data structure
		 */
		dfs: function (node, order) {
			if (this.isEmpty()) { return; }
			var results = [];
			
			var recurse = function (node) {
				results.push(node.value);
				node.left && recurse(node.left);
				node.right && recurse(node.right);
			};
			
			if (isDefined(order)) {
				if (order.toUpperCase() == 'IN') {
					var recurse = function () {
						node.left && recurse(node.left);
						results.push(node.value);
						node.right && recurse(node.right);
					};
				} else if (order.toUpperCase() == 'POST') {
					var recurse = function () {
						node.left && recurse(node.left);
						node.right && recurse(node.right);
						results.push(node.value);
					};
				}
			}

			recurse(node);
			return results;
		},
		
		/**
		 * @public 
		 * @function 
		 * @name        balance 
		 * @return      {Tree}
		 * @description the purpose of this algorithm is to sort the data
		 *              data structure so that the tree becomes a balanced tree 
		 * @todo        debug and make sure this function is bullet proof
		 */
		balance: function () {
			    var searched = this.dfs(this.root);
			var refine = [];
			searched.sort(function(a, b) { return a - b; });

			for (var i = 0, j = 0, s = searched.length; i < s; i++) {
				if (refine.indexOf(searched[i]) == -1) { refine.push(searched[i]); }
			}

			var bottom = Math.floor((refine.length - 1) / 2);
			var top = Math.ceil((refine.length + 1) / 2);
			var diff = top - bottom;
			var mid = 0;
			
			for (var i = bottom; i < top; i++) { mid += refine[i]; }
			mid = Math.ceil(mid / diff);
			var node = new Node(mid);
			this.root = node;
			
			for (var i = 0, s = refine.length; i < s; i++) {
				this.push(refine[i]);
			}

			log(this);
		}
	};
	
	return tree;
};


/**
 * @public 
 * @function 
 * @name 
 * @return
 * @description
 * @todo implement a graph data structure
 */
ToolKit.prototype.Graph = function () {
	
};


/**
 * @public 
 * @function 
 * @name        WishList
 * @description the purpose of this function is to return a wishlist
 *              implementation
 * @since       0.0.2
 */
ToolKit.prototype.WishList = function(len, name, structure) {
	var parent = new ToolKit();
	var data;
	
	if (isDefined(this.rawData)) {
		data = JSON.parse("[" + this.rawData + "]");
	} else { data = []; }
	
	/**
	 * @public 
	 * @property
	 * @name        list 
	 * @description the purpose of this object is to encapsulate the wishlist 
	 *              object, and all of the associated functions too 
	 */
	var list = {
		size: len, 
		name: name, 
		isStack: true,
		rawData: localStorage.getItem(this.name),
		data: data,
		
		/**
		 * @public 
		 * @function 
		 * @name 
		 * @param       {Int} index this is the index that you'd like to 
		 *                    remove from the given list 
		 * @description the purpose of this function is to simply remove one
		 *              piece of data from this list 
		 */
		deleteAtIndex: function (index) {
			var copy = this.struct.data;
			var result = [];
			this.struct.data = [];
			this.struct.index = 0;
	
			for (var i = 0, j = 0, s = copy.length; i < s; i++) {
				if (i != index) { result[j++] = copy[i]; }
			}
	
			for (var i = 0, s = result.length; i < s; i++) {
				this.addData(result[i]);
			}
		},
		
		/**
		 * @public
		 * @name        contains
		 * @param       {Object} data this is the data that you want to check 
		 *                            against
		 * @description the purpose of this function is to see if this list 
		 *              already contains the provided piece of data, the object 
		 *              should be specified with a specific structure, the  
		 *              first element of the provided object should be treated 
		 *              like an ID 
		 */
		contains: function (data) {
			var find;
			if (isType(data, "object")) {
				for (var i in data) { find = data[i]; break; }
			} 
			else if (Array.isArray(data)) { find = data[0]; } 
			else { find = data; }
			
			for (var i = 0, s = this.struct.data.length; i < s; i++) {
				var index = this.struct.data[i];
				var current;

				if (typeof index == "object"){
					for (var j in index) { current = index[j]; break; } 
				} else if (Array.isArray(index)) {
					current = index[0];
				} else {
					current = index;
				}

				if (current === find) { return true; }
			}
			
			return false;
		},
		
		/**
		 * @public 
		 * @function
		 * @name        addData
		 * @param       {Object} data this is the piece of data that you want 
		 *                       to store in this list 
		 * @description the purpose of this function is to add data to this 
		 *              list
		 */
		addData: function (data) {
			if (this.isStack) { this.struct.push(data); } 
			else { this.struct.smartEnqueue(data); }
			array = this.struct.data;
			var values = JSON.stringify(array);
			values = values.replace("[", "");
			values = values.replace("]", "");
			localStorage.setItem(this.name, values);
			this.data = JSON.parse("[" + localStorage.getItem(this.name) + "]");
		},
		
		/**
		 * @public 
		 * @function
		 * @name        remove 
		 * @description the purpose of this function is to remove this list 
		 *              from the local storage object 
		 */
		remove: function () {
			localStorage.removeItem(this.name);
		},
		
		/**
		 * @public 
		 * @function
		 * @name        getData
		 * @return      {Array}
		 * @description the purpose of this function is to get the data that's 
		 *              stored within this list 
		 */
		getData: function () {
			this.data = JSON.parse("[" + localStorage.getItem(this.name) + "]");
			return this.data; 
		},
		
		/**
		 * @public
		 * @function
		 * @name        getRawData
		 * @return      {String}
		 * @description the purpose of this function is to get the data 
		 *              that this list holds purely from the local storage
		 */
		getRawData: function () {
			this.rawData = localStorage.getItem(this.name);
			return this.rawData; 
		},
		
		/**
		 * @public
		 * @function
		 * @name        getSize
		 * @return      {Int}
		 * @description the purpose of this function is to get the number of
		 *              elements that's stored within this list 
		 */
		getSize: function () { return this.data.length; },
	};
	
	// this defines which structure the list should use to implement this
	// feature
	if (list.structure != true) { list.struct = new parent.Stack(list.size); } 
	else { list.struct = new parent.Queue(list.size); list.isStack = false; }
	if (!isDefined(localStorage.getItem(list.name))) {
		localStorage.setItem(list.name, list.data);
	}
	
	return list;
};


/**
 * @public
 * @function 
 * @name        include
 * @param       {String} tag    this is the html tag that you want to include 
 * @param       {String} source this is the source of the external item
 * @description the purpose of this function is to include an external file 
 *              into the DOM, it could be a stylesheet, an image or a script
 * @todo        include the ability to include a wider variety of other 
 *              external sources
 * @since       0.0.2 
 */
ToolKit.prototype.include = function (tag, source) {
	tag = tag.trim().toLowerCase();
	var htmlTag = document.createElement(tag);
	if (tag === "img" || tag === "script") { htmlTag.src = source; } 
	else if (tag === "style") { htmlTag.href = source; }
	return  htmlTag;
};


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////  STILL IN DEVELOPMENT  /////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


/**
 * @public
 * @function
 * @name        cookieMonster
 * @return      {Object}
 * @description the purpose of this function is to allow for some interaction
 *              with js cookies 
 * @todo        implement a feature where you can get/set cookies and s
 *              earch through cookies, etc. 
 */
ToolKit.prototype.cookieMonster = function () {
	
	/**
	 *
	 */
	function Cookie (name, data) {
		this.name = name;
		this.data = data;
	}
	
	/**
	 *
	 */
	var privateObject = {};
	
	/**
	 *
	 */
	var publicObject = {
		
	
	};
	
	return publicObject;
};


/**
 * @public
 * @function    
 * @name        TKHR
 * @return      {Object}
 * @description the purpose of this function is to implement an xhr/ajax 
 *              feature into the toolkit TKHR = ToolKit HTTP Interactions
 * @todo        expand and implement further functions AND  actually get 
 *              the basics working first
 * @since       0.0.2
 */
ToolKit.prototype.TKHI = function () {
	
	/**
	 * @private 
	 * @property 
	 * @name        privateObject
	 * @description this is the private object that encapsulates functions that 
	 *              aren't essential for the user to have access to 
	 */
	var privateObject = {
	
		/**
		 * @private 
		 * @function
		 * @name 
		 * @return 
		 * @description the purpose of this function is to check if the 
		 *              connection was successful or not 
		 */
		success : function () { 
			var test1 = publicObject.tkhr.status === 200;
			var test2 = publicObject.tkhr.readyState  === 4;
			return test1 && test2; 
		}
	};
	
	/**
	 * @public 
	 * @property
	 * @name 
	 * @description the purpose of this object is to encapsulate a bunch of 
	 *              functions that the user should have access to  
	 */
	var publicObject = {
		tkhi: new XMLHttpRequest(),
		
		/**
		 * @public
		 * @function
		 * @name
		 * @param       {String}   url      this is the url that you want 
		 *                                  to get data from  
		 * @param       {Function} callback this is the function that you'd 
		 *                                  like to execute once the xhr 
		 *                                  request has happened 
		 * @description the purpose of this function is to get data from an 
		 *              external source 
		 */
		getData: function (url, callback) {
			
		}, 
		
		/**
		 * @public
		 * @function
		 * @name        sendData
		 * @param       {String}   url      this is the url that you want to 
		 *                                  send the provided data to 
		 * @param       {Object}   data     this is the data that you want to
		 *                                  send
		 * @param       {Function} callback this is the function that you'd 
		 *                                  like to execute when the data has 
		 *                                  successfully sent 
		 * @description the purpose of this function is to send data to an
		 *              external source
		 */
		sendData: function (url, data, callback) {
			
		}
	};
	
	return publicObject;
};


/**
 * @public 
 * @function 
 * @name 
 * @return
 * @description the purpose of this function is to implement some very
 *              basic animation 
 * @todo        implement the ability to include animations on objects 
 * @since       0.0.2
 */
ToolKit.prototype.animation = function () {
	
};


/**
 * @public 
 * @function 
 * @name        GET
 * @description the purpose of this function is to mimic php's $_GET
 * @todo        implement a feature that strips the URL apart, and 
 *              puts it into an array
 * @since       0.0.2
 */
ToolKit.prototype.GET = function () {
	var url = window.location.search;
	var $_GET = [];

	if (url.indexOf("&") > -1) {
	    $_GET = url.split("&");
	    $_GET[0] = $_GET[0].replace("?", "");
	} else {
	    $_GET[0] = url.substring((url.indexOf("?") + 1), url.length);
	}

	return $_GET;
	
};


/**
 * @public
 * @function
 * @name 
 * @description the purpose of this function is to get all 
 *              incoming data to this file
 * @todo        detect for any incomming data, then output italics
 *              as an array
 * @since      0.0.2
 */
 ToolKit.prototype.POST = function () {

};
