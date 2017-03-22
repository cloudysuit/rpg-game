
//*******************GLOBAL VARIABLES****************

var characters = [	{
						id: 0,
						name: "Sailor Moon",
						icon: "assets/images/sailorMoon.jpg",
						health: 180,
						attack: 25,
						attackUp: 8
				
					}, 

					{
						id: 1,
						name: "Tuxedo Mask",
						icon: "assets/images/tuxedoMask.jpg",
						health: 100,
						attack: 10,
						attackUp: 10

					},

					{
						id: 2,
						name: "Sailor Mercury",
						icon: "assets/images/sailorMercury.jpg",
						health: 150,
						attack: 8,
						attackUp: 8

					},

					{
						id: 3,
						name: "Sailor Mars",
						icon: "assets/images/sailorMars.jpg",
						health: 120,
						attack: 20,
						attackUp: 7
					},

					{	
						id: 4,
						name: "Queen Beryl",
						icon: "assets/images/queenBeryl.jpg",
						health: 140,
						attack: 12,
						attackUp: 9

					}
				];

var rosterArray = [];
var attackerChosen = false;
var defenderChosen = false;
var hero;
var enemy;
var currentBattle = false;
var defendersRemaining = 4;
var win = false;
var lose = false;
var themeSong = document.createElement("audio");
		themeSong.setAttribute("src", "assets/sounds/sailorMoonTheme.mp3");

//****************DEFAULT STATE*******************


$(document).ready(function(){


$("#instructions").html("Pick a Character!");

for (var i = 0; i < characters.length; i++) {
	
	rosterArray.push("<div id=" + characters[i].id + " value=" + characters[i].id + " class='col-md-2 characterInfo center-block'" +
			">" + characters[i].name + "<br><img src=" + characters[i].icon + " class='characterImage'" + "><br> HP: " + characters[i].health +
			"<br> AP: " + characters[i].attack + " </div>");
	
}

$("#characterOptions").html(rosterArray);

	

//*********************ACTION**********************

$(".characterInfo").on("click", function(){      

//Prompts user to select attacker character.

	if (attackerChosen === false){
		hero = $(this).attr("id");
		$("#attackerArea").append(this);
		$(this).css("background-color", "pink");
		$(this).css("color", "black");
		attackerChosen = true;
		console.log("You've picked " + characters[hero].name + "!");
		$("#instructions").html("Pick a Defender!");

	}

// if hero chosen next character selection will become enemy defender. Text instrustions say Fight!

	else if (defenderChosen === false && attackerChosen === true && hero !== $(this).attr("id")){
		enemy = $(this).attr("id");
		$("#defenderArea").append(this);
		$(this).css("background-color", "red");
		$(this).css("color", "black");
		defenderChosen = true;
		console.log("Defender is " + characters[enemy].name + "!");
		currentBattle = true;
		$("#instructions").html("Fight!");		
	
	}

});


//when user clicks on fight, text is displayed in the results box detailing new stats for each character
//currently in the arena.

$("#fight").on("click", function(){
	if (currentBattle === true){

		characters[hero].health = characters[hero].health - characters[enemy].attack;
		characters[enemy].health = characters[enemy].health - characters[hero].attack;
		$("#attackerResults").html("<p class='text-center results'><b>" + characters[hero].name + "'s</b> health was reduced by <b>" + characters[enemy].attack + "</b> and is now <b>" + characters[hero].health + "</b>!</p>"); 
		$("#attackIncrease").html("<p class='text-center results'><b>" + characters[hero].name + "'s</b> attack power was increased by <b>" + characters[hero].attackUp + "</b> and is now <b>" + characters[hero].attack + "</b>!</p>");
		$("#defenderResults").html("<p class='text-center results'><b>" + characters[enemy].name + "'s</b> health was reduced by <b>" + characters[hero].attack + "</b> and is now <b>" + characters[enemy].health + "</b>!</p>"); 
		

		console.log(characters[hero].health);
		console.log(characters[enemy].health);


//hero's attack value goes up as they perform attacks

		characters[hero].attack = characters[hero].attack + characters[hero].attackUp;
		console.log("ATTACK:" + characters[hero].attack)


//determines conditions of win or lose and defines actions to be taken at each respective state.

			if (characters[enemy].health < 0){
					defendersRemaining--;
					defenderChosen = false;
					currentBattle = false;
					$("#defenderArea").empty();
					$("#defenderResults").empty();
					console.log(characters[enemy].name + " lost!");
					$("#instructions").html("Pick a Defender!");


			}

			else if (characters[hero].health === 0 || characters[hero].health < 0){
					$("#attackerArea").empty();
					$("#defenderArea").empty();
					$("#characterOptions").empty();
					$("#instructions").empty();
					$("#fightResults").empty();
					$("#characterOptions").html("<h1>You lost!<br>The Earth is destroyed!</h1>");
					defenderChosen = false;
						currentBattle = false;
					console.log(characters[hero].name + " lost!");


			}
	}

//sets conditions and defines actions based on final win or lose status. 


			if (characters[hero].health > 0 && defendersRemaining === 0){
					win === true;
					$("#attackerArea").empty();
					$("#characterOptions").empty();
					$("#instructions").empty();
					$("#fightResults").empty();
					$("#characterOptions").html("<h1>You win!<br>You saved the Earth with the power of Love!</h1>");
					$("#dance").addClass("btn-danger btn-lg text-center");
					$("#dance").html("Dance!");
					console.log("working");
			}

			else if (characters[hero].health < 0 && defendersRemaining > 0) {
					lose === true;
					$("#attackerArea").empty();
					$("#characterOptions").empty();
					$("#instructions").empty();
					$("#fightResults").empty();
					$("#characterOptions").html("<h1>You lost!<br>The Earth is destroyed!</h1>");
			
			}


			
});

$("#reset").on("click", function(){
	location.reload();

});

$("#dance").on("click", function(){
	themeSong.play();
})


});