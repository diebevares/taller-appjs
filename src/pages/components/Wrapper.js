import React, { Component } from 'react';
import Header from './Header';
import '../../assets/css/components/wrapper.scss';


export default class PageNotFound extends Component {
	render() {
		return (
			<div className="wrapper">
				<Header className="header" />
				
				<div className="body">
					{ this.props.children }
				</div>
			</div>
		);
	}
}