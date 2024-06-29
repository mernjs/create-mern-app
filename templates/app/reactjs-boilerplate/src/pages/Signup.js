import React from 'react';
import { Header, Footer, TextInput } from '../components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import apiRequest, { showToast } from '../Utilities';
import { AuthActions } from '../reducers/AuthReducer';
import { useForm, Controller } from 'react-hook-form';

const Signup = () => {
	const {
		handleSubmit,
		control,
		formState: { isSubmitting, errors },
	} = useForm({ mode: 'onChange' });

	const dispatch = useDispatch();

	const signup = async (payload) => {
		try {
			const response = await apiRequest.post(`signup`, payload);
			dispatch(AuthActions.setAuth(response.data.data));
		} catch (error) {
			showToast(error?.response?.data?.message, 'error');
		}
	};

	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className='mb-auto'>
				<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up</h2>
					</div>

					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
						<form className="space-y-6" onSubmit={handleSubmit((values) => onSubmit(values))}>
							<Controller
								name="name"
								control={control}
								render={(field) => (
									<TextInput
										{...field}
										type="text"
										placeholder="Enter Your Name"
										errors={errors}
									/>
								)}
								rules={{ required: 'Name is required.' }}
							/>

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

							<Controller
								name="confirm_password"
								control={control}
								render={(field) => (
									<TextInput
										{...field}
										type="password"
										placeholder="Enter Your Confirm Password"
										errors={errors}
									/>
								)}
								rules={{ required: 'Confirm Password is required.' }}
							/>

							<div>
								<button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{isSubmitting ? 'Submitting...' : 'Sign up'}</button>
							</div>
						</form>

						<p className="mt-10 text-center text-sm text-gray-500">
							Already have an account?
							<Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign in</Link>
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Signup;
