import React, { useState } from "react";
import { Card, Nav,} from "react-bootstrap";
import { Modal, Button } from "antd";
import "./login-card.css";

const LoginCard = (props) => {
	//0 for user and 1 for publisher

  //console.log(props);
  
  const getText=()=>{
    let str=(props.isSignUp?"SignUp":"Login");
    str+=" for ";
    str+=(props.user==1?"User":"Channel");
    return str;
  };

	return (
		<Modal
			title={getText()}
			visible={props.visible}
			centered
      closable
      onCancel={() => props.setVisible(false)}
      footer={false}
		>
			<Card id="loginCard" className="text-center">
				<Card.Header>
					<Nav fill variant="tabs" defaultActiveKey="#user">
						<Nav.Item>
							<Nav.Link href="#user" onClick={() => props.handleNav(0)}>
								User
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link href="#publisher" onClick={() => props.handleNav(1)}>
								Publisher
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</Card.Header>
				{props.user && <Card.Body id="first">{props.children}</Card.Body>}
				{!props.user && <Card.Body id="link">{props.children}</Card.Body>}
			</Card>
		</Modal>
	);
};

export default LoginCard;
