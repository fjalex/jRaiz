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
	
	this.varObj = {
		//$lightColor : 30,
		
		add : function(pName, value){
			value = value || " ";
			
			if(pName in this){
				if(pName + "V" in this && this[pName + "V"] !== undefined && value !== undefined)
					this[pName+"V"] = value;
				
				return false;
			}
 			//console.log(pName);

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
			
			return true;
		},
		
		del : function(pName){
			delete this[pName];
			delete this[pName+"L"];
			delete this[pName+"V"];
			return true;
		},
		
		css : function(obj, parent){
			console.groupCollapsed("CSS OBJ");
			console.log(obj);
			
			for(var r in obj){
				var str = obj[r];
				//console.info("RULE STRING ", str);

				if( str.indexOf("$") < 0 && str.indexOf("{") < 0 ) continue;
				
				//str = str.match(/[\w]+|\$[\w]+|\{(?!\}).*?\}/g);
				str = str.match(/\{(?!\}).*?\}|[\w\S\-]+|\$[\w]+/g);
				
				for(var p in str){
					subProp = str[p];

					if(subProp[0] == "{"){
						str[p] = str[p].slice(1,-1);
						exprVar = str[p].match(/\$[\w]+/g);
						if(exprVar !== null)
							for(vr in exprVar)
								console.log("ADD_VAR", exprVar[vr], this.add(exprVar[vr]) );
					} else if(subProp[0] == "$"){
						console.log("ADD_VAR", subProp, this.add(subProp) );
						////str[p] = str[p].slice(1);
						//str[p] = eval(str[p]);
					}
				}

				console.info(">>> END", str);
			}
			
			//for(v in this)
			//	console.log(v);
			
			console.groupEnd();
		}
	}
	
	this.basicCss = {
		".cols" : {
			float : "left",
			minHeight : "5px",
			padding : "0px 10px",
			marginBottom : "10px"
		}
	};
	
	this.Sheet = function(obj){
		this.styleTag = treeThis.element({tag: "style", type: "text/css", parent: document.head});
		if("$media" in obj){
			this.styleTag.media = obj.$media;
			delete obj.$media;
		}
		this.style = this.styleTag.sheet;
		this.length = this.style.rules.length;
		
		
		this.rules = function(obj){
			if(obj !== undefined){
				console.log(obj);
				
				for(rule in obj){
					this.style.addRule(rule, "");
					this.length = this.style.rules.length;
					console.group(rule);
					
					if(typeof obj[rule] == "object" ){
						for(prop in obj[rule]){
							ruleStyle = this.style.rules[this.length - 1].style;
							if(prop in ruleStyle){
								console.log(prop, obj[rule][prop]);
								ruleStyle[prop] = obj[rule][prop];
							}
						}
					}
					
					console.groupEnd();
				}
			}
		};
		
		this.rules(obj);
		
	};
	
		
	//STYLE TAG
	this.styleSheet = function(){
		var style = document.createElement("style");
		style.type = "text/css";
		document.head.appendChild(style);
		var css = style.sheet;
		console.log(css);
		
		//console.log(a.);
		//document.styleSheets[0].media.appendMedium("screen and (max-height: 600px) and (min-width: 600px)");
		//document.styleSheets[0].media.appendMedium("screen and (max-width: 600px)");
		//document.styleSheets[0].addRule("body", "background:red;");
		//document.styleSheets[0].addRule(".container", "height: 800px;");
		
		//MEDIA RULES
		//document.styleSheets[0].media.appendMedium("screen and (max-width: 800px)");
		//document.styleSheets[0].media.appendMedium("screen and (min-height: 600px)");
		//document.styleSheets[0].media.deleteMedium("(min-height: 500px)");

		for(rule in rules){
			console.log(rule);
		}

		
		var classSelector, classRule,
				width = 960,
				margin = 10,
				nCols = 12,
				colW = width / nCols;

		for(i = 1; i <= nCols; i++){
			classSelector = ".col_" + i;
			classRule = "width: " + parseInt( colW * i - (2*margin) ) + "px";
			css.addRule(classSelector, classRule);
			//console.info(classSelector, classRule);
		}

		return css;
	};
	
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
		treeThis.body = document.body;
	};

	//element() FUNCTION
	this.element = function(ops){
		ops = ops || {};
		ops.tag = ops.tag || "div";

		if( this.strict && "h5" in this.tags[ops.tag] ){
			console.log("html5", ops.tag);
		}
		
		var Element = document.createElement(ops.tag);
		delete(ops.tag);
		
		if(ops.classes !== undefined){
			Element.className = ops.classes.trim();
			delete(ops.classes);
		}
		
		//SELF CLOSING TAGS CANNOT HAVE TEXT NODES
		if(ops.text !== undefined && !( 'self' in this.tags[ Element.nodeName.toLowerCase() ] )){
			Element.appendChild( document.createTextNode(ops.text));
			delete(ops.text);
		}
		
		for(var attr in ops){
			if( attr in Element ){
				try{
					Element[attr] = ops[attr];
				} catch (e){
					console.error("THE ELEMENT: " + Element
					+ "\nDOES NOT ACCEPT THE ATTRIBUTE: [" + attr
					+ "]\nWITH THIS VALUE: [" + ops[attr] + "]");
				}
			}
		}
		
		if("parent" in ops){
			ops.parent.appendChild(Element);
		}
		
		return Element;
	};
	
	
	//iterator() FUNCTION
	this.it = function(obj, parent){
		parent = parent || this.body;
		for(var k in obj){

			if(typeof obj[k] == "object" && "$" in obj[k]) ops = obj[k].$;
				else ops = {};

			ops.classes = ops.classes || "";
			
			switch(k){
				case "$":
					for(v in obj[k]){
						//WHEN $VARS
						if(v[0] == '$'){
							this.varObj.add(v, obj[k][v]);
						} else if(v == "css"){
							this.varObj.css(obj[k][v], parent);
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
					treeThis.it(obj[k], Element);
			}
			
		}
	};
	
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
		var formNode = {$ : {classes : ""}};
		var inline = false;
		
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
	};
	
	//TREE OBJ END
	return this;
}

//TREE OBJ INIT
t = new Tree();
//t.it(struct, t.body);
