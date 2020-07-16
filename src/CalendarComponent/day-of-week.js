import React from "react";
import { Form, Row, Col } from "react-bootstrap";
//import './form-group.css';

const DaysOfWeek = (props) => {
  let day;
  if(props.formik.errors.startDate){
    day=new Date(props.date).getDay();
  }
  else{
    day=new Date(props.formik.values.startDate).getDay();
  }
  const onClickHandler=(val, ind)=>{
    if(props.formik.values[val]){
      props.formik.values.daysOfWeek=props.formik.values.daysOfWeek.filter((e)=>e!==ind);
    }
    else{
      props.formik.values.daysOfWeek.push(ind);
    }
    props.formik.values[val]=(!props.formik.values[val]);
  }
	return (
		<React.Fragment>
			<Row>
      <Form.Label column sm="3" className="label"></Form.Label>
        {['S','M','T','W','Th','F','Sa'].map((val, ind)=>{
          return (<Form.Group controlId= {val}>
				<Col sm="1">
					<Form.Check
						label={val}
						onChange={props.formik.handleChange}
            value={((day===ind)?true:props.formik.values[val])}
            checked={((day===ind)?true:props.formik.values[val])}
            onClick={()=>onClickHandler(val, ind)}
            disabled={props.read||(day===ind)}
					/>
				</Col>
			</Form.Group>
          );
        })}
			</Row>
		</React.Fragment>
	);
};

export default DaysOfWeek;


// {formik.values.recurrent&&['S','M','T','W','Th','F','Sa'].map((val, ind)=>{
//   return(<FormGroup
//   prop={val}
//   formik={formik}
//   label={`${val}`}
//   type="checkbox"
//   read={props.read}
// />)
// })}