//console.profile("jRaiz");

j.debug = true;

cssRules  = {
	$ : {
		media : "screen and (min-width:800px)",
		$bWidth : 5,
		$mainColor : "#FCADEB"
	},
	body : {
		backgroundColor : "lightgrey",
		//padding: '50px'
	},
	"#anySelector>div>ul>li" : {
		border : "solid {$bWidth * 2 + px } $mainColor",
		backgroundColor : "$mainColor",
		color : "$mainColor",
	}
};

struct = {
	'.modal' : {
    //$ : {css : {backgroundColor : 'red'} },
    'button#otherBT.super.class' : {
      $ : {
        text : "FIRST BUTTON",
        onclick : function(){}
      }
    },
		'button#inpID.super--.classes--' : {
			$ : {
				onclick : function(e){console.log(e);},
				text : "SUPER BUTTON",
				type : "submit"
			}
		},
	},
	'span span, span span + span + span' : [
  	{ $ : {classes : 'first _1st primeira'} },
  	{ $ : {classes : 'second _2st segunda'} },
  	{ $ : {classes : 'first _1st primeira'} },
  	{ $ : {classes : 'second _2st segunda'} },
  	{ $ : {classes : 'second _2st segunda'} },
  	{ $ : {classes : 'second _2st segunda'} },
	],
	'.menubar.fullw .header + .menu' : [
      {},
      {},
      j.menu(
        {label : 'Home', url : "http://www.url.com/home"},
        {label : 'A Empresa', url : "http://www.url.com/home" },
        {label : 'Produtos', url : "http://www.url.com/home", sub : [] },
        {label : 'Contato', url : "http://www.url.com/home", target : "_blank" }
      )
	],
	'.menubar.fullw' : {
	  '.header' : {
	    $ : {
	      classes : "zed beta alpha"
	    }
	  },
	  '.menu' : j.menu(
  	  {label : 'Home', url : "http://www.url.com/home" },
  	  {label : 'A Empresa', url : "http://www.url.com/home" },
  	  {label : 'Produtos', url : "http://www.url.com/home", sub : [] },
  	  {label : 'Contato', url : "http://www.url.com/home", target : "_blank" }
  	)
	},
	'#superDIV.container.class01.class-n02' : {
		$ : {
			css : {
				//marginA : "30px 40px",
				//margin : "30px {30 +20}",
				//backgroundColor : "$lightColor",
				backgroundColor : "#EAEAEA",
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
		'.header.cols.col_12' : {
			$ : {
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
			'.logo' : j.logo(),
			'.menu' : {}
		},
		'.main.cols.col_8' : {
			$ : {
				css : {
					//backgroundColor : "$lightColor"
					//backgroundColor : "$var3",
					//border : "solid $var2 $var3",
				}
			},
			'.article1' : j.html('HTML HTML HTML <a href="#">LINK</a> \n <code> Super code </code>'),
			'.article2' : {
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
			'.article3' : {
				h1 : { $ : {text : "header 1"}},
				h2 : { $ : {text : "header 2"}},
				h3 : { $ : {text : "header 3"}},
				h4 : { $ : {text : "header 4"}},
				h5 : { $ : {text : "header 5"}},
				h6 : { $ : {text : "header 6"}},
			},
			'.article4' : {
				'p.t1' : j.text("dictum at. Nam euismod pulvinar ante sed iaculis. Vestibulum euismod, lacus nec condimentum dapibus, lectus nibh imperdiet neque, non dapibus dui augue id ante. Phasellus tristique turpis eu lectus luctus, quis eleifend lacus pretium. Phasellus et arcu malesuada, consectetur leo ut, molestie ante. Nunc bibendum ultrices metus, a mattis enim pretium accumsan. Quisque eget aliquet felis. Quisque viverra magna mauris, a accumsan dolor gravida at. Nunc non rhoncus libero. Cras consectetur mauris nec risus congue eleifend. Ut egestas tristique accumsan. Praesent finibus felis sem, ut suscipit neque accumsan ut."),
				'.cls' : j.a('superLINK', 'http://www.zed.com', true),
				'p.t2' : j.text("dictum at. Nam euismod pulvinar ante sed iaculis. Vestibulum euismod, lacus nec condimentum dapibus, lectus nibh imperdiet neque, non dapibus dui augue id ante. Phasellus tristique turpis eu lectus luctus, quis eleifend lacus pretium. Phasellus et arcu malesuada, consectetur leo ut, molestie ante. Nunc bibendum ultrices metus, a mattis enim pretium accumsan. Quisque eget aliquet felis. Quisque viverra magna mauris, a accumsan dolor gravida at. Nunc non rhoncus libero. Cras consectetur mauris nec risus congue eleifend. Ut egestas tristique accumsan. Praesent finibus felis sem, ut suscipit neque accumsan ut.")
			},
			'.article5' : {}
		},
		'.sidebar.cols.col_4' : {
			'.ad1' : {
				img : {}
			},
			'.ad2' : {
				//embed : {}
			},
			'.ad3' : {
				//applet : {}
			}
		},
		'.footer.clear' : {
			'.cols.col_4.col1' : {
				$ : {classes : "cols col_4"}
			},
			'.cols.col_4.col2' : {
				$ : {classes : "cols col_4"}
			},
			'.cols.col_4.col3' : {
				$ : {classes : "cols col_4"}
			}
		},
    "div#elmID.class1.class2 #elem.class #otherElem.class" : {
    },
	},
};
//*/

//j.init({strict:false, sections:true});

j.init({strict:true, sections:false});
j.nodes(struct);
//j.nodes(j.bGrid);

//console.log(j.basicCSS);
//var b = new j.Sheet(cssRules);
//console.info(document.styleSheets);
//console.info(a);

bd = j.nodes.factory();
//bd.element = document.body;

a = j.nodes.factory();
a.element = j.element({tag : 'div', classes : "CLS01 CLS02 SUPcls", id : "OTDIV", text : "THIS DIV"});
console.log(a);

b = j.nodes.factory();
b.element = j.element({tag : 'span', classes : "SUPcls spnner span", id : "OTsp", text : "THIS SPAN"});

console.log(b);

j.tree.factory(j.tree, 5, 3);


//console.profileEnd("jRaiz");
///*
window.addEventListener('load', function(){
  
  var limit = 1000;
  var obj = {
    all : '',
    class01 : true,
    has : function(c){
      classes = c.match(/\w+/g);

      if(c == null) return false;
      var out = true;
      
      for(cl in classes){
        if(cl in this) out = (out && true);
          else out = (out && false);
      }
      
      return out;
    },
    add : function(c){
      classes = c.match(/\w+/g);
      for(cl in classes){
        this[ classes[cl] ] = true;
      }
      
      for(cl in this){
        this.all += cl + ' ';
      }
      //console.log(this.all);
    },
  }

  console.profile("jRaiz");
  for(i = 0; i < limit; i++){
    obj.add('class0654 othClass');
  }
  console.profileEnd("jRaiz");
  
  console.info(obj);

  arr = ['class01','class02','class03'];
  arr.has = function(c){
    classes = c.match(/\w+/g);
    //classes = c.split(' ');
    if(c == null) return false;
    var out = true;
    for(cl in classes){
      if(this.indexOf(classes[cl]) > -1 ) out = (out && true);
        else out = (out && false);
    }
    
    return out;
  };
  arr.add = function(c){
    classes = c.match(/\w+/g);
    //classes = c.split(' ');
    if(c == null) return false;

    for(cl in classes){
      this.push(classes[cl]);
    }
    
    //console.log(this.join(' ') );
    this.join(' ');
  };
  
  console.profile("jRaiz2");
  for(i = 0; i < limit; i++){
    arr.add('class0654 otherClass');
  }
  console.profileEnd("jRaiz2");


});
//*/