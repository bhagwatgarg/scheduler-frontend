import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../utils/auth-context";
import { useHistory, Link } from "react-router-dom";
import { PageHeader, Button, Input, Menu, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
// import {Link} from 'react-router-dom';

import "./navbar.css";

const NavBar = (props) => {
	const history = useHistory();
	const [name, setName] = useState(null);
	const myContext = useContext(AuthContext);
	const [visible, setVisible] = useState(false);
	const handleLogout = () => {
		if (window.confirm("Are you sure?")) myContext.logout();
	};

	const onChangeHandler = (e) => {
		const newVal = e.target.value;
		if (name !== newVal) setName(newVal);
	};

	const handleSubmit = (e) => {
		//console.log(e);
		if (name) {
			history.push(`/search/${name}`);
		}
		//console.log(e);
	};

	// const homeClickHandler = (e) => {
	// 	e.preventDefault();
	// 	history.push("/");
	// };

	let [drawer, setDrawer] = useState(window.innerWidth < 600);

	useEffect(() => {
		window.onresize = () => {
			setDrawer(
				window.innerWidth < 600 &&
					myContext.authState &&
					myContext.authState.type === 0
			);
		};
	}, []);

	const search = (
		<Input.Search
			key="search"
			onChange={onChangeHandler}
			value={name}
			placeholder="Channel Name"
			onSearch={handleSubmit}
			className="input-search"
		/>
	);

	const logout = (
		<Button
			size="large"
			block
			className="login-button"
			variant="outline-info"
			onClick={handleLogout}
		>
			Logout
		</Button>
	);
	const menu = (
		<Menu onClick={() => {}}>
			<Menu.Item key="0">{search}</Menu.Item>
			<Menu.Item key="1">{logout}</Menu.Item>
		</Menu>
	);
	const drawerItem = (
		<Dropdown
			onVisibleChange={(f) => setVisible(f)}
			visible={visible}
			overlay={menu}
			trigger={["hover"]}
		>
			<a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
				<MoreOutlined
					style={{ fontSize: "2.5rem" }}
					onClick={() => setVisible(true)}
				/>
			</a>
		</Dropdown>
	);

	// return (
	// 		<div  id="bar">
	// 		<Navbar className="navbar" variant="dark" fixed='top'>
	// 			<Navbar.Brand href="#home">Navbar</Navbar.Brand>
	// 			<Nav className="mr-auto">
	// 			<Nav.Link href='/' onClick={homeClickHandler} >Home</Nav.Link>
	// 				<Nav.Link href="#features">Features</Nav.Link>
	// 				<Nav.Link href="#pricing">Pricing</Nav.Link>
	// 			</Nav>
	// 			{myContext.authState&&<Form onSubmit={handleSubmit} inline>
	//     	<FormControl value={name} onChange={onChangeHandler} type="text" placeholder="Search Channels" className="mr-sm-2" />
	//     	<Button type={"submit"} variant="outline-success">Search</Button>
	//   </Form>}
	// 	{myContext.authState&&<Button variant="outline-info" onClick={handleLogout}>Logout</Button>}
	// 		</Navbar>
	// 		</div>
	// );
	return (
		<PageHeader
			className="ant-nav-bar"
			ghost={false}
			title={
				<Link to="/" style={{ textDecoration: "none" }}>
					<h1 style={{ margin: 0 }}>Scheduler</h1>
				</Link>
			}
			extra={[
				!myContext.authState && (
					<Button
						key="signup"
						block
						size="large"
						onClick={() => props.setVisible(true)}
						type="primary"
					>
						Get Started
					</Button>
				),
				// <Button key="3">Operation</Button>,
				// <Button key="2">Operation</Button>,
				// <Button key="1" type="primary">
				// 	Primary
				// </Button>,
				myContext.authState && drawer && drawerItem,
				myContext.authState &&
					myContext.authState.type === 0 &&
					!drawer &&
					search,
				myContext.authState && !drawer && logout,
			]}
		/>
	);
};

export default NavBar;
