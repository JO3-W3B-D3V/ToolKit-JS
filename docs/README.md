[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/JO3W3BD3V)
 [![JavaScript Style Guide: Good Parts](https://img.shields.io/badge/code%20style-goodparts-brightgreen.svg?style=flat)](https://github.com/dwyl/goodparts "JavaScript The Good Parts")
 [![Dependency Status](https://david-dm.org/dwyl/esta.svg)](https://david-dm.org/dwyl/esta)

# ToolkitV3
Okay, so I've gone and scrapped version 1 & version 2, simply because the ultimate goal behind 
ToolKitMin is to offer a set of tools, not necessarily a framework per-say, but rather s library. 
You can think of ToolKitMin as a library to aid the development of front end application 
development. ToolKitMin is a powerful tool for beginners to learn, as it includes some of the 
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

  app.Router.add(/home/, function () {
    console.log('Home page.');
  });
  app.Router.add(/about/, function () {
    console.log('About page');
  });
  app.Router.add(function () {
    console.log('404 Error?!');
  });
});

// Wait 2 seconds to see the component update.
setTimeout(function () {
  window.appState.name = "Will Smith";
}, 2000);

// Test the router.
setTimeout(function () {
  app.Router.navigate('home');
}, 1000);

setTimeout(function() {
  app.Router.navigate('about');
}, 2000);

setTimeout(function () {
  app.Router.navigate('404test');
}, 3000);
```

ToolKitMin is what the name may imply, it's a set of tools that have been gathered together, only a 
lot of the tool(s) have been stripped to their core, making sure that ToolKitMin-JS stays as 
lightweight as possible, whilst delivering plenty of functionality. 

## Todo 
Update documentation & whatnot! 

<br/>
<hr/>
<br/>

## Features 

- Service 
- Component
- Utils 
- Query
- Router 
- Template Engine 
- Others
  - DOM
  - log 
  - Session 
  - Store 


### Service 
The service method is simply ToolKit's implementation of ajax. 

### Component
This implements a template which handles some DHTML template via the template engine, 
it also handles its own state which can be manipulated outside of the component, like in the example. 
Finally it can dispatch it's own controller's via making use of the 'onRender' property/function.

### Utils 
This is just a name space for useful/simple methods, not much more to it than that. 

### Query 
This allows you to execute a 'query' over an array of objects, it runs via making use of a callback to 
ensure that the main execution thread is never blocked by iterating over a large data-set. 

### Router  
Allows you to have different URL's within the front end, allowing for an SPA, currently it 
only allows for hash based URL's, and it does not monitor URL changes by default, i.e. user 
tries to navigate to a different URL. Although such a feature is so simplistic that I believe it 
could be down to the developer(s) decision whether or not to implement such a feature, after all it is 
mean to be lightweight. 

### Template Engine 
Currently it makes use of a template engine somewhat similar to EJS, although much smaller 
minimal and simplistic. 

### Others 
These are just simple tools that can be used if necessary or not. 

#### DOM 
Namespace for DOM related features. 

#### log 
Simply ```console.log```, although it requires dev-mode to be set to true. 

#### Session 
Allows you to store data into a user's session, aka a cover over session storage. 

#### Store 
Allows you to store data into local storage.
