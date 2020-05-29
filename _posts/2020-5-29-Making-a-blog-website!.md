---
layout: post
title: Setting this website up [Animations Included]!
---

I made this website in under 2 hours , with no previous knowledge of javascript . I am outlining the steps for the same for all others , who all want a quick start!

Steps :

1. Head over to the [Jekyll Now repository](https://github.com/barryclark/jekyll-now) , and fork the repository. Take a good look at the repository ,and you'll be done setting up a minimal blog site in a jiffy!

2. Adding animations : There are many open sourced p5.js animations , which can be used as a potential background for websites! I personally liked [this](https://github.com/CrypticGuy/Interactive-Background) visualization, and decided to go with it !

3. The following changes were made in the /_layouts/default.html file (as I wanted the changes in all webpages , and all pages use default.html) , for using the p5.js library (which renders the animations). 
```html
<script src="https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.js"></script>
<script src="{{ base.url | prepend: site.url }}/assets/js/myjsfile.js"></script>
```
Add your js file in the path /assets/js/myfile.js.This will be the canvas used.
Add the following to the setup() function , to convert your canvas to a background!
```javascript
    var body = document.body,
        html = document.documentElement;

    var height = Math.max( body.scrollHeight, body.offsetHeight, 
                           html.clientHeight, html.scrollHeight, html.offsetHeight );//Height of body element
    canvas=createCanvas(windowWidth, height);
    canvas.position(0,0);
    canvas.style('z-index','-1');
```
4. For local testing , refer to the jekyll-now readme.
5. And thats it! You have a blogging website up and running with a sweet js animation background.
