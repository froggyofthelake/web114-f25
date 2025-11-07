// Jade M Ambrose
for (let i = 1; i <= 5; i++) {
	console.log("Snack #" + i + " given to customer");
}

let snackCount = prompt("How many snacks do you want?");
snackCount = Number(snackCount);

if (snackCount == null) {
	console.log("No snacks requested. Exiting.");
}
else {
	let total = 0;
	for (let i = 1; i <= snackCount; i++) {
		let snack = prompt("Enter snack #" + i + " name");
		if (snack == null) {
			console.log("Snack selection canceled. Exiting.");
			break;
		}
		total++;
		console.log("Snack #" + i + ": " + snack + " given to customer.");
		if (i % 3 == 0) {
			console.log("You got a bonus snack!");
			total++;
		}
	}
	console.log("Total snacks: " + total);
}