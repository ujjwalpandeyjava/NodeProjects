function A() {
	function B(msg) {
		console.log("test", msg);
	}

	A.B = B; //  to make it abailvale to outter code.
}

A();
A.B("hello ujjwal");