/*
* for with multiple values
*/
for(i=0, j=30, m=654897; i < j || m>50; i++, j--, m/=1.2){
	console.log(i,j,m);
}

/*
* WITH obj
* NOT TO BE USED TO CREATE PROPERTIES
*/
obj = {
	var1 : 6476,
	var3 : 3215,
	var2 : 4682,
};

with(obj){
	console.log(var1+var2+var3); //INSTEAD OF WRITING obj.var1...
	var4 = 65; // DOES NOT WORK!!! //var4 BECOMES GLOBAL
}

console.log(obj); //DOESN'T HAVE A var4 PROPERTY


/*
* TRY/CATCH THROW ~ error handling
* try {
*   // Normally, this code runs from the top of the block to the bottom
*   // without problems. But it can sometimes throw an exception,
*   // either directly, with a throw statement, or indirectly, by calling
*   // a method that throws an exception.
* }
* catch (e) {
*   // The statements in this block are executed if, and only if, the try
*   // block throws an exception. These statements can use the local variable
*   // e to refer to the Error object or other value that was thrown.
*   // This block may handle the exception somehow, or it may ignore the
*   // exception by doing nothing, or it may rethrow the exception with throw.
* }
* finally {
*   // This block contains statements that are always executed, regardless of
*   // what happens in the try block. They are executed whether the try
*   // block terminates:
*   //   1) normally, after reaching the bottom of the block
*   //   2) because of a break, continue, or return statement
*   //   3) with an exception that is handled by a catch clause above
*   //   4) with an uncaught exception that is still propagating
* } 
*/
var message, x;
message = document.getElementById("message");
message.innerHTML = "";
x = document.getElementById("demo").value;
try {
	if(x == "")  throw "is Empty";
	if(isNaN(x)) throw "not a number";
	if(x > 10)   throw "too high";
	if(x < 5)    throw "too low";
}
catch(err) {
	message.innerHTML = "Input " + err;
	//nested TRY/CATCH
}
finally{
	console.log(x);
}

/*
* LABELS
*/
Outer: for(i=0; i<5; i++){
	console.log("Outer", i);
	Inner: for(j=0; j<5; j++){
		console.log(i,j);
		if(i==j) continue Outer;
			else continue Inner;
	}
}

/*
*	NEW FUNCTION OBJ
*
*/
a = new Function('a','b','c', "var x = a+b; var y= b+c; return x*y/c^a");
a(45,21,48);

//-----

args = 'a, b';
body = 'return(a + b);';

myFunc = new Function(args, body);

//-----

args = ['a', 'b', 'return(a + b);'];
myFunc = Function.apply(null, args);

/*
*
*	CODE SYNTAX HIGHLIGHTING
*
*/

code = "var string = function(w){ console.log('foi'); }";
highlight = function(w){
	return "<code class='green'>" + w + "</code>";
}
code.replace(/var|function|console|log/g, highlight);

code.match(/\/\*[\w\s]+\*\/|\/\/[\w\s]+$|var|function/gm);

/*
*
* struct obj
* BASIC SITE STRUCTURE EXAMPLE

*/

struct = {
	container : {
		header : {
			logo : {},
			menu : {}
		},
		main : {
			article1 : {},
			article2 : {},
			article3 : {},
			article4 : {},
			article5 : {}
		},
		sidebar : {
			ad1 : {
				img : {}
			},
			ad2 : {
				embed : {}
			},
			ad3 : {
				applet : {}
			}
		},
		footer : {
			col1 : {},
			col2 : {},
			col3 : {}
		}
	},
	modal : {
		button : {}
	}
};


/*
*
* iterate() - v0
* PRINT OBJECT TREE

*/

var iterate = function( obj, depth ){
	var depth = depth || 0;

	for(var k in obj){
		console.log(depth + ") " + new Array( depth ).join("+") + k );
		iterate( obj[k], depth + 1 );
	}
}

//iterate(struct);


/*
*
* iterate() - v1
* CREATES HTML CODE FROM OBJECT

*/

var iterate = function( obj, depth ){
	var depth = depth || 1;
	for(var k in obj){
		console.log(new Array( depth ).join(" ") +"<div class='" + k + "'>");
		iterate( obj[k], depth + 1 );
		console.log(new Array( depth ).join(" ") +"</div>");
		
		//return obj[k];
	}
}
iterate(struct);


/*
*
* iterate() - v2
* CREATE NESTED HTML NODES
*
*/
var it = function(obj, parent){
	for(var k in obj){
		El = document.createElement("div");
		El.className += k;
		El.appendChild( document.createTextNode(k) );
		//console.log(parent, El);
		parent.appendChild(El);
		it(obj[k], El);
	}
}

var ddd = document.createElement("div");
it(struct, ddd);
console.log(ddd.childNodes);

/*
*
* tree prototype - v1
* PUT FUNCTIONS TOGETHER
*
*/

function Tree(){
	//element()
	this.element = function(ops){
		ops.tag = ops.tag || "div";
		var element = document.createElement(ops.tag);
		delete(ops.tag);
		
		if(ops.classes !== undefined){
			element.className = ops.id;
			delete(ops.classes);
		}
		
		if(ops.text !== undefined){
			element.appendChild( document.createTextNode(ops.text));
			delete(ops.text);
		}
		
		for(var attr in ops){
			if( element[attr] != undefined){
				element[attr] = ops[attr];
				// IE7/8 ONLY
				//document.createElement("<input type='submit' name='tal' value='Enviar' />")
			}
		}
		
		return element;
	}
	
	//iterator()
	this.it = function(obj, parent){
		for(var k in obj){
			El = document.createElement("div");
			El.className += k;
			El.appendChild( document.createTextNode(k) );
			//console.log(parent, El);
			parent.appendChild(El);
			it(obj[k], El);
		}
	};
	
	//RETURN OBJECT
	return this;
}


window.onload = function(){
	t = new Tree();
	a = t.element({tag:"button", classes: "class01 class02", id: "superBt", type: "reset", text: "Big Button", onclick: function(){console.log("button big")}});
	b = t.element({tag:"a", classes: "class01 class02", id: "superA", href: "#super", text: "Big Button", onclick: function(){console.log("link big")}});
	document.body.appendChild(a);
	document.body.appendChild(b);
	
	//document.body.appendChild(ddd);

}

/*
*
* OBJECT EXTENSION
* toString FUNCTION
*
*/
Object.prototype.toString = function(){
	var str = " ";
	for(prop in this) str += prop + "\n";
	return str;
};



/*
*
* HTML TAGS obj
*
*/
tags = {
		a : {},
		abbr : {},
		acronym : {h4:true},
		address : {},
		applet : {h4:true},
		area : {self:true},
		article : {h5:true},
		aside : {h5:true},
		audio : {h5:true},
		b : {},
		base : {self:true},
		basefont : {h4:true},
		bdi : {h5:true},
		bdo : {},
		big : {h4:true},
		blockquote : {},
		body : {},
		br : {self:true},
		button : {},
		canvas : {h5:true},
		caption : {},
		center : {h4:true},
		cite : {},
		code : {},
		col : {self:true},
		colgroup : {},
		command : {self:true},
		datalist : {h5:true},
		dd : {},
		del : {},
		details : {h5:true},
		dfn : {},
		dialog : {h5:true},
		dir : {h4:true},
		div : {},
		dl : {},
		dt : {},
		em : {},
		embed : {self:true},
		fieldset : {},
		figcaption : {h5:true},
		figure : {h5:true},
		font : {h4:true},
		footer : {h5:true},
		form : {},
		frame : {h4:true},
		frameset : {h4:true},
		h1 : {},
		head : {},
		header : {h5:true},
		hr : {self:true},
		html : {},
		i : {},
		iframe : {},
		img : {self:true},
		input : {self:true},
		ins : {},
		kbd : {},
		keygen : {self:true,h5:true},
		label : {},
		legend : {},
		li : {},
		link : {self:true},
		main : {h5:true},
		map : {},
		mark : {h5:true},
		menu : {},
		menuitem : {h5:true},
		meta : {self:true},
		meter : {h5:true},
		nav : {h5:true},
		noframes : {h4:true},
		noscript : {},
		object : {},
		ol : {},
		optgroup : {},
		option : {},
		output : {h5:true},
		p : {},
		param : {self:true},
		pre : {},
		progress : {h5:true},
		q : {},
		rp : {h5:true},
		rt : {h5:true},
		ruby : {h5:true},
		s : {},
		samp : {},
		script : {},
		section : {h5:true},
		select : {},
		small : {},
		source : {self:true,h5:true},
		span : {},
		strike : {h4:true},
		strong : {},
		style : {},
		sub : {},
		summary : {h5:true},
		sup : {},
		table : {},
		tbody : {},
		td : {},
		textarea : {},
		tfoot : {},
		th : {},
		thead : {},
		time : {h5:true},
		title : {},
		tr : {},
		track : {self:true,h5:true},
		tt : {h4:true},
		u : {},
		ul : {},
		'var' : {},
		video : {h5:true},
		wbr : {self:true,h5:true}
	}

/*
*
* PROTOTYPE
*
*/
//TESTS
function AB(){
	this.ff = function(){
		console.log("ff()");
	};
	this.fb = function(){
		console.log("fb()");
	}
	
	//this.fb();
	return this;
}

AB.prototype.fc = function(){
	this .fb();
}

var a = new AB();
a.ff();
a.fb();
a.fc();


/*
*
* CHANGE DOCTYPE
*
*/
//HTML 4 STRICT
var nodeDoctype = document.implementation.createDocumentType(
 'HTML',
 '-//W3C//DTD HTML 4.01//EN',
 'http://www.w3.org/TR/html4/strict.dtd'
);
//HTML 5
var nodeDoctype = document.implementation.createDocumentType("HTML","","");
//IF ALREADY EXISTS
if(document.doctype) {
	document.replaceChild(nodeDoctype, document.doctype);
} else {
	document.insertBefore(nodeDoctype, document.childNodes[0]);
}

/*
*
*	SET BACKGROUND COLOR
*	USING RGB
*
*/
t.body.style.backgroundColor = "rgb(100,150,135)";

/*
*
*	VARIABLE SETTER AND GETTERS
*
*/
Varib = function(){

	this.add = function(pName, value){
		value = value || " ";

		pDescr = {};
		pDescr[pName] = {
			get: function(){
				return this[pName + "V"];
				},
			set: function(newV){
				this[pName + "V"] = newV;
				for(i in this[pName + "L"])
					this[pName + "L"][i].style[pName] = this[pName + "V"];
				},
			enumerable:true,
			configurable:true
			};
			
		Object.defineProperties(this, pDescr);
		
		this[pName + "V"] = value;
		this[pName + "L"] = [];
		
	}
	
	this.del = function(pName){
		delete this[pName];
		delete this[pName+"L"];
		delete this[pName+"V"];
	};
}

z = new Varib();
z.add("borderBottom");
z.add("alignment", "vertical super alignment");
console.log(z.borderBottom);
cnt = t.body.children[0].children
z.borderBottomL.push(cnt[0], cnt[1], cnt[3]);
z.borderBottom = "solid 10px #FFCADE";

for(k in z)
	console.log(k);


/*
*
*	CSS WITH VARIABLES
*
*/
var cssVar = function(){
	$superColor = 500;
	$str = "solid 1px {$superColor + 250 + px} other {} text {nextVar + Num_} $nother";
	console.log($str);
	
	$str = $str.match(/[\w]+|\$[\w]+|\{(?!\}).*?\}/g);
	//.match(/\$[\w]+/g);

	//sp = '593'; eval("sp + 156");
	
	console.log($str);
	//$str[2] = $str[2].slice(1,-1);
	//$str[2] = eval($str[2]);
	
	$str = $str.map(function(p){
		if(p[0] == "{"){
			return p.slice(1,-1);
		}else if(p[0] == "$"){
			return p.slice(1);
		}else{
			return p;
		}
	});
	
	console.log($str.join(" "));
	
	
}

//MATCH EXPRESSIONS: str{expr}str | word | $var
str = 'prfA{$superColor + 250}Apx prfB{$var + $var} {$var * 50}Bpx solid {$bwidth + $ouVar} $lightColor $otherVar $tVar {} urlMonth super-value url("/path/to/{$var}.png")' + " url('/path/to/{$var}.png')";

	str = str.replace(/(\'|\")/g, "\\$1");
	console.log(str);
	
	var exprArr = [];

	afix = function(expr){
		console.log(arguments);

		if(arguments[0] === "{}" ) return '\0';
		
		var finalMatch = "";

		if( arguments[1] ) finalMatch += "'" + arguments[1] + "' + " ;

		if( arguments[2] ) finalMatch += arguments[2];
			
		if( arguments[3] ) finalMatch += " + '" + arguments[3] + "'" ;
			
		if(!arguments[1] && !arguments[2] && !arguments[3] ) finalMatch = arguments[0];

		exprArr.push(finalMatch);
		
		return finalMatch;
	}


	//console.log( str.replace(/(|[\w]+)\{(?!\})(.*?)\}([\w]+|)/g, afix) );
	//console.log( str.match(/(|[\w\S]+)\{(?!\})(.*?)\}([\w\S]+|)|\$[\w]+|[\w\S]+/g).length );
	console.log( str + "\n\n", str.replace(/(|[\w\S]+)\{(?!\})(.*?)\}([\w\S]+|)|[\w\S]+|\$[\w]+/g, afix) );

	for(var i in exprArr)
		console.info(parseInt(i)+1, exprArr[i]);
	
	$var = "IMAGE";
	console.log( eval(exprArr[10]) );
	console.log( eval(exprArr[11]) );
	//console.log( "a b c ".replace(/[\w]|[\s]/g, function(a){console.log('ARG',arguments);}) );


/*
*
*	CSS EXPRESSION EVAL
*
*/
vr = 500;
va = 800;
exprStr = "(200 + vr + va) / 50 + px";

var cssExpr = function(exprStr){
	if(exprStr === undefined) return false;
	
	exprVars = exprStr.match(/[:alpha:][\w]+|[^\d\s\W][\w]+/g);

	for(v in exprVars){
		if(!(exprVars[v] in this))
			this[exprVars[v]] = exprVars[v];
	}

	return eval(exprStr);
}

console.log( cssExpr(exprStr) );


//=== other try
try {
	eval("VARR + OTHER + 426654");
	}catch(e){
		console.error(e.name, e.message);
		if(e.name == "ReferenceError") console.info("variable not existent")
		}



/*
*	TRY/CATCH CREATE ELEMENT FOR IE7/8
*
*/
ops = {
	tag : "div",
	classes : "super duber uber",
	id : "thisDIV",
	dir : "ltr"
};

ops.className = ops.classes;
delete ops.classes;

try {
	var Element = document.createElement(ops.tag);
	for(var attr in ops){
		if( attr in Element ){
			Element[attr] = ops[attr];
		}
	}
} 
catch(e){
	var code = "<" + ops.tag;
	for(var attr in ops){
		code += " " + attr + "='" + ops[attr] + "'";
	}
	code += "></" + ops.tag + ">";
	var Element = document.createElement(code);
}
finally{
	console.log(Element);
}



/*
*
*	LINK TAG WITH SRC DATA
*
*/
a = document.createElement("link");
a.type = "text/css";
a.rel = "stylesheet";
a.href = "data:text/css;charset=utf-8, body { background-color:red; }";
document.head.appendChild(a);


/*
*
* FUNCTION RETURNING ITSELF 
*
*/
a = {
  f : function(){
    return this.f;
  }
};

/*
*
* FUNCTION CALL METHOD
*
*/
function foo() {
  console.log( this.bar );
}
var obj2 = {
  bar: "obj2"
};

foo.call( obj2 );   // "obj2" ~ this === obj2


/*
*
* CLOSURE 
*
*/
    
Closure = function(a){
  var x = 40;
  
  return {
    apiFunc : function(b){
      console.info(a,x,b);
      return b*a;
    }
  };
};

a = Closure(8);
a.apiFunc(16);

/*
*
* KIND OF MAGIC METHODS
* MORE OF A CACHE OF OBJECTS.
* WHEN A UNDEFINED OBJECT PROPERTY IS CALLED, IT IS AUTOMATICALLY CREATED
*
*/
masked = {
  a : function(msg){
    console.log(msg);
  }
};
api = function(name){
  return masked[name];
  /*
  if(name in masked)
    return masked[name];
  else
    return masked[name];
    //return masked[name] = new Function('msg', 'console.log(msg);');
    */
};
api('a')('calling a');
api('x')('calling x');
console.log(masked);

/*
*
* FUNCTION AS OBJECT PROTOTYPE
* BETTER THAN OBJECT
*
*/
a = function(){
  x = 30;
  console.log(this.a.e, this.a.p);
  return this.a.e + this.a.p + x;
};
a.e = 50;
a.p = 90;
a.r = function(){
  console.log(this, this.e, this.p ); //THIS ACCESS PARENT FUNCTION ~ a
};
a.r();

//console.log(a, a.e, a.p);
a();

//Examples
a('tag#id.class').actions();
a.tag#id.actions();
a['tag#id.class'].actions();

/*
*
* FUNCTION CONSTRUCTOR 
* Without the new operator, Function gives exactly the same result.
* You can use array functions like push(), unshift() or splice()
* to modify the array before passing it to apply. 
*
*/
args = ['a', 'b', 'return(a + b);'];
myFunc = Function.apply(null, args);

/*
*
* MAIN OBJECT NOT WRITABLE/CONFIGURABLE
*
*/
__super = function(){
  
};
Object.defineProperty(window, '__super', {writable : true, enumerable : false, configurable : false});
__super.e = 50;
console.log(__super);
console.log(window);


/*
*
* INSTANCEOF 
*
*/
__super instanceof Function
[] instanceof Array


/*
*
* NOTATION
*
*/
function rz(){
  this.z = function(){};
  this.z.ddd = {};
  
  return this.z;
}
a = new rz();
console.log(a);
