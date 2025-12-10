const CHOICE_PROMPT = 0;
const CHOICE_FLAVOR = 1;
const CHOICE_1 = 2;
const CHOICE_2 = 3;

const REX = 0;
const LOP = 1;
const LION = 2;
const DWARF = 3;

const classInfo = {
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

let classPortraits = {
	0 : document.getElementById("char0"),
	1 : document.getElementById("char1"),
	2 : document.getElementById("char2"),
	3 : document.getElementById("char3"),
};

const classPortraitImgs = {
	0 : "img/rex_final.png",
	1 : "img/holland_final.png",
	2 : "img/lionhead_final.png",
	3 : "img/netherland_final.png"
};

const endings = {
	1 : "You have defeated a mighty beast! It feels as if you could take on anything!<br><br>" +
		"You have discovered the Victorious ending. Play again to try and find another!",

	2 : "Better luck next time! The world beyond the Wall is full of scary things.<br><br>" +
		"You have discovered the Defeated ending. Play again to try and find another!",
	
	3 : "So many things to do and see! Maybe you'll have to jump the Wall again some time.<br><br>" +
		"You have discovered the Explorer ending. Play again to try and find another!",

	4 : "The gods' love courses through you as you jump for joy across your land. Yippee!<br><br>" +
		"You have discovered the Blessed ending. Play again to try and find another!",

	5 : "Zzzzzz...<br><br>" +
		"You have discovered the Sleepy ending. Play again to try and find another!"
}

let fade = document.getElementById("fade");
let newGameWindow = document.getElementById("newgame-window");

let nameInput = document.querySelector("#page2 input");
let validateMsg = document.getElementById("validate");

let playerNameElement = document.getElementById("player-name");
let playerPortrait = document.getElementById("player");

let className = document.getElementById("class-name");
let classFlavor = document.getElementById("class-flavor");

let gameTitle = document.getElementById("game-title");
let gameWindow = document.getElementById("game-window");

let choicePrompt = document.getElementById("prompt-text");

let choice1 = document.getElementById("choice1");
let choice2 = document.getElementById("choice2");

let playerHpBar = document.getElementById("player-hp");
let enemyHpBar = document.getElementById("enemy-hp");

let endGameWindow = document.getElementById("endgame-window");
let endGameMessage = document.getElementById("endgame-message");

let creditsWindow = document.getElementById("credits-window");

let playerName = "";
let newGamePageNum = 1;
let selectedChar = -1;
let currentChoice = 0;
let creditsShown = false;

let playerHp = 100;
let enemyHp = 100;

let playerDiceRoll = 0;
let enemyDiceRoll = 0;

let playerAttackDamage = 0;
let enemyAttackDamage = 0;

const randomNames = [
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

const knownNames = [
	"dumpling",
]

// This is horrifying
// This var is in the format:
// choice id : [choice text, choice 1, (optional) choice 2]
const paths = {
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
			"You hear movement behind you and you turn to look. What stands before you makes you freeze.",
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
		31, -1	// DEFEATED ENDING
	],
	29 : [
		"Continue to explore",
			"You continue exploring the realm of the gods.\n\n" +
			"You don't find many interesting things, but at the end of the day you return home satisfied. " +
			"The world isn't as scary as you thought.",
		202, -1	// EXPLORER ENDING
	],
	30 : [
		"Monster defeated",
			"The monster lets out a terrible noise and flees. You have won!\n\n" +
			"After some more time exploring the realm of the gods, you return home and jump the Wall again.\n\n" +
			"Maybe the world isn't too big for such a small bunny.",
		200, -1	// VICTORIOUS ENDING
	],
	31 : [
		"...",
			"You wake up in your land. There are wrappings on your legs and food by your face.\n\n" +
			"You should've known better than to try to explore the land of the gods.",
		201, -1	// DEFEATED ENDING 2
	],
	// 200 win
	// 201 lose
	// 202 explore
	// 203 blessed
	// 204 sleep
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

// This was for testing! I may forget to remove it.

// let longest = "";
// for (const [key, value] of Object.entries(paths)) {
// 	console.log()
// 	if (value[CHOICE_FLAVOR].length > longest.length) longest = value[CHOICE_FLAVOR];
// }
// console.log(longest);

function RollDice(sides = 20, min = 1) {
	if (sides > 1 && min >= 1)
		return Math.floor(Math.random() * (sides - min + 1)) + min;
	return -1;
}

function NameChar(name = "Bunny") {
	playerNameElement.innerHTML = name;
}

function StartGame() {
	ShowNewGame();
	//NewGamePage(3);
	NameChar();
	Choose(1);
}

function ShowChoices() {
	let choice1_id = paths[currentChoice][CHOICE_1];
	let choice2_id = paths[currentChoice][CHOICE_2];

	if (paths[currentChoice][CHOICE_2] == -1) {
		choice2.style.visibility = "hidden";
		choice2.innerHTML = "";
	}
	else {
		choice2.innerHTML = paths[choice2_id][CHOICE_PROMPT];
		choice2.style.visibility = "visible";
	}
	
	let flavorText = paths[currentChoice][CHOICE_FLAVOR];

	flavorText = ParseTurn(flavorText, playerDiceRoll, playerAttackDamage, enemyAttackDamage);

	choicePrompt.innerHTML = flavorText;

	choice1.innerHTML = paths[choice1_id][CHOICE_PROMPT];
}

// choice id	100:	attack
//				101:	
// if choice is 100, roll for player & enemy attacks
// if choice is 101, attempt to flee. 0 dmg if fail
// check hp:	if enemy hp 0, "enemy flees" branch
//				if player hp 0, "black out" branch

function Choose(c = 0) {
	currentChoice = c;

	switch (currentChoice) {
		case (1):				// Reset values
			HideEnemy();
			HpBars(0);
			playerHp = 100;
			enemyHp = 100;
			SetPlayerHpBar();
			SetEnemyHpBar();
			break;
		case (24):			// Flee
				HideEnemy();
				HpBars(0);
			break;
		case (26):			// Start combat
			HpBars(1);
			break;

		case (31):		// Fight loss pt 2
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

		default:
			break;
	}

	SetChoices();
	ShowChoices();
}

function SetChoices() {
	switch (currentChoice) {	// Do not change anything if ending reached
		case (200):
		case (201):
		case (202):
		case (203):
		case (204):
			return;
		default:
			break;
	}
	choice1.onclick = function() {Choose(paths[currentChoice][CHOICE_1]);}
	if (paths[currentChoice][CHOICE_2] == -1) {		// Single choice
		choice2.onclick = null;
	}
	else {	// Double choice
		choice2.onclick = function() {Choose(paths[currentChoice][CHOICE_2]);}
	}
}

function Combat(action = 0) {	// Combat turn (attack or flee?)
	playerDiceRoll = RollDice();
	enemyDiceRoll = RollDice();

	switch (action) {
		case (0):
			if (playerDiceRoll >= 10 && enemyDiceRoll >= 10) {	// Both hit
				playerAttackDamage = RollDice(25, 15);
				enemyAttackDamage = RollDice(25, 15);

				SetPlayerHp(playerHp, enemyAttackDamage);
				SetPlayerHpBar();

				SetEnemyHp(enemyHp, playerAttackDamage);
				SetEnemyHpBar();

				if (playerHp > 0 && enemyHp > 0)
					Choose(105);	// Back to attack screen if neither hp reaches 0
			}
			else if (playerDiceRoll < 10 && enemyDiceRoll >= 10) {	// Player miss enemy hit
				enemyAttackDamage = RollDice(25, 15);

				SetPlayerHp(playerHp, enemyAttackDamage);
				SetPlayerHpBar();

				if (playerHp == 0) Choose(28);
				Choose(106);
			}
			else if (playerDiceRoll >= 10 && enemyDiceRoll < 10) {	// Player hit enemy miss
				playerAttackDamage = RollDice(25, 15);

				SetEnemyHp(enemyHp, playerAttackDamage);
				SetEnemyHpBar();

				if (enemyHp > 0)
					Choose(107);
			}
			else if (playerDiceRoll < 10 && enemyDiceRoll < 10) {	// Both miss
				Choose(108);				// Don't need to calculate attacks
			}
			break;
		case (1):
			if (playerDiceRoll >= 10) {	// Success
				Choose(111);
			}
			else {
				if (enemyDiceRoll >= 10) {
					enemyAttackDamage = RollDice(4);

					SetPlayerHp(playerHp, enemyAttackDamage);
					SetPlayerHpBar();
					
					if (playerHp > 0)
						Choose(110);
					else 
						Choose(28);
				}
				else if (enemyDiceRoll < 10) {
					Choose(109);
				}
			}
			break;
		default:
			alert("Error in Combat(): Invalid action. Restarting");
			Choose(1);
			break;

	}
	// 28 lose
	// 30 win

	if (playerHp == 0) {		// Check player hp first. Player loses if draw
		Choose(28);
	}
	else {
		if (enemyHp == 0) Choose(30);	// Win condition
	}									// Enemy hp == 0 and player hp > 0
	
	
		//Choose(28);	// Check player hp first. Enemy wins if draw
	//if (enemyHp == 0) Choose(30);
}

function PlayerTakeDamage() {
	
}

function EnemyTakeDamage() {
	
}

function SetPlayerHp(hp = 100, damage = 0) {
	newHp = (hp - damage);
	playerHp = newHp > 100 ? 100 : newHp < 0 ? 0 : newHp;
}

function SetEnemyHp(hp = 100, damage = 0) {
	newHp = (hp - damage);
	enemyHp = newHp > 100 ? 100 : newHp < 0 ? 0 : newHp;
}

function SetPlayerHpBar() {
	playerHpBar.style.width = playerHp.toString() + "%";
}
function SetEnemyHpBar() {
	enemyHpBar.style.width = enemyHp.toString() + "%";
}

// guhhh
// 8, 11, 18 need "an"
function ParseTurn(text = "", attackRoll = 0, playerDmg = 0, enemyDmg = 0) {
	let aOrAn = "";
	if (attackRoll == 8 || attackRoll == 11 || attackRoll == 18) 
		aOrAn = "an";
	else aOrAn = "a";
	return text.replace("%an%", aOrAn).replace("%diceroll%", attackRoll).replace("%playerdamage%", playerDmg).replace("%enemydamage%", enemyDmg);
}

function TestAnimation() {
	
}

function ShowNewGame() {
	newGameWindow.style.pointerEvents = "all";
	fade.style.pointerEvents = "all";

	fade.style.opacity = 0.6;

	newGameWindow.classList.add("windowFadeIn-anim");
	newGameWindow.style.opacity = 1;
	newGameWindow.style.animationPlayState = "running";
}

function BeginNewGame() {
	if (creditsShown) ToggleCredits();
	Choose(1);

	playerHp = 100;
	enemyHp = 100;
	
	SetPlayerHpBar();
	SetEnemyHpBar();

	newGameWindow.classList.add("windowFadeOut-anim");
	newGameWindow.style.animationPlayState = "running";

	newGameWindow.style.opacity = 0;
	newGameWindow.style.pointerEvents = "none";

	let currentPage = document.getElementById(`page${newGamePageNum}`);
	currentPage.style.pointerEvents = "none";
	
	fade.style.pointerEvents = "none";
	fade.style.opacity = 0;

	playerNameElement.innerHTML = playerName;

	playerPortrait.src = classPortraitImgs[selectedChar];
	ShowPlayer();

	gameWindow.style.opacity = 1;
	gameTitle.style.opacity = 1;
}

function NewGamePage(page = 1) {
	let currentPage = document.getElementById(`page${newGamePageNum}`);
	currentPage.style.opacity = 0;
	currentPage.style.pointerEvents = "none";

	newGamePageNum = page;

	currentPage = document.getElementById(`page${newGamePageNum}`);
	currentPage.style.opacity = 1;
	currentPage.style.pointerEvents = "all";
}

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

function SelectChar(id = 0) {
	selectedChar = id;
	ValidateMessage("");
	NewGamePage(2);
}

function RandomName() {
	let name_id = Math.floor(Math.random() * (randomNames.length));
	if (nameInput.value == randomNames[name_id]) RandomName();
	else {
		nameInput.value = randomNames[name_id];
	}
}

function ValidateName() {
	if (nameInput.value.length == 0) {
		ValidateMessage("You need a name!", true);
		return false;
	}
	switch (NormalizeString(nameInput.value)) {
		case "dumpling":
		case "dumbpling":
			if (selectedChar != LOP) {
				ValidateMessage("That name feels like it belongs to a lop...", true);
				return false;
			} else return true;
			break;
		default:		// Good name!
			return true;
			break;
	}
}

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

validateMsg.addEventListener("animationend", (event) => {
	validateMsg.classList.remove("error-anim");
});

function ConfirmName() {
	if (ValidateName()) {
		playerName = nameInput.value;
		knownNames.forEach(function(name) {	// easter egg o:
			if (NormalizeString(playerName) == name) {
				document.getElementById("secret-name").innerHTML = "special";
			}
		});
		NewGamePage(3);
	}
}

// When a portrait is hovered over, show its name and description.
// When it's no longer being hovered over, remove text if no selection.
// If there is a selection, keep its text visible

for (let i = 0; i < 4; i++) {
	classPortraits[i].addEventListener("mouseenter", (event) => {
		SetFlavorText(classInfo[i][0], classInfo[i][1]);
	});

	classPortraits[i].addEventListener("mouseleave", (event) => {
		if (selectedChar == -1) SetFlavorText("", "");
		else SetFlavorText(classInfo[selectedChar][0], classInfo[selectedChar][1]);
	});
}

function SetFlavorText(name, desc) {
	className.innerHTML = name;
	classFlavor.innerHTML = desc;
}

// nameInput.addEventListener("focusin", (event) => {
// 	nameInput.style.backgroundColor = "#fff";
// });

// nameInput.addEventListener("focusout", (event) => {
// 	if (nameInput.value != "") nameInput.style.backgroundColor = "#fff";
// 	else nameInput.style.backgroundColor = "#bac8c0";
// });

// Use regex + replace to forcibly allow only letters
nameInput.addEventListener("input", (event) => {
	 nameInput.value = nameInput.value.replace(/[^a-zA-Z\s]/g, '');
})

newGameWindow.addEventListener("animationend", (event) => {
	newGameWindow.classList.remove("windowFadeIn-anim");
	newGameWindow.classList.remove("windowFadeOut-anim");
});

function ShowEndGame(id = 0) {
	SetEndGameMsg(id);

	endGameWindow.classList.add("windowFadeIn-anim");
	endGameWindow.style.animationPlayState = "running";

	endGameWindow.style.opacity = 1;
	//creditsWindow.style.opacity = 1;
	fade.style.opacity = 0.6;

	endGameWindow.style.pointerEvents = "all";
	fade.style.pointerEvents = "all";
}

endGameWindow.addEventListener("animationend", (event) => {
	if (endGameWindow.classList.contains("windowFadeIn-anim")) {
		creditsWindow.style.opacity = 1;
		creditsWindow.style.transitionDuration = "0.2s";
		endGameWindow.classList.remove("windowFadeIn-anim");
	}
	if (endGameWindow.classList.contains("windowFadeOut-anim"))
		creditsWindow.classList.remove("windowFadeOut-anim");
});


function HideEndGame() {
	creditsWindow.style.transitionDuration = "0";
	creditsWindow.style.opacity = 0;
	endGameWindow.style.opacity = 0;
	fade.style.opacity = 0;

	endGameWindow.style.pointerEvents = "none";
	fade.style.pointerEvents = "none";
}

function SetEndGameMsg(id = 0) {
	endGameMessage.innerHTML = endings[id + 1];
}

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

function ResetGame() {
	HpBars(0);
	HideEnemy();
	HidePlayer();
	gameTitle.style.opacity = 0;
	gameWindow.style.opacity = 0;

	selectedChar = -1;

	NewGamePage(1);
	
	HideEndGame();
	if (creditsShown) ToggleCredits();
	
	ShowNewGame();
}

function HpBars(visible = 0) {
	Array.from(document.getElementsByClassName("hp-bar")).forEach(function(item) {
		item.style.opacity = visible;
	});

	Array.from(document.getElementsByClassName("life-text")).forEach(function(item) {
		item.style.opacity = visible;
	});
}

function ShowEnemy() {
	document.getElementById("enemy").style.opacity = 1;
}

function HideEnemy() {
	document.getElementById("enemy").style.opacity = 0;
}

function ShowPlayer() {
	playerPortrait.style.opacity = 1;
}

function HidePlayer() {
	playerPortrait.style.opacity = 0;
}

function NormalizeString(str, innerTrim = false) {
	if (innerTrim) return str.replace(" ", "").toLowerCase();
	else return str.trim().toLowerCase();
}

StartGame();