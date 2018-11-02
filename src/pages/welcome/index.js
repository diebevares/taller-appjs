import React, { Component } from 'react';

import Wrapper from '../components/Wrapper';
import NavBar from '../components/NavBar';

export default class PageWelcome extends Component {
	render() {
		return (
			<Wrapper>
				<div className="container">
					<NavBar className="navbar" type="auth" />
				</div>
			</Wrapper>
		);
	}
}