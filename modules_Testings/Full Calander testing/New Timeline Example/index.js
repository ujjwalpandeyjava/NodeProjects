function renderCalendarWithConfig() {
	var calendarEl = document.getElementById('calendar');
	/*	Type of calendar:
			>	dayGrid
			> 	timeGrid
			> 	list
			>	resourceTimeline
			>	resourceTimeGrid
			>	timeline
				--> Each of these has: eg. dayGridDay, dayGridWeek, dayGridMonth
				>>>> Day
				>>>> Week
				>>>> Month
				>>>> Each can have custom type also */
	var calendar = new FullCalendar.Calendar(calendarEl, {
		// Not use-full for websites 	// plugins: ['interaction', 'resourceTimeline'],	
		// for premium version free trial 
		schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
		// Context for displaying dates - local default (auto current location)
		timeZone: 'local',
		// headerToolbar: false/{json}
		headerToolbar: {
			// left: '',
			left: 'prev,next today customBtn',
			center: 'title',
			right: 'resourceTimelineDay,timelineThreeDays,timelineWeek,resourceTimelineWeek,resourceTimelineMonth,dayGridMonth'
			// right: 'resourceTimelineDay'
		},
		// droppable: true,	// External Event Dragging
		titleFormat: { // Add formatted data on header center
			day: 'numeric',
			weekday: 'long',
			month: 'short',
			year: 'numeric'
		},
		customButtons: {
			customBtn: {
				text: 'custom!',
				click: function () {
					alert('Clicked the custom button!');
				}
			}
		},
		initialView: 'resourceTimelineDay',
		// initialView: 'dayGridMonth',
		views: {
			resourceTimelineDay: {
				// type: 'timeline',
				buttonText: "Today's available slot",
				duration: { days: 1 },
				slotDuration: '00:15:00',
				// slotLabelInterval: '00:45:00'
			},
			timelineThreeDays: {
				type: 'resourceTimeGridWeek',
				// type: 'timeline',
				// type: 'resourceTimeline',
				buttonText: '3- Days',
				duration: { days: 4 },
				slotLabelFormat: [
					{
						hour: 'numeric',
						minute: '2-digit',
						omitZeroMinute: false,
						meridiem: 'short'
					},
					{ month: 'long', year: 'numeric' }, // top level of text
					{ weekday: 'short' }
				],
				columnHeaderFormat: 'ddd D.M'
			},
			resourceTimelineWeek: {
				// type: 'resourceTimeline',
				// type: 'timeGrid',
				buttonText: 'Week (7days)',
				duration: { days: 7 }
			},
			resourceTimelineMonth: {
				buttonText: 'Month',
			},
		},
		selectable: true,	// Select slots top perform action
		editable: true,
		aspectRatio: 3,
		resourceAreaHeaderContent: 'Practitioners List',
		navLinks: true,	// Default  opens day view
		/* navLinkDayClick: function (date, jsEvent) {	// Overridden function day view
			console.log('day', date.toISOString());
			console.log('coords', jsEvent.pageX, jsEvent.pageY);
		}, */
		now: new Date(new Date().getTime() - 200000000),
		navLinkWeekClick: function (weekStart, jsEvent) {
			console.log('week start', weekStart.toISOString());
			console.log('coords', jsEvent.pageX, jsEvent.pageY);
		},
		resources: [
			{
				"id": "p_a",
				"title": "Practitioner Goku"
			},
			{
				"id": "p_b",
				"title": "Practitioner Naruto",
				"eventColor": "orange",
				businessHours: {
					startTime: '10:00',
					endTime: '12:00',
					daysOfWeek: [3] // Mon
				}
			},
			{
				"id": "p_c",
				"title": "Practitioner Tanjiro",
				"children": [
					{
						"id": "c1",
						"title": "Cabin - Feets"
					},
					{
						"id": "c2",
						"title": "Cabin - Toe"
					}
				]
			},
			{
				"id": "p_d",
				"title": "Practitioner D"
			}
		],
		editable: true,
		nowIndicator: true,
		events: [
			{
				"resourceId": "p_a",
				"title": "Event running over a day",
				// "start": "2022-12-09",
				// "end": "2022-12-10",
				"start": "2022-12-09T11:00:00+05:30",
				"end": "2022-12-10T06:00:00+05:30",
				backgroundColor: '#ffff005e',
				textColor: '#800080bd',
				borderColor: '#990707',
				eventDurationEditable: true
			},
			{
				"resourceId": "p_a",
				"title": "event 3",
				"start": "2022-12-09T12:00:00+05:30",
				"end": "2022-12-10T06:00:00+05:30"
			},
			{
				"resourceId": "p_a",
				"title": "event 4",
				"start": "2022-12-09T07:30:00+05:30",
				"end": "2022-12-09T09:30:00+05:30"
			},
			{
				"resourceId": "p_b",
				"title": "event 5",
				"start": "2022-12-09T05:00:00+05:30",
				"end": "2022-12-09T15:00:00+05:30"
			},
			{
				"resourceId": "p_b",
				"title": "event 2",
				"start": "2022-12-09T09:00:00+05:30",
				"end": "2022-12-09T14:00:00+05:30"
			},
			{
				"resourceId": "p_c",
				"title": "event jtest",
				"start": "2022-12-09T07:30:00+05:30",
				"end": "2022-12-09T09:30:00+05:30"
			},
			{
				"resourceId": "p_b",
				"title": "Event child A",
				"start": "2022-12-09T10:00:00+05:30",
				"end": "2022-12-10T16:00:00+05:30"
			},
			{
				"resourceId": "p_d",
				"title": "event 4",
				"start": "2022-12-9T07:30:00+05:30",
				"end": "2022-12-9T09:30:00+05:30"
			},
			{
				"resourceId": "p_c",
				"title": "event 5",
				"start": "2022-12-9T10:00:00+05:30",
				"end": "2022-12-9T15:00:00+05:30"
			},
			{
				"resourceId": "p_d",
				"title": "event 2",
				"start": "2022-12-9T09:00:00+05:30",
				"end": "2022-12-9T14:00:00+05:30"
			}
		],
		weekends: true,
		dayHeaders: true,
		// can use at the time when we will allow practitioner to accept/decline/change/etc the appointment
		/* businessHours: true,
		businessHours: {
			daysOfWeek: [1, 2, 3, 4], // 1 = Monday
			startTime: '14:00', // a start time
			endTime: '18:00', // an end time
		} */
	});
	calendar.type = 'timeGrid';
	calendar.render();
}



// calendar json examples
initialCalendarData = {
	schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
	timeZone: 'local',
	editable: true, // enable draggable events
	selectable: true,
	aspectRatio: 2,
	headerToolbar: {
		left: '',
		center: 'title',
		right: 'resourceTimelineDay,resourceTimelineWeek',//resourceTimelineMonth
	},
	contentHeight: 'auto',
	initialView: 'resourceTimelineDay', //byDefault calendar shows data according to Day
	resourceAreaHeaderContent: 'Practitioners List',
	/* customButtons: {
		custom1: {
			text: 'custom 1',
			click: function () {
				alert('clicked custom button 1!');
			}
		},
		custom2: {
			text: 'custom 2',
			click: function () {
				alert('clicked custom button 2!');
			}
		}
	}, */
	now: new Date(new Date().getTime() - 200000000),	// set custom current date
	scrollTime: new Date().getHours() + ":00",	//	Scroll calendar to this time on calendar load
	nowIndicator: true,	// Shows red mark of current time
	titleFormat: { // add formatted data on header center
		month: 'long',
		year: 'numeric',
		day: 'numeric',
		weekday: 'long'
	},
	views: {
		resourceTimelineDay: {
			type: 'timeline',
			buttonText: 'Day',
			duration: { days: 1 },
			slotDuration: '00:15'
		},
		resourceTimelineWeek: {
			type: 'resourceTimeline',
			buttonText: 'Week',
			duration: { days: 7 },
			slotDuration: '00:15'
		},
		//  resourceTimelineMonth: {
		//   type: 'resourceTimeline',
		//   buttonText: 'Month',
		//   duration: { days: 30 },
		//   slotDuration: '00:15'
		//  },
	},
	resources: [
		{
			"NAME": "Test Pateint",
			"name": "Test Pateint",
			"id": "0018Z00002pwXjJQAU",
			"ACCOUNT_ID": "0018Z00002pwXjJQAU",
			"NEXTGEN_ID": "7244811a-83a4-4fdc-8304-35ba2f12a296",
			"SLGS_ID": "31ac1603-bbc2-4425-a3ad-c30e4b8111ac",
			"LAST_NAME": "Wrenn",
			"FIRST_NAME": "Megan"
		}
	],
	//expandRows:true,//we can expand appointment time 
	events: [
		{
			"resourceId": "d",
			"title": "OFF",
			"start": "2022-12-08",
			"end": "2022-12-08",
			"backgroundColor": "grey",

		},
		{
			"resourceId": "c",
			"title": "Busy",
			"start": "2022-12-12T12:00:00",
			"end": "2022-12-12T12:15:00",
			"backgroundColor": "#d7e2fe",
			"textColor": "Black",
			"patient": "sophia",
			"provider": "Practitioner Tan"
		},
		{
			"resourceId": "a",
			"title": "Busy",
			"start": "2022-12-12T09:00:00",
			"end": "2022-12-12T10:00:00",
			"backgroundColor": "#d7e2fe",
			"textColor": "Black",
			"patient": "Kevin peterson",
			"provider": "Jon Link"
		},
		{
			"resourceId": "c",
			"title": "Busy",
			"start": "2022-12-12T11:00:00",
			"end": "2022-12-12T11:30:00",
			"backgroundColor": "#d7e2fe",
			"textColor": "Black",
			"patient": "christina",
			"provider": "Practitioner Tan"
		},

		{
			"resourceId": "a",
			"title": "Busy",
			"start": "2022-12-12T13:00:00",
			"end": "2022-12-12T13:30:00",
			"backgroundColor": "#d7e2fe",
			"textColor": "Black",
			"patient": "Karl peterson",
			"provider": "Jon Link"
		},
		{
			"resourceId": "f",
			"title": "event 4",
			"start": "2022-11-30T07:30:00+00:00",
			"end": "2022-11-30T09:30:00+00:00"
		},
		{
			"resourceId": "b",
			"title": "event 5",
			"start": "2022-11-30T10:00:00+00:00",
			"end": "2022-11-30T15:00:00+00:00"
		},
		{
			"resourceId": "e",
			"title": "event 2",
			"start": "2022-12-30T09:00:00+00:00",
			"end": "2022-12-30T14:00:00+00:00"
		}
	],
	eventClick: function (event) {// On event click, get appointment details in a modal
		console.log("Even clicked ", event.el);
		let data = event.el.fcSeg;
		let statTime = data.start;
		let endTime = data.end;
		let title = data.eventRange.def.title;
		let resourceId = data.eventRange.def.resourceIds[0];
		let patient = data.eventRange.def.extendedProps.patient;
		let provider = data.eventRange.def.extendedProps.provider;
		if (title != "OFF") this.ShowAppointmentDetails(resourceId, patient, provider, JSON.stringify(statTime), JSON.stringify(endTime), title);
	},
	eventDrop: function (event) { // Event drag drop
		console.log(JSON.stringify(event));
	},
	eventOverlap: false,
	select: function (start, end) {// Create new Appointment with start and end date
		console.log(JSON.stringify(start));
		console.log(JSON.stringify(end));
	},
	resourceLabelDidMount: function (arg) {	// Add events on resource list
		// When resource is clicked it works below lines
		arg.el.addEventListener("click", function () {
			console.log('resource:' + JSON.stringify(arg));
			alert(`practitioner Name: ${arg.fieldValue},
			   practitioner Id : ${arg.resource.id}`)
		});
	}
}