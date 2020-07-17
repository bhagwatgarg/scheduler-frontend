import React, {useState, useEffect, useContext} from 'react';

import { useHTTP } from "../utils/http";
import Loading from "../utils/loading";
import ErrorModal from "../utils/error-modal";
import { useParams } from 'react-router-dom';
import UserItem from './user-item';
import NavBar from '../UIElements/navbar';
import './search-user.css';
import {AuthContext} from '../utils/auth-context';



const SearchUser=(props)=>{
  const name=useParams().name;
  const [users, setUsers]=useState(undefined);
  const [getData, isLoading, isError, setError] = useHTTP();
  const myContext=useContext(AuthContext);

  useEffect(()=>{
    document.title='Search Results';
  }, []);

  useEffect(()=>{
    //if(users) return;
    const getUsers=async()=>{
      try {
        const data = await getData(
          `${process.env.REACT_APP_BACKEND_URL}/users/get/${name}`,
          "GET",
          null,
          {
						"Content-Type": "application/json",
						Authorization: `Bearer ${myContext.authState.token}`,
					}
        );
        if(data.users.length>0){
          //console.log(data);
          setUsers(data.users);
        }else{
          throw Error();
        }
      } catch (err) {
        setUsers(null);
      }
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
        {!isLoading&&((users)?users.map((u, k)=><UserItem key={`${k}`} user={u}  />):<div className='no-user-found'><h1>No Channel Found!</h1></div>)}
      </div>
      </React.Fragment>
  );

};

export default SearchUser;