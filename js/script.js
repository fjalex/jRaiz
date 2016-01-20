cssRules  = {
	$ : {
		media : "screen and (min-width:800px)",
		$bWidth : 5,
		$mainColor : "#FCADEB"
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
	container : {
		$ : {
			classes : "criatr lska",
			id : "superDiv",
			css : {
				marginA : "30px 40px",
				margin : "30px {30 +20}",
				backgroundColor : "$lightColor",
				border : "solid {$bwidth + $ouVar} $lightColor $otherVar $tVar" //REGISTER VAR, WHEN UNDEFINED
			},
			$var1 : 465, //REGISTER VAR, WHEN UNDEFINED AND ASSIGN VALUE
			$var2 : "200px",
			$lightColor : "#FCADEB",
			$bwidth : 20
		},
		header : {
			$ : {
				dir: "ltr",//'ltr', //TRY/CATCH ERROR
				onclick : function(e){
					console.log(e,e.offsetX, e.x, e.clientX, e.layerX, e.movementX);
				},
				css : {
					margin : "40px 50px",
					fontFamily : "$fontFamily",
					background : "url('/img/headerbg.jpg') no-repeat center top $lightColor",
					color : "$lightColor"
				}
			},
			logo : {},
			menu : {}
		},
		main : {
			$ : {
				css : {
					backgroundColor : "$lightColor"
				}
			},
			article1 : {
				text : 'TEXT TEXT TEXT TEXT TEXT ',
				html : '|| HTML HTML HTML <a href="#">LINK</a> \n <code> Super code </code>',
				a : {}
			},
			article2 : {
				form : t.form({
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
			article3 : {},
			article4 : {},
			article5 : {}
		},
		sidebar : {
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
			col1 : {},
			col2 : {},
			col3 : {}
		}
	},
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
	}
};


t.init({strict:false, sections:true});
t.it(struct);

var a = new t.Sheet(cssRules);
console.info(document.styleSheets);
