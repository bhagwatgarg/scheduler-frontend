import React, { useEffect, useState, useContext } from "react";
import "antd/dist/antd.css";
import Calendar from "../CalendarComponent/calendar";
import { useParams } from "react-router-dom";
import NavBar from "../UIElements/navbar";
import { Jumbotron, Container, Button } from "react-bootstrap";
import "./profile.css";
import { AuthContext } from "../utils/auth-context";
import { useHTTP } from "../utils/http";
import Loading from "../utils/loading";
import ErrorModal from "../utils/error-modal";

// 0 for user 1 for publisher

// const context = { type: 1, id: "1" };
// const currentChannelId = "1";

const Profile = (props) => {
	const paramId = useParams().id;
	const myContext = useContext(AuthContext);
	const [getData, isLoading, isError, setError] = useHTTP();
	const [id, setId] = useState(paramId ? paramId : myContext.authState.user);
	const [channel, setChannel] = useState(undefined);
	const [events, setEvents] = useState(undefined);
	const [follows, setFollows] = useState(false);

	useEffect(()=>{
		if(channel){
			document.title=channel.name;
		}
	},[channel]);

	useEffect(() => {
		//console.log(id);
		//console.log("USE");
		//console.log(paramId);
		//if (channel) return;
		let id2 = paramId;
		if (!id2) {
			id2 = myContext.authState.user;
			//token=myContext.token.token;
			//setId(id2);
		}
		const initializer = async () => {
			//console.log(JSON.stringify(token));
			try {
				//console.log("USE exec");
				const data = await getData(
					`${process.env.REACT_APP_BACKEND_URL}/users/${id2}`,
					"GET",
					null,
					{
						"Content-Type": "application/json",
						Authorization: `Bearer ${myContext.authState.token}`,
					}
				);
				//console.log(data);
				setChannel(data);
				const ans = await checkFollows(id2);
				if (ans) setFollows(true);
				else setFollows(false);
				await getUpdatedEvents(id2);
			} catch (err) {}
		};
		initializer();

		return () => {
			//console.log("fired callback");
			setChannel(undefined);
			setEvents(undefined);
			setId(undefined);
			setFollows(false);
		};
	}, [paramId]);

	const checkFollows = async (id2) => {
		if (id2 === myContext.authState.user) return false;
		try {
			//console.log(11);
			const data = await getData(
				`${process.env.REACT_APP_BACKEND_URL}/users/${myContext.authState.user}`,
				"GET",
				null,
				{
					"Content-Type": "application/json",
					Authorization: `Bearer ${myContext.authState.token}`,
				}
			);
			//console.log(data);
			//console.log(data.following.includes(id2));
			if (data.following.includes(id2)) {
				return true;
			}
			return false;
		} catch (err) {
			return false;
		}
	};

	const getUpdatedEvents = async (uid) => {
		try {
			//console.log(11);
			const data = await getData(
				`${process.env.REACT_APP_BACKEND_URL}/users/events/${uid}`,
				"GET",
				null,
				{
					"Content-Type": "application/json",
					Authorization: `Bearer ${myContext.authState.token}`,
				}
			);
			//console.log(data);
			//setChannel(data);
			setEvents(data);
		} catch (err) {}
	};

	const addEvent = async (e) => {
		let ev = e;
		ev.owner = channel.id;
		try {
			//console.log(11);

			const data = await getData(
				`${process.env.REACT_APP_BACKEND_URL}/events/new`,
				"POST",
				JSON.stringify(ev),
				{
					"Content-Type": "application/json",
					Authorization: `Bearer ${myContext.authState.token}`,
				}
			);
			//console.log(data);
			await getUpdatedEvents(id);
		} catch (err) {}
	};

	const deleteEvent = async (e) => {
		try {
			//console.log(11);

			const data = await getData(
				`${process.env.REACT_APP_BACKEND_URL}/events/${e.id}`,
				"DELETE",
				null,
				{
					"Content-Type": "application/json",
					Authorization: `Bearer ${myContext.authState.token}`,
				}
			);
			await getUpdatedEvents(id);
			//console.log(data);
			//setEvents((curr)=>{return {...curr, ev}});
		} catch (err) {}
	};

	const updateEvent = async (e) => {
		let ev = e;
		ev.owner = id;
		try {
			//console.log(11);

			const data = await getData(
				`${process.env.REACT_APP_BACKEND_URL}/events/${e.id}`,
				"PATCH",
				JSON.stringify(ev),
				{
					"Content-Type": "application/json",
					Authorization: `Bearer ${myContext.authState.token}`,
				}
			);
			await getUpdatedEvents(id);
			//console.log(data);
			//setEvents((curr)=>{return {...curr, ev}});
		} catch (err) {}

		//console.log(newEvents);
	};

	const followHandler = async () => {
		let state = follows;
		const obj = {
			user: myContext.authState.user,
			channel: id,
		};
		let str;
		if (state) {
			str = "unfollow";
		} else {
			str = "follow";
		}
		const fun = async () => {
			//console.log("exec");
			try {
				const data = await getData(
					`${process.env.REACT_APP_BACKEND_URL}/users/${str}`,
					"POST",
					JSON.stringify(obj),
					{
						"Content-Type": "application/json",
						Authorization: `Bearer ${myContext.authState.token}`,
					}
				);
			} catch (err) {
				//console.log(err);
				return state;
			}
			return !state;
		};
		const ans = await fun();
		//console.log(ans);
		setFollows(ans);
	};

	if (!channel && !isLoading)
		return (
			<div>
				<NavBar />
				<div className="no-user-found">
					<h1>No Channel Found!</h1>
				</div>
			</div>
		);
	if (!channel) return <NavBar />;
	//console.log("render");
	return (
		<React.Fragment>
			<div className="homepage">
				<NavBar />
				{isLoading && <Loading />}
				{isError && (
					<ErrorModal
						message={isError.message}
						show={isError.status}
						onHide={() => setError({ message: "", status: false })}
					/>
				)}
				<div className="profile-jumbo">
					<Jumbotron fluid>
						<Container>
							<h1>
								Welcome{" "}
								{myContext.authState.type ||
								channel.id !== myContext.authState.user
									? "to"
									: ""}{" "}
								{channel.name}!
							</h1>
							<p>{channel.description}</p>
							{channel.id !== myContext.authState.user && (
								<Button className="mybtn alRight" onClick={followHandler}>
									{follows ? "Unfollow Channel" : "Follow Channel"}
								</Button>
							)}
						</Container>
					</Jumbotron>
				</div>
				<div className='calendar-container'>
				<div className="calendar">
					<Calendar
						events={events}
						addEvent={addEvent}
						deleteEvent={deleteEvent}
						updateEvent={updateEvent}
						read={paramId ? paramId !== myContext.authState.user : false}
					/>
				</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Profile;
