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
		structure: OBJ, // DATA OBJ WITH STRUCTURE DIVS / SECTIONS
		menu: { // DATA OBJ WITH MENU LABELS AND ADDRESSES
			home : t.page(),
			about : t.modal(), // MODAL WINDOW
			staff : t.page(),
			prices : t.page(),
			contact : t.page()
		}
		css: OBJ // CSS RULES TO ALL PAGES
	});

t.contact.form({
	name : ["name", "notEmpty"],
	email : ["email", "validate", "notEmpty"],
	phone : ["phone", "validate", "notEmpty"],
	birthday : ["date"],
	message : ["text", "notEmpty"]
});
