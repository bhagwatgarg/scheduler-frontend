import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";
import "./App.css";
import SignUp from "./User/login";
import Profile from "./User/profile";
import { AuthContext } from "./utils/auth-context";
import SearchUser from "./User/search-user";

let timer;

const App = () => {
	const [authState, setAuthState] = useState(null);
	const login = (user, type, backToken, expiry) => {
		//localStorage.getItem('userData')
		if (!expiry) {
			expiry = Date.now() + 1000*60*60;
    }
    timer=setTimeout(()=>logout('Token Expired...Please login again...'), expiry-Date.now());
		localStorage.setItem(
			"userData",
			JSON.stringify({ type, user, token: backToken, expiry })
		);
		setAuthState({ type, user, token: backToken });
	};
	const logout = (msg) => {
    setAuthState(null);
    localStorage.clear();
    clearTimeout(timer);
    if(msg)alert(msg);
	};

	useEffect(() => {
    const data = localStorage.getItem("userData");
		if (data) {
      const jData = JSON.parse(data);
      //console.log(jData.expiry>Date.now());
			if (jData.expiry > Date.now())
        login(jData.user, jData.type, jData.token, jData.expiry);
      else{
        localStorage.clear();
      }
		}
	}, []);

	let routes;
	if (!authState) {
		routes = (
			<Switch>
				<Route path="/">
					<SignUp />
				</Route>
				<Redirect to="/" />
			</Switch>
		);
	} else if (authState.type === 0) {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Profile />
				</Route>
				<Route path="/channel/:id">
					<Profile />
				</Route>
				<Route path="/search/:name">
					<SearchUser />
				</Route>
				<Redirect to="/" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/">
					<Profile />
				</Route>
				<Redirect to="/" />
			</Switch>
		);
	}
	return (
		<AuthContext.Provider
			value={{
				authState: authState,
				login: login,
				logout: logout,
			}}
		>
			<Router>
				<main>{routes}</main>
			</Router>
		</AuthContext.Provider>
	);
};

export default App;

// return (
//   <div className="App">
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <p>
//         Edit <code>src/App.js</code> and save to reload.
//       </p>
//       <a
//         className="App-link"
//         href="https://reactjs.org"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Learn React
//       </a>
//     </header>
//   </div>
// );
