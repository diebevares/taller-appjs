import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PageWelcome from './pages/welcome';
import PageHome from './pages/home';
import PageLogin from './pages/login';
import PageSingUp from './pages/singup';
import PageNotFound from './pages/notfound';

export default () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={ PageWelcome }/>
				<Route path="/home" component={ PageHome }/>
				<Route path="/login" component={ PageLogin }/>
				<Route path="/signup" component={ PageSingUp }/>
				<Route path="*" component={ PageNotFound }/>
			</Switch>
		</BrowserRouter>
	)
}

export const RoutsAuth = [
	{
			title: 'Iniciar Sesión',
			path: '/login',
			icon: '',
			component: PageLogin
	},

	{
			title: 'Registrarse',
			path: '/signup',
			icon: '',
			component: PageSingUp
	}
];

export const RoutsMain = [
	{
			title: 'Cerrar Sesión',
			path: '_onLogout',
			icon: '',
			component: PageLogin
	}
];