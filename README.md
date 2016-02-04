# jRaiz
Basic HTML/CSS constructor from JavaScript configurations.

# Features
- HTML/CSS from JavaScript objects;
- CSS selectors as key: { 'tag#id.class01.class02' : { /* ELEMENT CONFIG */ } }
- Pre-configured objects for logo, headers, forms and more;
- Dynamic css variables and expressions;

# Donate
Donate via <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=WEMSKL3F4GNEU&lc=US&item_name=jRaiz&item_number=jraiz&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted" target="_blank">PayPal</a>.

# Files
The file <code>index.html</code> comes without a <code>&lt;body&gt;</code> tag.<br>
The file <code>js/jraiz.js</code> is the base code.<br>
The file <code>js/script.js</code> holds the user code.<br>
The file <code>js/basic notation.js</code> holds some ideas to be implemented in the future.<br>

# Basics
You add HTML structure and CSS rules from javascript objects, like:

```javascript
obj = {
  'div#header.superDiv.active' : { // GENERATES <div class="superDiv active" id="header" onclick="function(ev){...}">...</div>
    $ : {
      onclick : function(ev){
        alert("click");
        console.log(ev);
      }
    },
    'a.someLink' : { // GENERATES <a class="someLink" href="url.com">First link</a>
      $ : {
        href : "url.com",
        text : "First link"
      }
    },
    'a.greenLink' : { // GENERATES <a class="greenLink" href="green.link.com">Click here!</a>
      $ : {
        href : "green.link.com",
        target : "_blank",
        text : "Click here!"
      }
    }
  }
};

j.nodes(obj);
```

The object $ holds configuration.

The name of the element could be it's tag name or some class name.

# Dynamic CSS variables and expressions
When only var, you add a word starting with $: <code>"propertyValue $variable"</code>.

When expression, you use brackets: <code>"othProp thrdProp {$var1 * $var2 + 584}"</code>.

```javascript
obj = {
  $ : {
    $primColor : "#AAA",
    $secndColor : 753
  },
  '.header.cols.col_12' : { //GRID CLASSES COMES WITH THE BASE CODE 
    $ : {
      css : {
        border : "solid 1px $primColor", //OUTPUT: solid 1px #AAA
        color : "{$primColor}BCE" //OUTPUT: #AAABCE
      }
    }
  },
  '.main.cols.col_8' : {
    $ : {
      css : {
        backgroundColor : "#{$secndColor * 258}" //OUTPUT: #194274
      }
    }
  }
};
```

You can change any variable, accessing the object j.vars.$nameVariable:

The code <code>j.vars.$primColor = "#BBB"</code> changes every object style property that has $primColor assigned to it.
