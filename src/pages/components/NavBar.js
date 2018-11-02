import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { RoutsAuth, RoutsMain } from '../../Routes';
import '../../assets/css/components/navbar.scss';

class NavBar extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			class: props.className || '',
			menu: props.type === 'auth' ? RoutsAuth: RoutsMain,
			methods: props.methods || []
		}
		
		this._getNavStyles = this._getNavStyles.bind(this);
	}
	
	render() {
		return (
			<nav className={ this.state.class }>
				<ul className="flexbox flexbox--right">
					{
						[].map.call(this.state.menu, (menu, index) => {
							if(typeof this.state.methods[menu.path] === 'function') {
								return (
									<li className={ this._getNavStyles( menu.path ) } key={ index }>
										<a href="#" onClick={ this.state.methods[menu.path] }>
											{ menu.title }
										</a>
									</li>
								)
							} else {
								return (
									<li className={ this._getNavStyles( menu.path ) } key={ index }>
										<NavLink exact to={ menu.path }>{ menu.title }</NavLink>
									</li>
								)
							}
						})
					}
				</ul>
			</nav>
		);
	}
	
	_getNavStyles = (_path) => {
		let classItem = `${this.state.class}__item`;
		classItem += (this.props.location.pathname === _path) ? ` ${classItem}--active` : '';
		return classItem;
	}
}

export default withRouter(NavBar);