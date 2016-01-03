struct = {
	container : {
		$ : {
			classes : "criatr lskdjfie lska",
			id : "superDiv",
			css : {
				
			}
		},
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
		button : {
			$ : {
				tag : "input",
				type : "submit"
			}
		}
	}
};


//t.init({a:64});
//t.it(struct, t.body);

//t.init({strict:false, sections:true});
t.init({strict:true, sections:false});
t.it(struct);
