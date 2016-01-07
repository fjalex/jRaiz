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
			
		this[pName + "V"] = value;
		this[pName + "L"] = [];
			
		Object.defineProperties(this, pDescr);
		
	}
	
	this.del = function(pName){
		delete this[pName];
		delete this[pName+"L"];
	};
}

z = new Varib();
z.add("borderBottom");
z.add("alignment");
console.log(z.borderBottom);
cnt = t.body.children[0].children
z.borderBottomL.push(cnt[0], cnt[1], cnt[3]);
z.borderBottom = "solid 10px #FFCADE";

for(k in z)
	console.log(k);
