class LOLElement {
	constructor(name, regex) {
		this.name = name;
		this.regex = regex;
	}
}

class MultiwordElement {
	constructor(name, list) {
		this.name = name;
		this.list = list;
	}
}

var lolcode_elements = [
	new LOLElement("HAI", /^HAI$/),
	new LOLElement("KTHXBYE", /^KTHXBYE$/),
	new LOLElement("I", /^I$/),
	new LOLElement("HAS", /^HAS$/),
	new LOLElement("A", /^A$/),
	new LOLElement("ITZ", /^ITZ$/),
	new LOLElement("R", /^R$/),
	new LOLElement("SUM", /^SUM$/),
	new LOLElement("OF", /^OF$/),
	new LOLElement("DIFF", /^DIFF$/),
	new LOLElement("PRODUKT", /^PRODUKT$/),
	new LOLElement("QUOSHUNT", /^QUOSHUNT$/),
	new LOLElement("MOD", /^BIGGR$/),
	new LOLElement("BIGGR", /^BIGGR$/),
	new LOLElement("SMALLR", /^SMALLR$/),
	new LOLElement("BOTH", /^BOTH$/),
	new LOLElement("EITHER", /^EITHER$/),
	new LOLElement("WON", /^WON$/),
	new LOLElement("NOT", /^NOT$/),
	new LOLElement("ANY", /^ANY$/),
	new LOLElement("ALL", /^ALL$/),
	new LOLElement("SAEM", /^SAEM$/),
	new LOLElement("DIFFRINT", /^DIFFRINT$/),
	new LOLElement("SMOOSH", /^SMOOSH$/),
	new LOLElement("MAEK", /^MAEK$/),
	new LOLElement("IS", /^IS$/),
	new LOLElement("NOW", /^NOW$/),
	new LOLElement("VISIBLE", /^VISIBLE$/),
	new LOLElement("GIMMEH", /^GIMMEH$/),
	new LOLElement("O", /^O$/),
	new LOLElement("RLY?", /^RLY\?$/),
	new LOLElement("YA", /^YA$/),
	new LOLElement("RLY", /^RLY$/),
	new LOLElement("MEBBE", /^MEBBE$/),
	new LOLElement("NO", /^NO$/),
	new LOLElement("WAI", /^WAI$/),
	new LOLElement("OIC", /^OIC$/),
	new LOLElement("WTF?", /^WTF\?$/),
	new LOLElement("OMG", /^OMG$/),
	new LOLElement("OMGWTF", /^OMGWTF$/),
	new LOLElement("IM", /^IM$/),
	new LOLElement("IN", /^IN$/),
	new LOLElement("YR", /^YR$/),
	new LOLElement("UPPIN", /^UPPIN$/),
	new LOLElement("NERFIN", /^NERFIN$/),
	new LOLElement("TIL", /^TIL$/),
	new LOLElement("WILE", /WILE$/),
	new LOLElement("OUTTA", /^OUTTA$/),
	new LOLElement("AN", "/^AN$/"),
	new LOLElement("NUMBR", /^(-?\d+)$/),
	new LOLElement("NUMBAR", /^(-?\d*\.\d+)$/),
	new LOLElement("YARN", /^("[^"]*")$/),
	new LOLElement("TROOF", /^(WIN|FAIL)$/),
	new LOLElement("TYPE", /^(TROOF|NOOB|NUMBR|NUMBAR|YARN)$/),
	new LOLElement("VARIDENT", /^[a-zA-Z][a-zA-Z0-9_]*$/),
];

var multiword_elements = [
	new MultiwordElement("I_HAS_A", ["I", "HAS", "A"]),
	new MultiwordElement("SUM_OF", ["SUM", "OF"]),
	new MultiwordElement("DIFF_OF", ["DIFF", "OF"]),
	new MultiwordElement("PRODUKT_OF", ["PRODUKT", "OF"]),
	new MultiwordElement("QUOSHUNT_OF", ["QUOSHUNT", "OF"]),
	new MultiwordElement("MOD_OF", ["MOD", "OF"]),
	new MultiwordElement("BIGGR_OF", ["BIGGR", "OF"]),
	new MultiwordElement("SMALLR_OF", ["SMALLR", "OF"]),
	new MultiwordElement("BOTH_OF", ["BOTH", "OF"]),
	new MultiwordElement("EITHER_OF", ["EITHER", "OF"]),
	new MultiwordElement("WON_OF", ["WON", "OF"]),
	new MultiwordElement("ANY_OF", ["ANY", "OF"]),
	new MultiwordElement("ALL_OF", ["ALL", "OF"]),
	new MultiwordElement("BOTH_SAEM", ["BOTH", "SAEM"]),
	new MultiwordElement("IS_NOW_A", ["IS", "NOW", "A"]),
	new MultiwordElement("O_RLY?", ["O", "RLY?"]),
	new MultiwordElement("YA_RLY", ["YA", "RLY"]),
	new MultiwordElement("NO_WAI", ["NO", "WAI"]),
	new MultiwordElement("IM_IN_YR", ["IM", "IN", "YR"]),
	new MultiwordElement("IM_OUTTA_YR", ["IM", "OUTTA", "YR"]),
];

var token_types = {
	"HAI": "Code Delimiter",
	"KTHXBYE": "Code Delimiter",
	"NUMBR": "NUMBR Literal",
	"NUMBAR": "NUMBAR Literal",
	"YARN": "YARN Literal",
	"TROOF": "TROOF Literal",
	"TYPE": "TYPE Literal",
	"BTW": "Single Line Comment Delimiter",
	"OBTW": "Multi Line Comment Delimiter",
	"TLDR": "Multi Line Comment Delimiter",
	"I_HAS_A": "Variable Declaration",
	"ITZ": "Variable Assignment",
	"A": "Variable Assignment",
	"R": "Variable Assignment",
	"AN": "Operand Separator",
	"SUM_OF": "Arithmetic Addition Operator",
	"DIFF_OF": "Arithmetic Subtraction Operator",
	"PRODUKT_OF": "Arithmetic Multiplication Operator",
	"QUOSHUNT_OF": "Arithmetic Division Operator",
	"MOD_OF": "Arithmetic Modulo Operator",
	"BIGGR_OF": "Arithmetic MAX Operator",
	"BOTH_OF": "Boolean AND Operator",
	"EITHER_OR": "Boolean OR Operator",
	"WON_OF": "Boolean XOR Operator",
	"NOT": "Boolean NOT Operator",
	"ALL_OF": "Boolean Infinite Arity AND Operator",
	"ANY_OF": "Boolean Infinite Arity OR Operator",
	"MKAY": "Boolean Infinite Arity Delimiter",
	"BOTH_SAEM": "Comparison == Operator",
	"DIFFRINT": "Comparison != Operator",
	"SMOOSH": "Concatenation",
	"MAEK": "Typecast Operator",
	"IS_NOW_A": "Typecast Operator",
	"VISIBLE": "Output Keyword",
	"GIMMEH": "Input Keyword",
	"O_RLY?": "Conditional IF-THEN Block Delimiter",
	"YA_RLY": "Conditional IF Keyword",
	"MEBBE": "Conditional ELSE-IF Keyword",
	"NO_WAI": "Conditional ELSE Keyword",
	"WTF?": "Consitional SWITCH-CASE Block Delimiter",
	"OMG": "Conditional CASE Operator",
	"GTFO": "Break Keyword",
	"OMGWTF": "Conditional DEFAULT-CASE Keyword",
	"OIC": "Conditional Block Delimiter",
	"IM_IN_YR": "Loop Block Delimiter",
	"UPPIN": "Loop Increment Keyword",
	"NERFIN": "Loop Decrement Keyword",
	"TIL": "Loop Keyword",
	"WILE": "Loop Keyword",
	"IM_OUTTA_YR": "Loop Block Delimiter",
	"IT": "Implicit Variable",
	"COMMENT": "Comment",
	"LINEBREAK": "Linebreak",
	"VARIDENT": "Variable Identifier",
	"LOOPIDENT": "Loop Identifier",
};

/* ===================== LEXICAL ANALYSIS ====================== */
class Lexer {
	constructor(code_input) {
		this.code_input = code_input;
		this.temp = ""; // Buffer for the tokens
		this.tokens_list = []; // this is where the valid tokens / lexemes will be stored
	}

	// The lexemes from the given code will be pushed in the tokens_list if it's a valid lolcode element
	pushToken(lexeme) {
		for (var element of lolcode_elements) {
			if (lexeme.match(element.regex)) {
				if (element.name === "NUMBR" || element.name === "NUMBAR") {
					// Push as integers
					this.tokens_list.push([element.name, Number(lexeme)]);
				} else if (element.name === "YARN") {
					// Remove the double quotes before pushing
					this.tokens_list.push([element.name, lexeme.slice(1, -1)]);
				} else if (element.name === "TROOF") {
					// WIN will be pushed as true, FAIL as false
					this.tokens_list.push([element.name, lexeme === "FAIL" ? false : true]);
				} else if (
					element.name === "VARIDENT" ||
					element.name === "LOOPIDENT" ||
					element.name === "TYPE"
				) {
					this.tokens_list.push([element.name, lexeme]);
				} else {
					this.tokens_list.push([element.name, " "]);
				}
				return true;
			}
		}
	}

	// LEXER
	lexicalAnalysis() {
		while (this.code_input.length != 0) {
			// Push the BTW (Comment Literal)
			if (this.temp === "BTW") {
				comment_identifier = true;
				this.tokens_list.push(["BTW", " "]);
				this.temp = "";
			} else if (this.code_input[0] !== " ") {
				// This is for pushing the entire BTW comment on the token_list
				if (this.code_input[0] === "\n") {
					if (!comment_identifier) {
						this.pushToken(this.temp);
					} else {
						this.tokens_list.push(["COMMENT", this.temp]);
					}

					// Once the linebreak is encountered, that means that's the end of the BTW comment
					this.tokens_list.push(["LINEBREAK", " "]);
					comment_identifier = false;

					this.code_input = this.code_input.substring(1);
					this.temp = "";
				} else if (this.code_input[0] === '"') {
					// This is for pushing strings on the token_list
					this.temp += this.code_input[0];
					this.code_input = this.code_input.substring(1);
					if (string_identifier) {
						string_identifier = false;
					} else {
						string_identifier = true;
					}
				} else {
					this.temp += this.code_input[0];
					this.code_input = this.code_input.substring(1);
				}
			} else if (string_identifier || comment_identifier) {
				this.temp += this.code_input[0];
				this.code_input = this.code_input.substring(1);
			} else {
				// push the other tokens that are not comments or strings on the token_list
				this.pushToken(this.temp);

				this.code_input = this.code_input.substring(1);
				this.temp = "";
			}
		}

		// Combine the multiword elements into a single element
		for (var multiword of multiword_elements) {
			for (var i = 0; i < this.tokens_list.length; i++) {
				for (var j = 0; j < multiword.list.length; j++) {
					if (this.tokens_list[i + j][0] === multiword.list[j]) {
						this.tokens_list[i] = [multiword.name, " ", 0];
					}
					break;
				}
			}
		}

		// Put the tokens_list to the final_tokens list
		final_tokens = this.tokens_list;
		console.table(final_tokens);
	}
}
