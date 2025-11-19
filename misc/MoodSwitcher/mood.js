// Jade M Ambrose

const moodDisplay = document.getElementById("moodDisplay");

const moods = {
	happy:		{bg: "#ff9800", text: "#3e2723", message: "Pumpkin spice everything!"},
	calm:		{bg: "#FEDDD8", text: "#3D4A38", message: "Have a cup of tea!"},
	excited:	{bg: "#FF4FA7", text: "#FFFFFF", message: "Let's party!"},
	chill:		{bg: "#76FFFF", text: "#FFFFFF", message: "Time for some cocoa!"},
	mysterious: { bg: "#427857", text: "#540560", message: "Spooky!" },
	reset: { bg: "#FFFFFF", text: "#000000", message: "Choose a mood..." }
}

document.addEventListener('click', function (event) {

	if (event.target.classList.contains('mood-btn')) {
		const mood = event.target.getAttribute("data-mood");

		const config = moods[mood];

		console.log(mood);
		console.log(config);

		document.body.style.backgroundColor = config.bg;
		document.body.style.color = config.text;
		moodDisplay.textContent = config.message;
	}
});