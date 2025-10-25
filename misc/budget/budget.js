// Jade Ambrose (I got married!)
// 16-Oct-2025

var rent = 10000;
var housing = 1000;
var food = 100;
var utilities = 225;

var income = 10000;

var totalExpenses = housing + food + utilities;

var remainingMoney = income - totalExpenses;

var rentPct = (housing / income) * 100;
var groceryPct = (food / income) * 100;

console.log("The total income was: " + income.toLocaleString("en-US", { style: "currency", currency: "USD", }));

console.log("The grocery total was: " + food.toLocaleString("en-US", { style: "currency", currency: "USD" }));

console.log("The percent spent on rent is: " + rentPct + "%");
console.log("The percent spent on groceries is: " + groceryPct + "%");