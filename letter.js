// constructor files:
// letter.js should control whether or not a letter appears as a "_" or as itself on-screen.
// letter(givenLetter){
// 	// Properties
// 	this.displayText = "_"
// 	this.seceretValue = givenLetter;
// 	// 	Actions
// 	getDisplayText
// }
var Letter = function(chr) {
	this.character = chr.toLowerCase();
	this.appear = false;
	this.letterRender = function() {
		if(this.appear) {
			return this.character;
		} else if(this.character == " ") {
			this.appear = true;
			return " " + this.character + " ";
		} else {
			return "_ ";
		}
	}
}
exports.Letter = Letter;
