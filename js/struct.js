/*
PARSE HTML ~ 1000 DIVS = 6.40ms
*/

menus = {
	
};
footers = {
	
};

/*
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
*/


function Tree(){
	//STYLE TAG
	this.styleSheet = function(){
		var style = document.createElement("style");
		style.type = "text/css";
		var a = document.head.appendChild(style);
		//console.log(a.);
		//a.addRule(".container", "background:red;", 0);
		return document.styleSheets[0];
	}
	
	this.css = this.styleSheet();
	//this.css.addRule(".container", "background:orange;", 0);
	console.log(document.styleSheets);
	
	//SET BASIC CONFIGURATION
	this.init = function(config){
		if(config !== undefined){
			console.log(config);
		}
	}
	
	//PROTOTYPE REFERENCE
	var treeThis = this;
	
	//FAKE BODY TAG
	this.body = {
		appendChild : function( element ){
			this.children.push( element );
		},
		children : []
	};
	
	//WHEN BODY IS READY ~ HANDLER
	window.onload = function(){
		var children = treeThis.body.children;
		if( children.length > 0 ){
			//console.log(treeThis.body);
			for( var element in children){
				document.body.appendChild( children[element] );
			}
		}
	}

	//element() FUNCTION
	this.element = function(ops){
		ops.tag = ops.tag || "div";
		var Element = document.createElement(ops.tag);
		delete(ops.tag);
		
		if(ops.classes !== undefined){
			Element.className = ops.classes;
			delete(ops.classes);
		}
		
		if(ops.text !== undefined){
			Element.appendChild( document.createTextNode(ops.text));
			delete(ops.text);
		}
		
		for(var attr in ops){
			if( Element[attr] != undefined){
				Element[attr] = ops[attr];
				// IE7/8 ONLY
				//document.createElement("<input type='submit' name='tal' value='Enviar' />")
			}
		}
		
		return Element;
	}
	
	//iterator() FUNCTION
	this.it = function(obj, parent){
		parent = parent || this.body;
		for(var k in obj){
			var Element = this.element({classes: k, text: k});
			//console.log(parent, Element);
			parent.appendChild(Element);
			treeThis.it(obj[k], Element);
		}
	};
	
	//TREE OBJ END
	return this;
}

//TREE OBJ INIT
t = new Tree();
//t.init({a:64});
//t.it(struct, t.body);

/*
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

var a = AB();
//a.ff();
//a.fb();
//a.fc();

*/
