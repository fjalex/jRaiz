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
