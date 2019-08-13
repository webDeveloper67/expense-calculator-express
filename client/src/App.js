import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Home from './components/pages/Home';
import About from './components/pages/About';

import SignUp from './components/verification/SignUp';
import SignIn from './components/verification/SignIn';

//Redux
import {Provider} from 'react-redux';
import store from './store';

import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import {loadUser} from './actions/verify';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	});
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<Route exact path="/" component={Landing} />
					<div className="ui container">
						<Alert />
						<Switch>
							<PrivateRoute exact path="/home" component={Home} />
							<PrivateRoute exact path="/about" component={About} />
							<Route exact path="/signup" component={SignUp} />
							<Route exact path="/signin" component={SignIn} />
						</Switch>
					</div>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
