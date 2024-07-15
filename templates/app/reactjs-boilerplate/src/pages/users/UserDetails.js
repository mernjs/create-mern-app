import React from 'react';
import { Header } from '@components';
import { Link, useParams } from 'react-router-dom';
import { useGetUserQuery } from '@services/UserServices';

const UserDetails = () => {
	const { userId } = useParams();
	const { data, isFetching } = useGetUserQuery(userId);

	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className='mb-auto'>
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">User Details</h2>
					<Link to="/users">Go Back</Link>
					{isFetching ? <p>Loading...</p> :
						<div>
							<p><b>Name:</b> {data?.data?.name}</p>
							<p><b>Email:</b> {data?.data?.email}</p>
						</div>
					}
				</div>
			</div>
		</div>
	);
};

export default UserDetails;
