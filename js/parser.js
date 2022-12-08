// Writes the output of the semantic analysis / value to the shell
function write(output) {
	text_output += output;
	terminal.value = text_output;
}

// Gets the current line and then its index
function getCurrentLine(tokens, index) {
	var line = [];
	for (var i = index; i < tokens.length; i++) {
		if (tokens[i][0] === "LINEBREAK") {
			break;
		}
		line.push(tokens[i]);
	}
	return [line, i + 1];
}

function parser(tokens) {
	var idx = 0;

	// Buffer list
	var temp = [];

	// Current is the current token
	var current = null;

	// Operands for the analysis
	var op1 = null;
	var op2 = null;

	// Symbol table
	// Where the value of the variables are stored
	var symbol_table = {
		"IT": {
			"value": null,
		},
	};

	while (idx < tokens.length) {
		var line = getCurrentLine(tokens, idx);
		var list = line[0];

		idx = line[1];

		temp = [];

		while (list.length) {
			current = list.pop();
			operands = [];

			switch (current[0]) {
				case "TYPE":
				case "NOOB":
				case "VARIDENT":
				case "NUMBR":
				case "NUMBAR":
				case "TROOF":
				case "YARN":
					temp.push(current);
					break;

				case "I_HAS_A":
					op1 = temp.pop();
					op2 = temp.pop();

					// op1 is for the IT or the variable name
					// op2 is the value

					// op2 still has no value
					if (op2 === undefined) {
						symbol_table[op1[1]] = {
							"value": null,
						};
					} else {
						// Initializing the value
						if (op2[0] === "VARIDENT") {
							op2 = [symbol_table[op2[1]]["value"]];
						}

						// Add the value to the symbol table
						symbol_table[op1[1]] = {
							"value": op2[1],
						};
					}
					break;

				case "VISIBLE":
					while (temp.length) {
						operands.push(temp.pop());
					}

					// Print the value of  variables
					for (var i = 0; i < operands.length; i++) {
						if (operands[i][0] === "VARIDENT") {
							operands[i] = [symbol_table[operands[i][1]]["value"]];
						}
						write(operands[i][0]);
					}

					write("\n");
					break;
			}
		}
	}

	main_symbol_table = symbol_table;
}
