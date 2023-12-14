function makeFunc() {
	const name = 'Mozilla';
	let x = 1;
	function displayName() {
		x++;
		let y = 2;
		console.log(name, x, y++);
	}
	return displayName;
}

const myFunc = makeFunc();
myFunc();
myFunc();
myFunc();
myFunc();



function A() {
	let x = 1;

	function B(msg) {
		x++;
		let y = 2;
		console.log(x, y++, "test", msg);
	}
	A.B = B;
}

A();
A.B("hello ujjwal");
A.B("hello ujjwal2");
A.B("hello ujjwal2");