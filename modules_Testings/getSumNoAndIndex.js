var array = [1, 3, 12, 7, 9, 8, 4, 18];
function GetSentence(sumToFind) {
	for (let arrIndex = 0; arrIndex < array.length; arrIndex++) {
		let firstNo = array[arrIndex];
		let secondNoHasToBe = sumToFind - firstNo;
		for (let secondNoIndex = 0; secondNoIndex < array.length; secondNoIndex++) {
			let secondNo = array[secondNoIndex];
			if (secondNo == secondNoHasToBe)
				return { numbers: [array[arrIndex], array[secondNoIndex]], indexes: [arrIndex, secondNoIndex] };
		}
	}
	return "Number 2 digit sum is equal to the given number!";
}
GetSentence(12);