"use client"
import React from 'react';
import { Header, Footer } from '@/components';
import { useSelector } from 'react-redux';

const Home = () => {

	const user = useSelector((state) => state?.auth?.user);

	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className='mb-auto'>
				{!user ? (
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Home</h2>
					</div>
				) : (
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Dashboard</h2>
						<p>
							<b>Name</b>: {user?.name || ''}
						</p>
						<p>
							<b>Email</b>: {user?.email || ''}
						</p>
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default Home;