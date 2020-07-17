import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import "./form-group.css";

const FormG = (props) => {
	return (
		<React.Fragment>
			<Form.Group as={Row} controlId={`${props.prop}`} class="fgRow">
				<Form.Label column sm="3" className="label">
					{props.label}
				</Form.Label>
				<Col sm="9">
					<Form.Control
						type={props.type ? `${props.type}` : "string"}
						onChange={props.formik.handleChange}
						value={props.formik.values[`${props.prop}`]}
						onBlur={props.formik.handleBlur}
						plaintext={props.read}
						readOnly={props.read}
					/>
				</Col>
			</Form.Group>
			<Row>
				<Col sm="3"></Col>
				<div column sm="9" className="error">
					{" "}
					{props.formik.touched[`${props.prop}`] &&
					props.formik.errors[`${props.prop}`] ? (
						props.formik.errors[`${props.prop}`]
					) : (
						<br />
					)}
				</div>
			</Row>
		</React.Fragment>
	);
};

export default FormG;
