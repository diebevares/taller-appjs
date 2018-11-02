import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Wrapper from '../components/Wrapper';
import NavBar from '../components/NavBar';
import Ajax from '../../assets/js/Ajax';

import '../../assets/css/pages/home/feeds.scss'

export default class PageHome extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			data: [],
			userFeed: '',
			name: '',
			redirectToReferrer: false
		}
		
		this._getFeeds = this._getFeeds.bind(this);
		this._onCreateFeed = this._onCreateFeed.bind(this);
		this._onChange = this._onChange.bind(this);
		this._onLogout = this._onLogout.bind(this);
	}
	
	componentWillMount() {
		if(sessionStorage.getItem('userData')) {
			this._getFeeds();
		} else {
			this.setState({ redirectToReferrer: true });
		}
	}
	
	render() {
		if(this.state.redirectToReferrer) {
			return (
				<Redirect to={ '/' } />
			)
		}
		
		return (
			<Wrapper>
				<div className="container">
					<NavBar
						className="navbar" type="main"
						methods={{ _onLogout: this._onLogout }}
					/>
					
					<form className="feedform">
						<div className="row row-sm--center">
							<div className="col-12">
								<div className="form-group">
									<input className="form-group__field" name="userFeed" type="text" placeholder="Que hay de nuevo" onChange={ this._onChange } value={ this.state.userFeed } />
								</div>
								
								<div className="form-group">
									<input type="button" value="Enviar" className="button" onClick={ this._onCreateFeed } />
								</div>
							</div>
						</div>
					</form>
					
					<ul className="feeds row">
						{
							[].map.call(this.state.data, (feed, index) => {
								return (
									<li className="col-12" key={ index }>
										<div className="feed">
											<div className="feed__autor">{ this.state.name }</div>
											<div className="feed__text">{ feed.feed }</div>
											<div className="feed__date">{ feed.date }</div>
										</div>
									</li>
								)
							})
						}
					</ul>
				</div>
			</Wrapper>
		);
	}
	
	_getFeeds = () => {
		const { id, name } = JSON.parse(sessionStorage.getItem('userData'));
		const data = { fk_user: id };
		this.setState({ name: name });
		
		Ajax('/getFeeds', data)
		.then(response => {
			const { feeds } = response;
			
			this.setState({ data: feeds });
		})
	}
	
	_onCreateFeed = (event) => {
		event.preventDefault();
		
		const { id } = JSON.parse(sessionStorage.getItem('userData'));
		const data = { fk_user: id, feed: this.state.userFeed };
		
		if(this.state.userFeed) {
			Ajax('/createFeed', data)
			.then((response) => {
				const { feedData } = response;
				this.setState({ data: [ feedData, ...this.state.data ], userFeed: '' })
			});
		}
	}
	
	_onChange = (event) => {
		this.setState({ userFeed: event.target.value });
	}
	
	_onLogout = (event) => {
		event.preventDefault();
		sessionStorage.setItem('userData', '');
		sessionStorage.clear();
		this.setState({ redirectToReferrer: true });
	}
}