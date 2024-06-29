import React, { useEffect } from 'react';
import { Header, Footer, TextInput } from '../components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import apiRequest, { showToast } from '../Utilities';
import { AuthActions } from '../reducers/AuthReducer';
import { useForm, Controller } from 'react-hook-form';

const Login = () => {
	const {
		handleSubmit,
		control,
		formState: { isSubmitting, errors },
	} = useForm({ mode: 'onChange' });

	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			try {
				const payload = { email: 'vijay' };
				const response = await apiRequest.post(`login`, payload);
				console.log('RESPONSE ==>>', response);
			} catch (error) {
				console.log('ERRROR', error);
			}
		})();
	}, []);


	const login = async (payload) => {
		try {
			const response = await apiRequest.post(`login`, payload);
			dispatch(AuthActions.setAuth(response.data));
		} catch (error) {
			showToast(error?.message, 'error');
		}
	};

	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className='mb-auto'>
				<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in</h2>
					</div>

					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
						<form className="space-y-6" onSubmit={handleSubmit((values) => onSubmit(values))}>
							<Controller
								name="email"
								control={control}
								render={(field) => (
									<TextInput
										{...field}
										type="text"
										placeholder="Enter Your Email"
										errors={errors}
									/>
								)}
								rules={{ required: 'Email is required.' }}
							/>

							<Controller
								name="password"
								control={control}
								render={(field) => (
									<TextInput
										{...field}
										type="password"
										placeholder="Enter Your Password"
										errors={errors}
									/>
								)}
								rules={{ required: 'Password is required.' }}
							/>
							<div>
								<button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{isSubmitting ? 'Submitting...' : 'Sign in'}</button>
							</div>
						</form>

						<p className="mt-10 text-center text-sm text-gray-500">
							Don&apos;t have an account?
							<Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign up</Link>
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Login;
