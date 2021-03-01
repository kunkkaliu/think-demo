import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/home';
import List from './pages/list';

function App() {
	return (
		<Switch>
			<Redirect exact from="/" to="/home" />
			<Route exact path="/home" component={Home} />
			<Route exact path="/list" component={List} />
		</Switch>
	);
}

export default App;
