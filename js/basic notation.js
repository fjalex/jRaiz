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
		structure: { // DATA OBJ WITH STRUCTURE DIVS / SECTIONS
			header : {
				logo : "logo",
				menu : {}
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
		css: OBJ, // CSS RULES TO ALL PAGES
		external :[
			"/css/bootstrap.min.css",
			"/css/superStyle.css",
			"/js/jQuery.min.js",
			"/js/angular.min.js",
			"/custom/32168|css", // WHEN THE CSS/JS CODE IS GENERATED ON THE SERVER
			"/custom/12635|js", // path/to/code|css OR path/to/code|js
		]
	});

//CONFIG EACH PAGE
t.prices.table({
	
});

t.contact.form({
	name : ["name", "notEmpty"],
	email : ["email", "validate", "notEmpty"],
	phone : ["phone", "validate", "notEmpty"],
	birthday : ["date"],
	message : ["text", "notEmpty"]
});
