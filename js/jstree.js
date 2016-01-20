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

	/*
			DEBUGGER FUNCTION
	*/
	this.bug = function(err){
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
	this.init = function(config){
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
	this.element = function(ops){
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
		
		if("parent" in ops){
			ops.parent.appendChild(Element);
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
	this.nodes = function(obj, parent){
		parent = parent || this.body;

		if(obj == undefined) return this.bug("EMPTY ARGUMENT!");
		
		if(typeof obj == "object")
			for(var k in obj){

				if(typeof obj[k] == "object" && "$" in obj[k]) ops = obj[k].$;
					else ops = {};

				ops.classes = ops.classes || "";
				
				switch(k){
					case "$":
						for(v in obj[k]){
							//WHEN $VARS
							if(v[0] == '$'){
								this.vars.add(v, obj[k][v]);
							} else if(v == "css"){
								this.vars.css(obj[k][v], parent);
							}
						}
					break;
					
					case "text":
						parent.innerText += obj[k];
					break;
					
					case "html":
						parent.innerHTML += obj[k];
					break;
					
					default:
						if(k in this.tags) ops.tag = k;
							else ops.classes += ' ' + k;

						var Element = this.element(ops);
						parent.appendChild(Element);
						this.nodes(obj[k], Element);
				}
				
			}
		
		return this;
	}

	/*
			CREATES ONE <style> TAG AND ADD IT TO THE DOCUMENT HEAD
			RETURN styleSheet STYLE ELEMENT
			THE constructor CAN RECEIVE ONE OBJECT WITH RULES AND PROPERTIES:
			{
				rule : {
					property:value,
					property:value,
					property:value,
				},
				'#id.class>element' : {
					property:value,
					property:value,
					property:value,
				},
			}
			
			ELEMENT.style ACCESS THE RULES OBJECT
	*/
	this.basicCSS = {
		".cols" : {
			float : "left",
			minHeight : "5px",
			padding : "0px 10px",
			marginBottom : "10px"
		}
	};

	this.Sheet = function(obj){
		this.styleTag = tree.element({tag: "style", type: "text/css", parent: document.head});
		this.style = this.styleTag.sheet;
		this.length = this.style.cssRules.length;

		this.rules = function(obj){
			if("$" in obj){
				for(conf in obj.$){
					switch(conf){
						case "media":
							this.styleTag.media = obj.$.media;
							delete obj.$.media;
						break;
						
						default:
							if(conf[0] == "$"){
								//console.log(conf);
							}
					}
				}
				delete obj.$;
			}
		
			if(obj !== undefined){
				//console.log(obj);
				
				for(rule in obj){
					try {
						this.style.insertRule(rule + "{}", this.length);
						this.length = this.style.cssRules.length;
						
						//console.groupCollapsed(rule);
						
						if("float" in obj[rule]){
							obj[rule]["cssFloat"] = obj[rule]["float"];
							delete obj[rule]["float"]
						}
						
						if("text" in obj[rule]){
							obj[rule]["cssText"] = obj[rule]["text"];
							delete obj[rule]["text"];
						}
						
						if(typeof obj[rule] == "object" ){
							ruleStyle = this.style.cssRules[this.length - 1].style;
							
							for(prop in obj[rule]){
								if(prop in ruleStyle){
									//console.log(prop + ":", obj[rule][prop]);
									ruleStyle[prop] = obj[rule][prop];
								} else {
									//console.error("This browser doesn't support the '" + prop + "' property");
								}
							}
						}
						
						//console.groupEnd();
					
					}catch(err){
						//for(a in err) console.info(a, ":", err[a]);
						//console.error(err.name + "\n\n" + err.message);
					}
					
				}
			}
		};
		
		this.rules(obj);
	};


	/*
			PAGE FUNCTION
				CREATES PAGE
				REGISTER PAGE
				RETURN PAGE
	*/
	this.page = function(){
	}

	/*
			MODAL FUNCTION
				CREATES MODAL
				REGISTER MODAL
				RETURN MODAL
	*/
	this.modal = function(){
		
	}

	/*
			LOGO FUNCTION
	*/
	this.logo = function(ops){
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
			FORM FUNCTION
	*/
	this.formFields = {
		name : {tag : "input", type: "text", classes : "field name"},
		firstName : {tag : "input", type: "text", classes : "field first-name"},
		familyName : {tag : "input", type: "text", classes : "field family-name"},
		email : {tag : "input", type: "text", classes : "field email"},
		phone : {tag : "input", type: "text", classes : "field phone"},
		date : {tag : "input", type: "text", classes : "field date"},
		text : {tag : "textarea", classes : "field text"},
		submit : {tag : "input", type: "submit", classes : "button", value : "Send"},
		reset : {tag : "input", type: "reset", classes : "button", value: "Clear"}
	};

	this.form = function(form){
		var formNode = {$:{classes:""}},
				inline = false;
		
		if("$" in form){
			for(conf in form.$){
				switch(conf){
					case "url":
						formNode.$.action = form.$.url;
					break;
					
					case "inline":
						if(form.$.inline){
							inline = true;
							formNode.$.classes += " inline";
						} else{
							formNode.$.classes += " block";
						}
					break;
					
					case "ajax":
						if(!form.$.ajax) break;
						formNode.$.onsubmit = function(ev){
							console.info(ev);
							return false;
						}
					break;
					
					case "post":
						if(!form.$.post){
							formNode.$.method = "GET";
							break;
						} else {
							formNode.$.method = "POST";
							formNode.$.enctype = "multipart/form-data";
						}
					break;
					
					case "classes":
						formNode.$.classes += ' ' + form.$.classes;
					break;
					
					default:
						formNode.$[conf] = form.$[conf];
				}
			}
			
			delete form.$;
		}
		
		for(f in form){
			switch(f){
				case "submit" :
				case "reset" :
					//if(form[f].label !== undefined) console.log(form[f].label);
				break;
				
				default:
					if(inline){
						var field = formNode[f] = {};
					} else {
						var label = (form[f].label === undefined) ? f : form[f].label;
						formNode[f] = {$ : {tag : "label"}, span : {text : label} };
						var field = formNode[f][f] = {};
					}
					field.$ = this.formFields[form[f]["type"]];
					field.$.name = f;
			}
		}
		
		formNode.submit = {$ : this.formFields.submit};
		formNode.submit.$.value = form.submit.label || "Send";
		
		formNode.reset = {$ : this.formFields.reset};
		formNode.reset.$.value = form.reset.label || "Clear";
		
		//console.info(formNode, this.formFields.submit);
		return formNode
	}

	/*
			VARS OBJECT
			function add()
			function del()
			function bind()
			function unbind()
			function afix()
			function css()
			
	*/
	this.vars = {
		add : function(pName, value){
			value = value || "";
			
			var VVar = pName + "V";
			var LVar = pName + "L";
			
			if( pName in this ){
				if(value !== "")
						this[pName] = value;
				
				return false;
			}
			
			pDescription = {};
			
			pDescription[pName] = {
				get : function(){
					return this[VVar];
				},
				set : function(newVal){
					this[VVar] = newVal;
					
					var list = this[LVar];
					
					for(i in list)
						if(list[i].finalExpr === undefined )
							list[i].objPath.style[ list[i].property ] = this[VVar];
						else
							list[i].objPath.style[ list[i].property ] = list[i].finalExpr.join(" ");
							
				},
				enumerable : true,
				configurable : true
			};
			
			pDescription[VVar] = {value: value, writable: true, enumerable: false, configurable: true};
			pDescription[LVar] = {value: [], writable: true, enumerable: false, configurable: true};
			
			Object.defineProperties(this, pDescription);
			
			return true;
		},
		
		del : function(pName){
			delete this[pName];
			delete this[pName + "V"];
			delete this[pName + "L"];
			
			return true;
		},
		
		bind : function(objPath, property, pName, finalExpr){
			if(!(pName in this)) this.add(pName);
			
			bindObj = {
				objPath : objPath,
				property : property
			};
			
			if(finalExpr !== undefined) bindObj.finalExpr = finalExpr;
			
			this[pName + "L"].push(bindObj);
			this[pName] += "";
		},
		
		unbind : function(objPath){},
		
		afix : function(expr){
			if( arguments[0] === "{}" ) return '\0';
			
			var finalMatch = "";
			
			if( arguments[5] ){
				exprArr.push(arguments[5]);
				return arguments[5];
			}
			
			if( arguments[1] ) finalMatch += "'" + arguments[1] + "' + ";
			if( arguments[2] ) finalMatch += "Number(" + arguments[2] + ")";
			if( arguments[3] ) finalMatch += " + '" + arguments[3] + "'";
			
			if( arguments[4] ) finalMatch = arguments[4];
			
			exprArr.push( tree.vars.expression(finalMatch) );
			
			return finalMatch;
		},
		
		css : function(rule, parent){
			for(var property in rule){
				var pString = rule[property];
				
				if( pString.indexOf("$") < 0 && pString.indexOf("{") < 0 ) continue;
				
				onlyVars = pString.match(/\$[\w]+/g);
				
				exprArr = [];
				
				// REPLACE ['] AND ["] FOR [\'] AND [\"] - escape quote marks
				// REPLACE sufix{expr}postfix | $var | word - populates exprArr with words and expressions
				pString = pString.replace(/(\'|\")/g, "\\$1")
						.replace(/(|[\w\S]+)\{(?!\})(.*?)\}([\w\S]+|)|(\$[\w]+)|([\w\S]+)/g, this.afix);
				
				for(var i in onlyVars) this.bind(parent, property, onlyVars[i], exprArr);
				
			} //1st FOR()
		},
		
		expression : function(expr){
			var exprVars = expr.match(/\$[\w]+/g);
			if(exprVars !== null)
				for(i in exprVars){
					this.add(exprVars[i]);
				}
			
			exprObj = {
				parent : this,
				toString : new Function("with(this.parent) return " + expr + ";")
			};
			
			return Object.create(exprObj);
		}
	};

	for(func in this.vars)
		Object.defineProperty(this.vars, func, {enumerable : false, writable : false});

/*
		TREE END
*/
	return this;
}


/*
		INITIALIZATION
*/
t = new Tree();
t.debug = true;
//t.init();
