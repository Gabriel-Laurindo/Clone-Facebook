import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import GlobalContainer from '../globalContainer'
import Autenticacao from '../auth'
import Profile from '../profile'

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		(localStorage.getItem('token') != '') ? (
			< Component {...props} />
		) : (
				<Redirect to={{ pathname: '/', state: { from: props.location } }} />
			)
	)} />
)

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" exact={true} component={Autenticacao} />
			<PrivateRoute path="/home" component={GlobalContainer} />
			<PrivateRoute path="/profile" component={Profile} />
		</Switch>
	</ BrowserRouter>
)


export default Routes