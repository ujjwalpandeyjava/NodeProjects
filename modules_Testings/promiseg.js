/*function xxx() {
	let x = new Promise((resolve, reject) => {
		resolve("Pass Data");
		// reject("Fail Data");
	}).then((ss) => {
		console.log(ss, "ss");
	}).catch((ee) => {
		console.log(ee, "ee");
	});

	Promise.allSettled([x])
		.then(allExecuted => {
			console.log(allExecuted, "Success Save & Exit");
		}).catch((error) => {
			console.log(error, "error Save & Exit");
		});
}
// Will run on browser

xxx();

*/

function test1() {
	return Boolean(false);
}
function isItTimeToLogout() {
	return true;
}


if (isItTimeToLogout() && test1() === false) {
	console.log("test1 logged!!");
}