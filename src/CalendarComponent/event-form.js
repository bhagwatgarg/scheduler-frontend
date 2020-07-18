import React, { useState} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
	Form,
	Button,
	Row,
	Col,
} from "react-bootstrap";
import {Button as AntButton} from 'antd';
import FormGroup from "../utils/form-group";
import DaysOfWeek from "./day-of-week";
import './event-form.css';

const EventForm = (props) => {
	//if(props.event)console.log((props.event.recurrent));
	let [currColor, setCurrColor]=useState(props.event ? props.event.color : "blue");
	const [recur, setRecur] = useState(
		props.event ? props.event.recurrent : false
	);
	//useEffect(()=>setRecur(((props.event)?props.event.recurrent:false)));
	const schema = yup.object({
		title: yup.string().trim().required("Title is Required"),
		description: yup.string().trim().required("Description is required"),
		startDate: yup.date().required("Start Date is a required field"),
		startTime: yup.string().required("Start Time is a required field"),
		endDate: yup.date().required("End Date is a required field"),
		endTime: yup
			.string()
			.required("End time is a required field")
			.test(
				"end>start",
				"Event should start (strictly) before it ends",
				function () {
					try {
						const sdate = new Date(
							new Date(
								new Date(this.parent.startDate).getTime() -
									new Date().getTimezoneOffset() * 60000
							)
								.toISOString()
								.slice(0, 10) +
								"T" +
								this.parent.startTime
						);
						const edate = new Date(
							new Date(
								new Date(this.parent.endDate).getTime() -
									new Date().getTimezoneOffset() * 60000
							)
								.toISOString()
								.slice(0, 10) +
								"T" +
								this.parent.endTime
						);
						if (edate <= sdate) {
							return false;
						}
					} catch (e) {
						return true;
					}
					return true;
				}
			),
		startRecur: recur ? yup.date().required() : yup.string().notRequired(),
		endRecur: recur ? yup.date().required() : yup.string().notRequired(),
		daysOfWeek: recur
			? yup.array().min(1, "Minimum one day is required")
			: yup.array(),
	});

	const onDeleteHandler = () => {
		if (window.confirm("This action can't be undone. Continue?")) {
			props.deleteEvent(props.event);
			props.onHide();
		}
	};

	const onSubmitHandler = (val) => {

		const sdate = new Date(val.startDate + "T" + val.startTime);
		const sd2 = new Date(val.startDate + "T" + "00:00");
		const edate = new Date(val.endDate + "T" + val.endTime);
		const srdate = recur
			? new Date(val.startRecur + "T" + val.startTime)
			: sdate;
		let erdate = recur ? new Date(val.endRecur + "T" + val.endTime) : edate;

		const endTimeC = edate - sd2;
		const startTimeC = sdate - sd2;

		const ev = {
			title: val.title,
			start: sdate,
			end: edate,
			color: val.color,
			extendedProps: {
				description: val.description,
			},
			startRecur: srdate,
			endRecur: erdate,
			daysOfWeek: val.daysOfWeek,
			recurrent: recur,
			startTime: startTimeC,
			endTime: endTimeC,
		};
		if(props.event){
			ev.id=props.event.id;
			props.updateEvent(ev);
		}
		else{
			props.addEvent(ev);
		}
		//props.addEvent(ev);
		//console.log(JSON.stringify(ev));
		props.onHide();
	};
	//console.log(new Date(props.event.start).getDay());
	const formik = useFormik({
		initialValues: {
			title: props.event ? props.event.title : "My Event",
			description: props.event ? props.event.extendedProps.description : "",
			startDate: props.event
				? new Date(
						new Date(props.event.start).getTime() -
							new Date().getTimezoneOffset() * 60000
				  )
						.toISOString()
						.slice(0, 10)
				: props.date,
			startTime: props.event
				? new Date(
						new Date(props.event.start).getTime() -
							new Date().getTimezoneOffset() * 60000
				  )
						.toISOString()
						.slice(11, 16)
				: "00:00",
			endDate: props.event
				? new Date(
						new Date(props.event.end).getTime() -
							new Date().getTimezoneOffset() * 60000
				  )
						.toISOString()
						.slice(0, 10)
				: props.date,
			endTime: props.event
				? new Date(
						new Date(props.event.end).getTime() -
							new Date().getTimezoneOffset() * 60000
				  )
						.toISOString()
						.slice(11, 16)
				: "01:00",
			color: props.event ? props.event.color : "blue",
			recurrent:
				props.event && props.event.recurrent ? props.event.recurrent : false,
			daysOfWeek: props.event
				? props.event.daysOfWeek
				: [new Date(props.date).getDay()],
			startRecur: props.event
				? new Date(
						new Date(props.event.startRecur).getTime() -
							new Date().getTimezoneOffset() * 60000
				  )
						.toISOString()
						.slice(0, 10)
				: props.date,
			endRecur: props.event
				? new Date(
						new Date(props.event.endRecur).getTime() -
							new Date().getTimezoneOffset() * 60000
				  )
						.toISOString()
						.slice(0, 10)
				: props.date,
			S:
				props.event && props.event.daysOfWeek
					? props.event.daysOfWeek.includes(0)
					: false,
			M:
				props.event && props.event.daysOfWeek
					? props.event.daysOfWeek.includes(1)
					: false,
			T:
				props.event && props.event.daysOfWeek
					? props.event.daysOfWeek.includes(2)
					: false,
			W:
				props.event && props.event.daysOfWeek
					? props.event.daysOfWeek.includes(3)
					: false,
			Th:
				props.event && props.event.daysOfWeek
					? props.event.daysOfWeek.includes(4)
					: false,
			F:
				props.event && props.event.daysOfWeek
					? props.event.daysOfWeek.includes(5)
					: false,
			Sa:
				props.event && props.event.daysOfWeek
					? props.event.daysOfWeek.includes(6)
					: false,
		},
		validationSchema: schema,
		onSubmit: onSubmitHandler,
		initialErrors: props.event ? undefined : { err: 0 },
	});
	//if(0) console.log(1221);

	const handleRecurrent = () => {
		setRecur((r) => !r);
	};

	//console.log(formik.values);
	return (
		<React.Fragment>
			<Row>
				<Form.Label column sm="3" className="label">
					{props.label}
				</Form.Label>
				{!props.read && (
					<div className='color-buttons'>
						{["blue", "red", "green", "purple", "cyan"].map((color) => {
							return (
								<Button
									className="mybtn"
									active={currColor === color}
									style={formik.values.color === color?{ border:`${color} 1px solid`, background: `${color}`, color:'white', fontWeight:'bold' }:{ border:`${color} 1px solid`, color: `${color}`, background:'white', fontWeight:'bold' }}
									onClick={() =>{
										(formik.values.color = color);
										setCurrColor(color);
									} }
								>
									{color}
								</Button>
							);
						})}
					</div>
				)}
			</Row>
			<Form onSubmit={formik.handleSubmit}>
				<FormGroup
					prop="title"
					formik={formik}
					label="Title"
					type="string"
					read={props.read}
				/>
				<FormGroup
					prop="description"
					formik={formik}
					label="Description"
					type="textarea"
					read={props.read}
				/>
				<FormGroup
					prop="startDate"
					formik={formik}
					label="Start Date"
					type="date"
					read={props.read}
				/>
				<FormGroup
					prop="startTime"
					formik={formik}
					label="Start Time"
					type="time"
					read={props.read}
				/>
				<FormGroup
					prop="endDate"
					formik={formik}
					label="End Date"
					type="date"
					read={props.read}
				/>
				<FormGroup
					prop="endTime"
					formik={formik}
					label="End Time"
					type="time"
					read={props.read}
				/>
				<Form.Group as={Row} controlId="recurrent" className="fgRow repeating-switch">
					<Form.Label  className="label">
						Repeating Event
					</Form.Label>
					{/* <Col sm="9"> */}
						<Form.Check
							type="switch"
							id="custom-switch"
							label=""
							onClick={handleRecurrent}
							value={recur}
							checked={recur}
							onChange={formik.handleChange}
							disabled={props.read}
						/>
					{/* </Col> */}
				</Form.Group>
				{recur && (
					<React.Fragment>
						<DaysOfWeek
							date={props.date}
							read={props.read}
							formik={formik}
							date={props.date}
						/>
						<FormGroup
							prop="startRecur"
							formik={formik}
							label="Start Date (Recur)"
							type="date"
							read={props.read}
						/>
						<FormGroup
							prop="endRecur"
							formik={formik}
							label="End Date (Recur)"
							type="date"
							read={props.read}
						/>
					</React.Fragment>
				)}

				{!props.read && (
					<AntButton
						size="large"
						block
						className="mybtn"
						htmlType='submit'
						disabled={Object.keys(formik.errors).length !== 0}
						type="primary"
					>
						Submit
					</AntButton>
				)}
				{!props.read && props.event && (
					<AntButton
						className="mybtn"
						danger
						block
						size="large"
						type="button"
						onClick={onDeleteHandler}
					>
						Delete
					</AntButton>
				)}
			</Form>
		</React.Fragment>
	);
};

export default EventForm;
