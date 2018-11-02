import React, { Component } from 'react';

import Wrapper from '../components/Wrapper';
import NavBar from '../components/NavBar';

import pagenotfound from '../../assets/img/404.png';

export default class PageNotFound extends Component {
	render() {
		return (
			<Wrapper>
				<div className="container">
					<NavBar className="navbar" type="auth" />
					
					<div className="row row-sm--center">
						<div className="col-sm-8 col-12">
							<img className="col-12" alt="Pagina No Encontrada" src={ pagenotfound } />
						</div>
					</div>
				</div>
			</Wrapper>
		);
	}
}