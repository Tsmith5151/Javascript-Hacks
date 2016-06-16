//Playing a game of Rock, Paper, Scissors:

var userName = prompt.get("What is your name?");
var welcome = confirm("Welcome"+" "+ userName +"!"+ " "+ "Let's being!");
var userChoice = prompt.get("Do you choose: 'rock', 'paper' or 'scissors'?");

//Computer's Random Action:
var computerChoice = Math.random();
if (computerChoice < 0.34) {
	computerChoice = "rock";
} else if(computerChoice <= 0.67) {
	computerChoice = "paper";
} else {
	computerChoice = "scissors";
} 

console.log("Computer: " + computerChoice);

// Game Rules:
var compare = function(usrChoice,cpuChoice){
    if( usrChoice === cpuChoice){
        return "The result is a tie!";
    }else if(usrChoice === "rock"){
        if (cpuChoice === 'scissors'){
            return "You Win!"
        }else{
            return "CPU Wins!"
        }
    }else if(usrChoice === "paper"){
        if (cpuChoice === 'rock'){
            return "You Win!"
        }else{
            return "CPU Wins!"
        }
    }else if(usrChoice === "paper"){
        if (cpuChoice === 'scissors'){
            return "You Win!"
        }
        else{
            return "CPU Wins!"
        }
    }
};
console.log(compare(userChoice,computerChoice));