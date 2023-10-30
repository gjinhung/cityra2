import React from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from '../../images/logo.png'

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
	const location = useLocation();

	return (
		<div className="nav-big-container">
			<div className="nav-container">
				<div className="nav-left">
					<NavLink exact to="/">
						<img className="small-logo" src={logo} alt="" />
					</NavLink>
				</div>
				{isLoaded && (
					<div>
						<ProfileButton user={sessionUser} />
					</div>
				)}
			</div>
		</div>
	);
}

export default Navigation;
