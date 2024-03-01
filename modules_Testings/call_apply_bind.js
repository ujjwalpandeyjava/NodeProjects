let student = {
	fName: "Ujjwal",
	lName: "Pandey",
	email: function () {
		return `${this.fName}_${this.lName}@gmail.com`;
	},
};
let teacher = {
	fName: "Guru",
	lName: "Ji",
	email: function () {
		return `${this.fName}_${this.lName}@gmail.com`;
	},
};
let worker = {
	fName: "Worker",
	lName: "sid",
	email: function () {
		return `${this.fName}_${this.lName}@gmail.com`;
	},
};
console.clear();
console.log("\n----Simple----");
console.log(student.email());
console.log(teacher.email());
console.log(worker.email());


// call(): Email is common in objects, thus can have a seperate function for email
function email2(id, clas) {	// Email2 to demonstrate
	return `${this.fName}_${this.lName}_2${id}@gmail.com`;
}

console.log("\n----call() example----");
console.log(email2.call(student, "id-101", "class-o1"));	// second parameter undefined
console.log(email2.call(teacher, "id-102"));				// second parameter undefined
console.log(email2.call(worker, "id-103"));

// apply(): this uses array as an argument
console.log("\n----apply() example----");
console.log(email2.apply(student, ["id-101", "class-01"]));
console.log(email2.apply(teacher, ["id-102", "class-02"]));
console.log(email2.apply(worker, ["id-103", "class-03"]));


// apply(): it creates new function which can e used later
console.log("\n----apply() example----");
console.log(email2.bind(student, ["id-101", "class-01"])());
console.log(email2.bind(teacher, ["id-102", "class-02"])());
console.log(email2.bind(worker, ["id-103", "class-03"])());
console.log("----OR----");
let st = email2.bind(student, ["id-111",'other']);
console.log(st());