# jRaiz
Basic HTML/CSS constructor from JavaScript configurations.

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

```
obj = {
  div : {
    $ : {
      classes : "superDiv active",
      id : "header",
      onclick : function(ev){
        alert("click");
        console.log(ev);
      }
    },
    '.someLink' : {
      $ : {
        href : "url.com"
      }
    },
    '.greenLink' : {
      $ : {
        href : "green.link.com",
        target : "_blank"
      }
    }
  }
}
```
The object $ holds configuration.
The name of the element could be it's tag name or some class name.
