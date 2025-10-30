// Jade M Ambrose
let favMonth = lower(prompt("What's your favorite month?"));
let validMonth = false;
switch (favMonth) {
	case "january":
		validMonth = true;
		console.log("It's snowing!");
		break;
	case "february":
		validMonth = true;
		console.log("Love is in the air!");
		break;
	case "march":
		validMonth = true;
		console.log("Spring time!");
		break;
	case "april":
		validMonth = true;
		console.log("Bringing May flowers!");
		break;
	case "may":
		validMonth = true;
		console.log("School's out!");
		break;
	case "june":
		validMonth = true;
		console.log("Go to the pool!");
		break;
	case "july":
		validMonth = true;
		console.log("Happy birthday, Dumpling!");
		break;
	case "august":
		validMonth = true;
		console.log("Ready for school?");
		break;
	case "september":
		validMonth = true;
		console.log("Hey, it's my birthday!");
		break;
	case "october":
		validMonth = true;
		console.log("Spooky!");
		break;
	case "november":
		validMonth = true;
		console.log("Crisp autumn air!");
		break;
	case "december":
		validMonth = true;
		console.log("Ready for the new year?");
		break;
}

if (validMonth) {
	if (favMonth == "december" || favMonth == "january" || favMonth == "february") {
		console.log("You love the winter months!");
	}
	else if (favMonth == "june" || favMonth == "july" || favMonth == "august") {
		console.log("You enjoy the summer months!");
	}
	else {
		console.log("Other months are interesting too!");
	}
}
else {
	console.log("What you typed isn't a valid month! Please try again.");
}