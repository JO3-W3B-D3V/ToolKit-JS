/**
 * @file 
 * @name        Main.js
 * @author      Joseph Evans <joe-evs196@hotmail.co.uk>
 * @version     0.0.1
 * @license     MIT-License
 * @copyright   Joseph Evans 2018
 * @description the purpose of this file is to simply initiate 
 *              everything, save the user of this code having to manually
 *              include all of their scripts in the header, it can all be 
 *              done in this file, if you search this document for 
 *              "Info Here", you should be more than able to make sense of how
 *              to add you're own scripts to the dynamic script loader
 * @requires    ToolKit.js
 * @todo        carry out detailed testing 
 */


/**
 * @global
 * @function 
 * @name        ToolKitInit
 * @description the purpose of this function is to allow the example code below 
 *              to be run once all of the required scripts have been loaded 
 *              and once the dom has reached a ready state, you can put
 *              whatever you like in here, currently there's just some test 
 *              code to demo how this works
 */
var ToolKitInit = function () {

///////////////////////////////////////////////////////////////////////////////
    
    log("\nWell! We know that the dynamic script loader works...\n\n");
    log("\nNow! Let's Start Testing... \n\n");
	if (isIE()) {
		log("WHY THE HELL ARE YOU USING IE? WHAT'S WRONG WITH YOU?!?");
		log("*huge sigh* at least I've added some support up to IE9 I guess..");
	} 
	else { log("Pheww... You're not using IE! Thank f**k for that!"); }
	
///////////////////////////////////////////////////////////////////////////////

    log("\nBasic Global Function Tests\n\n");
    var tk = new ToolKit();
    tk.lazyLoad();
	log("Internal Script?");
	log(tk.internal());
	tk.urlstring = "testing";
	if (tk.internal()) {
		log("INTERNAL SCRIPT!!!!");
		log(tk.internal());
	} else {
		var logdata = "To turn on 'internal()', type " + tk.urlstring;
		logdata += " into the URL somewhere...";
		log(logdata);
	}
    var x = 1;
    log(isList(x));
    log(isDefined(x));
    log("Mobile: " +tk.isMobile());
    var arraytest = [1,1,1,1,1,1,8,4,3,2,43,1,323];
    log(arraytest.contains(1));
    log('\nArray Tests\n\n');
    log(arraytest);
    arraytest.remove(4);
    log(arraytest);
    arraytest.removeAll(1);
    log(arraytest);
    arraytest = tk.garbage();

///////////////////////////////////////////////////////////////////////////////

    log("\nQueue Test\n\n");
    var q = new tk.Queue(10);
    for (var i = 0; i < 10; i++) { q.enqueue(i); }
    log(q.data);
    for (var i = 10; i < 15; i++) { q.smartEnqueue(i); }
    log(q.data);
    log(q.getSize());
    for ( i = 0; i < 10; i ++) { q.dequeue(); }
    log(q.getSize());
    q = tk.garbage();

///////////////////////////////////////////////////////////////////////////////

    log("\nStack Test\n\n");
    var s = new tk.Stack(10);
    for (var i = 0; i < 10; i++) { s.push(i); }
    log(s.data);
    for (var i = 10; i < 20; i++) { s.smartPush(i); }
    log(s.data);
    log(s.getSize());
    for (var i = 0; i < 10; i++) { s.pop(); }
    log(s.getSize());
    s = tk.garbage();

///////////////////////////////////////////////////////////////////////////////

	log("\nWishList Test\n\n");
	var wish = new tk.WishList(10, "wishlist");
	var recent = new tk.WishList(10, "recentlyviewed", true);
	for (var i = 0; i < 20; i ++) { wish.addData({ id:i, x:'test'}); }
	for (var i = 0; i < 20; i ++) { recent.addData({ id:i, x:'test'}); }
	log("\nRecently Viewed Data\n\n");
	log(recent.getData());
	log("\nWish List Data\n\n");	
	log(wish.getData());
    log("Does the wishlist contain the id 4?");
    log(wish.contains(4));
    log("Well not if I have anything to do with it...");
	wish.deleteAtIndex(4);
    log("\nWish List Data\n\n");
	log(wish.getData());
	recent.deleteAtIndex(recent.getSize() - 1);
    log("\nRecently Viewed Data\n\n");
	log(recent.getData());
    //recent = tk.garbage(); version 0.0.1
    //wish = tk.garbage(); version 0.0.1
	
///////////////////////////////////////////////////////////////////////////////
	
	log("\nTree Test\n\n");
	var tree = new tk.Tree();
	for(var i = 0; i < 100; i++) {
		var random = Math.floor(Math.random() * 100) + 1;
		tree.push(random);
	}
	var bfs = tree.bfs(tree.root);
	log(bfs);
	var dfs = tree.bfs(tree.root);
    log(dfs);
    tree.balance();
    tree = tk.garbage();
	
///////////////////////////////////////////////////////////////////////////////

    log("\nGarbage Collection Test\n\n");
    var x = 10;
    log("Value of X = ");
    log(x);
    x = tk.garbage();
    log("Value of X = ");
    log(x);

///////////////////////////////////////////////////////////////////////////////
    
    log("\nUnit Testing Test\n\n");
    var inputs = [2, 4, 6 ,8];
    var temp = function(x) { return x += 2};
    var expects = [0, 6, 9, 10];
    log(tk.unitTest(inputs, temp, expects));
    log(tk.unitTest(3, temp, [1,2]));
    inputs = tk.garbage();
    temp = tk.garbage();
    expects = tk.garbage();
	
///////////////////////////////////////////////////////////////////////////////
	
	var storage = tk.storageSize();
	log(storage);
	log("As you can see, due to the fact that the local storage items weren't" +
	 "\ndeleted, they're taking up some storage, thanks to version 0.0.2" + 
	 "\n we're now able to remove the data from local storage! Hooray!" + 
	 "\n\nREMEMBER!!!!!\n\nJust because the variable has been asigned to" +
	 "the toolkit garbage function, it doesn't mean that the local storage is" +
	 "\nclear.");
	recent.remove();
	wish.remove();
	storage = tk.storageSize();
	log(storage);
	recent = tk.garbage();
	wish = tk.garbage();
	log(tk.isNum(123));
	log(tk.isNum("abc"));
	var loc = tk.getLocation( function(loc) { log(loc); } );
	var timetest = function () {
		var mx = 1000;
		for (var i = 0; i < mx; i++) {
			for (var j = 0; j < mx; j++) {
				for (var k = 0; k < mx; k++) { /* dummy test */ }
			}
		}
	}
	tk.benchmark(timetest, "timetest");
	loc = tk.garbage();
	
///////////////////////////////////////////////////////////////////////////////

	var q1 = new tk.Queue(20);
	var q2 = new tk.Queue(10);
	log(q1);
	log(q2);
	log(q1);
	console.log(getBrowser());
	console.log(getIEVersion());
	console.log(getOS());
	
///////////////////////////////////////////////////////////////////////////////
	
	log("\n End of Testing! Yay!\n\n");
    tk = tk.garbage();
};


/**
 * ============================================================================
 * ============================================================================
 * ============================================================================
 *                                 INFO HERE
 * ============================================================================
 * ============================================================================
 * ============================================================================
 *
 * @global
 * @function
 * @description the purpose of this function is to dynamically get all of the
 *              required js files, then once all of the files have been 
 *              collected, you can then execute the code above
 */
(function() {
    // keep track of how many have loaded
    var loadedCount = 0;

    // a list of scripts goes here
    // feel free to add your own js files to this array 
    var scripts = [
        "Main/ToolKit.js"
    ];

    

    for (var i = 0, s = scripts.length; i < s; i++) {
        var script = document.createElement("script"); script.src = scripts[i];
        document.getElementsByTagName('head')[0].appendChild(script);
	
        // needed to ensure that each file actually loads correctly
        script.onload = function () { 
            loadedCount ++;
            
            // once all the scripts have loaded, we know we can run the ready 
            // function
            if (loadedCount == s) { ready(ToolKitInit()); }   
        };
    }
})();
