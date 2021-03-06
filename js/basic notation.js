/*
	JSTREE
		INIT
			STRICT: HTML 4 OR 5
			SET BASIC PAGE STRUCTURE
			SET PAGES W/ ROUTING ADDRESS
		
		ADD CHANGES TO EACH PAGE
	
*/

//INIT
t.init({
		strict: false, // FALSE WHEN HTML 5
		sections : false,
		vars : { //DEFINE CSS VARIABLES
			green : t.color('green'),
			lGrey : t.color(999),
			sideWidth : t.size("250px"),
			bigFont : t.size("50px"),
			$superColor : "#FCDA63"
		},
		structure: { // DATA OBJ WITH STRUCTURE DIVS / SECTIONS
			header : {
				logo : t.logo(),
				menu : {
					css : {
						$ : "body #APP div.container>.header>.menu", // OPTIONAL SPECIFIC CSS SELECTOR
						backgroundColor : "{lGrey}",
						background: "url({SERVER_PATH}/img/bg.png) top center {superColor}",
						border : "solid 1px {superColor + 5345}"
					}
				}
			},
			main : {
				article : {
					iterate : true
				}
			},
			sidebar : {
				ad1 : {},
				ad2 : {},
				ad3 : {},
			},
			"div#elmID.class1.class2" : {}, // TEST
			footer : {
				col1 : {},
				col2 : {},
				col3 : {},
			}
		},
		menu: { // DATA OBJ WITH MENU LABELS AND ADDRESSES
			home : t.page(),
			about : t.modal(), // MODAL WINDOW
			staff : t.page(),
			prices : t.page(),
			contact : t.page()
		},
		//css: OBJ, // CSS RULES TO ALL PAGES
		external : [
			"/css/bootstrap.min.css",
			"/css/superStyle.css",
			"/js/jQuery.min.js",
			"/js/angular.min.js",
			"/custom/css/32168|css", // WHEN THE CSS/JS CODE IS GENERATED ON THE SERVER
			"/custom/js/12635|js", // path/to/code|css OR path/to/code|js
		]
	});

//CONFIG EACH PAGE
/*
*/
t.prices.external = [
	"/css/prices.css",
	"/js/prices.js"
];
t.prices.table({
	ID : {
		active : true
	},
	product : {
	},
	description : {
		sort : false
	},
	minimum : {
		label : "Minimum Order",
	},
	price : {
		label : "Price USD",
	},
});

t.contact.form({
	$ : { // [$] IS ALWAYS USED FOR CONFIGURATION
		inline: false,
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
	}
});
