// FUNCTIONS FOR DISPLAYING FILE CONTENT ON TEXTBOX
function getFile(event) {
	const input = event.target;
	if ("files" in input && input.files.length > 0) {
		placeFileContent(document.getElementById("code-textarea"), input.files[0]);
	}
}

function placeFileContent(target, file) {
	readFileContent(file)
		.then((content) => {
			target.value = content;
		})
		.catch((error) => console.log(error));
}

function readFileContent(file) {
	const reader = new FileReader();

	return new Promise((resolve, reject) => {
		reader.onload = (event) => {
			code_text = event.target.result;
			resolve(code_text);
		};

		reader.onerror = (error) => reject(error);
		reader.readAsText(file);
	});
}

document.getElementById("input-browse-button").addEventListener("change", getFile);

// EXECUTION OF THE LEXER & PARSER
function execute() {
	// alert("You clicked this!");

	var code = new Lexer(code_text);
	code.lexicalAnalysis();
	parser(final_tokens);
	refreshTable();
}

// REFRESH LEXEME TABLE
// This is where the data in the table is printed
function refreshTable() {
	// LEXEME TABLE
	var lexeme_div = document.getElementById("lexeme-table-div");

	var lexeme_table = document.createElement("table");
	lexeme_table.id = "lexeme-table";

	var lexeme_body = document.createElement("tbody");
	lexeme_body.id = "lexeme-body-id";
	lexeme_table.appendChild(lexeme_body);

	for (var i = 0; i < final_tokens.length; i++) {
		var lexeme_tr = document.createElement("tr");
		lexeme_body.appendChild(lexeme_tr);
		var td = document.createElement("td");
		if (
			final_tokens[i][0] == "NUMBR" ||
			final_tokens[i][0] == "NUMBAR" ||
			final_tokens[i][0] == "TYPE" ||
			final_tokens[i][0] == "LOOPIDENT" ||
			final_tokens[i][0] == "VARIDENT" ||
			final_tokens[i][0] == "COMMENT"
		) {
			td.appendChild(document.createTextNode(final_tokens[i][1]));
		} else if (final_tokens[i][0] == "LINEBREAK") {
			td.appendChild(document.createTextNode("\\n"));
		} else {
			td.appendChild(document.createTextNode(final_tokens[i][0]));
		}
		lexeme_tr.appendChild(td);

		var td2 = document.createElement("td");
		td2.id = "td-classification";
		lexeme_tr.appendChild(td2);

		td2.appendChild(document.createTextNode(token_types[final_tokens[i][0]]));
		lexeme_tr.appendChild(td2);
	}

	lexeme_div.appendChild(lexeme_table);

	// SYMBOL TABLE
	var symbol_table_div = document.getElementById("symbol-table-div");

	var symbol_table = document.createElement("table");
	symbol_table.id = "symbol-table";

	var symbol_table_body = document.createElement("tbody");
	symbol_table_body.id = "symbol-body-id";

	symbol_table.appendChild(symbol_table_body);

	for (var key in main_symbol_table) {
		var symbol_table_tr = document.createElement("tr");
		symbol_table_body.appendChild(symbol_table_tr);
		var symbol_table_td = document.createElement("td");
		symbol_table_td.appendChild(document.createTextNode(key));
		symbol_table_tr.appendChild(symbol_table_td);

		var symbol_table_td_2 = document.createElement("td");
		symbol_table_tr.appendChild(symbol_table_td_2);
		symbol_table_td_2.appendChild(document.createTextNode(main_symbol_table[key].value));

		symbol_table_tr.appendChild(symbol_table_td_2);
	}
	symbol_table_div.appendChild(symbol_table);
}
