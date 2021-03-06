cssRules  = {
	$ : {
		media : "screen and (min-width:800px)",
		$bWidth : 5,
		$mainColor : "#FCADEB"
	},
	body : {
		//backgroundColor : "lightgrey",
		//padding: '50px'
	},
	".container>div" : {
		backgroundColor: "orange",
		float : "left",
		margin: "10px"
	},
	".container" : {
		border: "solid 1px blue",
		margin: "0px auto",
		width: "960px"
	},
	".header" : {
		height: "200px",
		width: "940px"
	},
	".main" : {
		width : "640px",
		height : "1000px",
	},
	".sidebar" : {
		minHeight : "500px",
		width : "280px",
	},
	".footer" : {
		width : "940px",
	},
	".modal" : {
		position : "absolute",
	},
	"form>label " : {
		display : "block",
		padding : "10px",
	},
	"form>label>*" : {
		display : "inline-block",
		width : "400px",
		verticalAlign: "top",
	},
	"form>label>span" : {
		padding : "0px 20px",
		width : "100px",
		textAlign: "right"
	},
	"#anySelector>div>ul>li" : {
		border : "solid {$bWidth * 2 + px } $mainColor",
		backgroundColor : "$mainColor",
		color : "$mainColor",
	}
};


struct = {
	modal : {
		button : {
			$ : {
				onclick : function(e){console.log(e)},
				classes : "super classes",
				id : "inpID",
				text : "SUPER BUTTON",
				type : "submit"
			}
		}
	},
	menubar : {
		$ : {
			classes : "fullw"
		},
		header : {
			$ : {}
		},
		menu : j.menu({
			home : {url : "#",},
			a_empresa : {url : "#", label : "A Empresa"},
			produtos : {url : "#",},
			localizacao : {url : "#", label : "Localização"},
			contato : {url : "#",},
		}),
	},
	container : {
		$ : {
			classes : "class01 class02",
			id : "superDiv",
			css : {
				//marginA : "30px 40px",
				//margin : "30px {30 +20}",
				//backgroundColor : "$lightColor",
				//border : "solid {$bwidth + $ouVar} $lightColor $otherVar $tVar" //REGISTER VAR, WHEN UNDEFINED
				//border : "$var1 $var2 $var3"
			},
			//$var1 : 465, //REGISTER VAR, WHEN UNDEFINED AND ASSIGN VALUE
			//$var2 : "200px",
			//$lightColor : "#FCADEB",
			//$bwidth : 20
			$var1 : "solid",
			$var2 : "15px",
			$var3 : "green"
		},
		header : {
			$ : {
				classes : "cols col_12",
				dir: "ltr",
				onclick : function(e){
					console.log(e,e.offsetX, e.x, e.clientX, e.layerX, e.movementX);
				},
				css : {
					//margin : "40px 50px",
					//fontFamily : "$fontFamily",
					//background : "url('/img/headerbg.jpg') no-repeat center top $lightColor",
					//color : "$lightColor"
					//border : "solid $var2 $var3",
					//backgroundColor : "$var3"
				}
			},
			logo : j.logo(),
			menu : {}
		},
		main : {
			$ : {
				classes : "cols col_8",
				css : {
					//backgroundColor : "$lightColor"
					//backgroundColor : "$var3",
					//border : "solid $var2 $var3",
				}
			},
			article1 : {
				text : 'TEXT TEXT TEXT TEXT TEXT ',
				html : '|| HTML HTML HTML <a href="#">LINK</a> \n <code> Super code </code>',
				a : {}
			},
			article2 : {
				form : j.form({
					$ : { // [$] IS ALWAYS USED FOR CONFIGURATION
						id : "superForm",
						url : "/jscode/",
						classes : "class1 class2 class3",
						inline : false,
						ajax : true,
						post : true
					},
					name : {
						type: "name",
						empty: false
					},
					email : {
						type : "email",
						label : "E-mail",
						validate : true,
						empty: false
					},
					phone :  {
						type : "phone",
						mask : "+00 00 0000 0000",
						validate : true,
						empty : false
					},
					birthday :  {
						type: "date"
					},
					message :  {
						type: "text",
						empty: false
					},
					submit : {
						label : "Send Form",
					},
					reset : {
						label : "Clear this form",
					}
				})
			},
			article3 : {
				h1 : { $ : {text : "header 1"}},
				h2 : { $ : {text : "header 2"}},
				h3 : { $ : {text : "header 3"}},
				h4 : { $ : {text : "header 4"}},
				h5 : { $ : {text : "header 5"}},
				h6 : { $ : {text : "header 6"}},
			},
			article4 : {
				t1 : {
					$ : {
						tag : "p",
						text : "dictum at. Nam euismod pulvinar ante sed iaculis. Vestibulum euismod, lacus nec condimentum dapibus, lectus nibh imperdiet neque, non dapibus dui augue id ante. Phasellus tristique turpis eu lectus luctus, quis eleifend lacus pretium. Phasellus et arcu malesuada, consectetur leo ut, molestie ante. Nunc bibendum ultrices metus, a mattis enim pretium accumsan. Quisque eget aliquet felis. Quisque viverra magna mauris, a accumsan dolor gravida at. Nunc non rhoncus libero. Cras consectetur mauris nec risus congue eleifend. Ut egestas tristique accumsan. Praesent finibus felis sem, ut suscipit neque accumsan ut."
					}
				},
				t2 : {
					$ : {
						tag : "p",
						text : "dictum at. Nam euismod pulvinar ante sed iaculis. Vestibulum euismod, lacus nec condimentum dapibus, lectus nibh imperdiet neque, non dapibus dui augue id ante. Phasellus tristique turpis eu lectus luctus, quis eleifend lacus pretium. Phasellus et arcu malesuada, consectetur leo ut, molestie ante. Nunc bibendum ultrices metus, a mattis enim pretium accumsan. Quisque eget aliquet felis. Quisque viverra magna mauris, a accumsan dolor gravida at. Nunc non rhoncus libero. Cras consectetur mauris nec risus congue eleifend. Ut egestas tristique accumsan. Praesent finibus felis sem, ut suscipit neque accumsan ut."
					}
				}
			},
			article5 : {}
		},
		sidebar : {
			$ : {
				classes : "cols col_4",
			},
			ad1 : {
				img : {}
			},
			ad2 : {
				//embed : {}
			},
			ad3 : {
				//applet : {}
			}
		},
		"div#elmID.class1.class2" : {}, // TEST
		footer : {
			$ : {
				//classes : "cols col_12",
				classes : "clear",
			},
			col1 : {
				$ : {classes : "cols col_4"}
			},
			col2 : {
				$ : {classes : "cols col_4"}
			},
			col3 : {
				$ : {classes : "cols col_4"}
			}
		}
	},
};
//*/

//j.init({strict:false, sections:true});

j.init({strict:true, sections:false});
j.nodes(struct);
//j.nodes(j.bGrid);

//console.log(j.basicCSS);
//var b = new j.Sheet(cssRules);
console.info(document.styleSheets);
//console.info(a);
