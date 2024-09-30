import React, { Suspense, lazy, Profiler } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { store, persistor } from './Store';
import Loading from './pages/Loading';
import useAuthMiddleware from './hooks/useAuthMiddleware';

const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));
const MyAccount = lazy(() => import('./pages/account/MyAccount'));
const Settings = lazy(() => import('./pages/account/Settings'));

const onRender = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
	// console.log({ id, phase, actualDuration, baseDuration, startTime, commitTime });
};

const AuthRoute = ({ children }) => {
	const user = useAuthMiddleware();
	return user ? <Navigate to="/" /> : children;
};
AuthRoute.propTypes = {
	children: PropTypes.element,
};

const PrivateRoute = ({ children }) => {
	const user = useAuthMiddleware();
	return user ? children : <Navigate to={{ pathname: '/login' }} />;
};
PrivateRoute.propTypes = {
	children: PropTypes.element,
};

const AppRoutes = () => {
	return (
		<Routes>
			<Route
				exact={true}
				path="/"
				element={
					<PrivateRoute>
						<MyAccount />
					</PrivateRoute>
				}
			/>
			<Route
				exact={true}
				path="/login"
				element={
					<AuthRoute>
						<Login />
					</AuthRoute>
				}
			/>
			<Route
				exact={true}
				path="/signup"
				element={
					<AuthRoute>
						<Signup />
					</AuthRoute>
				}
			/>
			<Route 
				exact={true} 
				path="settings" 
				element={
					<PrivateRoute>
						<Settings />
					</PrivateRoute>
				} 
			/>
			<Route 
				exact={true} 
				path="*" 
				element={
					<PrivateRoute>
						<MyAccount />
					</PrivateRoute>
				} 
			/>
		</Routes>
	);
};

const App = () => {
	return (
		<Suspense fallback={<Loading />}>
			<Profiler id="App" onRender={onRender}>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<Router>
							<AppRoutes />
						</Router>
						<ToastContainer />
					</PersistGate>
				</Provider>
			</Profiler>
		</Suspense>
	);
};

export default App;
