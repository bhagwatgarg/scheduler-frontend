import React from "react";
import { Card, NavLink, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import './user-item.css';

const UserItem = (props) => {
  const { name, followers, description } = props.user;
  const history=useHistory();
  const onClickHandler=()=>{
    history.push(`/channel/${props.user.id}`);
	};
	return(
		<div className='search-item'>
			<div className='blank'><h1>{name}</h1></div>
			<div className='content'>
				<h6>{followers} Follower{followers === 1 ? "" : "s"}</h6>
				<h4>{description}</h4>
				<Button onClick={onClickHandler} variant="primary">Visit Channel</Button>
			</div>
		</div>
	);
	return (
		<Card>
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Subtitle>
					{followers} Follower{followers === 1 ? "" : "s"}
				</Card.Subtitle>
				<Card.Text>
					{description}
				</Card.Text>
			</Card.Body>
      <Card.Subtitle><Button onClick={onClickHandler} variant="primary">Go somewhere</Button></Card.Subtitle>
		</Card>
	);
};

export default UserItem;
