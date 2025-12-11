/*
	Jade Ambrose
	WEB 114 Final Project
*/

/*
	This is a Choose Your Own Adventure game! It has five total endings and
	several branching story paths, as well as a boss fight and custom art
	drawn by my lovely wife
*/

// CONST VARS

// For sorting through the "paths" variable down below
const CHOICE_PROMPT = 0;
const CHOICE_FLAVOR = 1;
const CHOICE_1 = 2;
const CHOICE_2 = 3;

// Character types
const REX = 0;
const LOP = 1;
const LION = 2;
const DWARF = 3;

// Set of random names to pull from
const RANDOM_NAMES = [
	"Tofu",
	"Dim Sum",
	"Coconut",
	"Hotch",
	"Pepper",
	"Bagel",
	"Cream",
	"Vanilla",
	"Rudy",
	"Lily",
	"Nibbles",
	"Thumper",
	"Cocoa",
	"Cinnabun",
	"Salt",
	"Basil",
	"Clover",
	"Bugs",
	"Monty",
	"Roger",
	"Snowball",
	"Peter",
	"Buster",
	"Velvet",
	"Max",
	"Peppy",
	"Bunny",
	"Honey",
	"Sage",
	"Hazel",
	"Pumpkin",
];

// Easter egg names
const KNOWN_NAMES = [
	"dumpling",
];

// Info for character select screen
const CLASS_INFO = {
	0 : [
			"Rex",
			"A medium sized rabbit with a calm temper. Typically weighs between 7.5 and 10.5 pounds and can jump up to 3 feet."
		],
	1 : [
			"Holland Lop", 
			"A small, friendly rabbit. One of the smallest lop breeds. Typically weighs between 2 and 4 pounds."
		],
	2 : [
			"Lionhead",
			"Named after the wool mane encircling its head, reminiscent of a male lion. Typically weighs between 2.5 and 3.75 pounds."
		],
	3 : [
			"Netherland Dwarf",
			"One of the smallest rabbit breeds, these rabbits are notably intelligent. Typically weighs between 1.1 and 2.5 pounds."
		]
};

// For dynamically setting character portrait
const CLASS_PORTRAIT_IMGS = {
	0 : "img/rex_final.png",
	1 : "img/holland_final.png",
	2 : "img/lionhead_final.png",
	3 : "img/netherland_final.png"
};

// End screen text
const ENDINGS = {
	1 : "You have defeated a mighty beast! It feels as if you could take on anything!<br><br>" +
		"You have discovered the Victorious ending. Play again to try and find another!",

	2 : "Better luck next time! The world beyond the Wall is full of scary things.<br><br>" +
		"You have discovered the Defeated ending. Play again to try and find another!",
	
	3 : "So many things to do and see! Maybe you'll have to jump the Wall again some time.<br><br>" +
		"You have discovered the Explorer ending. Play again to try and find another!",

	4 : "The gods' love courses through you as you jump for joy across your land. Yippee!<br><br>" +
		"You have discovered the Blessed ending. Play again to try and find another!",

	5 : "Zzzzzz...<br><br>" +
		"You have discovered the Sleepy ending. Play again to try and find another!",
	
	100 : "Oops!<br><br>" +
		  "If you're seeing this, there was an error! Please report what you were doing when it happened. " +
		  "It may be best to refresh the page."
};

// INTERACTIVE ELEMENTS
// Ordered approximately according to when they'll be interacted with. For funsies

let fade = document.getElementById("fade");
let newGameWindow = document.getElementById("newgame-window");

// Character select portraits
let classPortraits = {
	0 : document.getElementById("char0"),
	1 : document.getElementById("char1"),
	2 : document.getElementById("char2"),
	3 : document.getElementById("char3"),
};

let nameInput = document.getElementById("name-input");
let validateMsg = document.getElementById("validate");

let playerNameElement = document.getElementById("player-name");
let playerPortrait = document.getElementById("player");
let enemyPortrait = document.getElementById("enemy");

let className = document.getElementById("class-name");
let classFlavor = document.getElementById("class-flavor");

let gameTitle = document.getElementById("game-title");
let gameWindow = document.getElementById("game-window");

// Flavor text for chosen action
let choicePrompt = document.getElementById("prompt-text");

// Choice buttons
let choice1 = document.getElementById("choice1");
let choice2 = document.getElementById("choice2");

let playerHpBar = document.getElementById("player-hp");
let enemyHpBar = document.getElementById("enemy-hp");

let endGameWindow = document.getElementById("endgame-window");
let endGameMessage = document.getElementById("endgame-message");

let creditsWindow = document.getElementById("credits-window");


// NON CONST GLOBAL VARIABLES
let playerName = "";
let newGamePageNum = 1;
let selectedChar = -1;
let currentChoice = 0;

let playerHp = 100;
let enemyHp = 100;

let playerDiceRoll = 0;
let enemyDiceRoll = 0;

let playerAttackDamage = 0;
let enemyAttackDamage = 0;

let creditsShown = false;

// This is horrifying
// This var contains flavor and button text for every page of the story
// It is in the format:
// choice id : [choice text, choice 1, (optional) choice 2]
const PATHS = {
	0 : [
		"The End",
			"Game over! Thanks for playing!<br><br>" +
			"Click the button to play again.",
		1, -1
	],
	1 : [
		"Begin day",
			"All bunnies begin their day the same. Snoozing.<br>" +
			"You are snoozing. The sun is starting to rise.<br><br>" + 
			"Is it time to get up?",
		2, 3
	],
	2 : [
		"Keep sleeping",
			"What is life without sleep? The world can wait while this bun rests.<br><br>" +
			"You start to get hungry. Is it time to get up yet?",
		12, 3
	],
	3 : [
		"Wake up!! It's time to eat",
			"You stand up and stretch! Your tummy is rumbling. It's time to find food.\n\n" +
			"In these lands, food is hard to come by. Often you must wait for the gods to bestow you with sustenance.\n\n" +
			"Do you scavenge or wait?",
		4, 8
	],
	4 : [
		"Scavenge, there must be something to eat",
			"You set off to hunt for food.",
		5, 6
	],
	5 : [
		"Explore the tunnels",
			"The tunnels are the same as always. You shove them to see if this will make food appear. No luck.",
		6, -1
	],
	6 : [
		"Explore the Open Lands",
			"You set off towards the Open Lands. You spot your bathroom. Oh yeah, there's hay there!\n\n" +
			"Success! Food has been found.",
		7, -1
	],
	7 : [
		"Nibble on hay",
			"Hay is delicious!! You enjoy nibbling on it throughout the day, though you wish you had something more to eat right now.",
		8, -1
	],
	8 : [
		"Pray to the gods for food",
			"You journey to the edge of your territory, where the Great Wall stands.\n" +
			"You press your nose through the bars and wait. You can see the blurred outlines of the gods on the other side.\n\n" +
			"Something touches your nose.",
		9, 10
	],
	9 : [
		"WHAT IS THAT",
			"You jerk your head back. You realize that was one of the gods trying to touch you. " +
			"You shove your nose back into the bars. Something touches your nose again.",
		10, -1
	],
	10 : [
		"Stand strong, these are the trials you must endure for food",
			"The god pets your nose and tickles your chin, and you jerk away.\n\n" +
			"You stand there, thinking you have just failed your trial. But then, " +
			"the god bestows you with food!!",
		11, -1
	],
	11 : [
		"Eat the pellets!!",
			"Delicious!! You love these.\n\n" +
			"Your tummy is full for now. What will you do next?",
		21, 13	// UPDATE THIS
	],
	12 : [
		"No, sleepy time!",
			"You sleep the day away. You wake up to food piled on your altar. What a blessing!<br><br>" +
			"You eat to your heart's content and flop over to get more sleep. Life is hard being a bunny.",
		204, -1	// SLEEPY ENDING
	],
	13 : [
		"Go back to sleep",
			"Eating is hard work! You lay down and go back to sleep.\n\n" +
			"You wake up some time later. Should you get up now?",
		12, 14
	],
	14 : [
		"It's time to have fun!",
			"You hop up and run around! You race through your land, speeding past the tunnels " +
			"and through the Open Lands. When you turn, you skid into the wall, but that won't stop you.\n\n" +
			"That was exhilarating! Now what do you do?",
		15, -1
	],
	15 : [
		"Dig in the tunnels",
			"You enter the tunnels and find a good spot to dig. You dig with all your might, " +
			"but it seems you aren't getting anywhere.\n\n" +
			"You hear a sound outside your tunnels. What was that??",
		17, 16
	],
	16 : [
		"Keep digging",
			"You keep digging. Mama didn't raise a quitter!\n\n" +
			"Suddenly, the tunnels start to shake! It's an earthquake!!\n\n" +
			"You run out to invesigate only to discover one of the gods standing before you. " +
			"It bends over, reaching a hand towards you.",
		18, -1
	],
	17 : [
		"Investigate the sound",
			"You leave the tunnels and realize the gods have entered your realm! " +
			"One stands before you, unfathomably tall. You run up to it and it reaches a hand down towards you.",
		18, -1
	],
	18 : [
		"Accept the blessing",
			"The god pets you on the head. It feels amazing. You feel the blessing of the god wash over you.\n\n" +
			"The god feeds you a bounty of delicious food and showers you with love.\n\n" +
			"The life of a bunny is amazing.",
		203, -1	// BLESSED ENDING
	],
	19 :[
		"Attempt to jump the wall",
			"You approach the wall. It's very tall. You brace your legs and jump!!\n\n" +
			"You scramble at the wall and fall back down. You didn't make it.",
		27 , 22
	],
	20 : [
		"Explore quietly",
			"You softly hop around, investigating. You find little trinkets and toys that smell like another creature. " +
			"It doesn't smell like a bunny...",
		25, 29
	],
	21 : [
		"Investigate the Wall of the Gods",
			"You think about the great Wall that separates your land from that of the gods. " +
			"Is this Wall really as impenetrable as it seems?\n\n" +
			"It doesn't seem that tall...",
		19, -1
	],
	22 : [
		"Maybe the Wall isn't meant to be crossed by little bunnies...",
			"You wander away. Whatever is on the other side isn't meant for you. " +
			"You're just a small bunny in a big world. You have more important things to do than to wonder about the other side.",
		14, -1
	],
	23 : [
		"Nudge it again",
			"You hop after it and shove it again, hearing it jingle as it rolls away from you. Whee!<br><br>" +
			"You notice movement coming from behind you and you turn to look. What stands before you makes you freeze.",
		90, -1
	],
	90 : [
		"???",
			"A monstrous creature stands before you, its long legs gangly and its tail unnaturally long.<br><br>" +
			"What do you do?",
		100, 24
	],
	24 : [
		"Run away!",
			"You dart away, too fast for the monster to catch you.\n\n" +
			"You run around, dodging various walls and objects, until you're sure you have lost the thing's attention.<br><br>" +
			"That was scary!",
		29, -1
	],
	25 : [
		"Shove the ball",
			"You nudge the ball with your nose. It makes a jingling sound as it rolls. What fun!",
		23, 29
	],
	26 : [
		"Stand and fight",
			"This creature will not be the end of you! It's time to fight!",
		100, -1	// START COMBAT
	],
	27 : [
		"Try again!",
			"You brace again and jump!\n\n" +
			"You clear the Wall easily this time, landing on the ground with a thump.\n\n" +
			"You look around. There's so much new land to explore! New smells to sniff! New things to chew on!",
		20, -1
	],
	28 : [
		"Bunny defeated",
			"Despite your best efforts, the monster has overwhelmed you. The world goes dark...\n\n",
		31, -1		// DEFEATED ENDING
	],
	29 : [
		"Continue to explore",
			"You continue exploring the realm of the gods.\n\n" +
			"You don't find many interesting things, but at the end of the day you return home satisfied. " +
			"The world isn't as scary as you thought.",
		202, -1		// EXPLORER ENDING
	],
	30 : [
		"Monster defeated",
			"The monster lets out a terrible noise and flees. You have won!",
		32, -1		// VICTORIOUS ENDING
	],
	31 : [
		"...",
			"You wake up in your land. There are wrappings on your legs and food by your face.\n\n" +
			"You should've known better than to try to explore the land of the gods.",
		201, -1		// DEFEATED ENDING 2
	],
	32 : [
		"Yay!",
			"After some more time exploring the realm of the gods, you return home and jump the Wall again.\n\n" +
			"Maybe the world isn't too big for such a small bunny.",
		200, -1		// VICTORIOUS ENDING 2
	],
	
	100 : [
		"Prepare for battle!",
			"A vicious creature blocks your path!",
		101,	// Attack
		102		// Flee
	],
	101 : [			// 101 and 102 trigger attack/flee rolls
		"Attack!",
			"",
		101, 102
	],
	102 : [
		"Run away!",
			"",
		101,
		102
	],
	105 : [		// Both hit
		"Attack!",
			"Rolled a %diceroll%. You strike with your front paws, dealing %playerdamage% damage.\n\n" +
			"The enemy retaliates! You take %enemydamage% damage.",
		101,
		102
	],
	106 : [		// Player miss enemy hit
		"Attack!",
			"Rolled %an% %diceroll%, and missed! The monster swipes at you, and you take %enemydamage% damage.",
		101,
		102
	],
	107 : [		// Player hit enemy miss
		"Attack!",
			"Rolled %an% %diceroll%. You deliver a swift kick with your back legs, dealing %playerdamage% damage " +
			"before darting out of the way of the beast's attack",
		101,
		102
	],
	108 : [		// Both miss
		"Attack!",
			"Rolled %an% %diceroll%. You fumble your attack and just barely scramble out of the way of the monster's paws.",
		101,
		102
	],
	109 : [		// Player fails to flee, enemy misses
		"Run away!",
			"Rolled %an% %diceroll%. You can't get away!",
		101,
		102
	],
	110 : [		// Player fails to flee, enemy hits
		"Run away!",
			"Rolled %an% %diceroll%. You try to escape, but the creature catches you off-guard! You take %enemydamage% damage.",
		101,
		102
	],
	111 : [		// Player flee succeeds
		"Run away!",
			"Rolled %an% %diceroll%. You see an opening to escape!",
		24, -1
	],

	// 200 win
	// 201 lose
	// 202 explore
	// 203 blessed
	// 204 sleep

	200 : [
		"The End",
			"Victorious Ending. You shouldn't be seeing this!",
		0, -1
	],
	201 : [
		"The End",
			"Defeated Ending. You shouldn't be seeing this!",
		0, -1
	],
	202 : [
		"The End",
			"Explorer Ending. You shouldn't be seeing this!",
		0, -1
	],
	203 : [
		"The End",
			"Blessed Ending. You shouldn't be seeing this!",
		0, -1
	],
	204 : [
		"The End",
			"Sleepy Ending. You shouldn't be seeing this!",
		0, -1
	],
};


// EVENT LISTENERS

// When animation ends, remove animation class. A little silly but allows for replaying animations
newGameWindow.addEventListener("animationend", (event) => {
	newGameWindow.classList.remove("windowFadeIn-anim");
	newGameWindow.classList.remove("windowFadeOut-anim");
});

// Programmatically add event listeners to all character portraits on the beginning screen
// When a portrait is hovered over, show its name and description.
// When it's no longer being hovered over, hide name and desc
for (let i = 0; i < 4; i++) {
	classPortraits[i].addEventListener("mouseenter", (event) => {
		SetFlavorText(CLASS_INFO[i][0], CLASS_INFO[i][1]);
	});

	classPortraits[i].addEventListener("mouseleave", (event) => {
		if (selectedChar == -1) SetFlavorText("", "");
		else SetFlavorText(CLASS_INFO[selectedChar][0], CLASS_INFO[selectedChar][1]);
	});
}

// Use regex + replace to forcibly allow only capital & lowercase letters
nameInput.addEventListener("input", (event) => {
	 nameInput.value = nameInput.value.replace(/[^a-zA-Z\s]/g, '');
});

validateMsg.addEventListener("animationend", (event) => {
	validateMsg.classList.remove("error-anim");
});

// Doing some additional silly things because otherwise the credits window
// will show briefly when the ending screen is closed
endGameWindow.addEventListener("animationend", (event) => {
	if (endGameWindow.classList.contains("windowFadeIn-anim")) {
		creditsWindow.style.opacity = 1;
		creditsWindow.style.transitionDuration = "0.2s";
		endGameWindow.classList.remove("windowFadeIn-anim");
	}
	if (endGameWindow.classList.contains("windowFadeOut-anim"))
		creditsWindow.classList.remove("windowFadeOut-anim");
});

// FUNCTIONS

// Where it all begins
function StartGame() {
	NameChar();			// This resets the character name above the game window
	ShowNewGame();		// Show the new game window
}

// Show new game window
function ShowNewGame() {
	newGameWindow.style.pointerEvents = "all";
	fade.style.pointerEvents = "all";

	fade.style.opacity = 0.6;	// Darken background

	newGameWindow.classList.add("windowFadeIn-anim");
	newGameWindow.style.opacity = 1;		// Show and animate new game window
	newGameWindow.style.animationPlayState = "running";
}

// Select page on new game screen
function NewGamePage(page = 1) {
	// Make the previous page hidden and not clickable
	let currentPage = document.getElementById(`page${newGamePageNum}`);
	currentPage.style.opacity = 0;
	currentPage.style.pointerEvents = "none";

	newGamePageNum = page;

	// Make the selected page visible and clickable
	currentPage = document.getElementById(`page${newGamePageNum}`);
	currentPage.style.opacity = 1;
	currentPage.style.pointerEvents = "all";
}

// Go to previous page of new game screen
function PreviousPage() {
	if (newGamePageNum == 2) {
		classPortraits[selectedChar].dispatchEvent(new Event('mouseleave'));
		className.innerHTML = "";
		classFlavor.innerHTML = "";
		selectedChar = -1;
	}
	else if (newGamePageNum == 3) {
		ValidateMessage("");
	}
	NewGamePage(newGamePageNum - 1);
}

// Set text for character select info
function SetFlavorText(name, desc) {
	className.innerHTML = name;
	classFlavor.innerHTML = desc;
}

// Select a character!
function SelectChar(id = 0) {
	selectedChar = id;
	ValidateMessage("");
	NewGamePage(2);
}

// Pull from the pool of random names defined at the beginning of the script
function RandomName() {
	let name_id = Math.floor(Math.random() * (RANDOM_NAMES.length));
	if (nameInput.value == RANDOM_NAMES[name_id]) RandomName();
	else {
		nameInput.value = RANDOM_NAMES[name_id];
	}
}

// Is a name entered? Is it a secret name?
function ValidateName() {
	if (nameInput.value.length == 0) {
		ValidateMessage("You need a name!", true);
		return false;
	}
	switch (NormalizeString(nameInput.value)) {
		case "dumpling":
		case "dumbpling":	// This currently doesn't fit hehe (9 chars long, limit is 8)
			if (selectedChar != LOP) {
				ValidateMessage("That name feels like it belongs to a lop...", true);
				return false;
			} else return true;
		default:		// Name is okay!
			return true;
			// No breaks here because they were unreachable
	}
}

// Set the message that appears below the name box
function ValidateMessage(text = "", error = false) {
	validateMsg.innerHTML = text;
	if (error) {
		validateMsg.style.color = "#900";
		validateMsg.classList.add("error-anim");
		validateMsg.style.animationPlayState = "running";
	}
	else
		validateMsg.style.color = "initial";
}

// Finalize name selection!
function ConfirmName() {
	if (ValidateName()) {
		NameChar(nameInput.value);
		
		KNOWN_NAMES.forEach(function(name) {	// easter egg o:
			if (NormalizeString(playerName) == name) {
				document.getElementById("secret-name").innerHTML = "special";
			}
		});
		NewGamePage(3);
	}
}

// Set name!
function NameChar(name = "Bunny") {
	playerName = nameInput.value;
	playerNameElement.innerHTML = playerName;
}

// Start game!! This is called when the button on page 3 is clicked
function BeginNewGame() {
	if (creditsShown) ToggleCredits();	// Just in case...
	Choose(1);

	SetPlayerHp();		// This will reset player & enemy hp
	SetEnemyHp();		// As well as hp bar state

	newGameWindow.classList.add("windowFadeOut-anim");
	newGameWindow.style.animationPlayState = "running";

	newGameWindow.style.opacity = 0;		// Make new game window invisible and unclickable
	newGameWindow.style.pointerEvents = "none";
	let currentPage = document.getElementById(`page${newGamePageNum}`);
	currentPage.style.pointerEvents = "none";
	
	fade.style.pointerEvents = "none";
	fade.style.opacity = 0;

	// Set player image, bring main game window into view
	playerPortrait.src = CLASS_PORTRAIT_IMGS[selectedChar];
	ShowPlayer();

	gameWindow.style.opacity = 1;
	gameTitle.style.opacity = 1;
}

// choice id	100:	attack
//				101:	
// if choice is 100, roll for player & enemy attacks
// if choice is 101, attempt to flee. enemy attacks if fail
// check hp:	if enemy hp 0, "enemy flees" branch
//				if player hp 0, "black out" branch

// Choose the next path! Special cases for combat and things
function Choose(c = 0) {
	currentChoice = c;

	switch (currentChoice) {
		case (1):				// Reset values
			HideEnemy();		// Unused, but here just in case
			HpBars(0);
			SetPlayerHp();
			SetEnemyHp();
			break;

		case (24):			// Flee
			HideEnemy();
			HpBars(0);
			break;

		case (26):			// Start combat
			HpBars(1);
			break;

		case (31):		// Second page of win/loss screens
		case (32):
			HideEnemy();
			HpBars(0);
			break;

		case (90):		// Enemy appears!
			ShowEnemy();
			break;

		case (100):		// Start battle!
			HpBars(1);
			break;

		case (101):		// Attack
			Combat(0);
			break;

		case (102):		// Flee
			Combat(1);
			break;

		case (200):		// Win screens
		case (201):
		case (202):
		case (203):
		case (204):
			ShowEndGame(currentChoice - 200);
			break;

		default:		// Any other choice!
			break;
	}

	SetChoices();
	ShowChoices();
}

function SetChoices() {
	switch (currentChoice) {	// Ending reached; Don't change any dialogue, exit func early
		case (200):
		case (201):
		case (202):
		case (203):
		case (204):
			return;
		default:
			break;
	}

	// Set next story path for first button
	choice1.onclick = function() {Choose(PATHS[currentChoice][CHOICE_1]);}

	// Set next path for second button. If next path is -1 (implying there is only one choice), unset path
	// Visibility is processed in ShowChoices()
	if (PATHS[currentChoice][CHOICE_2] == -1) {
		choice2.onclick = null;
	}
	else {	// Double choice
		choice2.onclick = function() {Choose(PATHS[currentChoice][CHOICE_2]);}
	}
}

// Modify HTML elements for choice text, buttons
function ShowChoices() {
	let choice1_id = PATHS[currentChoice][CHOICE_1];
	let choice2_id = PATHS[currentChoice][CHOICE_2];

	// If 2nd choice is -1, there is not a second choice, so hide the button
	// Otherwise set text within "choice 2" button
	if (PATHS[currentChoice][CHOICE_2] == -1) {
		choice2.style.visibility = "hidden";
		choice2.innerHTML = "";
	}
	else {		// Ensure button is visible if next 2nd choice is visible
		choice2.innerHTML = PATHS[choice2_id][CHOICE_PROMPT];
		choice2.style.visibility = "visible";
	}
	
	// Make setting the main text block a bit easier
	let flavorText = PATHS[currentChoice][CHOICE_FLAVOR];
	flavorText = ParseTurn(flavorText, playerDiceRoll, playerAttackDamage, enemyAttackDamage);
	choicePrompt.innerHTML = flavorText;

	// Set text within "choice 1" button
	choice1.innerHTML = PATHS[choice1_id][CHOICE_PROMPT];
}

// Process combat turn. If attack, both roll for damage
// If flee, player rolls to flee. If fail, enemy tries to attack
// Special dialogue depending on who does or doesn't hit
function Combat(action = 0) {
	playerDiceRoll = RollDice();
	enemyDiceRoll = RollDice();

	switch (action) {	// I had planned on more than two actions but didn't get to it
		case (0):
			if (playerDiceRoll >= 10 && enemyDiceRoll >= 10) {	// Both hit
				playerAttackDamage = RollDice(25, 15);
				enemyAttackDamage = RollDice(25, 15);

				SetPlayerHp(playerHp, enemyAttackDamage);

				SetEnemyHp(enemyHp, playerAttackDamage);

				if (playerHp > 0 && enemyHp > 0)
					Choose(105);	// Player & enemy were not defeated during attack
									// Back to fight screen with special text
			}
			else if (playerDiceRoll < 10 && enemyDiceRoll >= 10) {	// Player miss enemy hit
				enemyAttackDamage = RollDice(25, 15);

				SetPlayerHp(playerHp, enemyAttackDamage);
				
				if (playerHp > 0)	// Player was not defeated during attack
					Choose(106);
			}
			else if (playerDiceRoll >= 10 && enemyDiceRoll < 10) {	// Player hit enemy miss
				playerAttackDamage = RollDice(25, 15);

				SetEnemyHp(enemyHp, playerAttackDamage);

				if (enemyHp > 0)	// Enemy was not defeated during attack
					Choose(107);
			}
			else if (playerDiceRoll < 10 && enemyDiceRoll < 10) {	// Both miss
				Choose(108);				// Don't need to calculate attacks
			}
			break;

		case (1):
			if (playerDiceRoll >= 10) {	// Flee success
				Choose(111);
			}
			else {						// Flee fail; Enemy tries to attack
				if (enemyDiceRoll >= 10) {	// Enemy attack success
					enemyAttackDamage = RollDice(4);

					SetPlayerHp(playerHp, enemyAttackDamage);
					
					if (playerHp > 0)	// Player still alive during flee attempt?
						Choose(110);
				}
				else if (enemyDiceRoll < 10) {	// Enemy attack fail
					Choose(109);
				}
			}
			break;

		default:	// you broke it!
			alert("Error in Combat(): Invalid action.");
			ShowEndGame(100);
			break;
	}
	// 28 lose
	// 30 win

	// If either hp is 0 after combat turn is processed, do stuff
	if (playerHp == 0) {		// Check player hp first. Player will lose if both hps drop to 0
		Choose(28);
	}
	else {
		if (enemyHp == 0) Choose(30);	// Win condition
	}									// Enemy hp == 0 and player hp > 0
}

// Set player HP, with optional attack damage applied
// If HP over 100, set to 100. If HP below zero, set to zero
// Back to back ternary if statements is terrifying
function SetPlayerHp(hp = 100, damage = 0) {
	newHp = (hp - damage);
	playerHp = newHp > 100 ? 100 : newHp < 0 ? 0 : newHp;

	SetPlayerHpBar();
}

// Set enemy's HP, same as above
function SetEnemyHp(hp = 100, damage = 0) {
	newHp = (hp - damage);
	enemyHp = newHp > 100 ? 100 : newHp < 0 ? 0 : newHp;

	SetEnemyHpBar();
}

// HP bar visuals
function SetPlayerHpBar() {
	playerHpBar.style.width = playerHp.toString() + "%";
}
function SetEnemyHpBar() {
	enemyHpBar.style.width = enemyHp.toString() + "%";
}

// guhhh this func looks yucky
// When I first made this function, I wondered if I could use JS' formatted string feature
// to insert values into a DOM element's inner HTML. That doesn't work! So I did the old school
// "search text for identifier, replace with value"
function ParseTurn(text = "", attackRoll = 0, playerDmg = 0, enemyDmg = 0) {
	let aOrAn = "";
	if (attackRoll == 8 || attackRoll == 11 || attackRoll == 18) // "A" vs "An". English is neat
		aOrAn = "an";
	else aOrAn = "a";

	// Process allll of these at once. It works!
	return text.replace("%an%", aOrAn).replace("%diceroll%", attackRoll).replace("%playerdamage%", playerDmg).replace("%enemydamage%", enemyDmg);
}

// You beat the game!
function ShowEndGame(id = 0) {
	SetEndGameMsg(id);		// Different message depending on which ending

	endGameWindow.classList.add("windowFadeIn-anim");
	endGameWindow.style.animationPlayState = "running";

	endGameWindow.style.opacity = 1;
	fade.style.opacity = 0.6;

	endGameWindow.style.pointerEvents = "all";	// Make clickable
	fade.style.pointerEvents = "all";
}

// Set the block of text on the ending window
function SetEndGameMsg(id = 0) {
	endGameMessage.innerHTML = ENDINGS[id + 1];
}

// Hide the ending window
function HideEndGame() {
	creditsWindow.style.transitionDuration = "0s";
	creditsWindow.style.opacity = 0;
	endGameWindow.style.opacity = 0;
	fade.style.opacity = 0;

	endGameWindow.style.pointerEvents = "none";
	fade.style.pointerEvents = "none";
}

// Credits window slides out from behind ending window
function ToggleCredits() {
	if (creditsShown) {
		document.getElementById("credits-btn").innerHTML = "Credits";
		creditsWindow.classList.remove("credits-shown");
		creditsShown = false;
	}
	else {
		document.getElementById("credits-btn").innerHTML = "Close";
		creditsWindow.classList.add("credits-shown");
		creditsShown = true;
	}
}

// Reset things like player hp and visibility, and prepare to start over
function ResetGame() {
	HpBars(0);
	HideEnemy();
	HidePlayer();
	gameTitle.style.opacity = 0;
	gameWindow.style.opacity = 0;

	selectedChar = -1;

	NewGamePage(1);		// Set new game page, because it was last on 3
	
	HideEndGame();
	if (creditsShown)
		ToggleCredits();
	
	ShowNewGame();
}

// Player portrait visibility
function ShowPlayer() {
	playerPortrait.style.opacity = 1;
}
function HidePlayer() {
	playerPortrait.style.opacity = 0;
}

// Enemy portrait visibility
function ShowEnemy() {
	enemyPortrait.style.opacity = 1;
}
function HideEnemy() {
	enemyPortrait.style.opacity = 0;
}

// Show or hide HP bars
function HpBars(visible = 0) {
	Array.from(document.getElementsByClassName("hp-bar")).forEach(function(item) {
		item.style.opacity = visible;
	});

	Array.from(document.getElementsByClassName("life-text")).forEach(function(item) {
		item.style.opacity = visible;
	});
}

// Remove all caps and whitespace from a string. Used for comparing character names
function NormalizeString(str, innerTrim = false) {
	if (innerTrim) return str.replace(" ", "").toLowerCase();
	else return str.trim().toLowerCase();
}

// Return a random number between (min) and (sides)
function RollDice(sides = 20, min = 1) {
	if (sides > 1 && min >= 1)
		return Math.floor(Math.random() * (sides - min + 1)) + min;
	return -1;
}

// This line begins it all!
StartGame();