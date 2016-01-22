# jRaiz
Basic HTML/CSS constructor from JavaScript configurations.

# Features
- HTML/CSS from JavaScript objects;
- pre-configured objects for logo, headers, forms, and more;
- Dynamic css variables;

# Donate
Donate via <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=WEMSKL3F4GNEU&lc=US&item_name=jRaiz&item_number=jraiz&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted" target="_blank">PayPal</a>.

# Why
Angular is too big and complex.<br>
jQuery is very nice, but I need to learn how the DOM works...<br>

# Files
The file <code>index.html</code> comes without a <code>&lt;body&gt;</code> tag.<br>
The file <code>js/jraiz.js</code> is the base code.<br>
The file <code>js/script.js</code> holds the user code.<br>
The file <code>js/basic notation.js</code> holds some ideas to be implemented in the future.<br>

# Basics
You add HTML structure and CSS rules from javascript objects, like:

```javascript
obj = {
  div : { // GENERATES <div class="superDiv active" id="header" onclick="function(ev){...}">...</div>
    $ : {
      classes : "superDiv active",
      id : "header",
      onclick : function(ev){
        alert("click");
        console.log(ev);
      }
    },
    someLink : { // GENERATES <a class="someLink" href="url.com">First link</a>
      $ : {
        href : "url.com",
        text : "First link'
      }
    },
    greenLink : { // GENERATES <a class="greenLink" href="green.link.com">Click here!</a>
      $ : {
        href : "green.link.com",
        target : "_blank",
        text : "Click here!"
      }
    }
  }
}
```
The object $ holds configuration.

The name of the element could be it's tag name or some class name.
