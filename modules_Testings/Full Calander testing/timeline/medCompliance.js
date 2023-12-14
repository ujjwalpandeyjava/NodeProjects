var patient = "", gPatientMedicationDetails = "";
var calenderEventsData = [], calendarResources = [];

//	First function to start compliance work with (API)
function getMedicationRequestFromFhir() {
	patient = gPatientId;
	onBusyWaitSpinner("waitingDiv", "waitingSpinner", "msgDiv", "Searching for Medication Complaince");
	document.getElementById("medComplianceCalendar").innerHTML = `<h2 style="margin: 50px auto; display: block; font-weight: bold; text-align: center; ">Looking for medications to Administer...</h2>`;
	let queryObj = {};
	queryObj["patient"] = patient;
	queryObj["resourceType"] = "MedicationRequest";
	// getFhirRecords(queryObj, medicationrequestCallback, medicationErrorCallback);
	setTimeout(() => {
		medicationrequestCallback(gPatientMedicationDetails)
	}, 150);
	// document.getElementById("legendCompliance").style.display = "none";
}

// Success-Callback of getFhirRecords
function medicationrequestCallback(rs) {
	if (rs.entry) {
		let medReqDataList = rs.entry.filter(value => moment(value.resource.dosageInstruction[0].timing.repeat.boundsPeriod.end).format('YYYY-MM-DD HH:mm') > moment(new Date()).format("YYYY-MM-DD HH:mm") && value.resource.status == "active");
		if (medReqDataList.length <= 0) {
			document.getElementById("medComplianceCalendar").innerHTML = `<h2 style="margin: 50px auto; display: block; font-weight: bold; text-align: center; ">No active medication to Administer</h2>`;
			offBusyWaitSpinner("waitingDiv", "waitingSpinner", "msgDiv", "No medications to Administer");			
		}
		else
			getMedicationComplainceData(medReqDataList);
	} else {
		offBusyWaitSpinner("waitingDiv", "waitingSpinner", "msgDiv", "No medications to Administer");
		document.getElementById("medComplianceCalendar").innerHTML = `<h2 style="margin: 50px auto; display: block; font-weight: bold; text-align: center; ">No active medication to Administer</h2>`;		
	}
}
// Error-Callback of getFhirRecords
function medicationErrorCallback() {
	offBusyWaitSpinner("waitingDiv", "waitingSpinner", "msgDiv", "Error!! EMR Client not found."); 
}
// Shift below 4 functions to last of the page
// 	yellowgreen: Taken, Red: Not-taken, Blue: Prescriped, Pink: not-known  --> dayTime:[MORN, AFT, EVE, NIGHT]
function postMedicationStatus(id, startTime, endTime, medicationDate, medicationStatus, index) {
	// console.log(`${medicationStatus}, date "${medicationDate}", ---- Start > ${startTime}, End > ${endTime}` );
	let medDescriptionColor = (medicationStatus == "completed") ? 'yellowgreen' : (medicationStatus == "not-done" || medicationStatus == "on_hold") ? 'red' : 'pink';

	setColourCode(id, startTime, endTime, medDescriptionColor, medicationDate, index);
}

//	Function to set the color for calender
function setColourCode(id, startTime, endTime, color, medicationDate, index) {
	calenderEventsData.push({'id': id, 'resourceId': 'med'+(index+1), 'start': medicationDate.substring(0, 10) + `${startTime}`, 'end' : medicationDate.substring(0, 10)+`${endTime}`, backgroundColor: `${color}`, borderColor: `${color}`});
}

//	Function to show the time in which medicines are prescibed
function showPrescribedMedicineDaytime(id, prescribedMedicine, notPrescribedMedicine, medicationDate, forMedNo) {
	prescribedMedicine.forEach(daytime => {
		switch (daytime) {
			case "MORN":
				notPrescribedMedicine.splice(notPrescribedMedicine.indexOf("MORN"), 1);
				setColourCode(id, 'T08:00:00', 'T12:00:00', 'LightBlue', medicationDate, forMedNo);
				break;
			case "AFT":
				notPrescribedMedicine.splice(notPrescribedMedicine.indexOf("AFT"), 1);
				setColourCode(id, 'T12:00:00', 'T16:00:00', 'LightBlue', medicationDate, forMedNo);
				break;
			case "EVE":
				notPrescribedMedicine.splice(notPrescribedMedicine.indexOf("EVE"), 1);
				setColourCode(id, 'T16:00:00', 'T20:00:00', 'LightBlue', medicationDate, forMedNo);
				break;
			case "NIGHT":
				notPrescribedMedicine.splice(notPrescribedMedicine.indexOf("NIGHT"), 1);
				setColourCode(id, 'T20:00:00', 'T24:00:00', 'LightBlue', medicationDate, forMedNo);
				break;
			default:
				console.log(`This time is not in schedule`);
				break;
		}
	});
	return notPrescribedMedicine;
}

// Change cell color to ligthgray for the time in which medicines are not prescibed
function shownotprescribedMedicineDaytime(id, notPrescribedMedicine, medicationDate, forMedNo) {
	notPrescribedMedicine.forEach(function (daytime, index) {
		if (daytime == "MORN") {
			setColourCode(id, 'T08:00:00', 'T12:00:00', 'lightgrey', medicationDate, forMedNo);
		}
		else if (daytime == "AFT") {
			setColourCode(id, 'T12:00:00', 'T16:00:00', 'lightgrey', medicationDate, forMedNo);
		}
		else if (daytime == "EVE") {
			setColourCode(id, 'T16:00:00', 'T20:00:00', 'lightgrey', medicationDate, forMedNo);
		}
		else if (daytime == "NIGHT") {
			setColourCode(id, 'T20:00:00', 'T24:00:00', 'lightgrey', medicationDate, forMedNo);
		}
	});
}

//	Only for active medication. --> Picks 1-medication go for all of its dates and then procides for next medication.
function getMedicationComplainceData(medReqData) {
	// console.log(medReqData);
	calenderEventsData = [], calendarResources = [];
	if (medReqData && medReqData.length > 0) {
		let id = 1;
		// Look through each active medication one by one
		for (let i = 0; i < medReqData.length; i++) {
			let medication_Reference_ID = medReqData[i].resource.medicationReference.reference;
			let medicationId = medication_Reference_ID.substring(medication_Reference_ID.indexOf("/") + 1);

			let when = medReqData[i].resource.dosageInstruction[0].timing.repeat.when;  // Ehat daytime medicine to be given.
			var prescribedMedicineTime = when.slice(0);

			// List of all the scheduled dates for this medicine
			let medicationDates = getDatesforMedication(medReqData[i].resource.dosageInstruction[0].timing.repeat.boundsPeriod.start.substring(0, 10), medReqData[i].resource.dosageInstruction[0].timing.repeat.boundsPeriod.end.substring(0, 10));

			// Storing medicine name inside a variable.
			let medicineName = medReqData[i].resource.category[0].coding[0].display;
			// medicineName = medicineName.substring(0, medicineName.indexOf(medicineName.match(/[\d|.]/)));	//Short name of the medicine



			// if the medicaiton is precribed go on, else do nothing
			if (medicationDates.length > 0) {
				calendarResources.push({ 'id': `med${i + 1}`, 'title': medicineName });	//Resources is Medicine Names list to be displayed on left side of Calendar

				//	For new way to fetch data and show (it will be O(n) instead of O(n^2);
				//	Get all saved details from FHIR about this prescribed Med
				// &_sort=-effectiveDateTime
				$.ajax({
					url: url + `/MedicationAdministration?medication=${medicationId}&patient=${patient}`,
					dataType: 'json',
					type: 'get',
					contentType: 'application/json',
					processData: false,
					async: false,
					headers: { "Authorization": "Bearer " + parent.gAccessToken },
					success: medicationData => {
						/* 	Important note:
						* 	Med status command --> 1. Completed (taken), 2. Skip (on_hold), 3. Completed/Skip - Checked (taken) and Unchecked (not-done).
						*	Color code --> prescribed (today & future) = lightblue, Not-prescribed = lightgrey, completed = yellogreen, on_hold and not-done = red, no data = pink;
						*/

						// console.warn("Medication for: ", medicineName, medReqData[i], "\n\n");
						// console.log("medication Data:", medicationData);
						let weHaveDataForTheseDates = [];


						if (medicationData.entry) {
							medicationData.entry.sort((a, b) => moment(a.resource.effectiveDateTime).format("YYYY-MM-DD HH:mm:ss") > moment(b.resource.effectiveDateTime).format("YYYY-MM-DD HH:mm:ss") ? 1 : -1);
							weHaveDataForTheseDates = medicationData.entry.map(eachRow => eachRow.resource.effectiveDateTime);
							// console.log(weHaveDataForTheseDates);
						}

						// Iterate over each date and fill data in calender.
						for (let j = 0; j < medicationDates.length; j++) {
							let fillDataForThisDate = medicationDates[j];
							let newWhen = when.slice(0);
							let notPrescribedMedicineShifts = ["MORN", "AFT", "EVE", "NIGHT"];
							newWhen.forEach(shift => {
								notPrescribedMedicineShifts.splice(notPrescribedMedicineShifts.indexOf(shift), 1);
							}); 	// 	console.log(newWhen, notPrescribedMedicineShifts)

							if (isDateNotAFutureDate(moment(fillDataForThisDate).format('YYYY-MM-DD'), moment(new Date()).format("YYYY-MM-DD"))) {	//	Not a Future date
								//console.log("Fill data for past dates and today");
								let workingOnPresentDay = isThisDatePresentDate(fillDataForThisDate);
								// console.log("Working on present Date ? ", workingOnPresentDay);

								if (!workingOnPresentDay) {		//	Past date
									// console.log(fillDataForThisDate, weHaveDataForTheseDates);
									let currentDateMedAdminstration = getCurrentDateSavedData(fillDataForThisDate, weHaveDataForTheseDates, medicationData.entry);
									//if (currentDateMedAdminstration.length <= 0) console.log(currentDateMedAdminstration); else console.warn(currentDateMedAdminstration);

									// filling the calender with (green-red else pink) the data from currentDateMedAdminstration
									currentDateMedAdminstration.forEach(eachDataRow => {
										// console.log(eachDataRow);
										let mDate = eachDataRow.resource.effectiveDateTime;
										let medicationStatus = eachDataRow.resource.status;
										//	Adding prescribed taken/not-taken med till date, --> background = (status == completed) ? yellowgreen : (status == not-done) ? Red : Pink;	
										if (timeCheck("08:00:00", "13:59:00", mDate.substring(11, 19))) {			//Morning
											if (newWhen.includes("MORN")) newWhen.splice(newWhen.indexOf("MORN"), 1);	// Remove the "MORN" from daytime
											postMedicationStatus(id, 'T08:00:00', 'T12:00:00', mDate, medicationStatus, i);	//
										} else if (timeCheck("14:00:00", "17:59:00", mDate.substring(11, 19))) {	//Afternoon
											if (newWhen.includes("AFT")) newWhen.splice(newWhen.indexOf("AFT"), 1);	// Remove the "AFT" from daytime
											postMedicationStatus(id, 'T12:00:00', 'T16:00:00', mDate, medicationStatus, i);
										} else if (timeCheck("18:00:00", "21:59:00", mDate.substring(11, 19))) {	//Evening
											if (newWhen.includes("EVE")) newWhen.splice(newWhen.indexOf("EVE"), 1);	// Remove the "EVE" from daytime
											postMedicationStatus(id, 'T16:00:00', 'T20:00:00', mDate, medicationStatus, i);
										} else if (timeCheck("22:00:00", "23:59:00", mDate.substring(11, 19))) {	//Night
											if (newWhen.includes("NIGHT")) newWhen.splice(newWhen.indexOf("NIGHT"), 1);	// Remove the "NIGHT" from daytime
											postMedicationStatus(id, 'T20:00:00', 'T24:00:00', mDate, medicationStatus, i);
										} else { console.log("##############____Medicine_Status_Time_Not_Found____###############"); }
										id++;
									});

									// filling the calender with not-found (pink) for 
									if (newWhen.length > 0) {
										// console.log("fill these shifts with pink", newWhen);
										//Set colour for medication not-found: pink (didn't entered taken or not)
										if (newWhen.includes("MORN"))
											setColourCode(id, 'T08:00:00', 'T12:00:00', 'pink', fillDataForThisDate, i);
										if (newWhen.includes("AFT"))
											setColourCode(id, 'T12:00:00', 'T16:00:00', 'pink', fillDataForThisDate, i);
										if (newWhen.includes("EVE"))
											setColourCode(id, 'T16:00:00', 'T20:00:00', 'pink', fillDataForThisDate, i);
										if (newWhen.includes("NIGHT"))
											setColourCode(id, 'T20:00:00', 'T24:00:00', 'pink', fillDataForThisDate, i);
									}

									// filling the calender with not prescribed (lightgrey)
									if (notPrescribedMedicineShifts.length > 0) {
										// console.log("fill these shifts with lghtgrrey", notPrescribedMedicineShifts);
										//Set colour for medication not-found: pink (didn't entered taken or not)
										if (notPrescribedMedicineShifts.includes("MORN"))
											setColourCode(id, 'T08:00:00', 'T12:00:00', 'lightgrey', fillDataForThisDate, i);
										if (notPrescribedMedicineShifts.includes("AFT"))
											setColourCode(id, 'T12:00:00', 'T16:00:00', 'lightgrey', fillDataForThisDate, i);
										if (notPrescribedMedicineShifts.includes("EVE"))
											setColourCode(id, 'T16:00:00', 'T20:00:00', 'lightgrey', fillDataForThisDate, i);
										if (notPrescribedMedicineShifts.includes("NIGHT"))
											setColourCode(id, 'T20:00:00', 'T24:00:00', 'lightgrey', fillDataForThisDate, i);
									}

								}
								else if (workingOnPresentDay) {	//  Today
									let currentDateMedAdminstration = getCurrentDateSavedData(fillDataForThisDate, weHaveDataForTheseDates, medicationData.entry);
									let newWhenToday = newWhen.splice(0);
									let notPrescribedMedicineShiftsToday = notPrescribedMedicineShifts.splice(0);

									// filling the calender with "not prescribed" (lightgrey)
									if (notPrescribedMedicineShiftsToday.length > 0) {
										// console.log("fill these shifts with lightgrey", notPrescribedMedicineShiftsToday);
										//Set colour for medication not-found: pink (didn't entered taken or not)
										if (notPrescribedMedicineShiftsToday.includes("MORN"))
											setColourCode(id, 'T08:00:00', 'T12:00:00', 'lightgrey', fillDataForThisDate, i);
										if (notPrescribedMedicineShiftsToday.includes("AFT"))
											setColourCode(id, 'T12:00:00', 'T16:00:00', 'lightgrey', fillDataForThisDate, i);
										if (notPrescribedMedicineShiftsToday.includes("EVE"))
											setColourCode(id, 'T16:00:00', 'T20:00:00', 'lightgrey', fillDataForThisDate, i);
										if (notPrescribedMedicineShiftsToday.includes("NIGHT"))
											setColourCode(id, 'T20:00:00', 'T24:00:00', 'lightgrey', fillDataForThisDate, i);
									}

									// filling the calender with "prescribed" (green-red else pink) - the data from currentDateMedAdminstration
									currentDateMedAdminstration.forEach(eachDataRow => {
										// console.log(eachDataRow);
										let mDate = eachDataRow.resource.effectiveDateTime;
										let medicationStatus = eachDataRow.resource.status;
										//	Adding prescribed taken/not-taken med till date, --> background = (status == completed) ? yellowgreen : (status == not-done) ? Red : Pink;	
										if (timeCheck("08:00:00", "11:59:59", mDate.substring(11, 19))) {			//Morning
											if (newWhenToday.includes("MORN"))
												newWhenToday.splice(newWhenToday.indexOf("MORN"), 1);// Remove the "MORN" from daytime
											postMedicationStatus(id, 'T08:00:00', 'T12:00:00', mDate, medicationStatus, i);
										} else if (timeCheck("12:00:00", "15:59:59", mDate.substring(11, 19))) {	//Afternoon
											if (newWhenToday.includes("AFT"))
												newWhenToday.splice(newWhenToday.indexOf("AFT"), 1);	// Remove the "AFT" from daytime
											postMedicationStatus(id, 'T12:00:00', 'T16:00:00', mDate, medicationStatus, i);
										} else if (timeCheck("16:00:00", "19:59:59", mDate.substring(11, 19))) {	//Evening
											if (newWhenToday.includes("EVE"))
												newWhenToday.splice(newWhenToday.indexOf("EVE"), 1);	// Remove the "EVE" from daytime
											postMedicationStatus(id, 'T16:00:00', 'T20:00:00', mDate, medicationStatus, i);
										} else if (timeCheck("20:00:00", "23:59:59", mDate.substring(11, 19))) {	//Night
											if (newWhenToday.includes("NIGHT"))
												newWhenToday.splice(newWhenToday.indexOf("NIGHT"), 1);	// Remove the "NIGHT" from daytime
											postMedicationStatus(id, 'T20:00:00', 'T24:00:00', mDate, medicationStatus, i);
										} else { console.log("##############____Medicine_Status_Time_Not_Found____###############"); }
										id++;
									});

									//	Adding not-found data with "pink" 
									newWhenToday = fillTodaysNotTakenMed(id, newWhenToday, fillDataForThisDate, i);

									//	Fill today's about to taken fields with lightblue
									let not = showPrescribedMedicineDaytime(id, newWhenToday, notPrescribedMedicineShiftsToday, fillDataForThisDate, i);
									// Not using "not" as, it's work has already been accomplished.

								}

							}
							else {	// 	Future dates --- Mark (lightblue/gray) schedule of future medicine dates
								let notPrescribedMedicineShifts = ["MORN", "AFT", "EVE", "NIGHT"];
								notPrescribedMedicineShifts = showPrescribedMedicineDaytime(id, prescribedMedicineTime, notPrescribedMedicineShifts, fillDataForThisDate, i);	// color lightblue -- prescibed medicine time
								if (notPrescribedMedicineShifts.length > 0) shownotprescribedMedicineDaytime(id, notPrescribedMedicineShifts, fillDataForThisDate, i);	//	color lightgrey -- un-prescibed medicine time
							}

						}
					},
					error: errorData => {
						document.getElementById("msgDiv").innerHTML = "Server has some issue, Please try after some time...";
					}
				});
			}

		}
		offBusyWaitSpinner("waitingDiv", "waitingSpinner", undefined, "");
		document.getElementById("medComplianceCalendar").innerHTML = "";
		initializeCalendar(calenderEventsData, calendarResources);
		document.getElementById("legendCompliance").style.display = "block";
	} else {
		offBusyWaitSpinner("waitingDiv", "waitingSpinner", "msgDiv", "No Medication Complaince found");
	}
}

function isThisDatePresentDate(datefromList) {
	return moment(datefromList).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD");
}

function getCurrentDateSavedData(workingWithDate, oneMed_SavedData, oneMedResponseEntryData) {
	// Filter data to return only 4 shift data (M-A-E-N, medDate, medStatus) << this has to be taken care from server side.
	let currentDateEntyData = [];
	for (let index = 0; index < oneMed_SavedData.length; index++) {
		// workingWithDate found in oneMed_SavedData get its index
		if (moment(oneMed_SavedData[index]).format("YYYY-MM-DD") === moment(workingWithDate).format("YYYY-MM-DD")) {
			currentDateEntyData.push(oneMedResponseEntryData[index]);
		}
	}
	return currentDateEntyData;
}

// Function to Check if time falls between start time and end time
function timeCheck(dateFrom, dateTo, dateCheck) {
	return (dateCheck <= dateTo && dateTo >= dateFrom);
}

// Get all the scheduled dates of a specific medicine.
function getDatesforMedication(startDate, stopDate) {
	var medicationListedDates = [];
	startDate = moment(startDate);
	stopDate = moment(stopDate);
	while (startDate <= stopDate) {
		medicationListedDates.push(moment(startDate).format('YYYY-MM-DD'));
		startDate = moment(startDate).add(1, 'days');
	}
	return medicationListedDates;
}

// This function will check the expiry of medicines with active medicines
function checkCurrentDateAndEndDateOfMedicines(medicineEndDate, Currentdate) {
	return medicineEndDate <= Currentdate;
}

// This function will check the expiry of medicines
function isDateNotAFutureDate(endDate, currentdate) {
	return (endDate.substring(0, 10) <= currentdate.substring(0, 10))
}

// Function to Check if time falls between start time and end time
function currentShift() {
	let currentShift = moment().format("HH:mm:ss");
	if ('00:00:00' <= currentShift && currentShift < '12:00:00')
		return "MORN";
	else if ('12:00:00' <= currentShift && currentShift < '16:00:00')
		return "AFT";
	else if ('16:00:00' <= currentShift && currentShift < '20:00:00')
		return "EVE";
	else if ('20:00:00' <= currentShift && currentShift < '24:00:00')
		return "NIGHT";
}

//	Todays not found medication before current shift
function fillTodaysNotTakenMed(id, newWhen, fillDataForThisDate, itr) {
	let currentShift1 = currentShift();
	if (currentShift1 == "NIGHT") {	// check and remove from MORN, AFT, EVE
		if (newWhen.includes("MORN")) {
			newWhen.splice(newWhen.indexOf("MORN"), 1);
			setColourCode(id, 'T08:00:00', 'T12:00:00', 'pink', fillDataForThisDate, itr);
		}
		if (newWhen.includes("AFT")) {
			newWhen.splice(newWhen.indexOf("AFT"), 1);
			setColourCode(id, 'T12:00:00', 'T16:00:00', 'pink', fillDataForThisDate, itr);
		}
		if (newWhen.includes("EVE")) {
			newWhen.splice(newWhen.indexOf("EVE"), 1);
			setColourCode(id, 'T16:00:00', 'T20:00:00', 'pink', fillDataForThisDate, itr);
		}
	} else if (currentShift1 == "EVE") {	// check and remove from MORN, AFT
		if (newWhen.includes("MORN")) {
			newWhen.splice(newWhen.indexOf("MORN"), 1);
			setColourCode(id, 'T08:00:00', 'T12:00:00', 'pink', fillDataForThisDate, itr);
		}
		if (newWhen.includes("AFT")) {
			newWhen.splice(newWhen.indexOf("AFT"), 1);
			setColourCode(id, 'T12:00:00', 'T16:00:00', 'pink', fillDataForThisDate, itr);
		}
	} else if (currentShift1 == "AFT") {	// check and remove from MORN
		if (newWhen.includes("MORN")) {
			newWhen.splice(newWhen.indexOf("MORN"), 1);
			setColourCode(id, 'T08:00:00', 'T12:00:00', 'pink', fillDataForThisDate, itr);
		}
	}
	return newWhen;
}

// Sets the color in cells of calendar
function initializeCalendar(calenderEventsData, calendarResources) {
	var calendarEl = document.getElementById('medComplianceCalendar');
	var calendar = new FullCalendar.Calendar(calendarEl, {
		plugins: ['interaction', 'resourceTimeline'],
		height: 480,
		defaultDate: new Date(),
		aspectRatio: 1.4,
		scrollTime: '00:00',
		header: {
			left: 'today prev,next',
			center: 'title',
			right: 'resourceTimelineDay,resourceTimelineTenDay,resourceTimelineMonth'
		},
		defaultView: 'resourceTimelineTenDay',
		editable: false,
		minTime: '08:00',
		maxTime: '24:00',
		slotDuration: '04:00',
		views: {
			resourceTimelineMonth: {
				buttonText: 'Month',
			},
			resourceTimelineDay: {
				type: 'timeGrid',
				buttonText: 'Day',
				// slotDuration: '00:15'

			},
			resourceTimelineTenDay: {
				type: 'resourceTimeline',
				duration: { days: 7 },
				buttonText: 'Week',
				color: 'red'
			},
			timelineThreeDays: {
				type: 'timeline',
				slotLabelFormat: [
					'ddd D/M',
					'H:mm'
				],
				columnFormat: 'ddd D.M',
				duration: { days: 3 }
			}
		},
		resourceAreaWidth: '23%',
		resourceLabelText: 'Medicine',
		eventRender: function (info) {
			timeChange(info.view.type);
			var tooltip = new Tooltip(info.el, {
				title: info.event.extendedProps.description,
				placement: 'top',
				trigger: 'hover',
				container: 'body'
			});
		},
		resources: calendarResources,
		events: calenderEventsData
	});

	calendar.render();

	$('.fc-slats tr .fc-time span').html(function () {
		let parent = $(this).parent().parent();
		parent = $(parent[0]).attr('data-time');
		let sdt = parent.substr(0, 5);
		let edt = parent.substr(0, 3) + '30';

		return sdt + '~' + edt;
	});

	$('.fc-minor .fc-time').html(function () {
		let parent = $(this).parent();
		parent = $(parent[0]).attr('data-time');
		let timeValue = parent.substr(0, 2);
		let sdt = parent.substr(0, 5);
		let edt = Number(timeValue) + 1;

		if (edt < 10) edt = "0" + (Number(timeValue) + 1);
		edt += ":00";
		return sdt + '~' + edt;
	});

	$('.fc-slats tr .fc-time').css({
		'text-align': 'center',
	});

	$('.fc-minor').css({
		'font-size': '15px'
	});

	$('.fc-slats tr .fc-time span').css({
		'font-size': '15px'
	});

}

//	Changing the name of column from time to time Symbol (only for dates with medicine)
function timeChange(view) {
	if (view == 'resourceTimelineTenDay') {
		$('.fc-head .fc-time-area  table>tbody tr:last-child  th').each(function () {
			if ($(this).text() == '8am') { $(this).text('M'); }
			if ($(this).text() == '12pm') { $(this).text('A'); }
			if ($(this).text() == '4pm') { $(this).text('E'); }
			if ($(this).text() == '8pm') { $(this).text('N'); }
		});
		$("span.fc-cell-text").each(() => {	//  for week day
			if ($(this).text() == '8am') { $(this).text('M') }
			if ($(this).text() == '12am') { $(this).text('A') }
			if ($(this).text() == '4pm') { $(this).text('E') }
			if ($(this).text() == '8pm') { $(this).text('N') }
		});
	} else if (view == 'resourceTimelineDay') {	// for one day
		$('.fc-head .fc-time-area  table>tbody tr:last-child  th').each(function () {
			if ($(this).text() == '8am') { $(this).text('Morning'); }
			if ($(this).text() == '12pm') { $(this).text('Afternoon'); }
			if ($(this).text() == '4pm') { $(this).text('Evening'); }
			if ($(this).text() == '8pm') { $(this).text('Night'); }
		});
	} else if (view != 'resourceTimelineDay') { // All except per day view
		$('.fc-head .fc-time-area  table>tbody tr:last-child  th').each(function () {
			if ($(this).text() == '8am') { $(this).text('M'); }
			if ($(this).text() == '12pm') { $(this).text('A'); }
			if ($(this).text() == '4pm') { $(this).text('E'); }
			if ($(this).text() == '8pm') { $(this).text('N'); }
		});
	}
}