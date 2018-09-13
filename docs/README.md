[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/JO3W3BD3V)
 [![JavaScript Style Guide: Good Parts](https://img.shields.io/badge/code%20style-goodparts-brightgreen.svg?style=flat)](https://github.com/dwyl/goodparts "JavaScript The Good Parts")
 [![Dependency Status](https://david-dm.org/dwyl/esta.svg)](https://david-dm.org/dwyl/esta)

# ToolkitV2
Whilst I was roughly half way through the first version, I quickly began to realise that I had made the software rather bloated and therefore defeated my main foal with this library. So I decided to wipe the slate clean and simply start again, plus considering that I've been working on a few side project which are a lot smaller, I thought I could include those too.

## Why ToolKitJS?
ToolKitJS isn't like a lot of other JavaScript libraries where they may be considered a framework simply because of just how much they do. ToolKitJS is _essentially_ a bundle of libraries, each of which being small, fast and simple to use. 

The ideal time to use ToolKitJS is for JavaScript applications that require reasonably sophisticated tools, but with performance being one of the largest factors possible. 

### The Inspiration Behind ToolKitJS
As I'm a web developer, I work with JavaScript all of the time, and I find it **insane** just how many JavaScript tools/frameworks/libraries are slowly becoming more and more bloated as time goes on. In my books, as performance, efficiency and optimisation are all large focuses this isn't acceptable. 

Initially with version 1, I basically contradicted myself, I actually got in the mindset which I think most of these JavaScript developers get into where they create more than what's necessary. I had the urge to add as much functionality as possible, hence the contradiction, and ultimately destroying the _'lightweight'_ factor that I was going for.  

### What Happened To Version 1?
I simply binned it, I sure it's on git if you look through the commits, but mostly I consider that old and messy code. I guess you can consider the first version a _'trial & error'_ phase. 

**Be warned** a lot of the raw functionality that you could find in version 1 has been removed, purely because while some of the features are neat or useful and simple. I believe that the user of ToolKitJS should be more than capable of implementing those features when needed rather than have ToolKitJS include it. An example being lazy loading for images, I'm pretty **certain** that a developer **should** be more than capable of developing their own lazy loading application/algorithm. 

### So what now? 
From this moment on, I plan to continue development on ToolKitJS, I also plan to begin uploading content and features later today(_21/02018_).

### ToolKit VS Other Libs/Frameworks
Okay, here's a simple answer as to why you may want to use ToolKit over Angular or React, etc, it was made to be as flexible as possible. It's totally modular, you can use one component of the ToolKit library or you can use all of it, it's totally up to you. Plus with ToolKit, you can use jQuery along side it, you _could_ use any framework along side it if you wanted to, it's your call, your decision. This is a JavaScript solution that was made by a developer, for the developer community, plus due to how simplified the documentation is you can probably play around with features that may already exist in the ToolKit library, it offers total freedom. If you don't want to use the `Ninja` template engine, cool, you can always use React and `JSX`. If you don't want to use the `AJAX` method, it's all good, you can use jQuery & `$.AJAX`, I think you get the point.... 

The end point of this section is to clarify how it's modular, unlike a lot of JavaScript libraries and/or frameworks. 


## So What's Included?
Here's a list of features to expect: 

- AJAX
- Promises
- Multi Threading
- Template Engine 
- Asynchronous Features
- **Object Query Script**
- Utilities 
  - Event Handler
  - DOM Selector 
  - etc.

As you can see above, there's not a great deal of features included, _unlike version 1_, but the features that are included are pretty darn useful and powerful tools. You should take note that I've personally decided to drop support for IE9, if your target audience uses stone age technology, then I suggest you look through the half finished version 1 code and take what you like. I'm only dropping support for IE9 simply because it cannot handle features such as multi threading, there may be work around's, but as I aim to keep this library lightweight, I will not include such features.


## What Is Object Query Script? 
This is a simple tool that I came up with quite a while ago, it's simply a neat little tool that allows you to query an array of objects, an example being how you want to get all users where their age is greater than 18, but the size of the data set isn't big enough to bother requesting another http request. 

That's another part of the reason why I initially developed this tool, to reduce the number of http requests, in addition to allowing the user to run queries while their offline. This tool is pretty simple to use and implement, with the ToolKit implementation, you can use such a technology like so: 

```javascript
var sql = new ToolKit.OQS();
sql.createDB("test");
sql.createTable("test_table").addColumn("id").addColumn("age").addColumn("name");

var data = [];

for (var i = 0; i < 100; i ++) {
  var names = ["jack", "joe", "mollie", "chloe", "michelle", "stacy", "sam"];
  var randomData = {};
  var randomAge = Math.floor(Math.random() * Math.floor(120));
  var randomName = names[Math.floor(Math.random() * names.length)];
  randomData.age = randomAge;
  randomData.name = randomName;
  randomData.id = i;
  data.push(randomData);
}

sql.insertInto("test_table").setData(data);

var qry = sql.select("*").from("test_table").where("age GT 10").getResults();
console.log(data);
console.log(qry);
```
As you can see above, there's very little complexity involved, and it simply implements an OOP style approach to SQL, and the nice part is that you don't need to be able to access the web/sql server in order to execute this code. 
