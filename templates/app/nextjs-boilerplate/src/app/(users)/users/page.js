"use client"
import React, { useState } from 'react';
import { Header, Footer, } from '@/components';
import { useGetUsersQuery } from '@/services/UserServices';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';

const Users = () => {

	const [page, setPage] = useState(0);
	const { data, isFetching } = useGetUsersQuery(page + 1)

	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className='mb-auto'>
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Users</h2>
				</div>

				{isFetching ?
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						<p className="mt-10 text-center text-2sm leading-9 tracking-tight text-gray-900">Loading...</p>
					</div>
					:
					<div>
						{!data?.data?.docs &&
							<div className="sm:mx-auto sm:w-full sm:max-w-sm">
								<p className="mt-10 text-center text-2sm leading-9 tracking-tight text-gray-900">No Data Found</p>
							</div>
						}
						{data?.data?.docs?.map((item, index) => {
							return <Link key={index} href={`/user-details/${item._id}`} style={{ padding: '10px', border: '2px solid gray', width: '500px', margin: '0 auto', marginBottom: '20px' }}>
								<p><b>Name:</b> {item.name}</p>
								<p><b>Email:</b> {item.email}</p>
							</Link>;
						})}

						{data?.data?.docs &&
							<div className="sm:mx-auto sm:w-full sm:max-w-sm">
								<ReactPaginate
									initialPage={page}
									onPageChange={(page) => setPage(page.selected)}
									pageRangeDisplayed={5}
									pageCount={data?.data?.totalPages}
									activeClassName="active"
								/>
							</div>
						}
					</div>
				}
			</div>
			<Footer />
		</div>
	);
};

export default Users;