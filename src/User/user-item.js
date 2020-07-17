import React from "react";
import {Button } from "react-bootstrap";
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
};

export default UserItem;
