import React, { useState, useRef} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import EventModal from "./event-modal";
import listPlugin from '@fullcalendar/list';
import $ from 'jquery';
//import bootstrapPlugin from '@fullcalendar/bootstrap'
//import extPlugin from './fullcalendar'
import bootstrapPlugin from '@fullcalendar/bootstrap';

import './fullcalendar.min.css'
import "./main.scss";
import './calendar.css';

const Calendar = (props) => {

	//console.log(ReactDOM.findDOMNode(<div />).getElementsByClassName('fc-prev-button').length);
	

	const calendarComponentRef = useRef();
	// useEffect(()=>{
	// 	console.log("CALENDAR");
	// 	//if(!calendarComponentRef.current) return;

	// 			//document.getElementsByClassName('wd').item
		
	// }, );
  
	const [weekend, setWeekend] = useState(true);
	//const [events, setEvents] = useState(props.events);
  //console.log(props);
	const [showEvent, setShowEvent] = useState({ state: false, event: null });

	const toggleWeekends = () => {
    //console.log(new Date());
    //console.log(events);
		setWeekend(!weekend);
	};

	const gotoPast = () => {
		let calendarApi = calendarComponentRef.current.getApi();
		calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
	};

	const handleDateClick = (arg) => {
		if (
			window.confirm("Would you like to add an event to " + arg.dateStr + " ?")
		) {
			setShowEvent({ state: true, event: undefined, date: arg.dateStr });
		}
	};

	const handleEventClick = (args) => {
		//alert(`${args.event.title}`);
		const e=props.events.find((a)=>a.id===args.event.id);
		setShowEvent({ state: true, event: e });
	};

	return (
		<div className="demo-app">
			{/* <div className="demo-app-top">
				<button onClick={toggleWeekends}>toggle weekends</button>&nbsp;
				<button onClick={gotoPast}>go to a date in the past</button>&nbsp;
				(also, click a date/time to add an event)
			</div> */}
			<div className="demo-app-calendar">
				<FullCalendar
					defaultView="dayGridMonth"
					header={{
						left: "prev,next today",
						center: "title",
						right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
					}}
					plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, bootstrapPlugin]}
					ref={calendarComponentRef}
					weekends={weekend}
					events={props.events}
					dateClick={props.read?(()=>undefined):handleDateClick}
          eventClick={handleEventClick}
					themeSystem='bootstrap'
					bootstrapFontAwesome={false}
					buttonText={{
						prev: 'PREVIOUS',
						next: 'NEXT'
					}}
					

				/>
			</div>
			{showEvent.state && (
				<EventModal
					updateEvent={props.updateEvent}
          deleteEvent={props.deleteEvent}
					show={showEvent.state}
					onHide={() => setShowEvent({ state: false, event: null })}
					event={showEvent.event}
					addEvent={props.addEvent}
          date={showEvent.date}
          read={props.read}
				/>
			)}
			</div>
	);
};

export default Calendar;
