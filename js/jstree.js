function Tree(){
	//PROTOTYPE REFERENCE
	var tree = this;

	//DEBUG MODE
	this.debug = false;
	
	//STRICT ~ HTML5 = false | HTML4 = true
	this.strict = true;
	
	//FAKE BODY TAG
	this.body = {
		appendChild : function( element ){
			this.children.push( element );
		},
		children : []
	};
	
	//HTML 4 SPECIFIC TAGS
	this.html4 = {
		acronym : {},
		applet : {},
		basefont : {},
		dir : {},
		font : {},
		frame : {},
		frameset : {},
		noframes : {},
		strike : {},
		tt : {},
	};
	
	//HTML 5 SPECIFIC TAGS
	this.html5 = {
		audio : {},
		bdi : {},
		canvas : {},
		datalist : {},
		dialog : {},
		keygen : {self:true},
		meter : {},
		output : {},
		progress : {},
		source : {self:true},
		time : {},
		track : {self:true},
		video : {},
		wbr : {self:true}
	};

	//HTML5 SECTIONS
	this.sections = {
		article : {},
		aside : {},
		details : {},
		figcaption : {},
		figure : {},
		footer : {},
		header : {},
		main : {},
		mark : {},
		menu : {},
		menuitem : {},
		nav : {},
		rp : {},
		rt : {},
		ruby : {},
		section : {},
		summary : {},
	};

	//HTML TAGS
	this.tags = {
		a : {},
		abbr : {},
		address : {},
		area : {self:true},
		b : {},
		base : {self:true},
		bdo : {},
		big : {},
		blockquote : {},
		body : {},
		br : {self:true},
		button : {},
		caption : {},
		center : {},
		cite : {},
		code : {},
		col : {self:true},
		colgroup : {},
		command : {self:true},
		dd : {},
		del : {},
		dfn : {},
		div : {},
		dl : {},
		dt : {},
		em : {},
		embed : {self:true},
		fieldset : {},
		form : {},
		h1 : {},
		h2 : {},
		h3 : {},
		h4 : {},
		h5 : {},
		h6 : {},
		head : {},
		hr : {self:true},
		//html : {},
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
		u : {},
		ul : {},
		'var' : {},
	};
	
	//WHEN BODY IS READY ~ HANDLER
	window.onload = function(){
		var children = tree.body.children;
		if( children.length > 0 )
			for( var element in children)
				document.body.appendChild( children[element] );
		
		tree.body = document.body;
	};
	
	return this;
}

/*
		DEBUGGER FUNCTION
*/
Tree.prototype.bug = function(err){
	if(this.debug && err != undefined){
		var msg = "jsTree\n";
		if(Array.isArray(err)){
			for(var k in err){
				msg += "\n\t" + err[k];
			}
		} else {
			msg += "\n\t" + err;
		}
		console.error( msg );
	}
	return false;
}

/*
		INIT FUNCTION
*/
Tree.prototype.init = function(config){
	if(config == undefined)
		return this.bug([
			"YOU MUST CALL init() WITH A CONFIGURATION OBJECT!",
			"SOMETHING LIKE THIS: init({var1: val, var2: val})"
			]);
	
	//IF SECTIONS == TRUE, AUTOMATICALLY SETS TO HTML 5
	if(config.sections != undefined && config.sections){
		config.strict = false;
		for(var section in this.sections)
			this.tags[section] = this.sections[section];
	}
	
	//IF CONFIG.STRICT == FALSE ~ HTML 5!
	if(config.strict != undefined && !config.strict){
		this.strict = false;
		for(var tag in this.html5)
			this.tags[tag] = this.html5[tag];
		
		var nodeDoctype = document.implementation.createDocumentType("HTML","","");
		if(document.doctype) {
			document.replaceChild(nodeDoctype, document.doctype);
		} else {
			document.insertBefore(nodeDoctype, document.childNodes[0]);
		}
	}
	
	//IF STRICT == TRUE ~ HTML 4
	if(this.strict){
		for(var tag in this.html4)
			this.tags[tag] = this.html4[tag];
	}
	
	if(config.external != undefined && Array.isArray(config.external) ){
		for(var k in config.external){
			var ext = config.external[k].slice(-4);
			if(ext[1] == "c" && ext[2] == "s" && ext[3] == "s"){ //WHEN CSS
				var imprt = {tag: "link", rel: "stylesheet"};
				
				if(ext[0] == "."){
					imprt.href = config.external[k]; //WHEN .CSS
				} else if(ext[0] == "|"){
					imprt.href = config.external[k].slice(0,-4); //WHEN |CSS
				}
			} else if(ext[2] == "j" && ext[3] == "s"){ //WHEN JS
				var imprt = {tag: "script", type: "text/javascript"};
				
				if(ext[1] == "."){
					imprt.src = config.external[k];
				} else if(ext[1] == "|"){
					imprt.src = config.external[k].slice(0,-3)
				}
			}
			
			imprt = this.element(imprt);
			document.head.appendChild(imprt);
		}
	}
	
	if(config.structure != undefined){
		this.nodes(config.structure);
	}
	
	return true;
}

/*
		HTML ELEMENT FUNCTION
		- VERIFIES IF THE TAG BELONGS TO STRICT
		- VERIFIES IF THE TAG BELONGS TO HTML 5
		- CREATES ELEMENT AND NODE NAME
		- ADD CLASSES TO ELEMENT
		- ADD TEXT NODE ONLY IF IT'S NOT SELF CLOSING TAG
		- ITERATE ELEMENT ATTRIBUTES
		- RETURN ELEMENT
*/
Tree.prototype.element = function(ops){
	ops = ops || {};
	ops.tag = ops.tag || "div";
	
	if(this.strict && this.tags[ops.tag] == undefined)
		return this.bug("STRICT HTML DOES NOT ALLOW THE TAG: " + ops.tag);
	
	if(!this.strict && ops.tag in this.html4)
		return this.bug("HTML 5 DOES NOT ALLOW THE TAG: " + ops.tag);
	
	var Element = document.createElement(ops.tag),
			nodeName = Element.nodeName.toLowerCase();
	
	if(ops.classes != undefined) Element.className += ops.classes;
	
	//SELF CLOSING TAGS
	if(ops.text != undefined && !('self' in this.tags[nodeName]) )
		Element.appendChild( document.createTextNode(ops.text));
	
	for(var attr in ops){
		try{
			if(attr in Element) Element[attr] = ops[attr];
		} catch(e){
			return this.bug([
				"THE ELEMENT: " + Element,
				"DOES NOT ACCEPT THE ATTRIBUTE: " + attr,
				"WITH THIS VALUE: " + ops[attr]
				]);
		}
	}
	
	return Element;
}

/*
		NODES FUNCTION
		- GETS OBJ
		- TEST IF CONFIGURATION ($)
		- TEST IF TEXT OR HTML CODE
		- TEST IF TAG NAME EXISTS
		- IF NOT A TAG NAME, CREATES A DIV
		- APPEND NEW ELEMENT TO PARENT;
*/
Tree.prototype.nodes = function(obj, parent){
	parent = parent || this.body;

	if(obj == undefined) return this.bug("EMPTY ARGUMENT!");
	
	if(typeof obj == "object")
		for(var k in obj){
			var ops = {};
			
			if(typeof obj[k] == "object" && "$" in obj[k]){
				ops = obj[k]["$"];
			}
			
			if( k == "$"){
				parent.className += " " + obj[k].classes;
				parent.id = obj[k].id;
				continue; //JUMP TO NEXT KEY
			}
			
			if(k == "text"){
				parent.innerText += obj[k];
				continue;
			}
			
			if(k == "html"){ //TODO: must update body tree
				parent.innerHTML += obj[k];
				continue;
			} 

			if(k in this.tags) ops.tag = k;
				else ops.classes = k;
			
			var Element = this.element(ops);
			
			parent.appendChild(Element);
			
			this.nodes(obj[k], Element);
		}
	
	return this;
}

/*
		CREATES ONE <style> TAG
		ADD IT TO THE DOCUMENT HEAD AS THE 1st styleSheet
		RETURN document.styleSheets[0]
*/
Tree.prototype.styleSheet = function(){
	
}

/*
		CSSOBJ FUNCTION
*/
Tree.prototype.cssOBJ = function( obj ){
	
}

/*
		PAGE FUNCTION
			CREATES PAGE
			REGISTER PAGE
			RETURN PAGE
*/
Tree.prototype.page = function(){
}

/*
		MODAL FUNCTION
			CREATES MODAL
			REGISTER MODAL
			RETURN MODAL
*/
Tree.prototype.modal = function(){
	
}

/*
		LOGO FUNCTION
*/
Tree.prototype.logo = function(ops){
	ops = ops || {};
	ops.id = ops.id || "logo";
	ops.classes = ops.classes || " ";
	ops.link = ops.link || "/";
	ops.title = ops.title || "Home";
	ops.h1 = ops.h1 == undefined ? true : ops.h1;
	
	var logo = {},
			c = {
				id : ops.id,
				classes : ops.classes
			},
			link = {
				href : ops.link,
				title : ops.title
			};
	
	if(ops.h1){
		logo["h1"] = {
			$ : c,
			a : link
		};
	} else {
		logo["a"] = link;
		logo.a["$"] = c;
	}
	
	return logo;
}

/*
		COLOR FUNCTION
*/
types = {};
types.Color = function(value){
	this.value = value;
	this.list = [];
	this.change = function(newValue){
		this.value = newValue;
		for(var k in this.list){
			list[k] = newValue.toString();
		}
	};
	this.add = function(newItm){
		this.list.push(newItm);
	};
	this.remove = function(){
		
	};
	this.toString = function(){
		return this.value;
	};
	
	return this;
}
Tree.prototype.color = function(value){
	return new types.Color(value);
}

t = new Tree();
t.debug = true;
//t.init();
