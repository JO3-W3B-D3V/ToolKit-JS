/**
 * @name      Stack.js
 * @author    Joseph Evans <joe-evs196@hotmail.co.uk>
 * @version   0.0.1
 * @license   MIT-license
 * @copyright Joseph Evans 2018
 * @file      the purpose of this file is to simply implement a Stack data structure.
 * @todo      add more felexibility
 */


/**
 * @global
 * @class
 * @constructor
 * @name      Stack
 * @param     {Int} len this is simply the length of the stack that you'd like to 
 *                      create
 * @classdesc the purpose of this class is to simply implement a stack data
 *            structure, this stack is specifically used with the recently viewed
 *            list, as we need the ability to remove the first item, then add
 *            a new one to the end of the list, hence the need for a stack
 */
function Stack (len) {
    this.size = len;
    this.index = 0;
    this.data = [];
}



/**
 * @public 
 * @function 
 * @name        push
 * @param       {*} data this is simply the data that you wish to add to this stack
 * @description the purpose of this function is to add data to the stack data 
 *              structure
 */
Stack.prototype.push = function (data) {
    if (this.index >= this.size) { return; }
    this.index ++;
    this.data.push(data);
};


/**
 * 
 */
Stack.prototype.pop = function () {
    if (this.size <= 0) { return }
    var del = this.data[this.index];
    this.data.pop();
    this.index --;
    return del;
};

/**
 * @public 
 * @function 
 * @name        push
 * @param       {*} data this is simply the data that you wish to add to this stack
 * @description the purpose of this function is to add data to the stack data 
 *              structure, but unlike the normal push function, this has the ability
 *              to remove data when the stack is full
 */
Stack.prototype.smartPush = function(data) {
    if (this.index < this.size) { this.push(data); }
    else if (this.index == this.size) { this.pop(); this.push(data); }
};


/**
 * 
 */
Stack.prototype.getSize = function () {
    return this.index;
};
