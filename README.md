# Version 0.0.1 
So far, I've implemented the following: 
- Lazy Loading Images
- Lazy Load Script Tags
- Implemented a couple of data structures (tree, queue & stack)
- Implemented a front end wish-list & recently viewed list
- Implemented various developer tools in ToolKit.js
- Implemented many various and generic functions in GlobalFunctions.js

I think that you'll find all of the above are quite self explanatory.  If you have any questions about the code, feel free to email me, or feel free to generate some documentation using [JSDocs](http://usejsdoc.org/). This code is not yet at a state where I can officially label it as being released, it’s still **very much** a work in progress, this is a mere test stage. A review and coding critique stage, this code is so raw at the moment that a lot of the code is still on the global scope… Which is bad… Eventually it’ll all be 100% encapsulated into a single object, **OTHER** than the functions that are deliberately assigned to the global scope. 

<hr>

## What is ToolKit-JS?
Simple, ToolKit-JS is simply as the name would suggest, a toolkit for the front end web language JavaScript. I, Joseph Evans am writing this to allow developers to use a lightweight vanilla JavaScript library, as I know many front end web developers that don't just **use** jQuery, but they **rely** on it. I've even heard a couple of horror stories where a front end developer may not know what the difference is between the two… **Yikes**.... I'm not saying I want to replace jQuery, that's not my goal at all, nor is it the purpose of ToolKit-JS, the **main** purpose of ToolKit-JS is to add a bunch of neat features to your web application. Whether it's expanding on the barebones of JS, by adding functions to what's already there, or creating and implementing data structures, all done in vanilla JavaScript. 

As a web developer, I will try to utilise technologies and techniques that works across a variation of devices and browsers, including **IE9**, despite the fact that **Microsoft no longer supports IE9**. If you take a look at Main.JS, you may get an idea as to how it works, in Main.JS, I've just run a few tests, to ensure that the code I've written works as expected. One thing that I personally really like about this project so far is the recently viewed/wishlist application, it’s all front end, still works when the user leaves the website, etc. Thanks to such a feature, you could also store the data on a back end system, then load that data into the front end via this application. Currently, there’s no way to render the data, but I feel that’s going to change dramatically on every website, as is the structure of the data, so it’s kinda hard to make something **that** generic. It’s more of a foundation for you, rather than an application that you can pull straight out of the box and expect to work and do all forms of magic that you’d expect and hope it to do. 

<hr>

## So what’s the plan?
The plan is to include generic data structures, a bunch of neat global functions, animation, XHR functionality, etc, you name it. Again, as it says above, I plan on implementing all of the functionality to the point where it runs solidly on IE9+. I should also mention that I plan to include a couple of additional features which are partially open to change, such as a wish list implementation and a recently view implementation. 

Currently, there’s a lot missing, such as animation and the XHR, but not to worry, I will implement those features further down the line, you can think of version 0.0.1 as an alpha release, it’s more of a test, hopefully I can get some feedback from other developers. 

<hr>

# What to expect in Version 0.0.2
I plan on including the following features in version 0.0.2:
- More generic and useful functions, even if it’s something as simple as finding the average from an array of numbers.
- Implement a graph data structure.
- Implement a balancing algorithm for the tree, or create a red-black tree.
- Add more developer tools.
- Encapsulate all of the current functions (bar global functions.js) into one parent Object. Although this is up for debate, purely due to the fact that
- Produce detailed documentation to download.
- Publish documentation online.
- Add more detail to documentation.
- Get more developers to contribute and expand on the code.
- Begin to implement XHR functionality.
- Begin to implement some basic and lightweight animations, nothing too heavy because we want this to be light on mobile devices.

With version 0.0.2, I plan on making this more the beta rather than an official release, maybe we’ll get it right 3rd time, after all, it is meant to be 3rd time lucky…. 

<hr>

# Progress So Far
- Data Structures: 50%
-- Stack: 100%
-- Queue: 100%
-- Tree: 60%
-- Graph: 0%
-- Additional(s)/Hybrids: 0%
- XHR: 0%
- Global Functions: 45%
- Animation: 0%
- ToolKit: 25%

Other details:
- Encapsulation: 10%
- Testing: 33.33%
- Documentation: 75%
- Minification: 0%
