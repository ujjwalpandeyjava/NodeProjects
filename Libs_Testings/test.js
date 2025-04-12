function priceCalculator(noOfScheduler = 0, noOfmcw = 0, noOfMobileApp = 0) {
	const pricing = {
		schedulerPrice: 30,
		mcwPrice: 59,
		mobileAppPrice: 19,
	}
	const freeCount = {
		scheduler: 1,
		mcw: 10,
		mobile: 10,
	}


	let schedulerprice = (noOfScheduler - freeCount.scheduler) * pricing.schedulerPrice;
	if (schedulerprice < 0) schedulerprice = 0;

	let mcwprice = (noOfmcw - freeCount.mcw) * pricing.mcwPrice;
	if (mcwprice < 0) mcwprice = 0;

	let mobileprice = (noOfMobileApp - freeCount.mobile) * pricing.mobileAppPrice;
	if (mobileprice < 0) mobileprice = 0;


	calculatedValue = schedulerprice + mcwprice + mobileprice;
	console.log(schedulerprice, mcwprice, mobileprice);
	console.log("Actual pricing: " + calculatedValue);
	if (calculatedValue < 0) calculatedValue = 0;

	return calculatedValue;
}

console.log(priceCalculator(2, 11, 11));