import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleFormError } from '../../Utilities';
import { AuthActions } from '../../reducers/AuthReducer';
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from '../../components';
import { useRegisterMutation } from '../../services/AuthServices';

const Login = () => {
    const { handleSubmit, control, formState: { isSubmitting, errors }, setError } = useForm({ mode: 'onChange' });
    const [register] = useRegisterMutation();
    const dispatch = useDispatch();

    const onSubmit = async (payload) => {
        try {
            const response = await register(payload).unwrap();
            dispatch(AuthActions.setAuth(response.data?.client?.sessions?.[0]?.user));
        } catch (error) {
            handleFormError(error, setError);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl w-full flex">
                    <div className="w-full lg:w-1/3 "></div>
                    <div className="w-full lg:w-1/3 bg-white p-8 rounded-lg shadow-lg">
                        <div>
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Signup</h2>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                Welcome back! Please sign in to continue
                            </p>
                        </div>

                        <div className="mt-8 space-y-6">
                            <div className="flex space-x-4 mb-6">
								<button className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <img className="h-5 w-5 mr-2" src="https://www.logo.wine/a/logo/GitHub/GitHub-Logo.wine.svg" alt="Google Logo" /> 
                                    GitHub
                                </button>
                                <button className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <img className="h-5 w-5 mr-2" src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google Logo" />
                                    Google
                                </button>
                            </div>

                            <div className="relative mb-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">or</span>
                                </div>
                            </div>

                            <form className="space-y-4" onSubmit={handleSubmit((values) => onSubmit(values))}>
								<Controller
                                    name="name"
                                    control={control}
                                    rules={{ required: 'Name is required' }}
                                    render={(field) => (
                                        <TextInput
                                            {...field}
                                            type="text"
                                            placeholder="Enter Your Name"
                                            errors={errors}
                                        />
                                    )}
                                />
								<Controller
                                    name="email"
                                    control={control}
                                    rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } }}
                                    render={(field) => (
                                        <TextInput
                                            {...field}
                                            type="text"
                                            placeholder="Enter Your Email"
                                            errors={errors}
                                        />
                                    )}
                                />
                                <Controller
                                    name="password"
                                    control={control}
                                    rules={{ required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } }}
                                    render={(field) => (
                                        <TextInput
                                            {...field}
                                            type="password"
                                            placeholder="Enter Your Password"
                                            errors={errors}
                                        />
                                    )}
                                />
                                
                                <div>
                                    <button
                                        type="submit"
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Login'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <p className="mt-4 text-center text-sm text-gray-600">
							Already have an account?{' '}
							<Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
								Sign in
							</Link>
						</p>
                        
                    </div>
                    <div className="w-full lg:w-1/3"></div>
                </div>
            </main>
        </div>
    );
};

export default Login;
