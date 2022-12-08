// GLOBAL VALUES
var code_text = ""; // Where the inputted code will be put
var final_tokens = []; // Where the tokens from the lexer will be put

// These identify if the current tokens are strings or comments
var string_identifier = false;
var comment_identifier = false;

var final_symbol_table = {}; // Where the symbol table will be put

var text_output = ""; // Where the output of the semantic analysis will be put
var terminal = document.getElementById("shell-div"); // Terminal from the html
