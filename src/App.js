
import React, {useState} from "react";
import logo from "./logo.svg";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";
import "./App.css";
import Home from "./home";
import SignUp from "./User/login";
import Profile from "./User/profile";
import { AuthContext } from "./utils/auth-context";
import SearchUser from "./User/search-user";


const App = () => {
  const [authState, setAuthState]=useState(null);
  const login=(user, type)=>setAuthState({type, user});
  const logout=()=>setAuthState(null);

  let routes;
  if(!authState){
    routes=(
      <Switch>
        <Route path='/'>
          <SignUp />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  }
  else if(authState.type===0){
    routes=(
      <Switch>
        <Route path='/' exact>
          <Profile />
        </Route>
        <Route path='/channel/:id'>
          <Profile />
        </Route>
        <Route path='/search/:name'>
          <SearchUser />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  }
  else{
    routes=(
      <Switch>
        <Route path='/'>
          <Profile />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  }
	return (
    <AuthContext.Provider value={{authState:authState, login: login, logout: logout}}>
		<Router>
			<main>
        {routes}
      </main>
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
