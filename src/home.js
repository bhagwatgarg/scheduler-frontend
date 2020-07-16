import React from "react";
import NavBar from "./UIElements/navbar";
import Calendar from "./CalendarComponent/calendar";

import "./home.css";

// @import '~@fullcalendar/core/main.css';
// @import '~@fullcalendar/daygrid/main.css';

const Home = (props) => {
	return (
		<React.Fragment>
			
				<NavBar />
				<div className="calendar">
					<Calendar />
				</div>
		</React.Fragment>
	);
};

export default Home;
