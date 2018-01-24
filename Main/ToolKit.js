/**
 * @file 
 * @name        ToolKit.js
 * @author      Joseph Evans <joe-evs196@hotmail.co.uk>
 * @version     0.0.2
 * @requires    GlobalFunctions.js
 * @license     MIT-License
 * @copyright   Joseph Evans 2018
 * @description the purpose of this file is to allow for 
 *              some pretty useful developer tools, however 
 *              this file does rely on other files that have been 
 *              published in this project, version 0.0.2 has begun now, 
 *              which means that you should see added features and functions 
 *              to the file, keep note that all changes will be noted, 
 *              if you scroll to the bottom of the file, you'll see 2 functions 
 *              using the '@since'.
 * @requires    GlobalFunctions.js
 * @todo        add documentation
 * @todo        carry out detailed testing 
 */


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
 * @name        isInternal
 * @return      {Boolean}
 * @description the purpose of this function is to load features that
 *              may be undergoing a lot of work, if you have a certain
 *              url string setup, then this tests to see if the current
 *              url contains that string, if not, then the content won't
 *              load 
 */
ToolKit.prototype.isInternal = function () {
    if (!isDefined(PrivateObject.urlstring)) { return false; } 
    if (window.location.href.indexOf(PrivateObject.urlstring) == -1) {
        return false;
    } 
    else { return true; }
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
    (function(a){
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))
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
 * @name 
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
 * @name 
 * @return      {Console.log}
 * @todo        test & debug
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
