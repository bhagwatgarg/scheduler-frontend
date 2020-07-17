import React, { useState, useContext, useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import FormGroup from "../utils/form-group";
import NavBar from "../UIElements/navbar";
import LoginCard from "./login-card";
import { AuthContext } from "../utils/auth-context";
import Loading from "../utils/loading";
import ErrorModal from "../utils/error-modal";
import { useHTTP } from "../utils/http";
import { Button } from "antd";
import "./login.css";

const SignUp = (props) => {
	const [getData, isLoading, isError, setError] = useHTTP();
	const [isSignUp, setSignUp] = useState(true);
	const [user, setUser] = useState(true);
	const myContext = useContext(AuthContext);
	let [visible, setVisible] = useState(false);

	useEffect(()=>{
		document.title='Scheduler';
	}, []);

	const schema = yup.object({
		name: isSignUp
			? yup.string().trim().required("Name cant be empty")
			: yup.string().notRequired(),
		description:
			isSignUp && !user
				? yup.string().trim().required("Channel Description cant be empty")
				: yup.string().notRequired(),
		email: yup
			.string()
			.required("Valid email is required")
			.email("Valid email is required"),
		password: yup
			.string()
			.required("Minimum 4 characters required")
			.min(4, "Minimum 4 characters required"),
		passwordConfirmation: isSignUp
			? yup
					.string()
					.required("Passwords must match")
					.oneOf([yup.ref("password"), null], "Passwords must match")
			: yup.string().notRequired(),
	});

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		let obj;
		const { name, email, password, description } = formik.values;
		if (isSignUp) {
			obj = {
				name,
				email,
				password,
				type: user ? 0 : 1,
				description,
			};
			try {
				const data = await getData(
					`${process.env.REACT_APP_BACKEND_URL}/users/signup`,
					"POST",
					JSON.stringify(obj),
					{ "Content-Type": "application/json" }
				);
				myContext.login(data.id, data.type, data.token);
			} catch (e) {}
		} else {
			obj = {
				email: formik.values.email,
				password: formik.values.password,
				type: user ? 0 : 1,
			};
			let data;
			try {
				//console.log(process.env);
				data = await getData(
					`${process.env.REACT_APP_BACKEND_URL}/users/login`,
					"POST",
					JSON.stringify(obj),
					{ "Content-Type": "application/json" }
				);
				//console.log(data);
				//const data2=JSON.parse(data);
			} catch (e) {
				return;
			}
			myContext.login(data.id, data.type, data.token);
			//console.log(data.type);
		}
	};

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
			passwordConfirmation: "",
		},
		validationSchema: schema,
		onSubmit: onSubmitHandler,
		initialErrors: { err: 0 },
	});

	const toggleSignUp = () => {
		// if(isSignUp)
		//   formik.values.name="a";
		// else formik.values.name="";
		setSignUp((s) => !s);
	};
	const handleNav = (e) => {
		if ((e === 0 && user) || (e === 1 && !user)) return;
		setUser((s) => !s);
	};

	return (
		<React.Fragment>
			<NavBar visible={visible} setVisible={setVisible} />
			<div className=" full-extent signup-header">
				<section className="signup-header-content">
					<h1>Scheduler</h1>
					<h6>Manage all your calendars at one place</h6>
				</section>
			</div>
			<div className="full-extent signup-features">
				<h1>Key Features</h1>
				<section className="signup-features-content">
					<div className="feature-item feature-user-type">
						<div className="feature-icon"></div>
						<h1>Access as User or Channel</h1>
					</div>
					<div className="feature-item feature-events">
						<div className="feature-icon"></div>
						<h1>Follow Channels to add events to your personal calendar</h1>
					</div>
					<div className="feature-item feature-notify">
						<div className="feature-badge">
							<h1>SOON!</h1>
						</div>
						<div className="feature-icon"></div>
						<h1>Get notified about upcoming events</h1>
					</div>
				</section>
			</div>
			{isLoading && <Loading />}
			{isError && (
				<ErrorModal
					message={isError.message}
					show={isError.status}
					onHide={() => setError({ message: "", status: false })}
				/>
			)}
			<LoginCard
				isSignUp={isSignUp}
				handleNav={handleNav}
				user={user}
				visible={visible}
				setVisible={setVisible}
			>
				<Form onSubmit={onSubmitHandler}>
					{isSignUp && (
						<FormGroup
							prop="name"
							formik={formik}
							label={user ? "Name" : "Channel Name"}
							type="string"
						/>
					)}
					{isSignUp && (
						<FormGroup
							prop="description"
							formik={formik}
							label={user ? "Bio" : "Description"}
							type="string"
						/>
					)}
					<FormGroup prop="email" formik={formik} label="Email" type="email" />
					<FormGroup
						prop="password"
						formik={formik}
						label="Password"
						type="password"
					/>
					{isSignUp && (
						<FormGroup
							prop="passwordConfirmation"
							formik={formik}
							label="Confirm Password"
							type="password"
						/>
					)}
					<Button
						variant="outline-primary"
						size="large"
						disabled={Object.keys(formik.errors).length !== 0}
						type="primary"
						onClick={onSubmitHandler}
						className="mybtn"
					>
						Submit
					</Button>
				</Form>
				<Button
					type="button"
					variant="outline-primary"
					size="large"
					onClick={toggleSignUp}
					className="mybtn"
				>
					Switch to {!isSignUp ? "Signup" : "Login"}
				</Button>
			</LoginCard>
		</React.Fragment>
	);
};

export default SignUp;
