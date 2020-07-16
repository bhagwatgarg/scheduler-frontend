import React, {useState, useEffect} from 'react';
import {Card, Button, CardDeck} from 'react-bootstrap';

import { useHTTP } from "../utils/http";
import Loading from "../utils/loading";
import ErrorModal from "../utils/error-modal";
import { useParams } from 'react-router-dom';
import UserItem from './user-item';
import NavBar from '../UIElements/navbar';
import './search-user.css';



const SearchUser=(props)=>{
  const name=useParams().name;
  const [users, setUsers]=useState(undefined);
  const [getData, isLoading, isError, setError] = useHTTP();

  useEffect(()=>{
    //if(users) return;
    const getUsers=async()=>{
      try {
        const data = await getData(
          `http://localhost:5000/users/get/${name}`,
          "GET",
          null,
          { "Content-Type": "application/json" }
        );
        if(data.users.length>0){
          console.log(data);
          setUsers(data.users);
        }
      } catch (err) {}
    };

    getUsers();
  }, [name]);

  return (
    <React.Fragment>
			<NavBar />
			{isLoading && <Loading />}
			{isError && (
				<ErrorModal
					message={isError.message}
					show={isError.status}
					onHide={() => setError({ message: "", status: false })}
				/>
			)}
      <div className='search-results'>
        {(users&&(!isLoading))?users.map((u, k)=><UserItem key={`${k}`} user={u}  />):<div className='no-user-found'><h1>No Channel Found!</h1></div>}
      </div>
      </React.Fragment>
  );

};

export default SearchUser;