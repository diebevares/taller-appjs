import React, { Component } from 'react';

import Logo from '../../assets/img/logo.png'
import '../../assets/css/components/header.scss'

export default class Header extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			class: props.className || ''
		}
	}
	
	render() {
		return (
			<header className={ this.state.class }>
				<div className={ `${this.state.class}__bar` }></div>
				
				<div className={ `${this.state.class}__bartitle` }>
					<div className="container">
						<div className={ `${this.state.class}__logo` }>
							<img src={ Logo } alt="Universidad de San Carlos" />
						</div>
					</div>
				</div>
			</header>
		);
	}
}