import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom';

export default props => {
	return (
		// Pass on our props
		<Menu {...props}>
			<a className="menu-item" href="/">
				Home
		</a>

			<a className="menu-item" href="/burgers">
				Burgers
		</a>

			<a className="menu-item" href="/pizzas">
				Pizzas
		</a>

			<Link to="/login">Logout</Link>
		</Menu>
	);
};