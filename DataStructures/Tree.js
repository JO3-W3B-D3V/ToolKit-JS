/**
 * @name      Tree.js
 * @author    Joseph Evans <joe-evs196@hotmail.co.uk>
 * @version   0.0.1
 * @license   MIT-license
 * @copyright Joseph Evans 2018
 * @file      the purpose of this file is to simply implement a Tree data
 *            structure
 * @todo      add more flexebility
 * @todo      add a balancing feature, at the moment this is an unbalanced
 *            tree
 */


/**
 * @global
 * @class 
 * @constructor
 * @name        Node
 * @param       {*} val this is simply the value that you would like to store 
 *                      in this BST
 * @classdesc   the purpose of this class is to simply act as a BST's node
 */
 function Node (val) {
    this.value = val;
    this.left = null;
    this.right = null;
}


/**
 * @global 
 * @class 
 * @constructor
 * @name        Tree
 * @classdesc   the purpose of this class is to implement a tree like data 
 *              structure
 */
function Tree () {
    this.root = null;
}



/**
 * @public 
 * @function 
 * @name        isEmpty
 * @return      {Boolean}
 * @description the purpose of this function is simple, it's just to detect
 *              whether or not this current tree is empty or not
 */
Tree.prototype.isEmpty = function () {
    if (this.root == null) { return true; }
	else { return false; }
}



/**
 * @public 
 * @function 
 * @name        push 
 * @param       {Int} value this is the value that you wish to add to the
 *                     tree data structure
 * @description the prupose of this function is to simply add data to the
 *              structure
 */
Tree.prototype.push = function (value) {
    if (this.isEmpty()) { this.root = new Node(value); return; }

    var current = this.root;
	var added = false;
	
    while (!added) {
		
		// if the value is smaller, then left
		if (value < current.value) {
			// if left is empty, then make a new node 
            if (current.left == null) {
                current.left = new Node(value);
				added = true;
			}

			// if left node is not empty, go left
            else {
                current = current.left;
            }   			
		}
		
		// if the value is larger, then right
		else {
			// if right node is empty, then make a new node
            if (current.right == null) {
                current.right = new Node(value);
				added = true;
            } 
            
            // if the right node is not empty, then go right
            else {
                current = current.right;
            }
		}
    }
};



/**
 * @public
 * @function 
 * @name        bfs
 * @param       {Node} node    this is the node that you want to 
 * @param       {String} order this defines which order you want, if 
 *                             no input is given, by default it will go
 *                             LTR 
 * @return      {Array}
 * @description the prupose of this funciton is to allow for the ability to 
 *              implement the breadth first search, in the different orders 
 *              too, LTR & RTL
 */
Tree.prototype.bfs = function (node, order) {
    if (this.isEmpty()) { return; }
    var queue = [node];
    var results = [];

    // initial fnc value aka LTR
    var fnc = function () {
        while (queue.length > 0) {
            var current = queue.shift();
            if (current.left) { results.push(current.left); }
            if (current.right) { results.push(current.right); }
        }
    };
	
	if (isDefined(order)) {
		// if order is RTL then re-assign the value of fnc
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
};



/**
 * @public 
 * @function 
 * @name        dfs
 * @param       {Node} node    the node of which you wish to start the 
 *                             search from 
 * @param       {String} order the prupose of this param is to allow 
 *                             for a different searching order
 * @return      {Array}
 * @description the purpose of this function is to simply implement
 */
Tree.prototype.dfs = function (node, order) {
    if (this.isEmpty()) { return; }
    var results = [];
    
    // initial value of the recurseive function
    var recurse = function (node) {
        results.push(node.value);
        node.left && recurse(node.left);
        node.right && recurse(node.right);
    };
	
	if (isDefined(order)) {
		// if order is meant to be in order, then reassign the recursive function
		if (order.toUpperCase() == 'IN') {
			var recurse = function () {
				node.left && recurse(node.left);
				results.push(node.value);
				node.right && recurse(node.right);
			};
		} 
		
		// if order is meant to be post order, then reassign the recursive function
		else if (order.toUpperCase() == 'POST') {
			var recurse = function () {
				node.left && recurse(node.left);
				node.right && recurse(node.right);
				results.push(node.value);
			};
		}
	}

    recurse(node);
    return results;
};


/**
 * @public
 * @function
 * @name 
 * @description the purpose of this function is to balance the tree
 */
Tree.prototype.balance = function () {
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
};
