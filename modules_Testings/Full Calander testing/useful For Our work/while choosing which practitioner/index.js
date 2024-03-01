document.addEventListener("DOMContentLoaded", function () {
	var calendarEl = document.getElementById("calendar");
	/* console.log(calendarEl);
	console.log(FullCalendar); */
	// https://fullcalendar.io/docs > Overall Display
	var calendar = new FullCalendar.Calendar(calendarEl, {
		initialView: "dayGridMonth",
		height: 600,
		headerToolbar: {
			left: "prev,next today myCustomButton",
			center: "title",
			// center: 'dayGridMonth,timeGridWeek',
			right:
				"dayGridMonth,timelineThreeDays,timeGridFourDay,timeGridThreeDay,timeGridWeek,resourceTimelineDay",
		},
		editable: true,
		droppable: true,
		views: {
			dayGridMonth: {
				buttonText: "Month",
				titleFormat: {
					year: "numeric",
					month: "short",
					day: "2-digit",
				},
			},
			timeGridWeek: {
				type: "resourceTimeline",
				buttonText: "Week",
				duration: { days: 7 },
				slotDuration: "00:15",
				color: "red",
			},
			timeGridFourDay: {
				type: "timeGrid",
				buttonText: "4 day",
				// duration: { days: 4 },
				// dayCount: 4,
			},
			timeGridThreeDay: {
				type: "timeGrid",
				buttonText: "3-days",
				duration: { days: 3 },
				// slotLabelFormat: ["ddd D/M", "H:mm"],
				// columnFormat: "ddd D.M",
			},
			resourceTimelineDay: {
				type: "timeGrid",
				buttonText: "Day",
				duration: { days: 1 },
				// slotDuration: '00:15',
			},
		},
		customButtons: {
			myCustomButton: {
				text: "Custom btn!",
				click: function () {
					alert("Custom button clicked!");
				},
			},
		},
		events: [
			{
				title: "Business Lunch",
				start: "2022-11-03T13:00:00",
				constraint: "businessHours", // can't change businessHours with drag and drop
				color: "orange", // dot color
			},
			{
				title: "Meeting",
				start: "2022-11-13T11:00:00",
				constraint: "availableForMeeting", // defined below
				color: "#257e4a",
			},
			{
				title: "Conference",
				start: "2022-11-18",
				end: "2022-11-20",
			},
			{
				title: "Party",
				start: "2022-11-29T20:00:00",
			},

			// areas where "Meeting" must be dropped
			{
				groupId: "availableForMeeting",
				start: "2022-11-11T10:00:00",
				end: "2022-11-11T16:00:00",
				display: "background",
			},
			{
				groupId: "availableForMeeting",
				start: "2022-11-13T10:00:00",
				end: "2022-11-13T16:00:00",
				display: "background",
			},

			// red areas where no events can be dropped
			{
				start: "2022-11-24",
				end: "2022-11-28",
				overlap: false,
				display: "background",
				color: "#ff9f89",
			},
			{
				start: "2022-11-06",
				end: "2022-11-08",
				overlap: false,
				display: "background",
				color: "#ff9f89",
			},
		],
	});
	calendar.render();
	calendar.setOption("duration", { weeks: 2 }); // Sets default duration of all views.
	console.log(calendar);
	/* var calendar = new FullCalendar.Calendar(calendarEl, {
		// timeZone: "UTC",
		aspectRatio: 1.5,
		headerToolbar: {
			left: "prev,next today",
			center: "title",
			right:
				"resourceTimelineMonth, resourceTimelineTenDay, timelineThreeDays, resourceTimelineDay",
		},
		initialView: "resourceTimelineDay",
		
		// plugins: ["interaction", "resourceTimeline"],
		
		resourceAreaHeaderContent: "Rooms",
		editable: true,
		views: {
			resourceTimelineMonth: {
				buttonText: "Month",
			},
			resourceTimelineDay: {
				type: "timeGrid",
				buttonText: "Day",
				// slotDuration: '00:15'
			},
			resourceTimelineTenDay: {
				type: "resourceTimeline",
				duration: { days: 7 },
				buttonText: "Week",
				color: "red",
			},
			timelineThreeDays: {
				type: "timeline",
				slotLabelFormat: ["ddd D/M", "H:mm"],
				columnFormat: "ddd D.M",
				duration: { days: 3 },
			},
		},
		resources: [
			{
				id: "a",
				title: "Auditorium A",
			},
			{
				id: "b",
				title: "Auditorium B",
				eventColor: "green",
			},
			{
				id: "c",
				title: "Auditorium C",
				eventColor: "orange",
			},
			{
				id: "d",
				title: "Auditorium D",
				children: [
					{
						id: "d1",
						title: "Room D1",
					},
					{
						id: "d2",
						title: "Room D2",
					},
				],
			},
		],

		events: [
			{
				title: "Business Lunch",
				start: "2022-11-03T13:00:00",
				constraint: "businessHours",
			},
			{
				title: "Meeting",
				start: "2022-11-13T11:00:00",
				constraint: "availableForMeeting", // defined below
				color: "#257e4a",
			},
			{
				title: "Conference",
				start: "2022-11-18",
				end: "2022-11-20",
			},
			{
				title: "Party",
				start: "2022-11-29T20:00:00",
			},

			// areas where "Meeting" must be dropped
			{
				groupId: "availableForMeeting",
				start: "2022-11-11T10:00:00",
				end: "2022-11-11T16:00:00",
				display: "background",
			},
			{
				groupId: "availableForMeeting",
				start: "2022-11-13T10:00:00",
				end: "2022-11-13T16:00:00",
				display: "background",
			},

			// red areas where no events can be dropped
			{
				start: "2022-11-24",
				end: "2022-11-28",
				overlap: false,
				display: "background",
				color: "#ff9f89",
			},
			{
				start: "2022-11-06",
				end: "2022-11-08",
				overlap: false,
				display: "background",
				color: "#ff9f89",
			},
		],
	}); */
});
