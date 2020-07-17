import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import EventForm from "./event-form";
import { AuthContext } from "../utils/auth-context";

const EventModal = (props) => {
	const myContext = useContext(AuthContext);
	return (
		<Modal
			show={props.show}
			onHide={props.onHide}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{props.event ? "EDIT EVENT" : "ADD EVENT"}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<EventForm
					updateEvent={props.updateEvent}
					deleteEvent={props.deleteEvent}
					addEvent={props.addEvent}
					event={props.event}
					date={props.date}
					onHide={props.onHide}
					read={
						props.event
							? props.read || props.event.owner !== myContext.authState.user
							: props.read
					}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default EventModal;