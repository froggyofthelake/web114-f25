const paths = [
	[
		0,
		"",
			"You win! Thanks for playing!\n\nClick the button to play again.",
		1, -1
	],
	[
		1,
		"",
			"All bunnies begin their day the same. Snoozing.\n\n" +
			"You are snoozing. The sun is starting to rise.\n\n" + 
			"Is it time to get up?",
		2, 3
	],
	[
		2,
		"Keep sleeping",
			"What is life without sleep? The world can wait while this bun rests.\n\n" +
			"You start to get hungry. Is it time to get up yet?",
		12, 3
	],
	[
		3,
		"Wake up!! It's time to eat",
			"You stand up and stretch! Your tummy is rumbling. It's time to find food.\n\n" +
			"In these lands, food is hard to come by. Often you must wait for the gods to bestow you with sustenance.\n\n" +
			"Do you scavenge or wait?",
		4, 8
	],
	[
		4,
		"Scavenge, there must be something to eat",
			"You set off to hunt for food.",
		5, 6
	],
	[
		5,
		"Explore the tunnels",
			"The tunnels are the same as always. You shove them to see if this will make food appear. No luck.",
		6, -1
	],
	[
		6,
		"Explore the Open Lands",
			"You set off towards the Open Lands. You spot your bathroom. Oh yeah, there's hay there!\n\n" +
			"Success! Food has been found.",
		7, -1
	],
	[
		7,
		"Nibble on hay",
			"Hay is delicious!! You enjoy nibbling on it throughout the day, though you wish you had something more to eat right now.",
		0, -1	// End
	],
	[
		8,
		"Pray to the gods for food",
			"You journey to the edge of your territory, where the Great Wall stands.\n" +
			"You press your nose through the bars and wait. You can see the blurred outlines of the gods on the other side.\n\n" +
			"Something touches your nose.",
		9, 10
	],
	[
		9,
		"WHAT IS THAT",
			"You jerk your head back. You realize that was one of the gods trying to touch you. " +
			"You shove your nose back into the bars. Something touches your nose again.",
		10, -1
	],
	[
		10,
		"Stand strong, these are the trials you must endure for food",
			"The god pets your nose and tickles your chin, and you jerk away.\n\n" +
			"You stand there, thinking you have just failed your trial. But then, " +
			"The god bestows you with food!!",
		11, -1
	]
	[
		11,
		"Eat the pellets!!",
			"Delicious!! You love these.\n\n" +
			"Your tummy is full for now. What will you do next?",
		0, -1
	],
	[
		12,
		"No, sleepy time!",
		"You sleep the day away. You wake up to food piled on your altar. What a blessing!\n\n" +
		"You eat to your heart's content and flop over to get more sleep. Life is hard being a bunny.",
		0, -1
	],

]