//     	Sailor Moon
     // Tuxedo Mask
     // Sailor Mars
     // Queen Beryl


//*******************VARIABLES****************

var characters = [	{
						id: 0,
						name: "Sailor Moon",
						icon: "assets/images/sailorMoon.jpg",
						health: 110,
						attack: 15,
						attackUp: 8
				
					}, 

					{
						id: 1,
						name: "Tuxedo Mask",
						icon: "assets/images/tuxedoMask.jpg",
						health: 80,
						attack: 5,
						attackUp: 8

					},

					{
						id: 2,
						name: "Sailor Mercury",
						icon: "assets/images/sailorMercury.jpg",
						health: 100,
						attack: 8,
						attackUp: 8

					},

					{
						id: 3,
						name: "Sailor Mars",
						icon: "assets/images/sailorMars.jpg",
						health: 100,
						attack: 10,
						attackUp: 8
					},

					{	
						id: 4,
						name: "Queen Beryl",
						icon: "assets/images/queenBeryl.jpg",
						health: 120,
						attack: 20,
						attackUp: 8

					}
				];

var rosterArray = [];
var attackerChosen = false;
var defenderChosen = false;
var hero;
var enemy;
var attackBooster = 10;
var currentBattle = false;



for (var i = 0; i < characters.length; i++) {
	
	rosterArray.push("<div id=" + characters[i].id + " value=" + characters[i].id + " class='col-md-2 characterInfo center-block'" +
			">" + characters[i].name + "<br><img src=" + characters[i].icon + " class='characterImage'" + "><br> HP: " + characters[i].health +
			"<br> AP: " + characters[i].attack + " </div>");
	
}

$("#characterOptions").html(rosterArray);

	// characterBox.addClass("characterImage");
	// characterBox.attr("src", characters[i].icon);
	// characterBox.attr("data-characterOption", characters[i]);

// $(".characterInfo").on("click", function(){

// 	$(this).css("border-color", "red");
// 	$(this).siblings().css("border-color", "yellow");

	// $(this).appendTo("#selectedAttacker");

	


	




//********************FUNCTIONS*******************











//*********************ACTION**********************

$(".characterInfo").on("click", function(){

	if (attackerChosen === false){
		hero = $(this).attr("id");
		$("#attackerArea").append(this);
		$(this).css("background-color", "pink");
		$(this).css("color", "black");
		attackerChosen = true;
		console.log("You've picked " + characters[hero].name + "!");

	}

	else if (defenderChosen === false && attackerChosen === true && hero !== $(this).attr("id")){
		enemy = $(this).attr("id");
		$("#defenderArea").append(this);
		$(this).css("background-color", "red");
		$(this).css("color", "black");
		defenderChosen = true;
		console.log("Defender is " + characters[enemy].name + "!");
		currentBattle = true;
		
	}


});


$("#fight").on("click", function(){
if (currentBattle === true){

	characters[hero].health = characters[hero].health - characters[enemy].attack;
	characters[enemy].health = characters[enemy].health - characters[hero].attack;

	if (currentBattle === true){
		$("#fightResults").html("<p class='text-center results'>" + characters[hero].name + "'s health was reduced by " + characters[enemy].attack + " and is now " + characters[hero].health + "!</p>" 
		+ "<p class='text-center results'>" + characters[enemy].name + "'s health was reduced by " + characters[hero].attack + " and is now " + characters[enemy].health + "!</p>" 
		+ "<p class='text-center results'>" + characters[hero].name + "'s attack power was increased by " + characters[hero].attackUp + " and is now " + characters[hero].attack + "!</p>");

	else 
	}
	console.log(characters[hero].health);
	console.log(characters[enemy].health);

	characters[hero].attack = characters[hero].attack + characters[hero].attackUp;
	console.log("ATTACK:" + characters[hero].attack)

		if (characters[enemy].health < 0){
				defenderChosen = false;
				currentBattle = false;
				$("#defenderArea").empty();
				console.log(characters[enemy].name + " lost!");

		}

		else if (characters[hero].health < 0){
				defenderChosen = false;
				currentBattle = false;
				console.log(characters[hero].name + " lost!");

		}
	}

});

$("#reset").on("click", function(){
	location.reload();

});