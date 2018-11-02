import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Wrapper from '../components/Wrapper';
import NavBar from '../components/NavBar';

import Ajax from '../../assets/js/Ajax';

export default class PageLogin extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			username: '',
			password: '',
			redirectToReferrer: false
		}
		
		
		this._onLogin = this._onLogin.bind(this);
		this._onChange = this._onChange.bind(this);
	}
	
	render() {
		if(this.state.redirectToReferrer || sessionStorage.getItem('userData')) {
			return (
				<Redirect to={ '/home' } />
			)
		}
		
		return (
			<Wrapper>
				<div className="container">
					<NavBar className="navbar" type="auth" />
					
					<form name="loginform">
						<div className="row row-sm--center">
							<div className="col-sm-5 col-12">
								<h4>Registrarse</h4>
							
								<div className="form-group">
									<label className="form-group__label">Usuario</label>
									<input className="form-group__field" name="username" type="text" placeholder="Usuario" onChange={ this._onChange }/>
								</div>
								
								<div className="form-group">
									<label className="form-group__label">Contraseña</label>
									<input className="form-group__field" name="password" type="password" placeholder="Contraseña" onChange={ this._onChange }/>
								</div>
								
								<input type="button" className="button" value="Login" onClick={this._onLogin}/>
							</div>
						</div>
					</form>
				</div>
			</Wrapper>
		);
	}
	
	_onLogin = (event) => {
		event.preventDefault();
		
		if(this.state.username && this.state.password) {
			Ajax('/login', this.state)
			.then(response => {
				if('userData' in response) {
					sessionStorage.setItem('userData', JSON.stringify(response.userData));
					this.setState({ redirectToReferrer: true });
				}
			});
		}
	}
	
	_onChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
}