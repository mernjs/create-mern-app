"use client"
import React from 'react';
import { Header, Footer } from '@/components';

const UserDetails = ({ params }) => {
	console.log("PARAMS", params)

	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className='mb-auto'>
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">User Details</h2>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default UserDetails;