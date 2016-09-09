// main.js will contain the logic of your app. Running it in Terminal/Bash will start the game.
// The app should end when a player guesses the correct word or runs out of guesses.

// npm prompt and inquirer and link to other Js files
var prompt = require('prompt');
var inquirer = require('inquirer');
var Word = require('./word');
var Game = require('./game');

// starts the game
prompt.start();

game = {
	wordBank: Game.Game.wordBank,
	userGuessedLetters: [],
	wordsWon: 0,
	guessesRemaining: 10, 
	currentWrd: null, 
	startGame: function (wrd){
		this.userGuessedLetters = [];

		this.resetGuessesRemaining();

		this.currentWrd = new Word.Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);

		this.currentWrd.getLets(); //populate currentWrd (made from Word constructor function) object with letters

		console.log("Welcome to programming languages Hangman!\nGuess the name of the programming language!");
    console.log(this.currentWrd.wordRender() + '\n');

		this.keepPromptingUser();


	}, 
	resetGuessesRemaining : function(){
		this.guessesRemaining = 10;
	},
	keepPromptingUser : function(){
		var self = this;

		prompt.get(['guessLetter'], function(err, result) {
		  if(result.guessLetter.charCodeAt() >= 97 && result.guessLetter.charCodeAt() <= 122 && result.guessLetter.length == 1) {  
		    console.log('The letter you guessed is: ' + result.guessLetter);

		    var findHowManyOfUserGuess = self.currentWrd.checkIfLetterFound(result.guessLetter);

		    if (findHowManyOfUserGuess == 0){
			    if(self.userGuessedLetters.indexOf(result.guessLetter) < 0) {
    				self.userGuessedLetters.push(result.guessLetter);
    				self.guessesRemaining--;
			    	console.log('You guessed wrong!');
  			    console.log('Guesses remaining: ', self.guessesRemaining);
				    console.log(self.currentWrd.wordRender() + '\n');
				    console.log('here are the letters you guessed already: ' + self.userGuessedLetters);

			    } else {
			    	console.log('Already guessed that letter');
			    }
		    } else {
		    	if(self.userGuessedLetters.indexOf(result.guessLetter) < 0) {
    				self.userGuessedLetters.push(result.guessLetter);
			    	console.log('You guessed right!');
  			    console.log('Guesses remaining: ', self.guessesRemaining);
				    console.log(self.currentWrd.wordRender() + '\n');
				    console.log('here are the letters you guessed already: ' + self.userGuessedLetters);
			    } else {
			    	console.log('Already guessed that letter');
			    }
	    		if(self.currentWrd.didWeFindTheWord()) {
			    	console.log('You Won, you might be a full stack developer after all!!!\nThe name was: ' + self.currentWrd.word);
			    	inquirer.prompt([
			    		{
			    			type: "confirm",
			    			message: "Would you like to play again?",
			    			name: "play"
			    		}
		    		]).then(function(answers) {
		    			if(answers.play) {
		    				self.startGame();
		    			} else {
		    				return;
		    			}
		    		});
			    }
		    }
		    
		    if ((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
		    	self.keepPromptingUser();
		    }
		    else if(self.guessesRemaining == 0){
		    	console.log('You lose, go back to bootcamp! The name was:', self.currentWrd.word);
		    	inquirer.prompt([
			    		{
			    			type: "confirm",
			    			message: "Would you like to play again?",
			    			name: "play"
			    		}
		    		]).then(function(answers) {
		    			if(answers.play) {
		    				self.startGame();
		    			} else {
		    				return;
		    			}
	    		});
		    }
		  } else {
		  	console.log("You need to enter a valid letter");
		  	self.keepPromptingUser();
		  }
		});
	}


};

game.startGame();