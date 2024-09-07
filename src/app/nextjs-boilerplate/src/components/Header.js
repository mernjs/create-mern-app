import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AuthActions } from '../reducers/AuthReducer';
import { decrypt } from '../Utilities';
import Link from 'next/link';

const Header = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => decrypt({ data: state.auth?.user }));
	console.log("user", user)
	const logout = () => {
		dispatch(AuthActions.logout());
	};

	return (
		<nav className="bg-white border-gray-200 dark:bg-gray-900">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
					<b>Create MERN App</b>
				</Link>
				<button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
					<span className="sr-only">Open main menu</span>
					<svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
						<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
					</svg>
				</button>
				<div className="hidden w-full md:block md:w-auto" id="navbar-default">

					<ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						<li>
							<Link href="/users">Users</Link>
						</li>
						{!user && (
							<>
								<li>
									<Link href="/login">Login</Link>
								</li>
								<li>
									<Link href="/signup">Signup</Link>
								</li>
							</>
						)}
						{user && (
							<li>
								<span onClick={logout}>
									Logout
								</span>
							</li>
						)}
					</ul>
				</div>
			</div>

		</nav>
	);
};

export default memo(Header);
