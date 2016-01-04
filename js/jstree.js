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
		HTML ELEMENT FUNCTION
		- VERIFIES IF THE TAG BELONGS TO STRICT
		- VERIFIES IF THE TAG BELONGS TO HTML 5
		- CREATES ELEMENT AND NODE NAME
		- ADD CLASSES TO ELEMENT
		- ADD TEXT NODE ONLY IF IT'S NOT SELF CLOSING TAG
		- ITERATE ELEMENT ATTRIBUTES
		- RETURN ELEMENT
*/
Tree.prototype.element = function(){
	ops.tag = ops.tag || "div";
	
	if(this.strict && this.tags[ops.tag] == undefined)
		return tree.bug("STRICT HTML DOES NOT ALLOW THE TAG: " + ops.tag);
	
	if(!this.strict && "h4" in this.tags[ops.tag])
		return tree.bug("HTML 5 DOES NOT ALLOW THE TAG: " + ops.tag);
	
	var Element = document.createElement(ops.tag),
			nodeName = Element.nodeName.toLowerCase();
	
	if(ops.classes != undefined) Element.className += ops.classes;
	
	//SELF CLOSING TAGS
	if(ops.text != undefined && !('self' in this.tags[nodeName]) )
		Element.appendChild( document.createTextNode(ops.text));
	
	for(var attr in ops){
		if(attr in Element) Element[attr] = ops[attr];
	}
	
	return Element;
}

/*
		CREATES ONE <style> TAG
		ADD IT TO THE DOCUMENT HEAD AS THE 1st styleSheet
		document.styleSheets[0]
*/
Tree.prototype.styleSheet = function(){
	
}

/*
		VERIFIES IF HTML 4 OR 5
		WHEN HTML 5, VERIFIES IF USES SECTIONS OR DIVS
		INITIALIZES THE APP STRUCTURE
*/
Tree.prototype.cssOBJ = function( obj ){
	
}

/*
		NODES FUNCTION
*/
Tree.prototype.nodes = function(obj, parent){
	parent = parent || tree.body;
	
	if(obj == undefined) return tree.bug("EMPTY ARGUMENT!");
	
	if(typeof obj == "object")
		for(var k in obj){
			if( k == "$"){
				parent.className += " " + obj[k].classes;
				parent.id = obj[k].id;
				continue; //JUMP TO NEXT KEY
			}
			
			if(k == "text"){
				parent.innerText += obj[k];
				continue;
			}
			
			if(k == "html"){
				parent.innerHTML += obj[k];
				continue;
			} 

			if(k in tree.tags) ops.tag = k;
				else ops.classes = k;
			
			var Element = tree.element(ops);
			
			parent.appendChild(Element);
			
			tree.nodes(obj[k], Element);
		}
	
	return this;
}

t = new Tree();
t.init();
