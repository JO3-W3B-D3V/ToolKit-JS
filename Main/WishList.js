/**
 * @name      WishList.js
 * @author    Joseph Evans <joe-evs196@hotmail.co.uk>
 * @version   0.0.1
 * @license   MIT-License
 * @copyright Joseph Evans 2018
 * @file      the purpose of this file is to allow users to store
 *            data about things that they've recently searched and what
 *            they've favourited, this data can then be rendered elsewhere
 *            thanks to using local storage, this allows for real time 
 *            updates on the view, there you could have a function that
 *            detects changes in the local storage, you could run that
 *            function every x amoutn of seconds to scan and update the
 *            results on the view page, an implementation like this may 
 *            be useful when the user has multiple tabs open, one page 
 *            where they can view the curernt state of the wishlist
 *            then another page where they can add data to the wishlist
 * @requires  GlobalFunctions.js
 * @requires  Queue.js
 * @requires  Stack.js
 */
 

/**
 * @global
 * @class
 * @constructor
 * @name       WishList
 * @classdesc  the purpose of this class it to simply handle and output all
 *             the js that may be required for
 */
function WishList (len, name, structure) {
	
	if (isDefined(this.rawData)) {
		var data = JSON.parse("[" + this.rawData + "]");
	} else { var data = []; }
	
	this.size = len;
	this.name = name;
	this.isStack = true;
	this.rawData = localStorage.getItem(this.name);
	this.data = data;
	
	// decide whether to use a stack or not, or a queue for the 
	// structure functionality of this object, i.e. with a recently 
	// viewed list, you may want a queue, as you can add data to it 
	// and move data out of it using the smartenqueue function I've built
	// otherwise, with a pretty standard wishlist, you'd probably use a 
	// very basic stack, as you don't want to unadd data without the user 
	// manually doing so 
	if (structure != true) { this.struct = new Stack(this.size); } 
	else { this.struct = new Queue(this.size); this.isStack = false; }
	
	if (!isDefined(localStorage.getItem(this.name))) {
		localStorage.setItem(this.name, this.data);
	}
}


/**
 * @public
 * @function
 * @name        deleteAtIndex 
 * @param       {Int} index   this is just the index that you 
 *                            wish to remove from this wishlist
 * @description the purpose of this function is to remove an item 
 *              from local storage depending on it's index
 */
WishList.prototype.deleteAtIndex = function (index) {
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
};


/**
 * @public
 * @function
 * @name        contains
 * @param       {*}      data this is the data that you're searching for
 * @return      {Boolean}
 * @description the purpose of this function is to detect if the wishlist 
 *              already contains this piece of data or not, with this 
 *              implementation, it should be the case that the first value of 
 *              each element in the local store is some sort of ID, this way 
 *              this algorithm is true
 */
WishList.prototype.contains = function (data) {
	var find;
	if (typeof data == "object") {
		for (var i in data) { find = data[i]; break; }
	} else if (Array.isArray(data)) {
		find = data[0];
	} else {
		find = data;
	}

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
};


/**
 * @public 
 * @function
 * @name        addData
 * @param       {*} data 
 * @description the purpose of this function is to add data to the 
 *              chosen data structure of this object, then pass that 
 *              data to the local storage, this way the data structure
 *              prevents the data in the local storage from becoming mutated
 */
WishList.prototype.addData = function (data) {
	if (this.isStack) { this.struct.push(data); } 
	else { this.struct.smartEnqueue(data); }
	array = this.struct.data;
	var values = JSON.stringify(array);
	values = values.replace("[", "");
    values = values.replace("]", "");
	localStorage.setItem(this.name, values);
	this.data = JSON.parse("[" + localStorage.getItem(this.name) + "]");
};


/**
 * @public
 * @function 
 * @name        remove
 * @description the prupose of this function is to remove the current item 
 *              from the local storage
 */
WishList.prototype.remove = function () { localStorage.removeItem(this.name); };


/**
 * @public
 * @function
 * @name        getData
 * @return      {Array}
 * @description the purpose of this function is to get the data from local 
 *              storage and then place that data into an array
 */
WishList.prototype.getData = function () { 
	this.data = JSON.parse("[" + localStorage.getItem(this.name) + "]");
	return this.data; 
};


/** 
 * @public
 * @function
 * @name        getRawData
 * @return      {Storage}
 * @description the purpose of this function is to get the data directly 
 *              from local storage, rather than insert it into an array
 */
WishList.prototype.getRawData = function () { 
	this.rawData = localStorage.getItem(this.name);
	return this.rawData; 
};


/**
 * @public
 * @function
 * @name        getSize
 * @return      {Int}
 * @description the purpose of this function is to know the length of
 *              the data that's being stored within the local storage
 */
 WishList.prototype.getSize = function () { return this.data.length; };
