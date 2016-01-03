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
	//PROTOTYPE REFERENCE
	var treeThis = this;

	//STRICT ~ HTML5 = false | HTML4 = true
	this.strict = true;
	
	//HTML 5 SPECIFIC TAGS
	this.html5 = {
		audio : {h5:true},
		bdi : {h5:true},
		canvas : {h5:true},
		datalist : {h5:true},
		dialog : {h5:true},
		keygen : {self:true,h5:true},
		meter : {h5:true},
		output : {h5:true},
		progress : {h5:true},
		source : {self:true,h5:true},
		time : {h5:true},
		video : {h5:true},
		wbr : {self:true,h5:true}
	}
	
	//HTML5 SECTIONS
	this.sections = {
		article : {h5:true},
		aside : {h5:true},
		details : {h5:true},
		figcaption : {h5:true},
		figure : {h5:true},
		footer : {h5:true},
		header : {h5:true},
		main : {h5:true},
		mark : {h5:true},
		menu : {},
		menuitem : {h5:true},
		nav : {h5:true},
		rp : {h5:true},
		rt : {h5:true},
		ruby : {h5:true},
		section : {h5:true},
		summary : {h5:true},
		track : {self:true,h5:true},
	};
	
	this.tags = {
		a : {},
		abbr : {},
		acronym : {h4:true},
		address : {},
		applet : {h4:true},
		area : {self:true},
		b : {},
		base : {self:true},
		basefont : {h4:true},
		bdo : {},
		big : {h4:true},
		blockquote : {},
		body : {},
		br : {self:true},
		button : {},
		caption : {},
		center : {h4:true},
		cite : {},
		code : {},
		col : {self:true},
		colgroup : {},
		command : {self:true},
		dd : {},
		del : {},
		dfn : {},
		dir : {h4:true},
		div : {},
		dl : {},
		dt : {},
		em : {},
		embed : {self:true},
		fieldset : {},
		font : {h4:true},
		form : {},
		frame : {h4:true},
		frameset : {h4:true},
		h1 : {},
		h2 : {},
		h3 : {},
		h4 : {},
		h5 : {},
		h6 : {},
		head : {},
		hr : {self:true},
		html : {},
		i : {},
		iframe : {},
		img : {self:true},
		input : {self:true},
		ins : {},
		kbd : {},
		label : {},
		legend : {},
		li : {},
		link : {self:true},
		map : {},
		meta : {self:true},
		noframes : {h4:true},
		noscript : {},
		object : {},
		ol : {},
		optgroup : {},
		option : {},
		p : {},
		param : {self:true},
		pre : {},
		q : {},
		s : {},
		samp : {},
		script : {},
		select : {},
		small : {},
		span : {},
		strike : {h4:true},
		strong : {},
		style : {},
		sub : {},
		sup : {},
		table : {},
		tbody : {},
		td : {},
		textarea : {},
		tfoot : {},
		th : {},
		thead : {},
		title : {},
		tr : {},
		tt : {h4:true},
		u : {},
		ul : {},
		'var' : {},
	};
		
	//STYLE TAG
	this.styleSheet = function(){
		var style = document.createElement("style");
		style.type = "text/css";
		var a = document.head.appendChild(style);
		//console.log(a.);
		//a.addRule(".container", "background:red;", 0);
		return document.styleSheets[0];
	};
	
	this.css = this.styleSheet();
	//this.css.addRule(".container", "background:orange;", 0);
	console.log(document.styleSheets);
	
	//SET BASIC CONFIGURATION
	this.init = function(config){
		if(config == undefined) return null;
			
		//IF SECTIONS == TRUE, IT AUTOMATICALLY SETS HTML TO 5
		if(config.sections !== undefined && config.sections){
			config.strict = false;
			for(var sc in treeThis.sections){
				treeThis.tags[sc] = treeThis.sections[sc];
			}
		}
			
		//SETS TO HTML 5
		if(config.strict !== undefined && !config.strict){
			treeThis.strict = false;
			for(var tag in treeThis.html5){
				treeThis.tags[tag] = treeThis.html5[tag];
			}

			var nodeDoctype = document.implementation.createDocumentType("HTML","","");
			if(document.doctype) {
				document.replaceChild(nodeDoctype, document.doctype);
			} else {
				document.insertBefore(nodeDoctype, document.childNodes[0]);
			}
		}
		//console.log(treeThis.tags);
		return true;
	};
	
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
	};

	//element() FUNCTION
	this.element = function(ops){
		ops.tag = ops.tag || "div";
		
		if( this.strict && "h5" in this.tags[ops.tag] ){
			console.log("html5", ops.tag);
		}
		var Element = document.createElement(ops.tag);
		delete(ops.tag);
		
		if(ops.classes !== undefined){
			Element.className = ops.classes;
			delete(ops.classes);
		}
		
		//SELF CLOSING TAGS CANNOT HAVE TEXT NODES
		if(ops.text !== undefined && !( 'self' in this.tags[ Element.nodeName.toLowerCase() ] )){
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
	};
	
	//iterator() FUNCTION
	this.it = function(obj, parent){
		parent = parent || this.body;
		for(var k in obj){
			if(k == "$"){
				parent.className += " " + obj[k].classes;
				parent.id += " " + obj[k].id;
				continue; //jump to next key
			}
			
			ops = {text: k}
			if(k in this.tags){
				ops.tag = k;
			} else {
				ops.classes = k;				
			}
			
			var Element = this.element(ops);
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
//t.it(struct, t.body);
