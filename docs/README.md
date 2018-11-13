[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/JO3W3BD3V)
 [![JavaScript Style Guide: Good Parts](https://img.shields.io/badge/code%20style-goodparts-brightgreen.svg?style=flat)](https://github.com/dwyl/goodparts "JavaScript The Good Parts")
 [![Dependency Status](https://david-dm.org/dwyl/esta.svg)](https://david-dm.org/dwyl/esta)

# ToolkitV3
Okay, so I've gone and scrapped version 1 & version 2, simply because the ultimate goal behind 
ToolKit is to offer a set of tools, not necessarily a framework per-say, but rather s library. 
You can think of ToolKit as a library to aid the development of front end application 
development. ToolKit is a powerful tool for beginners to learn, as it includes some of the 
following: 

- Components
  - Simplistic template engine
  - State(s)
- Queries 
  - In memory 
- Services (aka AJAX)
- Storage controller
- ETC.

Here's an example of some code... 

```javascript
// Basic demo.
var app = ToolKit;
app.DOM.ready(function () {
  console.log(app);
  app.Session.set('user_id', {user_id : 1});
  console.log(app.Session.get('user_id'));

  // Query demo.
  var queryString = "age GTE 20";
  var queryCols = ["age", "name"];
  var queryData = [{"age" : "30", "name" :"Jack"}, {"age" : "20", "name" :"Jay"}, {"age" : "12", "name" :"Stacy"}];

  app.Query.setColumns(queryCols);
  app.Query.setTable(queryData);
  app.Query.select(queryString);

  app.Query.onComplete(function (records) {
    console.log('Complete query');
    console.log(records);
  });

  // AJAX demo.
  app.Service({
    url: window.location.href,
    method: "GET",
    success: function (data) {
      console.log(data);
      app.Query.exe();
    }
  });
  
  // Component demo.
  window.appState = {
    name: 'Will I Am'
  };

  var component = {
    name: 'demo',
    state: window.appState,
    root: app.Utils.$one("body"),
    template: '<h1><% data.name %></h1>',
    onStateChange: function () {
      console.log("State changed!");
    },
    onRender : function () {
      console.log("Rendered!");
    }
  };

  app.Component.registerComponent(component);
});

// Wait 2 seconds to see the component update.
setTimeout(function () {
  window.appState.name = "Will Smith";
}, 2000);
```

ToolKit is what the name may imply, it's a set of tools that have been gathered together, only a 
lot of the tool(s) have been stripped to their core, making sure that ToolKit-JS stays as 
lightweight as possible, whilst delivering plenty of functionality. 

## Todo 
Update documentation & whatnot! 
