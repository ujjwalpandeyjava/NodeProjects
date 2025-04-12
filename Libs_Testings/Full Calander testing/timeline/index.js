var calendarEl = document.getElementById('calendar');
var calendar = new FullCalendar.Calendar(calendarEl, {
	// plugins: ['interaction', 'resourceTimeline'],
	height: 480,
	defaultDate: new Date(),
	aspectRatio: 1.4,
	scrollTime: '00:00',
	header: {
		left: 'today prev,next',
		center: 'title',
		right: 'resourceTimelineDay,resourceTimelineTenDay,timelineThreeDays,resourceTimelineMonth'
	},
	defaultView: 'resourceTimelineTenDay',
	editable: false,
	minTime: '08:00',
	maxTime: '24:00',
	slotDuration: '04:00',
	views: {
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
		},
		resourceTimelineMonth: {
			buttonText: 'Month',
		}
	},
	resourceAreaWidth: '25%',
	resourceLabelText: 'Medicine',
	eventRender: function (info) {
		console.log(info.view.type);
		var tooltip = new Tooltip(info.el, {
			title: info.event.extendedProps.description,
			placement: 'top',
			trigger: 'hover',
			container: 'body'
		});
	}/* ,
	resources: calendarResources,
	events: calenderEventsData */
});
calendar.render();

