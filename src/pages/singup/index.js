import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Wrapper from '../components/Wrapper';
import NavBar from '../components/NavBar';
import Ajax from '../../assets/js/Ajax';

export default class PageSingUP extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			username: '',
			password: '',
			email: '',
			name: '',
			redirectToReferrer: false
		}
		
		this._onSignUp = this._onSignUp.bind(this);
		this._onChange = this._onChange.bind(this);
	}
	
	render() {
		if (this.state.redirectToReferrer || sessionStorage.getItem('userData')) {
			return (<Redirect to={'/home'}/>)
	  	}
		return (
			<Wrapper>
				<div className="container">
					<NavBar className="navbar" type="auth" />
					
					<form name="signupform">
						<div className="row row-sm--center">
							<div className="col-sm-10 col-12">
								<div className="row">
									<div className="col-12">
										<h4>Registrarse</h4>
									</div>
									
									<div className="col-sm-6 col-12">
										<div className="form-group">
											<label className="form-group__label">Email</label>
											<input className="form-group__field" name="email" type="text"  placeholder="Email" onChange={ this._onChange }/>
										</div>
									</div>
									
									<div className="col-sm-6 col-12">
										<div className="form-group">
											<label className="form-group__label">Name</label>
											<input className="form-group__field" name="name" type="text"  placeholder="Nombre" onChange={ this._onChange }/>
										</div>
									</div>
									
									<div className="col-sm-6 col-12">
										<div className="form-group">
											<label className="form-group__label">Usuario</label>
											<input className="form-group__field" name="username" type="text"  placeholder="Usuario" onChange={ this._onChange }/>
										</div>
									</div>
									
									<div className="col-sm-6 col-12">
										<div className="form-group">
											<label className="form-group__label">Contraseña</label>
											<input className="form-group__field" name="password" type="text"  placeholder="Contraseña" onChange={ this._onChange }/>
										</div>
									</div>
									
									<div className="col-12">
										<input type="button" className="button" value="Registrarse" onClick={this._onSignUp}/>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</Wrapper>
		);
	}
	
	_onSignUp = (event) => {
		event.preventDefault();
		
		if(this.state.username && this.state.password && this.state.email && this.state.name) {
			Ajax('/signup', this.state)
			.then(response => {
				if('userData' in response) {
					sessionStorage.setItem('userData', JSON.stringify(response.userData));
					this.setState({ redirectToReferrer: true })
				}
			})
		}
	}
	
	_onChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
}