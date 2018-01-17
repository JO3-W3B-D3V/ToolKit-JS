/**
 * @name      WishList.js
 * @author    Joseph Evans <joeevs196@hotmail.co.uk>
 * @version   0.0.1
 * @license   MIT-license
 * @copyright Joseph Evans 2018
 * @file      the purpose of this file is to simply implement a Queue datastructure.
 * @todo      add a bit more functionality. 
 */

/**
 * @global
 * @class
 * @constructor
 * @name      Queue
 * @classdesc the purpose of this class is to simply implement a queue data
 *            structure, this queue is specifically used with the recently viewed
 *            list, as we need the ability to remove the first item, then add
 *            a new one to the end of the list, hence the need for a queue
 */
function Queue (len) {
    this.index = 1;
    this.size = len;
    this.data = [];
}


/**
 * @public
 * @function
 * @name        enqueue
 * @param       d      this is simply the data that you want to add to the
 *                     queue
 * @description the purpose of this function is to simply add data to the
 *              queue data structure
 */
Queue.prototype.enqueue = function (d) {
    if (this.index < this.size) {
        this.data.push(d);
         this.index ++;
    } else if (this.index == this.size) {
        var first = this.dequeue();
        this.data.push(d);
        this.index ++;
    } else {
        return;
    }
}


/**
 * @public
 * @function
 * @name        dequeue
 * @return      {Null || *}
 * @description the purpose of this function is to simply remove the first
 *              element form the queue, like a queue in real life, it's the
 *              first person that leaves the queue first, and the
 *              last person is the last to leave
 */
Queue.prototype.dequeue = function () {
    if (this.index > 0) {
        return this.data.shift();
    } else {
        return null;
    }
}
